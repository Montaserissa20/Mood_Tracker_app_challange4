import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

function ProfileHeader({ username, level }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.usernameText}>{username}</Text>
      </View>

      <View style={styles.levelPill}>
        <Text style={styles.levelText}>LV {level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  welcomeText: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 2,
  },
  usernameText: {
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: '700',
  },
  levelPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: '#BBD2FF',
  },
  levelText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 13,
  },
});

export default ProfileHeader;
