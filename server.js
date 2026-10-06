/**
 * Local mill copilot server.
 * Serves the static app and proxies Gemini so the API key never reaches the browser.
 */
const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const { COPILOT_KNOWLEDGE, findCopilotEntry, buildMillKnowledgeBrief } = require("./copilot-knowledge.js");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8080;
const BLOCKED = new Set([".env", ".env.local", ".gitignore"]);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};

function loadEnvFile() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, "utf8").split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eq = trimmed.indexOf("=");
    if (eq < 1) return;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] == null) process.env[key] = value;
  });
}

loadEnvFile();

const MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL,
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash"
].filter((name, index, list) => name && list.indexOf(name) === index);

const SYSTEM_PROMPT = [
  "You are Mill Knowledge Copilot, the shift engineering assistant inside TEX//STACK for Shift A.",
  "Speak as a plant colleague: specific, calm, operational. Never mention Gemini, Google, APIs, models, prompts, demos, or that answers are scripted.",
  "Use only the mill knowledge below. Do not invent machines, lots, readings, or certifications that are not in that knowledge.",
  "People still approve colour correction, maintenance work and final quality acceptance.",
  "If the question is adjacent (for example a follow-up on ΔE, AJ-003, line beta, or Lot TEX-8821), answer from the closest knowledge and keep the same numbers.",
  "If it is outside mill operations, steer back to colour, fabric inspection, reliability, utilities, planning or compliance.",
  "Keep replies short: 2–4 short paragraphs. Use a short numbered list only when the steps help the operator act.",
  "",
  "MILL KNOWLEDGE",
  buildMillKnowledgeBrief()
].join("\n");

const rateBuckets = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip) || [];
  const recent = bucket.filter((time) => now - time < 60000);
  if (recent.length >= 20) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history.slice(-8).map((item) => ({
    role: item && item.role === "assistant" ? "assistant" : "user",
    text: String(item && item.text || "").slice(0, 800)
  })).filter((item) => item.text);
}

function extractGeminiText(data) {
  const parts = data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
  if (!Array.isArray(parts)) return "";
  return parts.map((part) => part.text || "").join("\n").trim();
}

function entryToReply(entry) {
  return {
    reply: entry.body.join("\n\n"),
    source: entry.source || "",
    metric: entry.metric || null,
    steps: entry.steps || []
  };
}

async function askGemini(message, history) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const error = new Error("MISSING_KEY");
    error.code = "MISSING_KEY";
    throw error;
  }

  const contents = [];
  sanitizeHistory(history).forEach((item) => {
    contents.push({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.text }]
    });
  });
  contents.push({ role: "user", parts: [{ text: message }] });

  let lastError = null;
  for (const model of MODEL_CANDIDATES) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 512
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const text = extractGeminiText(data);
      if (text) return text;
      lastError = new Error("EMPTY_REPLY");
      continue;
    }

    if (response.status === 404 || response.status === 400) {
      lastError = new Error(`MODEL_${response.status}`);
      continue;
    }

    const details = await response.text();
    const error = new Error("GEMINI_HTTP");
    error.status = response.status;
    error.details = details.slice(0, 200);
    throw error;
  }

  throw lastError || new Error("GEMINI_FAILED");
}

function serveStatic(req, res) {
  const url = new URL(req.url, "http://localhost");
  let filePath = decodeURIComponent(url.pathname);
  if (filePath === "/") filePath = "/index.html";

  const safePath = path.normalize(filePath).replace(/^([.][.][/\\])+/, "");
  const absolute = path.join(ROOT, safePath);
  const base = path.basename(absolute).toLowerCase();

  if (!absolute.startsWith(ROOT) || BLOCKED.has(base) || base === "server.js") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  fs.stat(absolute, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const type = MIME[path.extname(absolute).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    fs.createReadStream(absolute).pipe(res);
  });
}

