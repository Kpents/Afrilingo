import {
  languageAdaptationProfiles,
  masterCurriculum,
  masterCurriculumSections
} from "../data/curriculum/masterCurriculum";

const rules = [
  [73, /mastery|capstone|course mastery/i],
  [72, /course review|natural conversation|story workshop/i],
  [68, /stories/i],
  [67, /social nuance|regional.*nuance|dialect awareness|regional awareness|respect.*nuance/i],
  [57, /culture.*community/i],
  [48, /regional|dialect/i],
  [47, /sounds|tone/i],
  [46, /grammar|language patterns|verb systems|verb building|noun classes|gender in action/i],
  [40, /connected conversation|conversation repair/i],
  [39, /challenge/i],
  [38, /decision/i],
  [35, /sport/i],
  [31, /routine|habitual|home.*daily|home$/i],
  [30, /restaurant|hospitality/i],
  [28, /polite request/i],
  [27, /future|plans.*sequence|completed.*future|past.*future/i],
  [26, /past/i],
  [25, /plans|appointment/i],
  [24, /clothes|colou?r|appearance|description/i],
  [23, /weather|environment|nature/i],
  [22, /health|emergenc|safety|help|body/i],
  [20, /feeling|needs/i],
  [18, /social conversation|socializing|invitation/i],
  [17, /travel|transport|taxi|touring|filling station/i],
  [16, /school/i],
  [15, /work/i],
  [14, /money|price/i],
  [13, /market|shopping|grocery/i],
  [12, /time|date|calendar/i],
  [11, /place|direction|finding your way/i],
  [10, /question/i],
  [8, /describing|descriptions|pronoun|possession/i],
  [7, /home|daily life/i],
  [6, /food|drink/i],
  [5, /action|present tense|ongoing/i],
  [4, /family|people/i],
  [3, /introduc|identity|origins/i],
  [2, /number|quantit/i],
  [1, /greeting/i]
];

const preferredSlot = title => rules.find(([, pattern]) => pattern.test(title))?.[0];

const nearestOpenSlot = (preferred, openSlots) => {
  if (preferred && openSlots.has(preferred)) return preferred;
  const candidates = [...openSlots];
  if (!candidates.length) return null;
  if (!preferred) return candidates[0];
  return candidates.sort((a, b) => Math.abs(a - preferred) - Math.abs(b - preferred) || a - b)[0];
};

/**
 * Projects verified legacy course units into the universal roadmap without
 * changing their order, IDs, lesson objects or progress keys.
 */
export function projectCourseOntoMasterCurriculum(course, languageId) {
  const openSlots = new Set(masterCurriculum.units.map(unit => unit.number));
  const assignments = [];

  course.units.forEach((courseUnit, courseUnitIndex) => {
    const preferred = preferredSlot(courseUnit.title);
    const masterUnitNumber = nearestOpenSlot(preferred, openSlots);
    openSlots.delete(masterUnitNumber);
    assignments.push({ masterUnitNumber, courseUnit, courseUnitIndex });
  });

  const assignmentByNumber = new Map(assignments.map(item => [item.masterUnitNumber, item]));
  const units = masterCurriculum.units.map(masterUnit => {
    const assignment = assignmentByNumber.get(masterUnit.number);
    if (!assignment) {
      return {
        ...masterUnit,
        status: "upcoming",
        contentStatus: "not-authored"
      };
    }
    return {
      ...masterUnit,
      status: "playable",
      contentStatus: "verified-existing",
      courseUnitIndex: assignment.courseUnitIndex,
      courseUnitId: assignment.courseUnit.id ?? `${languageId}-unit-${assignment.courseUnitIndex + 1}`,
      courseUnitTitle: assignment.courseUnit.title,
      lessonCount: assignment.courseUnit.lessons?.length ?? 0,
      courseUnit: assignment.courseUnit
    };
  });

  return {
    id: masterCurriculum.id,
    version: masterCurriculum.version,
    languageId,
    sections: masterCurriculumSections.map(section => ({
      ...section,
      units: units.filter(unit => unit.sectionId === section.id)
    })),
    units,
    adaptation: languageAdaptationProfiles[languageId] ?? {
      family: "Language-specific",
      priorities: ["native-speaker reviewed pronunciation", "language-owned grammar sequence", "local cultural contexts"]
    },
    playableUnitCount: assignments.length,
    upcomingUnitCount: units.length - assignments.length,
    totalUnitCount: units.length,
    migration: {
      strategy: "non-destructive-semantic-projection",
      preservesLegacyUnitOrder: true,
      preservesLessonIds: true,
      preservesProgressKeys: true
    }
  };
}
export function withMasterCurriculum(course, languageId) {
  return {
    ...course,
    curriculum: projectCourseOntoMasterCurriculum(course, languageId)
  };
}
export function getCurriculumProgress(course, completedLessonIds = []) {
  const completed = new Set(completedLessonIds);
  const units = course.curriculum?.units ?? [];
  const completedPlayableUnits = units.filter(unit => {
    if (unit.status !== "playable") return false;
    const lessons = unit.courseUnit?.lessons ?? [];
    return lessons.length > 0 && lessons.every(lesson => completed.has(lesson.id));
  }).length;
  return {
    completedPlayableUnits,
    playableUnitCount: course.curriculum?.playableUnitCount ?? course.units.length,
    totalUnitCount: course.curriculum?.totalUnitCount ?? course.units.length,
    percentOfVerifiedContent: course.curriculum?.playableUnitCount
      ? Math.round((completedPlayableUnits / course.curriculum.playableUnitCount) * 100)
      : 0,
    percentOfMasterRoadmap: units.length
      ? Math.round((completedPlayableUnits / units.length) * 100)
      : 0
  };
}

