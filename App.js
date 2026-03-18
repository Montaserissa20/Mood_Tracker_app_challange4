import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import BottomTabBar from './src/components/BottomTabBar';
import { XP_REWARD_INTERVAL_SECONDS } from './src/constants/gameConfig';
import { COLORS } from './src/constants/theme';
import { ACHIEVEMENTS } from './src/data/achievements';
import { MOODS } from './src/data/moods';
import useMoodTracker from './src/hooks/useMoodTracker';
import AchievementsScreen from './src/screens/AchievementsScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import StatsScreen from './src/screens/StatsScreen';
import { getLevelData } from './src/utils/gamification';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const {
    progress,
    isHydrated,
    secondsUntilNextXp,
    isXpTimerRunning,
    latestXpReward,
    selectMood,
    dismissUnlockedBadgeMessage,
    dismissXpRewardMessage,
    resetProgress,
  } = useMoodTracker();

  const selectedMood = useMemo(() => {
    return MOODS.find((mood) => mood.id === progress.selectedMoodId) || null;
  }, [progress.selectedMoodId]);

  const levelData = useMemo(() => getLevelData(progress.xp), [progress.xp]);

  const latestUnlockedAchievement = useMemo(() => {
    return ACHIEVEMENTS.find((achievement) => achievement.id === progress.lastUnlockedAchievementId) || null;
  }, [progress.lastUnlockedAchievementId]);

  if (!isHydrated) {
    return <LoadingScreen />;
  }

  let content = null;

  if (activeTab === 'home') {
    content = (
      <HomeScreen
        progress={progress}
        moods={MOODS}
        selectedMood={selectedMood}
        levelData={levelData}
        unlockedAchievementCount={progress.unlockedAchievementIds.length}
        xpRewardIntervalSeconds={XP_REWARD_INTERVAL_SECONDS}
        secondsUntilNextXp={secondsUntilNextXp}
        isXpTimerRunning={isXpTimerRunning}
        latestXpReward={latestXpReward}
        latestUnlockedAchievement={latestUnlockedAchievement}
        onSelectMood={selectMood}
        onDismissXpRewardToast={dismissXpRewardMessage}
        onDismissAchievementToast={dismissUnlockedBadgeMessage}
      />
    );
  }

  if (activeTab === 'achievements') {
    content = (
      <AchievementsScreen
        achievements={ACHIEVEMENTS}
        unlockedAchievementIds={progress.unlockedAchievementIds}
      />
    );
  }

  if (activeTab === 'stats') {
    content = (
      <StatsScreen
        progress={progress}
        moods={MOODS}
        levelData={levelData}
        onResetProgress={resetProgress}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.content}>{content}</View>
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});
