const prefix = "afrilingo:";
const allowedTopLevel = new Set(["preferences", "twi", "ga", "ewe", "swahili", "yoruba", "hausa", "igbo", "shona", "ndebele", "zulu", "bemba", "chichewa", "kinyarwanda", "kirundi"]);

export function exportLearningData() {
  const data = {};
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (!key?.startsWith(prefix)) continue;
    const shortKey = key.slice(prefix.length);
    if (!allowedTopLevel.has(shortKey)) continue;
    try { data[shortKey] = JSON.parse(localStorage.getItem(key)); } catch {}
  }
  return { product: "AfriLingo", version: 1, exportedAt: new Date().toISOString(), data };
}

export function downloadLearningData() {
  const blob = new Blob([JSON.stringify(exportLearningData(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob); const link = document.createElement("a");
  link.href = url; link.download = `afrilingo-progress-${new Date().toISOString().slice(0,10)}.json`; link.click();
  URL.revokeObjectURL(url);
}

export async function importLearningData(file) {
  const backup = JSON.parse(await file.text());
  if (backup?.product !== "AfriLingo" || backup?.version !== 1 || !backup.data || typeof backup.data !== "object") throw new Error("This is not a supported AfriLingo backup.");
  const entries = Object.entries(backup.data).filter(([key, value]) => allowedTopLevel.has(key) && value && typeof value === "object");
  if (!entries.length) throw new Error("The backup does not contain learning progress.");
  entries.forEach(([key,value]) => localStorage.setItem(`${prefix}${key}`, JSON.stringify(value)));
  return entries.length;
}

export function resetCourseData(languageId) { localStorage.removeItem(`${prefix}${languageId}`); }
export function resetAllLearningData() { [...Array(localStorage.length)].map((_,index)=>localStorage.key(index)).filter(key=>key?.startsWith(prefix)).forEach(key=>localStorage.removeItem(key)); }
