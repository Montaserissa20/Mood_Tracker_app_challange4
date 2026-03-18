import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AchievementCard from '../components/AchievementCard';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

function AchievementsScreen({ achievements, unlockedAchievementIds }) {
  const unlockedCount = unlockedAchievementIds.length;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Achievements</Text>
      <Text style={styles.subtitle}>Collect badges by staying consistent with mood tracking.</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryValue}>
          {unlockedCount}/{achievements.length}
        </Text>
        <Text style={styles.summaryLabel}>Badges Unlocked</Text>
      </View>

      <View style={styles.listContainer}>
        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            unlocked={unlockedAchievementIds.includes(achievement.id)}
          />
        ))}
      </View>
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
  summaryCard: {
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  summaryValue: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: '800',
  },
  summaryLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  listContainer: {
    width: '100%',
    gap: SPACING.sm,
  },
});

export default AchievementsScreen;
