import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

function XpProgressBar({ xpIntoLevel, xpPerLevel, xpNeededForNextLevel, progressRatio }) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progressRatio,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [animatedProgress, progressRatio]);

  const animatedWidth = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.label}>XP Progress</Text>
        <Text style={styles.valueText}>
          {xpIntoLevel}/{xpPerLevel} ({xpNeededForNextLevel} XP to next level)
        </Text>
      </View>

      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: animatedWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  label: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  valueText: {
    color: COLORS.textMuted,
    fontSize: 12,
    flex: 1,
    textAlign: 'right',
  },
  track: {
    width: '100%',
    height: 10,
    borderRadius: RADIUS.pill,
    backgroundColor: '#E5ECF8',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.success,
  },
});

export default XpProgressBar;
