import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "public");

if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const files = [
  "index.html",
  "login.html",
  "app.js",
  "style.css",
  "qrcode.js",
  "batch-report.html",
  "Powered_By__14_-removebg-preview.png"
];

for (const name of files) {
  const src = join(root, name);
  if (existsSync(src)) cpSync(src, join(out, name));
}

if (existsSync(join(root, "assets"))) {
  cpSync(join(root, "assets"), join(out, "assets"), { recursive: true });
}