function readBody(req, limit) {
  const max = limit || 20000;
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > max) {
        reject(new Error("TOO_LARGE"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

let publicOrigin = String(process.env.SCAN_PUBLIC_ORIGIN || "").replace(/\/$/, "");
let tunnelProcess = null;

function lanOrigins() {
  const preferred = [];
  const other = [];
  const nets = os.networkInterfaces();
  Object.keys(nets).forEach((name) => {
    const virtual = /^(utun|awdl|bridge|llw|vmnet|vboxnet)/.test(name);
    (nets[name] || []).forEach((net) => {
      const v4 = net.family === "IPv4" || net.family === 4;
      if (!v4 || net.internal) return;
      const origin = `http://${net.address}:${PORT}`;
      if (virtual) other.push(origin);
      else preferred.push(origin);
    });
  });
  return preferred.concat(other);
}

function scanOrigin() {
  if (publicOrigin) return publicOrigin;
  const lan = lanOrigins();
  return lan[0] || `http://127.0.0.1:${PORT}`;
}

function rememberPublicOrigin(text) {
  if (publicOrigin) return;
  const raw = String(text).replace(/\u001b\[[0-9;?]*[A-Za-z]/g, "");
  const urls = raw.match(/https?:\/\/[a-z0-9.-]+/gi) || [];
  const tunnel = urls.find((url) => /(?:^https?:\/\/)(?!dashboard\.)[a-z0-9.-]*(?:trycloudflare\.com|pinggy(?:-free)?\.(?:link|net)|localhost\.run|lhr\.life)/i.test(url));
  if (!tunnel) return;
  publicOrigin = tunnel.replace(/\/$/, "");
  console.log(`Batch QR is open on any network at ${publicOrigin}`);
}

function startScanTunnel() {
  if (publicOrigin || process.env.SCAN_TUNNEL === "0") return;
  const cloudflared = path.join(ROOT, ".cache", "cloudflared");
  const child = fs.existsSync(cloudflared)
    ? spawn(cloudflared, ["tunnel", "--url", `http://127.0.0.1:${PORT}`, "--no-autoupdate"], { stdio: ["ignore", "pipe", "pipe"] })
    : spawn("script", [
      "-q", "/dev/null",
      "ssh",
      "-p", "443",
      "-tt",
      "-o", "BatchMode=yes",
      "-o", "StrictHostKeyChecking=accept-new",
      "-o", "ServerAliveInterval=30",
      "-o", "ExitOnForwardFailure=yes",
      "-R", `0:127.0.0.1:${PORT}`,
      "a.pinggy.io"
    ], { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, TERM: "xterm-256color" } });
  tunnelProcess = child;
  child.stdout.on("data", rememberPublicOrigin);
  child.stderr.on("data", rememberPublicOrigin);
  child.on("error", () => {
    console.log("Batch QR stays on the local network. A public tunnel could not start.");
  });
  child.on("exit", () => {
    if (tunnelProcess !== child) return;
    tunnelProcess = null;
    if (process.env.SCAN_TUNNEL === "0") return;
    publicOrigin = String(process.env.SCAN_PUBLIC_ORIGIN || "").replace(/\/$/, "");
    if (!publicOrigin) setTimeout(startScanTunnel, 5000);
  });
}

function stopScanTunnel() {
  if (tunnelProcess) tunnelProcess.kill("SIGTERM");
}

process.on("SIGINT", () => {
  stopScanTunnel();
  process.exit(0);
});
process.on("SIGTERM", () => {
  stopScanTunnel();
  process.exit(0);
});

const JOB_INBOX = path.join(ROOT, ".cache", "job-inbox.json");
const JOB_STATUS = path.join(ROOT, ".cache", "job-status.json");
const MAINTAIN_BOARD = path.join(ROOT, ".cache", "job-maintain-board.json");
const MAINTAIN_INBOX = path.join(ROOT, ".cache", "job-maintain-inbox.json");
const MAINTAIN_FILES = path.join(ROOT, ".cache", "maintain-files");
const JOB_COLUMNS = new Set(["unassigned", "utility", "miscellaneous", "electrical", "mechanical"]);
const MAINTAIN_TYPES = new Set(["written", "voice", "image", "video"]);

function readJobInbox() {
  try {
    const parsed = JSON.parse(fs.readFileSync(JOB_INBOX, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function writeJobInbox(list) {
  fs.mkdirSync(path.dirname(JOB_INBOX), { recursive: true });
  fs.writeFileSync(JOB_INBOX, JSON.stringify(list.slice(-200)));
}

function readJobStatus() {
  try {
    const parsed = JSON.parse(fs.readFileSync(JOB_STATUS, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function cleanJobStatus(list) {
  if (!Array.isArray(list)) return [];
  return list.slice(0, 100).map((item) => ({
    id: String(item && item.id || "").slice(0, 24),
    machine: String(item && item.machine || "").slice(0, 80),
    text: String(item && item.text || "").slice(0, 400),
    sent: String(item && item.sent || "—").slice(0, 32),
    department: String(item && item.department || "").slice(0, 40),
    person: String(item && item.person || "").slice(0, 80),
    status: String(item && item.status || "").slice(0, 40),
    tone: item && (item.tone === "is-wait" || item.tone === "is-refer") ? item.tone : "",
    note: String(item && item.note || "").slice(0, 240),
    rca: String(item && item.rca || "—").slice(0, 80),
    time: String(item && item.time || "—").slice(0, 32),
    clockStart: Number(item && item.clockStart) || 0
  })).filter((item) => item.id);
}

function readMaintainBoard() {
  try {
    const parsed = JSON.parse(fs.readFileSync(MAINTAIN_BOARD, "utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (err) {
    return {};
  }
}

function readMaintainInbox() {
  try {
    const parsed = JSON.parse(fs.readFileSync(MAINTAIN_INBOX, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function writeMaintainInbox(list) {
  fs.mkdirSync(path.dirname(MAINTAIN_INBOX), { recursive: true });
  fs.writeFileSync(MAINTAIN_INBOX, JSON.stringify(list.slice(-300)));
}

function cleanMaintainText(value, limit) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function cleanMaintainRecords(list) {
  const board = {};
  if (!Array.isArray(list)) return board;
  list.slice(0, 80).forEach((item) => {
    const id = cleanMaintainText(item && item.id, 24);
    if (!id) return;
    const fallback = item && item.writtenFallback;
    board[id] = {
      id,
      machine: cleanMaintainText(item.machine, 80),
      text: cleanMaintainText(item.text, 400),
      attendance: Array.isArray(item.attendance) ? item.attendance.slice(0, 20).map((row) => ({
        person: cleanMaintainText(row && row.person, 80) || "—",
        department: cleanMaintainText(row && row.department, 40) || "—",
        assigned: cleanMaintainText(row && row.assigned, 32) || "—",
        arrived: cleanMaintainText(row && row.arrived, 32) || "—",
        after: cleanMaintainText(row && row.after, 32) || "00:00",
        time: cleanMaintainText(row && row.time, 32) || "00:00",
        clockStart: Number(row && row.clockStart) || 0,
        referred: cleanMaintainText(row && row.referred, 80) || "—",
        referredDept: cleanMaintainText(row && row.referredDept, 40) || "—"
      })) : [],
      notes: Array.isArray(item.notes) ? item.notes.slice(-40).map((note) => ({
        token: String(note && note.token || "").replace(/[^a-zA-Z0-9-]/g, "").slice(0, 48),
        type: MAINTAIN_TYPES.has(note && note.type) ? note.type : "written",
        person: cleanMaintainText(note && note.person, 80) || "—",
        department: cleanMaintainText(note && note.department, 40) || "—",
        time: cleanMaintainText(note && note.time, 32) || "—",
        text: cleanMaintainText(note && note.text, 500)
      })) : [],
      writtenFallback: fallback && fallback.text ? {
        person: cleanMaintainText(fallback.person, 80) || "—",
        department: cleanMaintainText(fallback.department, 40) || "—",
        time: cleanMaintainText(fallback.time, 32) || "—",
        text: cleanMaintainText(fallback.text, 500)
      } : null
    };
  });
  return board;
}

function ackMaintainNotes(board) {
  const tokens = new Set();
  Object.values(board).forEach((record) => {
    (record.notes || []).forEach((note) => {
      if (note.token) tokens.add(note.token);
    });
  });
  if (!tokens.size) return;
  writeMaintainInbox(readMaintainInbox().filter((note) => !tokens.has(note.token)));
}

function maintainView(jobId) {
  const record = readMaintainBoard()[jobId] || {
    id: jobId,
    machine: "",
    text: "",
    attendance: [],
    notes: [],
    writtenFallback: null
  };
  const known = new Set((record.notes || []).map((note) => note.token).filter(Boolean));
  const pending = readMaintainInbox()
    .filter((note) => note.jobId === jobId && !known.has(note.token))
    .map((note) => ({
      token: note.token,
      type: note.type,
      person: "",
      department: "",
      time: "",
      atMs: note.atMs,
      text: note.text
    }));
  return { ...record, pending };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && url.pathname === "/api/job-status") {
    sendJson(res, 200, { requests: readJobStatus() });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/job-status") {
    let payload;
    try {
      payload = JSON.parse(await readBody(req, 200000));
    } catch (err) {
      sendJson(res, 400, { error: "I could not read that request." });
      return;
    }
    const requests = cleanJobStatus(payload.requests);
    fs.mkdirSync(path.dirname(JOB_STATUS), { recursive: true });
    fs.writeFileSync(JOB_STATUS, JSON.stringify(requests));
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/job-requests") {
    sendJson(res, 200, { requests: readJobInbox() });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/job-requests") {
    let payload;
    try {
      payload = JSON.parse(await readBody(req));
    } catch (err) {
      sendJson(res, 400, { error: "I could not read that request." });
      return;
    }
    const token = String(payload.token || "").replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
    const text = String(payload.text || "").replace(/\s+/g, " ").trim().slice(0, 400);
    const machine = String(payload.machine || "").replace(/\s+/g, " ").trim().slice(0, 80);
    const column = JOB_COLUMNS.has(payload.column) ? payload.column : "unassigned";
    if (!token || !text || !machine) {
      sendJson(res, 400, { error: "Choose a machine and write the job request." });
      return;
    }
    const inbox = readJobInbox();
    if (!inbox.some((item) => item.token === token)) {
      inbox.push({ token, text, machine, column, raisedAtMs: Date.now() });
      writeJobInbox(inbox);
    }
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/job-maintain") {
    const jobId = cleanMaintainText(url.searchParams.get("job"), 24);
    if (!jobId) {
      sendJson(res, 400, { error: "This maintenance code has no job." });
      return;
    }
    sendJson(res, 200, maintainView(jobId));
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/job-maintain-inbox") {
    sendJson(res, 200, { notes: readMaintainInbox() });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/job-maintain-board") {
    let payload;
    try {
      payload = JSON.parse(await readBody(req, 400000));
    } catch (err) {
      sendJson(res, 400, { error: "I could not read that record." });
      return;
    }
    const board = cleanMaintainRecords(payload.records);
    fs.mkdirSync(path.dirname(MAINTAIN_BOARD), { recursive: true });
    fs.writeFileSync(MAINTAIN_BOARD, JSON.stringify(board));
    ackMaintainNotes(board);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/job-maintain") {
    let payload;
    try {
      payload = JSON.parse(await readBody(req, 9000000));
    } catch (err) {
      sendJson(res, 400, { error: "I could not read that record." });
      return;
    }
    const token = String(payload.token || "").replace(/[^a-zA-Z0-9-]/g, "").slice(0, 48);
    const jobId = cleanMaintainText(payload.jobId, 24);
    const type = MAINTAIN_TYPES.has(payload.type) ? payload.type : "";
    const text = cleanMaintainText(payload.text, 500);
    const fileName = String(payload.fileName || "").replace(/[^\w.\- ()]/g, "").slice(0, 120);
    if (!token || !jobId || !type || !text) {
      sendJson(res, 400, { error: "Write the record before sending it." });
      return;
    }
    if (payload.fileBase64) {
      const raw = String(payload.fileBase64).replace(/^data:[^,]*,/, "");
      const bytes = Buffer.from(raw, "base64");
      if (!bytes.length || bytes.length > 6 * 1024 * 1024) {
        sendJson(res, 413, { error: "Keep each voice, image, or video under 6 MB." });
        return;
      }
      fs.mkdirSync(MAINTAIN_FILES, { recursive: true });
      fs.writeFileSync(path.join(MAINTAIN_FILES, `${token}-${fileName || "file"}`), bytes);
    }
    const inbox = readMaintainInbox();
    if (!inbox.some((item) => item.token === token)) {
      inbox.push({ token, jobId, type, text, fileName, atMs: Date.now() });
      writeMaintainInbox(inbox);
    }
    sendJson(res, 200, { ok: true, atMs: Date.now() });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/scan-origin") {
    sendJson(res, 200, {
      origin: scanOrigin(),
      public: Boolean(publicOrigin),
      lan: lanOrigins()
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/copilot/status") {
    sendJson(res, 200, {
      ready: Boolean(process.env.GEMINI_API_KEY),
      prompts: COPILOT_KNOWLEDGE.length
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/copilot") {
    const ip = req.socket.remoteAddress || "local";
    if (isRateLimited(ip)) {
      sendJson(res, 429, { error: "The mill assistant is busy. Try again in a moment." });
      return;
    }

    let payload;
    try {
      payload = JSON.parse(await readBody(req));
    } catch (err) {
      sendJson(res, 400, { error: "I could not read that request." });
      return;
    }

    const message = String(payload.message || "").trim().slice(0, 400);
    if (!message) {
      sendJson(res, 400, { error: "Ask a mill question and I will pull the evidence." });
      return;
    }

    const history = sanitizeHistory(payload.history);
    const matched = findCopilotEntry(message);

    try {
      const reply = await askGemini(message, history);
      sendJson(res, 200, {
        reply,
        source: matched ? matched.source : "Mill Knowledge Copilot · Shift A",
        metric: matched ? matched.metric : null,
        steps: []
      });
    } catch (err) {
      if (matched) {
        sendJson(res, 200, entryToReply(matched));
        return;
      }
      sendJson(res, 503, {
        error: "I cannot reach plant intelligence right now. Ask again in a moment, or start from a suggested question."
      });
    }
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(PORT, "0.0.0.0", () => {
  const keyReady = Boolean(process.env.GEMINI_API_KEY);
  console.log(`TEX//STACK running at http://localhost:${PORT}`);
  lanOrigins().forEach((origin) => console.log(`Batch QR on this network: ${origin}`));
  startScanTunnel();
  console.log(keyReady
    ? "Mill Copilot: Gemini key loaded on the server only."
    : "Mill Copilot: add GEMINI_API_KEY to .env for live answers.");
});
