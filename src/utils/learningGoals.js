import { dateKey } from "./dateKey";

export function weekKey(value = new Date()) {
  const date = new Date(value);
  const day = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - day);
  return dateKey(date);
}

export function recordWeeklyActivity(progress, { xp = 0, review = false } = {}) {
  const currentWeek = weekKey();
  const previous = progress.weekly?.week === currentWeek
    ? progress.weekly
    : { week: currentWeek, activities: 0, reviews: 0, xp: 0 };
  return {
    week: currentWeek,
    activities: previous.activities + 1,
    reviews: previous.reviews + (review ? 1 : 0),
    xp: previous.xp + xp
  };
}

export function recordReviewStreak(progress) {
  const today = dateKey();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = dateKey(yesterdayDate);
  const previous = progress.reviewStreak || { count: 0, lastDate: null, best: 0 };
  const count = previous.lastDate === today
    ? previous.count
    : previous.lastDate === yesterday ? previous.count + 1 : 1;
  return { count, lastDate: today, best: Math.max(previous.best || 0, count) };
}
