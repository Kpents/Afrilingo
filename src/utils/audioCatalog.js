function hash(value) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) result = Math.imul(result ^ value.charCodeAt(index), 16777619);
  return (result >>> 0).toString(36);
}

const clean = value => String(value || "").trim();

export function audioItemId(languageId, native, kind) {
  return `${languageId}-${kind}-${hash(`${native}|${kind}`)}`;
}

export function buildAudioCatalog(languages, exploreLibraries = {}, immersionLibraries = {}) {
  const records = [];
  const add = (language, kind, native, english, source, sourceId) => {
    native = clean(native); english = clean(english);
    if (!native) return;
    records.push({ id:audioItemId(language.id,native,kind), languageId:language.id, languageName:language.language, flag:language.flag, kind, native, english, source, sourceId });
  };
  Object.values(languages).forEach(language => {
    language.units.forEach(unit => unit.lessons.forEach(lesson => {
      (lesson.vocabulary || []).forEach(word => add(language,"word",word.native,word.english,`${unit.title} · ${lesson.title}`,lesson.id));
      (lesson.conversation || []).forEach((line,index) => add(language,"conversation",line.native,line.english,`${unit.title} · ${lesson.title}`,`${lesson.id}-conversation-${index}`));
    }));
    (exploreLibraries[language.id]?.entries || []).forEach(entry => {
      add(language,"example",entry.exampleNative,entry.exampleEnglish,`Explore · ${entry.theme}`,entry.id);
    });
    const immersion = immersionLibraries[language.id];
    (immersion?.conversations || []).forEach(scene => scene.turns.forEach((turn,index) => add(language,"scenario",turn.native,turn.english,`Immersion · ${scene.title}`,`${scene.id}-${index}`)));
    (immersion?.dailyPhrases || []).forEach(phrase => add(language,"phrase",phrase.native,phrase.english,"Immersion · Daily phrase",phrase.id));
  });
  const seen = new Set();
  return records.filter(item => {
    const key = `${item.languageId}|${item.kind}|${item.native}`.toLocaleLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function safeAudioFilename(item, mimeType = "audio/webm") {
  const extension = mimeType.includes("ogg") ? "ogg" : mimeType.includes("mp4") ? "m4a" : "webm";
  return `${item.id}.${extension}`;
}
