import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

function AchievementCard({ achievement, unlocked }) {
  return (
    <View style={[styles.card, unlocked ? styles.cardUnlocked : styles.cardLocked]}>
      <Text style={styles.icon}>{achievement.icon}</Text>
      <View style={styles.textContainer}>
        <Text style={[styles.title, unlocked ? styles.titleUnlocked : styles.titleLocked]}>
          {achievement.title}
        </Text>
        <Text style={styles.description}>{achievement.description}</Text>
      </View>
      <Text style={[styles.status, unlocked ? styles.statusUnlocked : styles.statusLocked]}>
        {unlocked ? 'Unlocked' : 'Locked'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  cardUnlocked: {
    backgroundColor: '#ECFDF3',
    borderColor: '#9FE4BA',
  },
  cardLocked: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  titleUnlocked: {
    color: '#166534',
  },
  titleLocked: {
    color: COLORS.textPrimary,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  status: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  statusUnlocked: {
    color: '#15803D',
  },
  statusLocked: {
    color: COLORS.textMuted,
  },
});

export default AchievementCard;
