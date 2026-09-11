import { dateKey } from "./dateKey";

const messages = {
  welcome: [
    "Ready when you are. One short lesson is enough to build momentum.",
    "Let’s learn something you can use in a real conversation today.",
    "Small steps, strong roots. Your next lesson is waiting."
  ],
  lowHearts: [
    "Take it slowly—accuracy matters more than speed when hearts are low.",
    "A careful answer now can protect your last hearts. You’ve got this."
  ],
  noHearts: ["Let’s do a quick refill practice together, then return stronger."],
  streak: [
    "Your streak is alive! Complete one lesson today to keep it growing.",
    "Consistency is becoming your superpower. Keep that streak warm."
  ],
  quest: [
    "Only one lesson left in today’s challenge—finish strong!",
    "You’re close to today’s bonus XP. One more push."
  ],
  questDone: ["Daily challenge complete! That rhythm is how fluency grows."],
  unitAlmostDone: ["You’re at the final stretch of this unit. The challenge is within reach."],
  unitDone: ["Unit complete! Take a moment to enjoy how far you’ve come."],
  returning: ["Welcome back! I saved your place—let’s pick up the thread."],
  beginner: ["I’ll stay with you while you find your rhythm. Mistakes are part of learning."]
};

function stablePick(items, seed) {
  const value = [...seed].reduce((total, char) => total + char.charCodeAt(0), 0);
  return items[value % items.length];
}

export function getLeboMoment({ progress, completedInUnit = 0, totalInUnit = 0 }) {
  const today = dateKey();
  const dailyCount = progress.daily?.date === today ? progress.daily.completed : 0;
  const unitPercent = totalInUnit ? completedInUnit / totalInUnit : 0;
  let kind = "welcome";
  let pose = "wave";
  let reaction = "idle";

  if (progress.hearts === 0) { kind = "noHearts"; pose = "encourage"; reaction = "encourage"; }
  else if (progress.hearts <= 2) { kind = "lowHearts"; pose = "learn"; reaction = "learn"; }
  else if (totalInUnit && completedInUnit === totalInUnit) { kind = "unitDone"; pose = "celebrate"; reaction = "celebrate"; }
  else if (unitPercent >= 0.75) { kind = "unitAlmostDone"; pose = "encourage"; reaction = "correct"; }
  else if (progress.daily?.date === today && progress.daily.claimed) { kind = "questDone"; pose = "celebrate"; reaction = "celebrate"; }
  else if (dailyCount === 2) { kind = "quest"; pose = "encourage"; reaction = "correct"; }
  else if (progress.streak >= 2) { kind = "streak"; pose = "encourage"; reaction = "idle"; }
  else if (progress.completedLessonIds.length > 0) { kind = "returning"; pose = "wave"; reaction = "wave"; }
  else { kind = "beginner"; pose = "wave"; reaction = "wave"; }

  return {
    kind,
    pose,
    reaction,
    message: stablePick(messages[kind], `${today}:${progress.xp}:${completedInUnit}`)
  };
}
