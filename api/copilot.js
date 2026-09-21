const { COPILOT_KNOWLEDGE, findCopilotEntry, buildMillKnowledgeBrief } = require("../copilot-knowledge.js");

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

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history.slice(-8).map((item) => ({
    role: item && item.role === "assistant" ? "assistant" : "user",
    text: String((item && item.text) || "").slice(0, 800)
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

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = new URL(req.url, `http://${host}`);

  if (req.method === "GET" && (url.pathname.endsWith("/status") || url.searchParams.get("action") === "status")) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.statusCode = 200;
    res.end(JSON.stringify({
      ready: Boolean(process.env.GEMINI_API_KEY),
      prompts: COPILOT_KNOWLEDGE.length
    }));
    return;
  }

  if (req.method === "POST") {
    let payload = req.body;
    if (typeof payload === "string") {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        payload = {};
      }
    } else if (!payload) {
      try {
        const buffers = [];
        for await (const chunk of req) buffers.push(chunk);
        payload = JSON.parse(Buffer.concat(buffers).toString("utf8"));
      } catch (e) {
        payload = {};
      }
    }

    const message = String((payload && payload.message) || "").trim().slice(0, 400);
    if (!message) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ error: "Ask a mill question and I will pull the evidence." }));
      return;
    }

    const history = sanitizeHistory(payload && payload.history);
    const matched = findCopilotEntry(message);

    try {
      const reply = await askGemini(message, history);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({
        reply,
        source: matched ? matched.source : "Mill Knowledge Copilot · Shift A",
        metric: matched ? matched.metric : null,
        steps: []
      }));
    } catch (err) {
      if (matched) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify(entryToReply(matched)));
        return;
      }
      res.statusCode = 503;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({
        error: "I cannot reach plant intelligence right now. Ask again in a moment, or start from a suggested question."
      }));
    }
    return;
  }

  res.statusCode = 405;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify({ error: "Method not allowed" }));
};
