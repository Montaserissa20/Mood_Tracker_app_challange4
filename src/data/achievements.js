import { ACHIEVEMENT_THRESHOLDS } from '../constants/gameConfig';

export const ACHIEVEMENTS = [
  {
    id: 'first-mood-selected',
    icon: '🎯',
    title: 'First Mood Selected',
    description: 'Select a mood for the first time.',
    rule: { type: 'totalChangesAtLeast', value: ACHIEVEMENT_THRESHOLDS.totalMoodChangesForStarter },
  },
  {
    id: 'five-mood-changes',
    icon: '🔁',
    title: '5 Mood Changes',
    description: 'Change your mood five times.',
    rule: { type: 'totalChangesAtLeast', value: ACHIEVEMENT_THRESHOLDS.totalMoodChangesForChanger },
  },
  {
    id: 'focus-master',
    icon: '🧠',
    title: 'Focus Master',
    description: 'Choose Focused mood five times.',
    rule: {
      type: 'moodCountAtLeast',
      moodId: 'focused',
      value: ACHIEVEMENT_THRESHOLDS.focusMasterCount,
    },
  },
  {
    id: 'debug-hero',
    icon: '🛠️',
    title: 'Debug Hero',
    description: 'Choose Debugging mood five times.',
    rule: {
      type: 'moodCountAtLeast',
      moodId: 'debugging',
      value: ACHIEVEMENT_THRESHOLDS.debugHeroCount,
    },
  },
  {
    id: 'coffee-powered',
    icon: '⚡',
    title: 'Coffee Powered',
    description: 'Choose Coffee Powered mood three times.',
    rule: {
      type: 'moodCountAtLeast',
      moodId: 'coffee-powered',
      value: ACHIEVEMENT_THRESHOLDS.coffeePoweredCount,
    },
  },
];
