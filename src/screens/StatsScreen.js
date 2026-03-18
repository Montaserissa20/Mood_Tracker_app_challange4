import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { XP_PER_LEVEL } from '../constants/gameConfig';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { getFavoriteMoodId } from '../utils/gamification';

function StatsMetric({ label, value }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function StatsScreen({ progress, moods, levelData, onResetProgress }) {
  const favoriteMoodId = getFavoriteMoodId(progress.moodCounts);
  const favoriteMood = moods.find((mood) => mood.id === favoriteMoodId);
  const moodCountValues = Object.values(progress.moodCounts);
  const maxMoodCount = Math.max(1, ...moodCountValues);

  const handleResetPress = () => {
    Alert.alert(
      'Reset Progress',
      'This will reset XP, levels, streaks, mood stats, and achievements. Continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            if (onResetProgress) {
              onResetProgress();
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Your Stats</Text>
      <Text style={styles.subtitle}>A quick overview of your consistency and mood habits.</Text>

      <View style={styles.metricsGrid}>
        <StatsMetric label="Mood Changes" value={progress.totalMoodChanges} />
        <StatsMetric label="Current Streak" value={`${progress.streak.current} day(s)`} />
        <StatsMetric label="Best Streak" value={`${progress.streak.best} day(s)`} />
        <StatsMetric label="Current Level" value={`LV ${levelData.level}`} />
      </View>

      <View style={styles.favoriteCard}>
        <Text style={styles.favoriteLabel}>Favorite Mood</Text>
        <Text style={styles.favoriteValue}>
          {favoriteMood ? `${favoriteMood.emoji} ${favoriteMood.label}` : 'No mood tracked yet'}
        </Text>
      </View>

      <View style={styles.xpCard}>
        <Text style={styles.xpTitle}>Level Progress</Text>
        <Text style={styles.xpValue}>
          {levelData.xpIntoLevel}/{XP_PER_LEVEL} XP
        </Text>
        <Text style={styles.xpSubtext}>{levelData.xpNeededForNextLevel} XP needed for next level</Text>
      </View>

      <View style={styles.distributionCard}>
        <Text style={styles.distributionTitle}>Mood Distribution</Text>

        {moods.map((mood) => {
          const count = progress.moodCounts[mood.id] || 0;
          const widthPercent = (count / maxMoodCount) * 100;
          return (
            <View key={mood.id} style={styles.distributionRow}>
              <Text style={styles.distributionLabel}>
                {mood.emoji} {mood.label}
              </Text>
              <View style={styles.distributionTrack}>
                <View style={[styles.distributionFill, { width: `${widthPercent}%` }]} />
              </View>
              <Text style={styles.distributionCount}>{count}</Text>
            </View>
          );
        })}
      </View>

      <Pressable style={styles.resetButton} onPress={handleResetPress}>
        <Text style={styles.resetButtonText}>Reset Progress</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  metricsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  metricCard: {
    flexBasis: '48%',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  metricValue: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  favoriteCard: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  favoriteLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  favoriteValue: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  xpCard: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  xpTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  xpValue: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  xpSubtext: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  distributionCard: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  distributionTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  distributionLabel: {
    width: 110,
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  distributionTrack: {
    flex: 1,
    height: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: '#E5ECF8',
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
  },
  distributionCount: {
    width: 26,
    textAlign: 'right',
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  resetButton: {
    width: '100%',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#F4B4B4',
    backgroundColor: '#FEF2F2',
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default StatsScreen;
