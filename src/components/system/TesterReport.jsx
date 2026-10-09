import { useMemo, useState } from "react";
import { ExternalLink, MessageSquareWarning } from "lucide-react";
import { buildTesterIssueUrl, TESTER_REPORT_AREAS, testerEnvironment } from "../../utils/testerReport";

export default function TesterReport({ dark, language, unit }) {
  const [area, setArea] = useState(TESTER_REPORT_AREAS[0]);
  const [happened, setHappened] = useState("");
  const [expected, setExpected] = useState("");
  const environment = useMemo(() => testerEnvironment({
    language,
    unit,
    area,
    online: typeof navigator === "undefined" ? true : navigator.onLine,
    userAgent: typeof navigator === "undefined" ? "Unavailable" : navigator.userAgent,
  }), [area, language, unit]);
  const ready = happened.trim().length >= 8;
  const field = dark ? "border-white/10 bg-[#232B28] text-[#F8F4EA]" : "border-black/10 bg-[#FFF8EE] text-[#191C1A]";

  const openReport = () => {
    if (!ready) return;
    const url = buildTesterIssueUrl({
      language,
      unit,
      area,
      happened,
      expected,
      online: navigator.onLine,
      userAgent: navigator.userAgent,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return <div>
    <p className="text-sm font-semibold leading-6 opacity-55">Tell us exactly where something felt wrong. AfriLingo will prepare a GitHub report with the active course, unit, connection, and browser details.</p>
    <label className="mt-4 block text-sm font-black" htmlFor="tester-area">Where did it happen?</label>
    <select id="tester-area" value={area} onChange={event => setArea(event.target.value)} className={`mt-2 min-h-12 w-full rounded-xl border px-3 font-bold ${field}`}>
      {TESTER_REPORT_AREAS.map(item => <option key={item}>{item}</option>)}
    </select>
    <label className="mt-4 block text-sm font-black" htmlFor="tester-happened">What happened?</label>
    <textarea id="tester-happened" value={happened} maxLength={1600} onChange={event => setHappened(event.target.value)} rows={4} placeholder="For example: I matched all five pairs correctly, but still lost a heart." className={`mt-2 w-full resize-y rounded-xl border p-3 font-semibold leading-6 ${field}`}/>
    <div className="mt-1 text-right text-xs font-bold opacity-40">{happened.length}/1600</div>
    <label className="mt-3 block text-sm font-black" htmlFor="tester-expected">What did you expect?</label>
    <textarea id="tester-expected" value={expected} maxLength={1600} onChange={event => setExpected(event.target.value)} rows={3} placeholder="What should AfriLingo have done instead?" className={`mt-2 w-full resize-y rounded-xl border p-3 font-semibold leading-6 ${field}`}/>
    <details className="mt-3 rounded-xl bg-current/[.04] p-3 text-xs"><summary className="cursor-pointer font-black">Context included in the report</summary><pre className="mt-3 whitespace-pre-wrap break-words font-sans font-semibold leading-5 opacity-55">{environment}</pre></details>
    <button type="button" disabled={!ready} onClick={openReport} className="afri-press mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F28C28] px-4 font-black text-white disabled:cursor-not-allowed disabled:opacity-40">
      <MessageSquareWarning size={18}/>Prepare tester report <ExternalLink size={16}/>
    </button>
    <p className="mt-3 text-xs font-semibold leading-5 opacity-45">You can review and edit everything on GitHub before submitting. AfriLingo does not send the report automatically.</p>
  </div>;
}
