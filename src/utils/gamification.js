import { XP_PER_LEVEL, XP_PER_MOOD_REWARD } from '../constants/gameConfig';
import { ACHIEVEMENTS } from '../data/achievements';
import { getDayDifference } from './dateUtils';

export function getLevelData(xp) {
  const safeXp = Math.max(0, xp);
  const level = Math.floor(safeXp / XP_PER_LEVEL) + 1;
  const currentLevelXp = (level - 1) * XP_PER_LEVEL;
  const nextLevelXp = level * XP_PER_LEVEL;
  const xpIntoLevel = safeXp - currentLevelXp;
  const xpNeededForNextLevel = nextLevelXp - safeXp;

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    xpIntoLevel,
    xpNeededForNextLevel,
    progressRatio: xpIntoLevel / XP_PER_LEVEL,
  };
}

export function getFavoriteMoodId(moodCounts) {
  const entries = Object.entries(moodCounts || {});
  if (entries.length === 0) {
    return null;
  }

  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

function isAchievementUnlocked(achievement, stats) {
  const { rule } = achievement;

  if (rule.type === 'totalChangesAtLeast') {
    return stats.totalMoodChanges >= rule.value;
  }

  if (rule.type === 'moodCountAtLeast') {
    return (stats.moodCounts[rule.moodId] || 0) >= rule.value;
  }

  return false;
}

export function getUnlockedAchievementIds(stats) {
  return ACHIEVEMENTS.filter((achievement) => isAchievementUnlocked(achievement, stats)).map(
    (achievement) => achievement.id
  );
}

export function updateStreak(previousStreak, todayKey) {
  if (!previousStreak.lastCheckInDate) {
    return {
      current: 1,
      best: Math.max(previousStreak.best, 1),
      lastCheckInDate: todayKey,
    };
  }

  const dayDifference = getDayDifference(previousStreak.lastCheckInDate, todayKey);

  if (dayDifference <= 0) {
    return previousStreak;
  }

  if (dayDifference === 1) {
    const nextCurrentStreak = previousStreak.current + 1;
    return {
      current: nextCurrentStreak,
      best: Math.max(previousStreak.best, nextCurrentStreak),
      lastCheckInDate: todayKey,
    };
  }

  return {
    current: 1,
    best: previousStreak.best,
    lastCheckInDate: todayKey,
  };
}

export function applyMoodChange(progress, moodId, todayKey, moodSessionStartedAt) {
  if (progress.selectedMoodId === moodId) {
    return {
      didChange: false,
      xpGained: 0,
      justUnlockedIds: [],
      nextProgress: progress,
    };
  }

  const moodCounts = {
    ...progress.moodCounts,
    [moodId]: (progress.moodCounts[moodId] || 0) + 1,
  };

  const totalMoodChanges = progress.totalMoodChanges + 1;
  const streak = updateStreak(progress.streak, todayKey);
  const stats = { totalMoodChanges, moodCounts };
  const nextUnlockedIds = getUnlockedAchievementIds(stats);
  const justUnlockedIds = nextUnlockedIds.filter(
    (id) => !progress.unlockedAchievementIds.includes(id)
  );

  return {
    didChange: true,
    xpGained: 0,
    justUnlockedIds,
    nextProgress: {
      ...progress,
      selectedMoodId: moodId,
      totalMoodChanges,
      moodCounts,
      streak,
      moodSessionStartedAt,
      lastMoodChangeDate: todayKey,
      unlockedAchievementIds: nextUnlockedIds,
      lastUnlockedAchievementId: justUnlockedIds[0] || null,
    },
  };
}

export function applyTimedXpReward(progress, rewardCyclesCount) {
  if (rewardCyclesCount <= 0) {
    return {
      xpGained: 0,
      nextProgress: progress,
    };
  }

  const xpGained = rewardCyclesCount * XP_PER_MOOD_REWARD;

  return {
    xpGained,
    nextProgress: {
      ...progress,
      xp: progress.xp + xpGained,
    },
  };
}
