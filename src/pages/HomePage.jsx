import {
  Flame,
  Gift,
  LibraryBig,
  Sparkles,
  CheckCircle2
} from "lucide-react";

import LessonPath from "../components/LessonPath";
import CultureCard from "../components/CultureCard";
import GamificationPanel from "../components/gamification/GamificationPanel";
import LeboCoach from "../components/gamification/LeboCoach";
import { getFurthestUnlockedUnit, isUnitUnlocked as getUnitUnlocked } from "../utils/courseProgress";
import CourseSwitcher from "../components/navigation/CourseSwitcher";
import UnitNavigator from "../components/navigation/UnitNavigator";

export default function HomePage({
  dark,
  progress,
  language,
  activeLanguage,
  onLanguageChange,
  onStartLesson,
  activeUnit,
  onUnitChange,
  progressByLanguage,
  startedLanguageIds,
  languageId
  ,learnerName
}) {
  const units = language.units;
  const unit = units[activeUnit];

  const card = dark
    ? "border-white/10 bg-[#1A201E]"
    : "border-black/8 bg-white";

  // -------------------------------------------------------
  // CURRENT UNIT PROGRESS
  // -------------------------------------------------------

  const completedLessonsInUnit =
    unit.lessons.filter((lesson) =>
      progress.completedLessonIds.includes(
        lesson.id
      )
    ).length;

  const currentUnitCultureIds =
    unit.lessons.map(
      (lesson) =>
        lesson.cultureCard.id
    );

  const unlockedCultureCardsInUnit =
    progress.unlockedCultureCards.filter(
      (id) =>
        currentUnitCultureIds.includes(
          id
        )
    );

  const latestCultureCard =
    [...unit.lessons]
      .reverse()
      .find((lesson) =>
        progress.unlockedCultureCards.includes(
          lesson.cultureCard.id
        )
      )?.cultureCard;

  const totalUnitXp =
    unit.lessons.reduce(
      (total, lesson) =>
        total + lesson.xp,
      0
    );

  // -------------------------------------------------------
  // UNIT UNLOCK LOGIC
  // -------------------------------------------------------

  const isUnitUnlocked = (index) => {
    return getUnitUnlocked(units, index, progress.completedLessonIds);
  };

  // Is the NEXT unit unlocked?
  const nextUnitUnlocked =
    activeUnit < units.length - 1 &&
    isUnitUnlocked(
      activeUnit + 1
    );

  // Has the CURRENT unit been completed?
  const currentUnitComplete =
    completedLessonsInUnit ===
    unit.lessons.length;

  const recommendedUnitIndex = getFurthestUnlockedUnit(units, progress.completedLessonIds);
  const recommendedUnit = units[recommendedUnitIndex];
  const nextLesson = recommendedUnit.lessons.find((lesson, index) => {
    if (progress.completedLessonIds.includes(lesson.id)) return false;
    return index === 0 || progress.completedLessonIds.includes(recommendedUnit.lessons[index - 1].id);
  }) || recommendedUnit.lessons.at(-1);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

      {/* ================================================= */}
      {/* MAIN LEARNING AREA */}
      {/* ================================================= */}

      <section className="min-w-0">
        <CourseSwitcher
          dark={dark}
          activeLanguage={activeLanguage}
          startedLanguageIds={startedLanguageIds}
        progressByLanguage={progressByLanguage}
        learnerName={learnerName}
          onLanguageChange={onLanguageChange}
          onContinue={() => { onUnitChange(recommendedUnitIndex); onStartLesson(nextLesson); }}
        />

        {/* ================================================= */}
        {/* UNIT SELECTOR */}
        {/* ================================================= */}

        <UnitNavigator
          dark={dark}
          language={language}
          units={units}
          activeUnit={activeUnit}
          completedLessonIds={progress.completedLessonIds}
          isUnitUnlocked={isUnitUnlocked}
          onUnitChange={onUnitChange}
        />

        {/* ================================================= */}
        {/* UNIT HEADER */}
        {/* ================================================= */}

        <div
          className={`afri-pattern rounded-[2rem] border p-6 ${card}`}
        >

          <div className="text-xs font-black uppercase tracking-[0.28em] text-[#F28C28]">
            {language.flag}{" "}
            {language.language}
            {" • "}
            Unit{" "}
            {activeUnit + 1}
          </div>

          <h1 className="mt-2 text-4xl font-black">
            {unit.title}
          </h1>

          <p
            className={`mt-3 max-w-xl leading-7 ${
              dark
                ? "text-white/58"
                : "text-black/58"
            }`}
          >
            {unit.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">

            <span className="rounded-full bg-[#24745B]/15 px-3 py-1.5 text-xs font-black text-[#24745B]">
              {
                unit.lessons
                  .length
              }{" "}
              lessons
            </span>

            <span className="rounded-full bg-[#F6C445]/20 px-3 py-1.5 text-xs font-black text-[#A66A00]">
              {totalUnitXp} XP
              total
            </span>

            <span className="rounded-full bg-[#4338CA]/10 px-3 py-1.5 text-xs font-black text-[#7067FF]">
              {
                completedLessonsInUnit
              }
              /
              {
                unit.lessons
                  .length
              }{" "}
              complete
            </span>

            {language.sourceNotes && <span title={language.sourceNotes.varietyNote} className="rounded-full bg-[#F28C28]/12 px-3 py-1.5 text-xs font-black text-[#F28C28]">Text source-aligned · audio pending</span>}

          </div>

        </div>

        {/* ================================================= */}
        {/* LESSON PATH */}
        {/* ================================================= */}

        <LessonPath
          lessons={
            unit.lessons
          }
          progress={
            progress
          }
          dark={dark}
          onStart={
            onStartLesson
          }
          languageId={languageId}
        />

      </section>

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside className="min-w-0 space-y-4">

        <LeboCoach dark={dark} progress={progress} completedInUnit={completedLessonsInUnit} totalInUnit={unit.lessons.length} languageId={languageId} />

        <GamificationPanel dark={dark} progress={progress} />

        {/* STREAK */}

        <div
          className={`rounded-[1.75rem] border p-5 ${card}`}
        >

          <div className="flex items-center justify-between">

            <div>

              <div
                className={`text-sm font-black ${
                  dark
                    ? "text-white/45"
                    : "text-black/45"
                }`}
              >
                Current streak
              </div>

              <div className="mt-1 text-3xl font-black">
                {
                  progress.streak
                }{" "}
                days
              </div>

            </div>

            <Flame
              size={38}
              className="text-[#F28C28]"
              fill="currentColor"
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* UNIT REWARD */}
        {/* ================================================= */}

        <div className="rounded-[1.75rem] bg-[#24745B] p-5 text-white shadow-lg shadow-emerald-950/10">

          <Gift
            size={28}
            className="text-[#F6C445]"
          />

          <h3 className="mt-3 text-xl font-black">
            Unit reward
          </h3>

          <p className="mt-2 text-sm font-semibold text-white/70">

            {activeUnit <
            units.length - 1
              ? `Finish this unit to unlock ${units[activeUnit + 1].title}.`
              : `Finish this unit to complete all currently available ${language.language} lessons.`}

          </p>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">

            <div
              className="h-full rounded-full bg-[#F6C445] transition-all duration-500"
              style={{
                width: `${
                  (completedLessonsInUnit /
                    unit.lessons
                      .length) *
                  100
                }%`
              }}
            />

          </div>

          <div className="mt-2 text-xs font-bold text-white/55">

            {
              completedLessonsInUnit
            }{" "}
            of{" "}
            {
              unit.lessons
                .length
            }{" "}
            lessons

          </div>

        </div>

        {/* ================================================= */}
        {/* CULTURE COLLECTION */}
        {/* ================================================= */}

        <div
          className={`rounded-[1.75rem] border p-5 ${card}`}
        >

          <div className="flex items-center gap-2 text-[#F28C28]">

            <LibraryBig
              size={20}
            />

            <span className="text-xs font-black uppercase tracking-wider">
              Culture Collection
            </span>

          </div>

          <div className="mt-4 text-3xl font-black">

            {
              unlockedCultureCardsInUnit.length
            }
            /
            {
              unit.lessons
                .length
            }

          </div>

          <p
            className={`mt-2 text-sm ${
              dark
                ? "text-white/50"
                : "text-black/50"
            }`}
          >
            Culture cards
            collected in Unit{" "}
            {activeUnit + 1}.
          </p>

        </div>

        {/* LATEST CULTURE CARD */}

        {latestCultureCard && (
          <CultureCard
            card={
              latestCultureCard
            }
            dark={dark}
          />
        )}

        {/* ================================================= */}
        {/* UNIT COMPLETE */}
        {/* ================================================= */}

        {currentUnitComplete &&
          activeUnit <
            units.length - 1 &&
          nextUnitUnlocked && (

            <div
              className={`rounded-[1.75rem] border p-5 ${
                dark
                  ? "border-[#24745B]/30 bg-[#24745B]/10"
                  : "border-[#24745B]/20 bg-[#24745B]/10"
              }`}
            >

              <div className="flex items-center gap-2 text-[#53B98A]">

                <CheckCircle2
                  size={21}
                />

                <span className="text-xs font-black uppercase tracking-wider">
                  Unit Complete
                </span>

              </div>

              <h3 className="mt-3 text-xl font-black">
                {
                  unit.title
                }{" "}
                mastered!
              </h3>

              <p
                className={`mt-2 text-sm leading-6 ${
                  dark
                    ? "text-white/55"
                    : "text-black/55"
                }`}
              >
                {
                  units[
                    activeUnit +
                      1
                  ].title
                }{" "}
                is now unlocked.
              </p>

              <button
                onClick={() =>
                  onUnitChange(
                    activeUnit +
                      1
                  )
                }
                className="mt-4 w-full rounded-2xl bg-[#F28C28] px-4 py-3 font-black text-white transition hover:-translate-y-0.5"
              >
                Start Unit{" "}
                {activeUnit + 2} 🚀
              </button>

            </div>
          )}

        {/* ================================================= */}
        {/* COMING NEXT */}
        {/* ================================================= */}

        <div
          className={`rounded-[1.75rem] border p-5 ${card}`}
        >

          <div className="flex items-center gap-2 text-[#F6C445]">

            <Sparkles
              size={20}
            />

            <span className="text-xs font-black uppercase tracking-wider">
              Coming next
            </span>

          </div>

          <p
            className={`mt-3 text-sm leading-6 ${
              dark
                ? "text-white/50"
                : "text-black/50"
            }`}
          >

            {activeUnit <
            units.length - 1
              ? `Next: ${
                  units[
                    activeUnit +
                      1
                  ].title
                }.`
              : currentUnitComplete
              ? `You have completed all currently available ${language.language} units!`
              : `Complete this unit to finish the currently available ${language.language} course.`}

          </p>

        </div>

      </aside>

    </div>
  );
}
