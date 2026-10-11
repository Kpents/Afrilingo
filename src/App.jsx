import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Flame,
  CheckCircle2,
  ChevronDown,
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
import BottomSheet from "./components/ui/BottomSheet";

const HomePage = lazy(() => import("./pages/HomePage"));
const LessonPage = lazy(() => import("./pages/LessonPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const ImmersionPage = lazy(() => import("./pages/ImmersionPage"));
const IconGalleryPage = lazy(() => import("./pages/IconGalleryPage"));
const LeboRigPreview = lazy(() => import("./pages/LeboRigPreview"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const PracticePage = lazy(() => import("./pages/PracticePage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const CourseOnboardingPage = lazy(() => import("./pages/CourseOnboardingPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AudioStudioPage = lazy(() => import("./pages/AudioStudioPage"));
const GlobalSearch = lazy(() => import("./components/navigation/GlobalSearch"));
import RewardEvent from "./components/gamification/RewardEvent";

import {
  languages,
  languageList
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
import { recordReviewStreak, recordWeeklyActivity } from "./utils/learningGoals";
import { applyReviewOutcomes, recordReviewMiss, reviewKeyFor } from "./utils/reviewScheduler";
import { skillForQuestion, updateLearnerMastery } from "./utils/learnerMastery";
import { createAttempt, recordAttempt } from "./utils/learningTelemetry";
import { completeDailyPlanStep } from "./utils/dailyPlan";

export default function App() {
  const lifecycle = useAppLifecycle();
  const { preferences, setPreferences } = useUserPreferences();
  const [rewardEvent, setRewardEvent] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const moreDialogRef = useRef(null);
  const mainRef = useRef(null);
  useDialogFocus(moreDialogRef, moreOpen, () => setMoreOpen(false));
  const [pendingSearchResult, setPendingSearchResult] = useState(null);
  const [pendingCourseId, setPendingCourseId] = useState(null);
  const showReward = (event) => setRewardEvent({ ...event, id: `${Date.now()}-${Math.random()}` });
  const [dark, setDark] =
    useState(() => preferences.darkMode !== false);

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

  const toggleTheme = useCallback(() => {
    setDark(previous => {
      const next = !previous;
      setPreferences(current => ({ ...current, darkMode: next }));
      return next;
    });
  }, [setPreferences]);

  useEffect(() => {
    const screenName = screen === "home" ? "Learn" : screen.charAt(0).toUpperCase() + screen.slice(1);
    document.title = `${screenName} ${currentLanguage.language} · AfriLingo`;
  }, [screen, currentLanguage.language]);

  useEffect(() => {
    if (screen !== "lesson") mainRef.current?.focus({ preventScroll: true });
  }, [screen]);

  /*
    Language-specific
    localStorage key

    Twi:
    afrilingo:twi

    Ga:
    afrilingo:ga
  */
  const { progress, setProgress, setLanguageProgress, progressByLanguage } = useCourseProgress(activeLanguage);

  const selectLanguage = useCallback((languageId) => {
    if (!languages[languageId]) return;
    if (!(preferences.startedLanguageIds || []).includes(languageId)) {
      setPendingCourseId(languageId);
      return;
    }
    setPreferences(previous => ({
      ...previous,
      languageId
    }));
    setActiveLanguage(languageId);
  }, [preferences.startedLanguageIds, setPreferences]);

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
      setActiveUnit(getFurthestUnlockedUnit(units, saved.completedLessonIds, saved.placement?.unitIndex || 0));

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
      if (event.key === "Escape") { setSearchOpen(false); setMoreOpen(false); setMobileCoursesOpen(false); }
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
    cultureCardId,
    skillEvidence = [],
    checkpoint = false
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
      const updatedMastery = updateLearnerMastery(p.mastery, skillEvidence);
      const mastery = checkpoint ? { ...updatedMastery, checkpoints: [...(updatedMastery.checkpoints || []).filter(item => item.unitId !== currentLanguage.units[activeUnit].id), { unitId: currentLanguage.units[activeUnit].id, completedAt: new Date().toISOString(), skills: updatedMastery.skills }] } : updatedMastery;
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
      weekly: recordWeeklyActivity(p, { xp }),
      mastery,

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

  const completeExploreSession = ({ categoryKey, categoryEntryIds = [], masteredEntryIds, xp }) => {
    showReward({ kind: "xp", label: `+${xp} Explore XP` });
    setProgress((p) => {
      const existing = p.explore || { masteredEntryIds: [], completedCategoryLevels: [] };
      const nextMastery = [...new Set([...existing.masteredEntryIds, ...masteredEntryIds])];
      const completedLevel = categoryEntryIds.length > 0 && categoryEntryIds.every(id => nextMastery.includes(id));
      return {
        ...p,
        xp: p.xp + xp,
        weekly: recordWeeklyActivity(p, { xp }),
        explore: {
          masteredEntryIds: nextMastery,
          completedCategoryLevels: completedLevel ? [...new Set([...existing.completedCategoryLevels, categoryKey])] : existing.completedCategoryLevels
        },
        dailyPlan: completeDailyPlanStep(p, "vocabulary")
      };
    });
  };

  const addToReview = (question, source = {}) => {
    setProgress((p) => ({ ...p, reviewQueue: recordReviewMiss(p.reviewQueue, question, source) }));
  };

  const recordLearningAttempt = (details) => {
    const attempt = createAttempt(details);
    setProgress((p) => ({ ...p, learning: recordAttempt(p.learning, attempt) }));
  };

  const strengthenReviewQuestion = (question, source = {}) => {
    const reviewKey = reviewKeyFor(question, source);
    setProgress((p) => ({ ...p, reviewQueue: applyReviewOutcomes(p.reviewQueue, [{ reviewKey, correct: true }]) }));
  };

  const completeReview = ({ outcomes, xp }) => {
    const strengthened = outcomes.filter((outcome) => outcome.correct).length;
    showReward({ kind: "xp", label: `+${xp} Review XP` });
    setProgress((p) => {
      const evidence = outcomes.map(outcome => ({ skill: skillForQuestion((p.reviewQueue || []).find(item => item.reviewKey === outcome.reviewKey)?.question), correct: outcome.correct ? 1 : 0, attempts: 1 }));
      return { ...p, xp: p.xp + xp, weekly: recordWeeklyActivity(p, { xp, review: true }), reviewStreak: recordReviewStreak(p), reviewResolved: (p.reviewResolved || 0) + strengthened, reviewQueue: applyReviewOutcomes(p.reviewQueue, outcomes), mastery: updateLearnerMastery(p.mastery, evidence), dailyPlan: completeDailyPlanStep(p, "review") };
    });
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
      const practiceSkill = mode.startsWith("topic:") || mode === "vocabulary" ? "vocabulary" : mode === "listening" ? "listening" : mode === "speaking" ? "speaking" : mode === "sentences" ? "sentences" : mode === "matching" ? "matching" : mode === "visual" ? "visual" : "vocabulary";
      return { ...p, xp: p.xp + xp + (bonus ? 30 : 0), weekly: recordWeeklyActivity(p, { xp }), streak: nextStreak, lastStudyDate: today, daily: { date: today, completed: count, claimed: bonus || (p.daily?.date === today && p.daily.claimed) }, practice: { date: today, sessions: previousPractice.sessions + 1, xp: previousPractice.xp + xp, lastMode: mode }, mastery: updateLearnerMastery(p.mastery, [{ skill: practiceSkill, correct, attempts: total }]), dailyPlan: completeDailyPlanStep(p, "skill") };
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
      const rewardCardId = activeLanguage === "twi" && field === "completedAdventures"
        ? "twi-adventure-path"
        : activeLanguage === "twi" && field === "completedStories" ? "twi-story-keeper" : null;
      const worldCards = existing.unlockedWorldCultureCards || [];
      return {
        ...p,
        xp: p.xp + (alreadyRecorded ? 0 : xp),
        weekly: alreadyRecorded || !(xp > 0) ? p.weekly : recordWeeklyActivity(p, { xp }),
        immersion: { ...existing, [field]: alreadyRecorded ? values : [...values, id], unlockedWorldCultureCards: rewardCardId && !alreadyRecorded ? [...new Set([...worldCards, rewardCardId])] : worldCards },
        dailyPlan: xp > 0 ? completeDailyPlanStep(p, "immersion") : p.dailyPlan
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
  if (new URLSearchParams(window.location.search).get("preview") === "lebo-rig") {
    return <Suspense fallback={<PageLoader dark={dark} languageId={activeLanguage} />}><LeboRigPreview /></Suspense>;
  }

  if (!preferences.onboarded) {
    return <Suspense fallback={<PageLoader dark={dark} languageId={activeLanguage} />}><OnboardingPage dark={dark} initial={preferences} onComplete={next => {
      const completed = { ...next, startedLanguageIds: [next.languageId] };
      const course = languages[next.languageId];
      if (course) setLanguageProgress(next.languageId, previous => ({ ...previous, placement:next.placement || null, onboarding:{ motivations:next.motivations || [], familiarity:next.familiarity || "new", completedAt:new Date().toISOString() } }));
      if (next.placement?.unitIndex > 0) setActiveUnit(next.placement.unitIndex);
      setPreferences(completed);
      setActiveLanguage(next.languageId);
      setScreen("home");
    }} /></Suspense>;
  }

  if (pendingCourseId && languages[pendingCourseId]) {
    return <Suspense fallback={<PageLoader dark={dark} languageId={pendingCourseId} />}><CourseOnboardingPage dark={dark} course={languages[pendingCourseId]} onCancel={() => { setPendingCourseId(null); setPendingSearchResult(null); }} onComplete={profile => {
      const languageId = pendingCourseId;
      setLanguageProgress(languageId, previous => ({ ...previous, placement:profile.placement, onboarding:{ motivations:profile.motivations, familiarity:profile.familiarity, completedAt:profile.completedAt } }));
      setPreferences(previous => ({ ...previous, languageId, startedLanguageIds:[...new Set([...(previous.startedLanguageIds || []), languageId])] }));
      setPendingCourseId(null);
      setActiveLanguage(languageId);
      setActiveUnit(profile.placement?.unitIndex || 0);
      setScreen("home");
    }} /></Suspense>;
  }

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        dark
          ? "bg-[#101312] text-[#F8F4EA]"
          : "bg-[#FFF8EE] text-[#252525]"
      }`}
    >
      <a href="#main-content" className="afri-skip-link">Skip to learning content</a>
      <RewardEvent event={rewardEvent} dark={dark} languageId={activeLanguage} soundEnabled={preferences.soundEnabled !== false} onDone={() => setRewardEvent(null)} />
      <AppStatus dark={dark} lifecycle={lifecycle} />

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#F28C28]/10 blur-3xl" />

        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#24745B]/10 blur-3xl" />

      </div>

      {screen !== "lesson" && (
        <DesktopSidebar
          dark={dark}
          tabs={tabs}
          screen={screen}
          onNavigate={setScreen}
          currentLanguage={currentLanguage}
          activeLanguage={activeLanguage}
          startedLanguageIds={preferences.startedLanguageIds || []}
          progressByLanguage={progressByLanguage}
          onLanguageChange={selectLanguage}
          onSearch={() => setSearchOpen(true)}
        />
      )}

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      {screen !== "lesson" && <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
          dark
            ? "border-white/8 bg-[#101312]/90"
            : "border-black/8 bg-[#FFF8EE]/90"
        } lg:ml-64`}
      >

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4 lg:px-6">

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
            className="hidden min-w-0 items-center gap-2 sm:flex sm:gap-3 lg:hidden"
          >

            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F28C28] text-xl font-black text-white shadow-lg shadow-orange-500/20">
              A
            </div>

            <div className="min-w-0 text-left">

              <div className="text-xl font-black leading-none">
                AfriLingo
              </div>

              <div className={`mt-1 hidden truncate text-xs font-bold uppercase tracking-[0.24em] min-[360px]:block ${dark ? "text-[#F28C28]" : "text-[#934014]"}`}>

                {
                  currentLanguage.flag
                }{" "}

                {
                  currentLanguage.language
                }

                {" • "}

                {screen === "explore" ? "Explore Library" : screen === "immersion" ? `${currentLanguage.language} Immersion` : screen === "practice" ? "Daily Practice" : screen === "review" ? "Review Hub" : screen === "settings" ? "Settings & Help" : screen === "audio-studio" ? "Audio Studio" : <>Unit {activeUnit + 1}</>}

              </div>

            </div>

          </button>

          {/* ================================================= */}
          {/* PLAYER STATS */}
          {/* ================================================= */}

          <div className="flex w-full shrink-0 items-center gap-1.5 sm:w-auto sm:gap-2 lg:ml-auto">

            <button type="button" onClick={() => setMobileCoursesOpen(value => !value)} aria-expanded={mobileCoursesOpen} aria-controls="mobile-course-tray" aria-label={`Current course: ${currentLanguage.language}. Switch course`} className={`flex h-11 min-w-12 items-center justify-center gap-1 rounded-xl border px-2 text-xl transition sm:hidden ${mobileCoursesOpen ? "border-[#F28C28] bg-[#F28C28]/12" : dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"}`}>{currentLanguage.flag}<ChevronDown size={13} className={`text-[#F28C28] transition ${mobileCoursesOpen ? "rotate-180" : ""}`}/></button>

            <button onClick={() => setSearchOpen(true)} className={`hidden h-11 w-11 place-items-center rounded-xl border transition sm:grid ${dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white hover:bg-black/5"}`} aria-label="Search AfriLingo" title="Search · Ctrl K"><Search size={18}/></button>

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
            />

            {/* Theme toggle */}

            <button
              onClick={toggleTheme}
              className={`ml-auto grid h-11 w-11 place-items-center rounded-xl border transition sm:ml-0 ${
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

        <AnimatePresence>
          {mobileCoursesOpen && <MobileCourseTray dark={dark} activeLanguage={activeLanguage} startedLanguageIds={preferences.startedLanguageIds || []} progressByLanguage={progressByLanguage} onChoose={id => { selectLanguage(id); setMobileCoursesOpen(false); setScreen("home"); }} />}
        </AnimatePresence>

      </header>}

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main ref={mainRef} id="main-content" tabIndex={-1} className={screen === "lesson" ? "relative mx-auto max-w-5xl px-4" : "afri-main relative mx-auto max-w-6xl px-4 pt-6 lg:ml-64 lg:px-6"}>

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
                dailyTarget={preferences.dailyTarget}
                courseProfile={progress.onboarding}
                exploreLibrary={exploreLibraries[activeLanguage]}
                hasImmersion={Boolean(immersionLibraries[activeLanguage])}
                onNavigate={setScreen}

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
                  soundEnabled={preferences.soundEnabled !== false}

                  isFirstLesson={progress.completedLessonIds.length === 0}

                  isUnitChallenge={
                    currentLanguage.units[activeUnit].lessons.at(-1).id === activeLesson.id &&
                    !progress.completedLessonIds.includes(activeLesson.id)
                  }
                  unit={currentLanguage.units[activeUnit]}
                  isCourseFinal={activeUnit === currentLanguage.units.length - 1 && currentLanguage.units[activeUnit].lessons.at(-1).id === activeLesson.id}

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
                  onStrengthenQuestion={(question) => strengthenReviewQuestion(question, { id: activeLesson.id, title: activeLesson.title })}
                  onAttempt={recordLearningAttempt}

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
                motivations={progress.onboarding?.motivations || preferences.motivations}
                soundEnabled={preferences.soundEnabled !== false}
                onLoseHeart={loseHeart}
                onReviewQuestion={(question, source) => addToReview(question, source)}
                onAttempt={recordLearningAttempt}
                onComplete={completeExploreSession}
              />
            )}

            {screen === "review" && (
              <ReviewPage dark={dark} progress={progress} language={currentLanguage} soundEnabled={preferences.soundEnabled !== false} onLoseHeart={loseHeart} onAttempt={recordLearningAttempt} onComplete={completeReview} />
            )}

            {screen === "practice" && (
              <PracticePage dark={dark} language={currentLanguage} progress={progress} library={exploreLibraries[activeLanguage]} motivations={progress.onboarding?.motivations || preferences.motivations} dailyTarget={preferences.dailyTarget} soundEnabled={preferences.soundEnabled !== false} onLoseHeart={loseHeart} onReviewQuestion={addToReview} onAttempt={recordLearningAttempt} onComplete={completePractice} />
            )}

            {screen === "immersion" && immersionLibraries[activeLanguage] && (
              <ImmersionPage
                dark={dark}
                data={immersionLibraries[activeLanguage]}
                progress={progress}
                motivations={progress.onboarding?.motivations || preferences.motivations}
                soundEnabled={preferences.soundEnabled !== false}
                onLoseHeart={loseHeart}
                onReward={updateImmersion}
                onAttempt={recordLearningAttempt}
                companionId={preferences.companionId}
                onCompanionChange={id => setPreferences(previous => ({ ...previous, companionId: id }))}
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
                onContinue={() => setScreen("home")}
              />

            )}

            {screen === "settings" && <SettingsPage dark={dark} language={currentLanguage} unit={currentLanguage.units[activeUnit]} preferences={preferences} onPreferencesChange={setPreferences} onOpenAudioStudio={() => setScreen("audio-studio")} />}

            {screen === "audio-studio" && <AudioStudioPage dark={dark} languages={languages} exploreLibraries={exploreLibraries} immersionLibraries={immersionLibraries} />}

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
          aria-label="Primary navigation"
          className={`afri-bottom-nav fixed left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-[1.6rem] border p-2 shadow-2xl backdrop-blur-xl lg:hidden ${
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

                const active = tab.id === "more"
                  ? moreOpen || tabs.slice(4).some((item) => item.id === screen)
                  : screen === tab.id;

                return (

                  <button
                    key={
                      tab.id
                    }

                    onClick={() => tab.id === "more" ? setMoreOpen(true) : setScreen(tab.id)}
                    aria-current={active ? "page" : undefined}
                    aria-label={tab.label}
                    title={tab.label}

                    className={`relative isolate flex min-h-14 items-center justify-center rounded-2xl transition ${
                      active
                        ? "text-white"
                        : dark
                        ? "text-white/55 hover:bg-white/5 hover:text-white"
                        : "text-black/45 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {active && <motion.span
                      layoutId="mobile-nav-active"
                      className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#F28C28] to-[#E6741A] shadow-lg shadow-orange-500/20"
                      transition={{ type: "spring", stiffness: 420, damping: 31 }}
                    />}
                    <motion.span
                      className="grid place-items-center"
                      animate={active ? { y: [0, -3, 0], scale: [1, 1.12, 1] } : { y: 0, scale: 1 }}
                      transition={active ? { duration: .34, ease: "easeOut" } : { duration: .15 }}
                    >
                      <Icon size={26} strokeWidth={2.6}/>
                    </motion.span>
                    <span className="sr-only">{tab.label}</span>

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

      <BottomSheet ref={moreDialogRef} open={moreOpen} onClose={() => setMoreOpen(false)} dark={dark} label="More AfriLingo navigation" className="max-w-md p-3 pt-0 sm:pt-3">
        <div className="px-3 py-2 text-xs font-black uppercase tracking-[.2em] opacity-40">More AfriLingo</div>{tabs.slice(4).map(tab => { const Icon=tab.icon; return <button key={tab.id} onClick={() => { setScreen(tab.id); setMoreOpen(false); }} className={`flex min-h-14 w-full items-center gap-3 rounded-2xl px-4 font-black ${screen === tab.id ? "bg-[#F28C28] text-white" : dark ? "hover:bg-white/6" : "hover:bg-black/5"}`}><Icon size={21}/>{tab.label}</button>; })}
      </BottomSheet>

    </div>
  );
}

function MobileCourseTray({ dark, activeLanguage, startedLanguageIds, progressByLanguage, onChoose }) {
  const started = new Set([activeLanguage, ...startedLanguageIds]);
  const myCourses = languageList.filter(course => course.available && started.has(course.id));
  const otherCourses = languageList.filter(course => course.available && !started.has(course.id));
  const completion = course => {
    const lessons = course.units.flatMap(unit => unit.lessons);
    const completed = new Set(progressByLanguage?.[course.id]?.completedLessonIds || []);
    return lessons.length ? Math.round(lessons.filter(lesson => completed.has(lesson.id)).length / lessons.length * 100) : 0;
  };

  return <motion.div id="mobile-course-tray" initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:.16 }} className={`absolute inset-x-0 top-full z-50 border-b px-3 pb-3 pt-2 shadow-2xl sm:hidden ${dark ? "border-white/10 bg-[#131917]" : "border-black/10 bg-white"}`}>
    <div className="flex gap-2 overflow-x-auto pb-1" aria-label="My courses">
      {myCourses.map(course => <button key={course.id} onClick={() => onChoose(course.id)} className={`flex min-w-[76px] flex-col items-center rounded-2xl border px-2 py-2 text-center transition ${course.id === activeLanguage ? "border-[#F28C28] bg-[#F28C28]/12 text-[#F28C28]" : dark ? "border-white/8 bg-white/4" : "border-black/8 bg-black/[.025]"}`}>
        <span className="text-3xl" aria-hidden>{course.flag}</span><span className="mt-1 max-w-[68px] truncate text-[11px] font-black">{course.language}</span><span className="text-[9px] font-bold opacity-45">{completion(course)}%</span>
      </button>)}
    </div>
    {otherCourses.length > 0 && <details className="mt-2 rounded-xl border border-current/10"><summary className="flex min-h-11 cursor-pointer list-none items-center px-3 text-xs font-black text-[#F28C28]">＋ Add a new course <ChevronDown size={14} className="ml-auto"/></summary><div className="grid max-h-44 grid-cols-2 gap-1 overflow-y-auto border-t border-current/10 p-2">{otherCourses.map(course => <button key={course.id} onClick={() => onChoose(course.id)} className={`flex min-h-11 items-center gap-2 rounded-xl px-2 text-left text-xs font-black ${dark ? "hover:bg-white/6" : "hover:bg-black/5"}`}><span className="text-xl">{course.flag}</span><span className="truncate">{course.language}</span></button>)}</div></details>}
  </motion.div>;
}

function DesktopSidebar({ dark, tabs, screen, onNavigate, currentLanguage, activeLanguage, startedLanguageIds, progressByLanguage, onLanguageChange, onSearch }) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const started = new Set([activeLanguage, ...startedLanguageIds]);
  const myCourses = languageList.filter(course => course.available && started.has(course.id));
  const newCourses = languageList.filter(course => course.available && !started.has(course.id));
  const completion = course => {
    const lessons = course.units.flatMap(unit => unit.lessons);
    const completed = new Set(progressByLanguage?.[course.id]?.completedLessonIds || []);
    return lessons.length ? Math.round(lessons.filter(lesson => completed.has(lesson.id)).length / lessons.length * 100) : 0;
  };
  const chooseLanguage = id => {
    onLanguageChange(id);
    setCoursesOpen(false);
    onNavigate("home");
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r px-4 py-5 lg:flex ${dark ? "border-white/8 bg-[#131917]" : "border-black/8 bg-white"}`} aria-label="Desktop navigation">
      <button onClick={() => onNavigate("home")} className="flex min-h-14 items-center gap-3 rounded-2xl px-3 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C28]/25">
        <span className="grid size-11 place-items-center rounded-2xl bg-[#F28C28] text-xl font-black text-white shadow-lg shadow-orange-500/20">A</span>
        <span><span className="block text-xl font-black leading-none">AfriLingo</span><span className="mt-1 block text-[9px] font-black uppercase tracking-[.2em] text-[#F28C28]">Learn Africa</span></span>
      </button>

      <div className="relative mt-5">
        <button type="button" onClick={() => setCoursesOpen(value => !value)} aria-expanded={coursesOpen} aria-controls="desktop-course-menu" className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border px-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C28]/25 ${coursesOpen ? "border-[#F28C28]/55 bg-[#F28C28]/10" : dark ? "border-white/10 bg-white/5 hover:bg-white/8" : "border-black/10 bg-[#FFF8EE] hover:bg-[#FFF0DA]"}`}>
          <span className={`grid size-10 shrink-0 place-items-center rounded-xl text-2xl ${dark ? "bg-white/8" : "bg-white"}`} aria-hidden>{currentLanguage.flag}</span>
          <span className="min-w-0 flex-1"><span className="block truncate text-[10px] font-black uppercase tracking-[.16em] opacity-45">Current language</span><span className="block truncate font-black">{currentLanguage.language}</span></span>
          <ChevronDown size={17} className={`shrink-0 text-[#F28C28] transition ${coursesOpen ? "rotate-180" : ""}`}/>
        </button>

        <AnimatePresence>
          {coursesOpen && <motion.div id="desktop-course-menu" initial={{ opacity:0, y:-8, scale:.98 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:-6, scale:.98 }} transition={{ duration:.16 }} className={`absolute left-0 top-[calc(100%+.55rem)] z-[80] w-[340px] overflow-hidden rounded-[1.4rem] border shadow-2xl ${dark ? "border-white/10 bg-[#1A201E]" : "border-black/10 bg-white"}`}>
            <div className="border-b border-current/10 px-4 py-3 text-[10px] font-black uppercase tracking-[.18em] opacity-45">My courses</div>
            <div className="max-h-72 overflow-y-auto p-2">
              {myCourses.map(course => <button key={course.id} onClick={() => chooseLanguage(course.id)} className={`flex min-h-16 w-full items-center gap-3 rounded-xl px-3 text-left transition ${course.id === activeLanguage ? "bg-[#24745B]/15 text-[#24745B]" : dark ? "hover:bg-white/6" : "hover:bg-black/5"}`}>
                <span className="text-2xl" aria-hidden>{course.flag}</span><span className="min-w-0 flex-1"><span className="block font-black">{course.language}</span><span className="block text-[10px] font-bold opacity-45">{completion(course)}% of verified lessons</span></span>{course.id === activeLanguage && <CheckCircle2 size={17}/>}</button>)}
            </div>
            {newCourses.length > 0 && <details className="border-t border-current/10"><summary className="flex min-h-14 cursor-pointer list-none items-center gap-2 px-4 text-sm font-black text-[#F28C28]"><span className="text-lg">＋</span> Start another course</summary><div className="max-h-52 overflow-y-auto border-t border-current/10 p-2">{newCourses.map(course => <button key={course.id} onClick={() => chooseLanguage(course.id)} className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-black ${dark ? "hover:bg-white/6" : "hover:bg-black/5"}`}><span className="text-xl">{course.flag}</span>{course.language}</button>)}</div></details>}
          </motion.div>}
        </AnimatePresence>
      </div>

      <nav className="mt-5 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto py-1" aria-label="Primary navigation">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = screen === tab.id;
          return <button key={tab.id} onClick={() => { onNavigate(tab.id); setCoursesOpen(false); }} aria-current={active ? "page" : undefined} className={`group flex min-h-12 items-center gap-3 rounded-2xl border px-3 text-sm font-black transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C28]/25 ${active ? "border-[#F28C28]/45 bg-[#F28C28]/12 text-[#F28C28]" : "border-transparent opacity-65 hover:border-current/10 hover:bg-current/[.04] hover:opacity-100"}`}>
            <span className={`grid size-9 place-items-center rounded-xl transition ${active ? "bg-[#F28C28] text-white shadow-md shadow-orange-500/20" : dark ? "bg-white/6" : "bg-black/5"}`}><Icon size={19} strokeWidth={2.6}/></span>{tab.label}
          </button>;
        })}
      </nav>

      <button onClick={onSearch} className={`mt-3 flex min-h-12 items-center gap-3 rounded-2xl border px-3 text-sm font-black transition ${dark ? "border-white/10 bg-white/4 hover:bg-white/8" : "border-black/8 bg-black/[.025] hover:bg-black/5"}`}><span className="grid size-9 place-items-center rounded-xl bg-[#4338CA]/12 text-[#4338CA]"><Search size={18}/></span>Search <span className="ml-auto text-[10px] opacity-35">Ctrl K</span></button>
    </aside>
  );
}

function PageLoader({ dark, languageId }) {
  return <div className="mx-auto min-h-[58vh] w-full max-w-3xl py-8" role="status" aria-live="polite"><div className="text-center"><Lebo pose="learn" reaction="learn" languageId={languageId} animate={false} className="mx-auto h-28 w-28" decorative /><div className="mt-2 text-sm font-black uppercase tracking-[.18em] text-[#F28C28]">Getting your next step ready</div><div className={`mx-auto mt-3 h-2 w-40 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-black/10"}`}><motion.div className="h-full w-1/2 rounded-full bg-[#F6C445]" animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }} /></div></div><div aria-hidden className="mt-8 space-y-4"><div className={`h-28 animate-pulse rounded-[1.75rem] ${dark ? "bg-white/[.055]" : "bg-black/[.045]"}`}/><div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{[0,1,2].map(item=><div key={item} className={`h-24 animate-pulse rounded-2xl ${item===2?"hidden sm:block":""} ${dark ? "bg-white/[.045]" : "bg-black/[.035]"}`}/>)}</div><div className={`h-16 animate-pulse rounded-2xl ${dark ? "bg-white/[.04]" : "bg-black/[.03]"}`}/></div><span className="sr-only">Loading AfriLingo content</span></div>;
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
  hideMobile = false,
  hideNarrow = false
}) {
  return (

    <div
      className={`${
        hideMobile
          ? "hidden sm:flex"
          : "flex"
      } ${hideNarrow ? "hidden min-[420px]:flex" : ""} items-center gap-1.5 rounded-xl border px-2.5 py-2 text-sm font-black ${
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
