# Developer Mood Tracker

Developer Mood Tracker is an Expo React Native mobile application that started as a simple classroom prototype and evolved into a more polished product-style app.

The app lets users choose their current developer mood, track progress through gamification, earn XP over time, level up, and reset progress when needed.

---

## Overview

This project was built to practice and demonstrate core React Native concepts while also improving the application with:
- better UI/UX
- gamification
- reusable components
- local persistence
- cleaner project structure
- production-oriented thinking

The app is suitable as a student mobile development project and can be extended further for Android release with Expo EAS Build.

---

## Demo and Download

### YouTube Demo
[Watch the demo video](https://youtube.com/shorts/OlGTAvimfvs?feature=share)

### APK / Build Download
[Download the Android build from Expo](https://expo.dev/accounts/moncat/projects/developer-mood-tracker/builds/c344af15-440e-4302-b10b-ea8aef488e6b)

---

## Features

### Core Features
- Select a developer mood from a set of mood cards
- Display the currently active mood in a main card
- Highlight the selected mood visually
- Track mood changes through a clean interactive UI

### Gamification Features
- Earn XP by staying in a selected mood for a certain amount of time
- Level up as XP increases
- View progress in an XP progress bar
- Unlock achievements or badges
- Track simple app statistics
- Reset progress back to the initial state

### Product Improvements
- Modern card-based UI
- Better spacing and visual hierarchy
- Beginner-friendly but scalable folder structure
- Local persistence so progress is saved after app restart

---

## Tech Stack

- **Expo**
- **React Native**
- **JavaScript**
- **AsyncStorage** for local persistence

---

## Project Goals

This project demonstrates:

- JSX
- Components
- Props
- State
- Event handling
- Conditional rendering
- Local storage
- Basic gamification logic
- UI refactoring from prototype to product

---

## Project Structure

```bash
DeveloperMoodTracker/
├── App.js
├── app.json
├── eas.json
├── package.json
├── assets/
├── src/
│   ├── components/
│   ├── screens/
│   ├── constants/
│   ├── utils/
│   ├── hooks/
│   └── storage/
└── README.md
