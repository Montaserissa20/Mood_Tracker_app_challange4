import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AchievementToast from '../components/AchievementToast';
import MoodButton from '../components/MoodButton';
import MoodCard from '../components/MoodCard';
import ProfileHeader from '../components/ProfileHeader';
import StatsOverview from '../components/StatsOverview';
import XpRewardToast from '../components/XpRewardToast';
import XpProgressBar from '../components/XpProgressBar';
import { XP_PER_LEVEL } from '../constants/gameConfig';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

function HomeScreen({
  progress,
  moods,
  selectedMood,
  levelData,
  unlockedAchievementCount,
  xpRewardIntervalSeconds,
  secondsUntilNextXp,
  isXpTimerRunning,
  latestXpReward,
  latestUnlockedAchievement,
  onSelectMood,
  onDismissXpRewardToast,
  onDismissAchievementToast,
}) {
  return (
    <View style={styles.screen}>
      <AchievementToast achievement={latestUnlockedAchievement} onHide={onDismissAchievementToast} />
      <XpRewardToast reward={latestXpReward} onHide={onDismissXpRewardToast} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.appTitle}>Developer Mood Tracker</Text>
        <Text style={styles.subtitle}>Track your coding vibe. Earn XP. Unlock badges.</Text>

        <ProfileHeader username={progress.username} level={levelData.level} />

        <StatsOverview
          xp={progress.xp}
          level={levelData.level}
          totalMoodChanges={progress.totalMoodChanges}
          unlockedCount={unlockedAchievementCount}
        />

        <XpProgressBar
          xpIntoLevel={levelData.xpIntoLevel}
          xpPerLevel={XP_PER_LEVEL}
          xpNeededForNextLevel={levelData.xpNeededForNextLevel}
          progressRatio={levelData.progressRatio}
        />

        <MoodCard mood={selectedMood} />

        <View style={styles.timerCard}>
          <Text style={styles.timerTitle}>XP Timer</Text>
          {isXpTimerRunning ? (
            <Text style={styles.timerValue}>XP reward in: {secondsUntilNextXp}s</Text>
          ) : (
            <Text style={styles.timerHint}>
              Stay in one mood for {xpRewardIntervalSeconds} seconds to earn XP.
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>Choose Your Mood</Text>
        <View style={styles.moodGrid}>
          {moods.map((mood) => (
            <MoodButton
              key={mood.id}
              emoji={mood.emoji}
              label={mood.label}
              onPress={() => onSelectMood(mood.id)}
              isSelected={progress.selectedMoodId === mood.id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  appTitle: {
    fontSize: 29,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: -4,
    marginBottom: 2,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  timerCard: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    gap: 4,
  },
  timerTitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  timerValue: {
    color: COLORS.success,
    fontSize: 18,
    fontWeight: '700',
  },
  timerHint: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  moodGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
});

export default HomeScreen;
