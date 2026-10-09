export const TESTER_REPORT_AREAS = [
  "Lesson question",
  "Course path",
  "Practice or review",
  "Explore",
  "Immerse",
  "Audio",
  "Visual or layout",
  "Progress or rewards",
  "Other",
];

const clean = (value, limit = 1600) => String(value || "").trim().slice(0, limit);

export function testerEnvironment({ language, unit, area, online, userAgent } = {}) {
  return [
    `Language: ${clean(language?.language || language?.id || "Unknown", 80)}`,
    `Unit: ${clean(unit ? `${unit.id || ""} ${unit.title || ""}` : "Not provided", 120)}`,
    `Area: ${clean(area || "Other", 80)}`,
    `Connection: ${online === false ? "Offline" : "Online"}`,
    `Browser/device: ${clean(userAgent || "Unavailable", 240)}`,
    "App version: 0.2.0",
  ].join("\n");
}

export function buildTesterIssueUrl({ language, unit, area, happened, expected, online, userAgent } = {}) {
  const title = `[Tester feedback] ${clean(language?.language || "AfriLingo", 50)} · ${clean(area || "Other", 60)}`;
  const body = [
    "## What happened?",
    clean(happened) || "Not provided",
    "",
    "## What did you expect?",
    clean(expected) || "Not provided",
    "",
    "## Automatic context",
    testerEnvironment({ language, unit, area, online, userAgent }),
    "",
    "_Please remove anything you do not want to share before submitting._",
  ].join("\n");
  const params = new URLSearchParams({ title, body, labels: "tester-feedback" });
  return `https://github.com/Kpents/Afrilingo/issues/new?${params}`;
}
