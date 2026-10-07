import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sidekicks } from "../src/data/sidekicks.js";
import { leboThemes, getLeboTheme } from "../src/data/leboThemes.js";
import { iconLibrary } from "../src/data/iconLibrary.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const sourceRoots = [path.join(root, "src")];
const extensions = new Set([".png", ".jpg", ".jpeg", ".svg", ".riv"]);

async function filesWithin(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? filesWithin(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}

const referenced = new Set([
  "/mascot/lebo-wave.png", "/mascot/lebo-learn.png", "/mascot/lebo-encourage.png", "/mascot/lebo-celebrate.png", "/mascot/lebo-2d.riv",
  ...sidekicks.map(item => `/${item.image.replace(/^\//, "")}`),
  ...Object.keys(leboThemes).flatMap(id => { const theme = getLeboTheme(id); return [theme.outfit, ...Object.values(theme.poses || {})]; }),
  ...Object.values(iconLibrary).map(item => item.asset).filter(asset => asset?.startsWith("/"))
]);

for (const sourceRoot of sourceRoots) {
  for (const file of await filesWithin(sourceRoot)) {
    if (!/[.](?:js|jsx)$/.test(file)) continue;
    const text = await readFile(file, "utf8");
    for (const match of text.matchAll(/["'`](\/?(?:images|mascot|icons)\/[^"'`$]+[.](?:png|jpe?g|svg|riv))["'`]/gi)) referenced.add(`/${match[1].replace(/^\//, "")}`);
  }
}

const missing = [];
const empty = [];
const resolved = [];
for (const asset of [...referenced].sort()) {
  const target = path.join(publicDir, asset.replace(/^\//, ""));
  try {
    const details = await stat(target);
    if (!extensions.has(path.extname(target).toLowerCase())) continue;
    if (!details.size) empty.push(asset);
    resolved.push({ asset, bytes: details.size });
  } catch {
    missing.push(asset);
  }
}

const unused = [];
for (const file of await filesWithin(publicDir)) {
  const relative = `/${path.relative(publicDir, file).replaceAll("\\", "/")}`;
  if (extensions.has(path.extname(file).toLowerCase()) && !referenced.has(relative) && !relative.startsWith("/images/characters/")) unused.push(relative);
}

console.log(`AfriLingo artwork audit: ${resolved.length} referenced assets · ${Object.keys(leboThemes).length} language outfits · ${sidekicks.length + 1} crew characters`);
console.log(`${missing.length} missing · ${empty.length} empty · ${unused.length} currently unreferenced`);
if (unused.length) console.log(`Unreferenced (informational): ${unused.slice(0, 8).join(", ")}${unused.length > 8 ? "…" : ""}`);
if (missing.length || empty.length) {
  if (missing.length) console.error(`Missing artwork:\n${missing.map(item => `- ${item}`).join("\n")}`);
  if (empty.length) console.error(`Empty artwork:\n${empty.map(item => `- ${item}`).join("\n")}`);
  process.exitCode = 1;
}
