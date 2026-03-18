import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

const TAB_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'achievements', label: 'Badges', icon: '🏅' },
  { id: 'stats', label: 'Stats', icon: '📈' },
];

function BottomTabBar({ activeTab, onTabChange }) {
  return (
    <View style={styles.container}>
      {TAB_ITEMS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  tabButton: {
    flex: 1,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    gap: 2,
  },
  activeTabButton: {
    backgroundColor: COLORS.primarySoft,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    color: COLORS.tabInactive,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  activeLabel: {
    color: COLORS.primary,
  },
});

export default BottomTabBar;
