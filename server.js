/**
 * Local mill copilot server.
 * Serves the static app and proxies Gemini so the API key never reaches the browser.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
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

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 20000) {
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

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

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

server.listen(PORT, () => {
  const keyReady = Boolean(process.env.GEMINI_API_KEY);
  console.log(`TEX//STACK running at http://localhost:${PORT}`);
  console.log(keyReady
    ? "Mill Copilot: Gemini key loaded on the server only."
    : "Mill Copilot: add GEMINI_API_KEY to .env for live answers.");
});
