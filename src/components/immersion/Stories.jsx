import { useEffect, useState } from "react";
import { BookOpenText, CheckCircle2, ExternalLink, Save, Sparkles, XCircle } from "lucide-react";
import AudioButton from "../ui/AudioButton";
import { hapticPress } from "../../utils/hapticFeedback";

const surface = dark => dark ? "border-white/10 bg-[#1A201E]" : "border-black/8 bg-white";
const normalizeToken = token => token.toLocaleLowerCase().replace(/[^\p{L}\p{M}]/gu, "");

export default function Stories({ dark, data, progress, onReward, initialStoryId }) {
  const [story, setStory] = useState(data.stories.find(item => item.id === initialStoryId) || data.stories[0]);
  const [translations, setTranslations] = useState({});
  const [word, setWord] = useState(null);
  const [answer, setAnswer] = useState(null);
  const saved = progress.immersion?.savedWords || [];
  const completed = progress.immersion?.completedStories || [];

  useEffect(() => {
    const requested = data.stories.find(item => item.id === initialStoryId);
    if (requested) setStory(requested);
  }, [data.stories, initialStoryId]);

  const chooseStory = item => {
    setStory(item);
    setTranslations({});
    setWord(null);
    setAnswer(null);
  };
  const chooseAnswer = option => {
    setAnswer(option);
    if (option === story.question.answer && !completed.includes(story.id)) onReward({ field: "completedStories", id: story.id, xp: story.xp || 15 });
  };
  const correct = answer === story.question.answer;

  return <div>
    <div className="flex items-end justify-between gap-4">
      <div><div className="text-xs font-black uppercase tracking-[.2em] text-[#F28C28]">Read · reveal · remember</div><h1 className="mt-2 text-3xl font-black sm:text-4xl">{data.languageName} Stories</h1><p className="mt-3 max-w-2xl leading-7 opacity-55">Original learning stories are labeled clearly. Tap a sentence for its translation and highlighted words for meaning.</p></div>
      <BookOpenText className="hidden text-[#24745B] sm:block" size={42}/>
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.stories.map(item => <button key={item.id} aria-pressed={story.id === item.id} onPointerDown={hapticPress} onClick={() => chooseStory(item)} className={`afri-press relative min-h-24 rounded-2xl border p-4 text-left ${story.id === item.id ? "border-[#F28C28] bg-[#F28C28]/10" : surface(dark)}`}>
      <div className="flex items-start justify-between gap-3"><span className="text-3xl">{item.emoji}</span>{completed.includes(item.id) && <CheckCircle2 className="text-[#53B98A]" size={21}/>}</div>
      <div className="mt-2 font-black">{item.englishTitle}</div><div className="mt-1 text-xs font-semibold opacity-50">{item.level} · {item.sentences.length} moments</div>
    </button>)}</div>

    <article className={`mt-5 overflow-hidden rounded-[1.8rem] border ${surface(dark)}`}>
      <div className="bg-gradient-to-r from-[#24745B] to-[#4338CA] p-5 text-white sm:p-7"><div className="flex justify-between gap-4"><div><div className="text-xs font-black uppercase tracking-wider text-white/65">{story.origin} · {story.level}</div><h2 className="mt-2 text-3xl font-black">{story.title}</h2><div className="text-white/65">{story.englishTitle}</div></div><AudioButton src={story.audio} label={story.title} compact className="bg-white text-[#4338CA]"/></div></div>
      <div className="p-5 sm:p-7">
        <div className="space-y-3">{story.sentences.map((sentence, index) => <div key={index} className={`w-full rounded-xl p-4 text-left ${dark ? "bg-white/5" : "bg-black/[.035]"}`}>
          <div className="flex flex-wrap gap-x-1 text-lg font-black">{sentence.native.split(/\s+/).map((token, tokenIndex) => { const meaning = story.vocabulary[normalizeToken(token)]; return meaning ? <button type="button" key={tokenIndex} onClick={() => setWord({ token, meaning })} aria-label={`${token}: show meaning`} className="min-h-10 rounded bg-[#F6C445]/25 px-1.5 text-left underline decoration-dotted underline-offset-4">{token}</button> : <span key={tokenIndex} className="inline-flex min-h-10 items-center">{token}</span>; })}</div>
          <button type="button" onClick={() => setTranslations(value => ({ ...value, [index]: !value[index] }))} aria-expanded={Boolean(translations[index])} className="mt-2 min-h-11 w-full rounded-lg text-left focus-visible:outline-offset-2">
            {translations[index] ? <span className="text-sm opacity-60">{sentence.english}</span> : <span className="text-xs font-black uppercase tracking-wider text-[#F28C28]">Reveal translation</span>}
          </button>
        </div>)}</div>

        {word && <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#24745B]/15 p-3"><div><strong>{word.token}</strong> · {word.meaning}</div><button onPointerDown={hapticPress} onClick={() => onReward({ field: "savedWords", id: `${story.id}:${normalizeToken(word.token)}`, xp: 0 })} className="flex min-h-10 items-center gap-1 font-black text-[#24745B]"><Save size={16}/>{saved.includes(`${story.id}:${normalizeToken(word.token)}`) ? "Saved" : "Save"}</button></div>}

        {story.culturalContext && <div className="mt-5 rounded-2xl border border-[#F6C445]/35 bg-[#F6C445]/12 p-4 text-sm leading-6"><div className="font-black text-[#C95D3A]">Culture in context</div><p className="mt-1 opacity-75">{story.culturalContext}</p></div>}
        {(story.sourceTitle || story.verificationStatus) && <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold opacity-60"><span>{story.verificationStatus || "Source-aligned learning story"}</span>{story.sourceUrl && <a href={story.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline">{story.sourceTitle || "View source"}<ExternalLink size={12}/></a>}</div>}

        <fieldset className="mt-5 rounded-2xl border border-current/10 p-4"><legend className="px-1 font-black">{story.question.prompt}</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{story.question.options.map(option => <button key={option} aria-pressed={answer === option} onPointerDown={hapticPress} onClick={() => chooseAnswer(option)} className={`afri-press min-h-12 rounded-xl border px-3 py-2 font-black ${answer === option ? correct ? "border-[#24745B] bg-[#24745B]/15" : "border-[#C95D3A] bg-[#C95D3A]/15" : "border-current/10"}`}>{option}</button>)}</div>
          {answer && <div role="status" className={`mt-3 flex gap-2 rounded-xl p-3 text-sm font-semibold ${correct ? "bg-[#24745B]/15" : "bg-[#C95D3A]/15"}`}>{correct ? <CheckCircle2 className="shrink-0 text-[#53B98A]"/> : <XCircle className="shrink-0 text-[#C95D3A]"/>}<span>{correct ? story.question.explanation || "Story complete." : "Look back at the story and try another answer."}</span></div>}
          {correct && <div className="mt-3 flex items-center gap-2 font-black text-[#F28C28]"><Sparkles size={18}/>{completed.includes(story.id) ? "Story complete" : `+${story.xp || 15} XP`}</div>}
        </fieldset>
      </div>
    </article>

    {data.cultureNotes?.length > 0 && <section className="mt-8"><div className="text-xs font-black uppercase tracking-[.2em] text-[#C95D3A]">Culture shelf</div><h2 className="mt-1 text-2xl font-black">Context for the language</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{data.cultureNotes.map(note => <article key={note.id} className={`rounded-[1.6rem] border p-5 ${surface(dark)}`}><div className="flex items-start gap-3"><span className="text-3xl">{note.emoji}</span><div><div className="text-xs font-black uppercase tracking-wider text-[#24745B]">{note.category}</div><h3 className="mt-1 text-xl font-black">{note.title}</h3></div></div><p className="mt-3 text-sm leading-6 opacity-65">{note.text}</p>{note.sourceUrl && <a href={note.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-1 text-xs font-black text-[#F28C28]">{note.sourceTitle}<ExternalLink size={13}/></a>}</article>)}</div></section>}
  </div>;
}
