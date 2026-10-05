import { dateKey } from "./dateKey";

export const DAILY_PLAN_STEPS = ["review", "skill", "vocabulary", "immersion"];

export function currentDailyPlan(progress = {}, today = dateKey()) {
  return progress.dailyPlan?.date === today
    ? progress.dailyPlan
    : { date: today, completedStepIds: [] };
}

export function completeDailyPlanStep(progress, stepId, today = dateKey()) {
  if (!DAILY_PLAN_STEPS.includes(stepId)) return progress.dailyPlan;
  const plan = currentDailyPlan(progress, today);
  return { ...plan, completedStepIds: [...new Set([...plan.completedStepIds, stepId])] };
}
