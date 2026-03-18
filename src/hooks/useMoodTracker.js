import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  XP_PER_MOOD_REWARD,
  XP_REWARD_INTERVAL_SECONDS,
} from '../constants/gameConfig';
import { APP_PROGRESS_STORAGE_KEY } from '../constants/storage';
import { getTodayKey } from '../utils/dateUtils';
import { applyMoodChange, applyTimedXpReward } from '../utils/gamification';

const initialProgress = {
  username: 'Student Dev',
  selectedMoodId: null,
  moodSessionStartedAt: null,
  xp: 0,
  totalMoodChanges: 0,
  moodCounts: {},
  unlockedAchievementIds: [],
  streak: {
    current: 0,
    best: 0,
    lastCheckInDate: null,
  },
  lastMoodChangeDate: null,
  lastUnlockedAchievementId: null,
};

function getInitialProgress() {
  return {
    ...initialProgress,
    streak: { ...initialProgress.streak },
  };
}

function mergeWithInitialProgress(storedProgress) {
  return {
    ...getInitialProgress(),
    ...storedProgress,
    moodSessionStartedAt: storedProgress?.selectedMoodId ? Date.now() : null,
    moodCounts: storedProgress?.moodCounts || {},
    unlockedAchievementIds: Array.isArray(storedProgress?.unlockedAchievementIds)
      ? storedProgress.unlockedAchievementIds
      : [],
    streak: {
      ...initialProgress.streak,
      ...(storedProgress?.streak || {}),
    },
    lastUnlockedAchievementId: null,
  };
}

function sanitizeForStorage(progress) {
  const { lastUnlockedAchievementId, ...rest } = progress;
  return rest;
}

export default function useMoodTracker() {
  const [progress, setProgress] = useState(getInitialProgress());
  const [isHydrated, setIsHydrated] = useState(false);
  const [secondsUntilNextXp, setSecondsUntilNextXp] = useState(
    XP_REWARD_INTERVAL_SECONDS
  );
  const [latestXpReward, setLatestXpReward] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProgress() {
      try {
        const rawValue = await AsyncStorage.getItem(APP_PROGRESS_STORAGE_KEY);
        if (!rawValue) {
          return;
        }

        const parsedValue = JSON.parse(rawValue);
        if (isMounted && parsedValue) {
          setProgress(mergeWithInitialProgress(parsedValue));
        }
      } catch (error) {
        console.log('Failed to read saved progress:', error);
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    }

    loadProgress();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(APP_PROGRESS_STORAGE_KEY, JSON.stringify(sanitizeForStorage(progress))).catch(
      (error) => {
        console.log('Failed to save progress:', error);
      }
    );
  }, [progress, isHydrated]);

  useEffect(() => {
    if (!isHydrated || !progress.selectedMoodId || !progress.moodSessionStartedAt) {
      setSecondsUntilNextXp(XP_REWARD_INTERVAL_SECONDS);
      return;
    }

    let completedCycles = 0;
    const rewardIntervalMs = XP_REWARD_INTERVAL_SECONDS * 1000;

    const timerTick = () => {
      const now = Date.now();
      const elapsedMs = Math.max(0, now - progress.moodSessionStartedAt);
      const totalCompletedCycles = Math.floor(elapsedMs / rewardIntervalMs);
      const elapsedInCurrentCycle = elapsedMs % rewardIntervalMs;
      const remainingMs = rewardIntervalMs - elapsedInCurrentCycle;

      setSecondsUntilNextXp(Math.max(1, Math.ceil(remainingMs / 1000)));

      if (totalCompletedCycles <= completedCycles) {
        return;
      }

      const rewardCyclesToApply = totalCompletedCycles - completedCycles;
      completedCycles = totalCompletedCycles;
      const xpGained = rewardCyclesToApply * XP_PER_MOOD_REWARD;

      setProgress((current) => applyTimedXpReward(current, rewardCyclesToApply).nextProgress);
      setLatestXpReward({
        id: now,
        amount: xpGained,
      });
    };

    timerTick();
    const intervalId = setInterval(timerTick, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isHydrated, progress.selectedMoodId, progress.moodSessionStartedAt]);

  const selectMood = useCallback((moodId) => {
    const now = Date.now();
    const todayKey = getTodayKey();
    setProgress((current) => applyMoodChange(current, moodId, todayKey, now).nextProgress);
  }, []);

  const dismissUnlockedBadgeMessage = useCallback(() => {
    setProgress((current) => {
      if (!current.lastUnlockedAchievementId) {
        return current;
      }

      return {
        ...current,
        lastUnlockedAchievementId: null,
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    const resetState = getInitialProgress();
    setProgress(resetState);
    setLatestXpReward(null);
    setSecondsUntilNextXp(XP_REWARD_INTERVAL_SECONDS);

    // Overwrite saved progress so reset remains after app restart.
    AsyncStorage.setItem(APP_PROGRESS_STORAGE_KEY, JSON.stringify(sanitizeForStorage(resetState))).catch(
      (error) => {
        console.log('Failed to reset saved progress:', error);
      }
    );
  }, []);

  const dismissXpRewardMessage = useCallback(() => {
    setLatestXpReward(null);
  }, []);

  return {
    progress,
    isHydrated,
    secondsUntilNextXp,
    isXpTimerRunning: Boolean(progress.selectedMoodId && progress.moodSessionStartedAt),
    latestXpReward,
    selectMood,
    dismissUnlockedBadgeMessage,
    dismissXpRewardMessage,
    resetProgress,
  };
}
