import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Flame,
  Heart,
  Home,
  Compass,
  Dumbbell,
  LibraryBig,
  Moon,
  Sparkles,
  RotateCcw,
  Search,
  Settings,
  MoreHorizontal,
  Sun,
  User,
  Zap
} from "lucide-react";

import Lebo from "./components/ui/Lebo";

const HomePage = lazy(() => import("./pages/HomePage"));
const LessonPage = lazy(() => import("./pages/LessonPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const ImmersionPage = lazy(() => import("./pages/ImmersionPage"));
const IconGalleryPage = lazy(() => import("./pages/IconGalleryPage"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const PracticePage = lazy(() => import("./pages/PracticePage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const GlobalSearch = lazy(() => import("./components/navigation/GlobalSearch"));
import RewardEvent from "./components/gamification/RewardEvent";

import {
  languages
} from "./data/languages";
import useCourseProgress from "./hooks/useCourseProgress";
import { dateKey } from "./utils/dateKey";
import { getFurthestUnlockedUnit } from "./utils/courseProgress";
import { exploreLibraries } from "./data/explore";
import { immersionLibraries } from "./data/immersion";
import { achievements, getUnlockedAchievementIds } from "./data/achievements";
import useUserPreferences from "./hooks/useUserPreferences";
import useDialogFocus from "./hooks/useDialogFocus";
import useAppLifecycle from "./hooks/useAppLifecycle";
import AppStatus from "./components/system/AppStatus";

export default function App() {
  const lifecycle = useAppLifecycle();
  const { preferences, setPreferences } = useUserPreferences();
  const [rewardEvent, setRewardEvent] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreDialogRef = useRef(null);
  useDialogFocus(moreDialogRef, moreOpen, () => setMoreOpen(false));
  const [pendingSearchResult, setPendingSearchResult] = useState(null);
  const showReward = (event) => setRewardEvent({ ...event, id: `${Date.now()}-${Math.random()}` });
  const [dark, setDark] =
    useState(true);

  const [screen, setScreen] =
    useState("home");

  const [
    activeLesson,
    setActiveLesson
  ] = useState(null);

  const [
    activeUnit,
    setActiveUnit
  ] = useState(0);

  const [
    activeLanguage,
    setActiveLanguage
  ] = useState(() => languages[preferences.languageId] ? preferences.languageId : "twi");

  /*
    Current language object
  */
  const currentLanguage =
    languages[
      activeLanguage
    ];

  /*
    Language-specific
    localStorage key

    Twi:
    afrilingo:twi

    Ga:
    afrilingo:ga
  */
  const { progress, setProgress, progressByLanguage } = useCourseProgress(activeLanguage);

  const selectLanguage = useCallback((languageId) => {
    if (!languages[languageId]) return;
    setPreferences(previous => ({
      ...previous,
      languageId,
      startedLanguageIds: [...new Set([...(previous.startedLanguageIds || []), languageId])]
    }));
    setActiveLanguage(languageId);
  }, [setPreferences]);

  useEffect(() => {
    const earnedIds = getUnlockedAchievementIds(progressByLanguage);
    const persistedIds = new Set(Object.values(progressByLanguage).flatMap(item => item.unlockedAchievementIds || []));
    const newIds = earnedIds.filter(id => !persistedIds.has(id));
    if (!newIds.length) return;
    setProgress(p => ({ ...p, unlockedAchievementIds: [...new Set([...(p.unlockedAchievementIds || []), ...newIds])] }));
    const first = achievements.find(item => item.id === newIds[0]);
    showReward({ kind: "milestone", eyebrow: newIds.length > 1 ? `${newIds.length} achievements unlocked` : "Achievement unlocked", title: `${first.emoji} ${first.title}`, message: first.description });
  }, [progressByLanguage, activeLanguage, setProgress]);

  /*
    =====================================================
    LOAD PROGRESS WHEN LANGUAGE CHANGES
    =====================================================
  */

  useEffect(() => {
    document.documentElement.dataset.afriLanguage = activeLanguage;
    try {
      const saved = progressByLanguage[activeLanguage];
      const units = languages[activeLanguage].units;
      setActiveUnit(getFurthestUnlockedUnit(units, saved.completedLessonIds));

      setActiveLesson(
        null
      );

      if (pendingSearchResult?.languageId === activeLanguage) {
        const targetScreen = pendingSearchResult.type === "culture" ? "collection" : pendingSearchResult.type === "vocabulary" ? "explore" : pendingSearchResult.type === "immersion" ? "immersion" : pendingSearchResult.type === "review" ? "review" : "lesson";
        if (pendingSearchResult.unitIndex != null) setActiveUnit(pendingSearchResult.unitIndex);
        setActiveLesson(pendingSearchResult.type === "lesson" ? pendingSearchResult.lesson : null);
        setScreen(targetScreen);
        setPendingSearchResult(null);
      } else {
        setScreen("home");
      }
    } catch {}
  }, [activeLanguage]);

  useEffect(() => {
    const openSearch = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "k") { event.preventDefault(); setSearchOpen(true); }
      if (event.key === "Escape") { setSearchOpen(false); setMoreOpen(false); }
    };
    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, []);

  const openSearchResult = (result) => {
    setSearchOpen(false);
    if (result.languageId !== activeLanguage) {
      setPendingSearchResult(result);
      selectLanguage(result.languageId);
      return;
    }
    if (result.unitIndex != null) setActiveUnit(result.unitIndex);
    setActiveLesson(result.type === "lesson" ? result.lesson : null);
    setScreen(result.type === "culture" ? "collection" : result.type === "vocabulary" ? "explore" : result.type === "immersion" ? "immersion" : result.type === "review" ? "review" : "lesson");
  };

  /*
    =====================================================
    ENTER LESSON
    =====================================================
  */

  const enterLesson = (
    lesson
  ) => {
    setActiveLesson(
      lesson
    );

    setScreen(
      "lesson"
    );
  };

  /*
    =====================================================
    COMPLETE LESSON
    =====================================================
  */

  const completeLesson = ({
    xp,
    cultureCardId
  }) => {
    const completedLessonId =
      activeLesson.id;
    const today = dateKey();
    const dailyCompleted = progress.daily?.date === today ? progress.daily.completed + 1 : 1;
    const earnsDailyBonus = dailyCompleted >= preferences.dailyTarget && !(progress.daily?.date === today && progress.daily.claimed);

    setProgress((p) => {
      const today = dateKey();
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = dateKey(yesterdayDate);
      const dailyCompleted = p.daily?.date === today ? p.daily.completed + 1 : 1;
      const earnsDailyBonus = dailyCompleted >= preferences.dailyTarget && !(p.daily?.date === today && p.daily.claimed);
      const nextStreak = p.lastStudyDate === today ? p.streak : p.lastStudyDate === yesterday ? p.streak + 1 : 1;
      return {
      ...p,

      /*
        XP
      */
      xp:
        p.xp + xp + (earnsDailyBonus ? 30 : 0),

      streak: nextStreak,
      lastStudyDate: today,
      daily: { date: today, completed: dailyCompleted, claimed: earnsDailyBonus || (p.daily?.date === today && p.daily.claimed) },

      /*
        Lesson completion
      */
      completedLessonIds:
        p.completedLessonIds.includes(
          completedLessonId
        )
          ? p.completedLessonIds
          : [
              ...p.completedLessonIds,
              completedLessonId
            ],

      /*
        Culture card
      */
      unlockedCultureCards:
        p.unlockedCultureCards.includes(
          cultureCardId
        )
          ? p.unlockedCultureCards
          : [
              ...p.unlockedCultureCards,
              cultureCardId
            ]
    }});

    /*
      ===================================================
      AUTOMATIC UNIT ADVANCEMENT

      This is now language-neutral.

      Instead of checking:
      greetings-challenge
      numbers-challenge
      etc...

      We check whether the completed
      lesson was the FINAL lesson in
      the current unit.
      ===================================================
    */

    const currentUnit =
      currentLanguage.units[
        activeUnit
      ];

    const finalLesson =
      currentUnit.lessons[
        currentUnit.lessons.length -
          1
      ];

    const completedFinalLesson =
      completedLessonId ===
      finalLesson.id;

    const anotherUnitExists =
      activeUnit <
      currentLanguage.units
        .length -
        1;

    if (
      completedFinalLesson &&
      anotherUnitExists
    ) {
      setActiveUnit(
        activeUnit + 1
      );
    }

    if (completedFinalLesson) showReward({ kind: "milestone", eyebrow: anotherUnitExists ? "New unit unlocked" : "Course milestone", title: anotherUnitExists ? currentLanguage.units[activeUnit + 1].title : `${currentLanguage.language} path complete!`, message: earnsDailyBonus ? `Plus ${xp + 30} XP and today’s challenge bonus.` : `Lebo is proud of you · +${xp} XP` });
    else if (earnsDailyBonus) showReward({ kind: "milestone", eyebrow: "Daily challenge complete", title: "+30 bonus XP", message: `${preferences.dailyTarget} activities today—beautiful consistency!` });
    else showReward({ kind: "xp", label: `+${xp} XP` });

    setActiveLesson(
      null
    );

    setScreen(
      "home"
    );
  };

  const loseHeart = () => {
    showReward({ kind: "heart-loss", label: "−1 heart · keep going" });
    setProgress((p) => ({ ...p, hearts: Math.max(0, p.hearts - 1), heartUpdatedAt: p.hearts >= 5 || !p.heartUpdatedAt ? Date.now() : p.heartUpdatedAt }));
  };

  const completeExploreSession = ({ categoryKey, masteredEntryIds, xp }) => {
    showReward({ kind: "xp", label: `+${xp} Explore XP` });
    setProgress((p) => {
      const existing = p.explore || { masteredEntryIds: [], completedCategoryLevels: [] };
      return {
        ...p,
        xp: p.xp + xp,
        explore: {
          masteredEntryIds: [...new Set([...existing.masteredEntryIds, ...masteredEntryIds])],
          completedCategoryLevels: [...new Set([...existing.completedCategoryLevels, categoryKey])]
        }
      };
    });
  };

  const addToReview = (question, source = {}) => {
    const reviewKey = `${source.id || "practice"}:${question.id}`;
    setProgress((p) => {
      const queue = p.reviewQueue || [];
      const existing = queue.find((item) => item.reviewKey === reviewKey);
      const nextItem = {
        reviewKey,
        question: { ...question, retry: false },
        sourceId: source.id || "practice",
        sourceTitle: source.title || "Practice",
        misses: (existing?.misses || 0) + 1,
        lastMissedAt: Date.now()
      };
      return { ...p, reviewQueue: existing ? queue.map((item) => item.reviewKey === reviewKey ? nextItem : item) : [...queue, nextItem] };
    });
  };

  const completeReview = ({ resolvedKeys, xp }) => {
    showReward({ kind: "xp", label: `+${xp} Review XP` });
    setProgress((p) => ({ ...p, xp: p.xp + xp, reviewResolved: (p.reviewResolved || 0) + resolvedKeys.length, reviewQueue: (p.reviewQueue || []).filter((item) => !resolvedKeys.includes(item.reviewKey)) }));
  };

  const completePractice = ({ mode, xp, correct, total }) => {
    const today = dateKey();
    const dailyCompleted = progress.daily?.date === today ? progress.daily.completed + 1 : 1;
    const earnsDailyBonus = dailyCompleted >= preferences.dailyTarget && !(progress.daily?.date === today && progress.daily.claimed);
    setProgress((p) => {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = dateKey(yesterdayDate);
      const count = p.daily?.date === today ? p.daily.completed + 1 : 1;
      const bonus = count >= preferences.dailyTarget && !(p.daily?.date === today && p.daily.claimed);
      const nextStreak = p.lastStudyDate === today ? p.streak : p.lastStudyDate === yesterday ? p.streak + 1 : 1;
      const previousPractice = p.practice?.date === today ? p.practice : { date: today, sessions: 0, xp: 0, lastMode: null };
      return { ...p, xp: p.xp + xp + (bonus ? 30 : 0), streak: nextStreak, lastStudyDate: today, daily: { date: today, completed: count, claimed: bonus || (p.daily?.date === today && p.daily.claimed) }, practice: { date: today, sessions: previousPractice.sessions + 1, xp: previousPractice.xp + xp, lastMode: mode } };
    });
    showReward(earnsDailyBonus ? { kind: "milestone", eyebrow: "Daily goal complete", title: `+${xp + 30} XP`, message: `${correct}/${total} correct · includes 30 bonus XP` } : { kind: "xp", label: `+${xp} Practice XP` });
  };

  const updateImmersion = ({ field, id, xp }) => {
    const alreadyRecorded = (progress.immersion?.[field] || []).includes(id);
    if (!alreadyRecorded && xp > 0) showReward({ kind: "xp", label: `+${xp} Immersion XP` });
    setProgress((p) => {
      const existing = p.immersion || {};
      const values = existing[field] || [];
      const alreadyRecorded = values.includes(id);
      return {
        ...p,
        xp: p.xp + (alreadyRecorded ? 0 : xp),
        immersion: { ...existing, [field]: alreadyRecorded ? values : [...values, id] }
      };
    });
  };

  /*
    =====================================================
    NAVIGATION
    =====================================================
  */

  const tabs = [
    {
      id: "home",
      label: "Learn",
      icon: Home
    },
    ...(exploreLibraries[activeLanguage] ? [{ id: "explore", label: "Explore", icon: Compass }] : []),
    ...(immersionLibraries[activeLanguage] ? [{ id: "immersion", label: "Immerse", icon: Sparkles }] : []),
    { id: "practice", label: "Practice", icon: Dumbbell },
    { id: "review", label: "Review", icon: RotateCcw },
    {
      id: "collection",
      label: "Culture",
      icon: LibraryBig
    },
    {
      id: "profile",
      label: "Profile",
      icon: User
    },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  if (window.location.pathname === "/dev/icons") {
    return <Suspense fallback={<PageLoader dark={dark} languageId={activeLanguage} />}><IconGalleryPage dark={dark} /></Suspense>;
  }

  if (!preferences.onboarded) {
    return <Suspense fallback={<PageLoader dark={dark} languageId={activeLanguage} />}><OnboardingPage dark={dark} initial={preferences} onComplete={next => { const completed = { ...next, startedLanguageIds: [next.languageId] }; setPreferences(completed); setActiveLanguage(next.languageId); setScreen("home"); }} /></Suspense>;
  }

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        dark
          ? "bg-[#101312] text-[#F8F4EA]"
          : "bg-[#FFF8EE] text-[#252525]"
      }`}
    >
      <RewardEvent event={rewardEvent} dark={dark} languageId={activeLanguage} onDone={() => setRewardEvent(null)} />
      <AppStatus dark={dark} lifecycle={lifecycle} />

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#F28C28]/10 blur-3xl" />

        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#24745B]/10 blur-3xl" />

      </div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
          dark
            ? "border-white/8 bg-[#101312]/90"
            : "border-black/8 bg-[#FFF8EE]/90"
        }`}
      >

        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">

          {/* Logo */}

          <button
            onClick={() => {
              setScreen(
                "home"
              );

              setActiveLesson(
                null
              );
            }}
            className="flex items-center gap-3"
          >

            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F28C28] text-xl font-black text-white shadow-lg shadow-orange-500/20">
              A
            </div>

            <div className="text-left">

              <div className="text-xl font-black leading-none">
                AfriLingo
              </div>

              <div className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-[#F28C28]">

                {
                  currentLanguage.flag
                }{" "}

                {
                  currentLanguage.language
                }

                {" • "}

                {screen === "explore" ? "Explore Library" : screen === "immersion" ? `${currentLanguage.language} Immersion` : screen === "practice" ? "Daily Practice" : screen === "review" ? "Review Hub" : screen === "settings" ? "Settings & Help" : <>Unit {activeUnit + 1}</>}

              </div>

            </div>

          </button>

          {/* ================================================= */}
          {/* PLAYER STATS */}
          {/* ================================================= */}

          <div className="flex items-center gap-2">

            <button onClick={() => setSearchOpen(true)} className={`grid h-11 w-11 place-items-center rounded-xl border transition ${dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white hover:bg-black/5"}`} aria-label="Search AfriLingo" title="Search · Ctrl K"><Search size={18}/></button>

            <Status
              icon={
                <Flame
                  size={
                    17
                  }
                />
              }
              value={
                progress.streak
              }
              dark={
                dark
              }
              color="text-[#F6C445]"
            />

            <Status
              icon={
                <Heart
                  size={
                    17
                  }
                />
              }
              value={
                progress.hearts
              }
              dark={
                dark
              }
              color="text-[#EF5B5B]"
            />

            <Status
              icon={
                <Zap
                  size={
                    17
                  }
                />
              }
              value={
                progress.xp
              }
              dark={
                dark
              }
              color="text-[#24745B]"
              hideMobile
            />

            {/* Theme toggle */}

            <button
              onClick={() =>
                setDark(
                  (v) =>
                    !v
                )
              }
              className={`grid h-11 w-11 place-items-center rounded-xl border transition ${
                dark
                  ? "border-white/10 bg-white/5 hover:bg-white/10"
                  : "border-black/10 bg-white hover:bg-black/5"
              }`}
              aria-label="Toggle dark mode"
            >

              {dark ? (
                <Sun
                  size={
                    18
                  }
                />
              ) : (
                <Moon
                  size={
                    18
                  }
                />
              )}

            </button>

          </div>

        </div>

      </header>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="relative mx-auto max-w-5xl px-4 pb-28 pt-6">

        <AnimatePresence mode="wait">

          <motion.div
            key={`${screen}-${
              activeLesson?.id ||
              ""
            }-${activeUnit}-${activeLanguage}`}
            initial={{
              opacity:
                0,
              y:
                10
            }}
            animate={{
              opacity:
                1,
              y:
                0
            }}
            exit={{
              opacity:
                0,
              y:
                -8
            }}
            transition={{
              duration:
                0.2
            }}
          >

            <Suspense fallback={<PageLoader dark={dark} languageId={activeLanguage} />}>

            {/* ================================================= */}
            {/* HOME / LEARN */}
            {/* ================================================= */}

            {screen ===
              "home" && (

              <HomePage
                dark={
                  dark
                }

                progress={
                  progress
                }

                /*
                  Current language
                  course data
                */
                language={
                  currentLanguage
                }

                /*
                  Current selected
                  language
                */
                activeLanguage={
                  activeLanguage
                }

                /*
                  Enables Twi →
                  Ga switching
                */
                onLanguageChange={selectLanguage}

                activeUnit={
                  activeUnit
                }
                progressByLanguage={progressByLanguage}
                startedLanguageIds={preferences.startedLanguageIds}
                languageId={activeLanguage}
                learnerName={preferences.name}

                onUnitChange={
                  setActiveUnit
                }

                onStartLesson={
                  enterLesson
                }
              />

            )}

            {/* ================================================= */}
            {/* LESSON */}
            {/* ================================================= */}

            {screen ===
              "lesson" &&
              activeLesson && (

                <LessonPage
                  lesson={
                    activeLesson
                  }

                  dark={
                    dark
                  }

                  hearts={
                    progress.hearts
                  }
                  languageId={activeLanguage}

                  isFirstLesson={progress.completedLessonIds.length === 0}

                  isUnitChallenge={
                    currentLanguage.units[activeUnit].lessons.at(-1).id === activeLesson.id &&
                    !progress.completedLessonIds.includes(activeLesson.id)
                  }

                  onExit={() => {

                    setActiveLesson(
                      null
                    );

                    setScreen(
                      "home"
                    );

                  }}

                  onLoseHeart={loseHeart}
                  onReviewQuestion={(question) => addToReview(question, { id: activeLesson.id, title: activeLesson.title })}

                  onRefillHearts={() => { showReward({ kind: "heart-gain", label: "+1 heart recovered" }); setProgress(p => ({ ...p, hearts: Math.min(5, p.hearts + 1), heartUpdatedAt: Date.now() })); }}

                  onComplete={
                    completeLesson
                  }
                />

              )}

            {/* ================================================= */}
            {/* CULTURE COLLECTION */}
            {/* ================================================= */}

            {screen ===
              "collection" && (

              <CollectionPage
                dark={
                  dark
                }

                progress={
                  progress
                }

                language={
                  currentLanguage
                }
                progressByLanguage={progressByLanguage}

                activeLanguage={
                  activeLanguage
                }

                activeUnit={
                  activeUnit
                }
              />

            )}

            {screen === "explore" && exploreLibraries[activeLanguage] && (
              <ExplorePage
                dark={dark}
                library={exploreLibraries[activeLanguage]}
                progress={progress}
                onLoseHeart={loseHeart}
                onReviewQuestion={(question, source) => addToReview(question, source)}
                onComplete={completeExploreSession}
              />
            )}

            {screen === "review" && (
              <ReviewPage dark={dark} progress={progress} language={currentLanguage} onLoseHeart={loseHeart} onComplete={completeReview} />
            )}

            {screen === "practice" && (
              <PracticePage dark={dark} language={currentLanguage} progress={progress} library={exploreLibraries[activeLanguage]} dailyTarget={preferences.dailyTarget} onLoseHeart={loseHeart} onReviewQuestion={addToReview} onComplete={completePractice} />
            )}

            {screen === "immersion" && immersionLibraries[activeLanguage] && (
              <ImmersionPage
                dark={dark}
                data={immersionLibraries[activeLanguage]}
                progress={progress}
                onReward={updateImmersion}
              />
            )}

            {/* ================================================= */}
            {/* PROFILE */}
            {/* ================================================= */}

            {screen ===
              "profile" && (

              <ProfilePage
                dark={
                  dark
                }

                progress={
                  progress
                }

                progressByLanguage={progressByLanguage}

                language={
                  currentLanguage
                }
                preferences={preferences}
                onPreferencesChange={setPreferences}
              />

            )}

            {screen === "settings" && <SettingsPage dark={dark} language={currentLanguage} />}

            </Suspense>

          </motion.div>

        </AnimatePresence>

      </main>

      {/* ================================================= */}
      {/* MOBILE NAVIGATION */}
      {/* ================================================= */}

      {screen !==
        "lesson" && (

        <nav
          className={`fixed bottom-3 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-[1.6rem] border p-2 shadow-2xl backdrop-blur-xl ${
            dark
              ? "border-white/10 bg-[#1A201E]/95"
              : "border-black/10 bg-white/95"
          }`}
        >

          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${tabs.length > 5 ? 5 : tabs.length}, minmax(0, 1fr))` }}>

            {(tabs.length > 5 ? [...tabs.slice(0, 4), { id: "more", label: "More", icon: MoreHorizontal }] : tabs).map(
              (
                tab
              ) => {

                const Icon =
                  tab.icon;

                const active =
                  screen ===
                  tab.id;

                return (

                  <button
                    key={
                      tab.id
                    }

                    onClick={() => tab.id === "more" ? setMoreOpen(true) : setScreen(tab.id)}
                    aria-current={active ? "page" : undefined}

                    className={`flex flex-col items-center gap-1 rounded-2xl py-2.5 text-xs font-extrabold transition ${
                      active
                        ? "bg-[#F28C28] text-white shadow-lg shadow-orange-500/15"
                        : dark
                        ? "text-white/50 hover:bg-white/5 hover:text-white"
                        : "text-black/45 hover:bg-black/5 hover:text-black"
                    }`}
                  >

                    <Icon
                      size={
                        20
                      }
                      strokeWidth={
                        2.5
                      }
                    />

                    {
                      tab.label
                    }

                  </button>

                );
              }
            )}

          </div>

        </nav>

      )}

      <AnimatePresence>
        {searchOpen && <Suspense fallback={null}><GlobalSearch dark={dark} progressByLanguage={progressByLanguage} onClose={() => setSearchOpen(false)} onSelect={openSearchResult} /></Suspense>}
      </AnimatePresence>

      <AnimatePresence>
        {moreOpen && <motion.div className="fixed inset-0 z-[85] flex items-end bg-black/55 p-3 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setMoreOpen(false)}><motion.div ref={moreDialogRef} role="dialog" aria-modal="true" aria-label="More AfriLingo navigation" initial={{y:30}} animate={{y:0}} exit={{y:30}} onClick={event => event.stopPropagation()} className={`mx-auto w-full max-w-md rounded-[1.7rem] border p-3 shadow-2xl ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/10 bg-white"}`}><div className="px-3 py-2 text-xs font-black uppercase tracking-[.2em] opacity-40">More AfriLingo</div>{tabs.slice(4).map(tab => { const Icon=tab.icon; return <button key={tab.id} onClick={() => { setScreen(tab.id); setMoreOpen(false); }} className={`flex min-h-14 w-full items-center gap-3 rounded-2xl px-4 font-black ${screen === tab.id ? "bg-[#F28C28] text-white" : dark ? "hover:bg-white/6" : "hover:bg-black/5"}`}><Icon size={21}/>{tab.label}</button>; })}</motion.div></motion.div>}
      </AnimatePresence>

    </div>
  );
}

function PageLoader({ dark, languageId }) {
  return <div className="grid min-h-[58vh] place-items-center" role="status" aria-live="polite"><div className="text-center"><Lebo pose="learn" reaction="learn" languageId={languageId} className="mx-auto h-32 w-32" decorative /><div className="mt-3 text-sm font-black uppercase tracking-[.2em] text-[#F28C28]">Lebo is getting things ready</div><div className={`mx-auto mt-3 h-2 w-40 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><motion.div className="h-full w-1/2 rounded-full bg-[#F6C445]" animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }} /></div></div></div>;
}

/*
  =========================================================
  HEADER STATUS COMPONENT
  =========================================================
*/

function Status({
  icon,
  value,
  dark,
  color,
  hideMobile = false
}) {
  return (

    <div
      className={`${
        hideMobile
          ? "hidden sm:flex"
          : "flex"
      } items-center gap-1.5 rounded-xl border px-2.5 py-2 text-sm font-black ${
        dark
          ? "border-white/10 bg-white/5"
          : "border-black/10 bg-white"
      }`}
    >

      <span
        className={
          color
        }
      >
        {icon}
      </span>

      <motion.span key={value} initial={{ scale: 1.45 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 16 }}>
        {value}
      </motion.span>

    </div>

  );
}
