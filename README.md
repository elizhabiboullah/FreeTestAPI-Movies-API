# Movie App

A modern, feature-rich movie browsing application built with React Native and Expo, offering a seamless experience across iOS, Android, and web platforms.

## App Screenshots

### Movie List View

![Movie List View](./assets/images/movie-list.png)
*Browse through a curated collection of movies with essential details like title, year, and rating*

### Movie Details
![Movie Details Screen](./assets/images/movie-details.png)
*Detailed view of movie information with cast, ratings, and synopsis*


## Features

### Core Features
- **Movie Listing**: Browse through a curated list of movies with essential details like title, year, genre, and rating
- **Search Functionality**: Real-time search capability to find movies by title
- **Responsive Design**: Optimized layout for various screen sizes and orientations
- **Error Handling**: Graceful error handling with retry options

### UI/UX Features
- **Dark/Light Theme**: Automatic theme switching based on system preferences
- **Animations**: Smooth transitions and animations using react-native-reanimated
  - Parallax scrolling effect on iOS
  - Animated movie card transitions
- **Custom Components**:
  - Collapsible sections for organized content display
  - Themed text and view components for consistent styling
  - Custom tab bar with haptic feedback

### Technical Features
- **File-based Routing**: Using Expo Router for efficient navigation
- **Custom Font Support**: Integration of custom fonts (Space Mono)
- **Platform-specific Optimizations**: Tailored features for iOS, Android, and web
- **Image Optimization**: Support for different screen densities (@2x, @3x)

## Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

#### Development Mode
```bash
# Start the development server
npm start
# or
yarn start
```

Then:
- Press `i` to open in iOS simulator
- Press `a` to open in Android emulator
- Press `w` to open in web browser

#### Platform Specific
```bash
# iOS
npm run ios
# or
yarn ios

# Android
npm run android
# or
yarn android

# Web
npm run web
# or
yarn web
```

## Tech Stack

- **Framework**: React Native
- **Development Platform**: Expo
- **Navigation**: Expo Router
- **Animations**: react-native-reanimated
- **Styling**: React Native StyleSheet
- **UI Components**: Custom themed components

## Project Structure

```
movie-app/
├── app/                 # Application screens and navigation
├── assets/             # Static assets (images, fonts)
├── components/         # Reusable UI components
├── constants/          # App constants and theme
├── hooks/              # Custom React hooks
├── services/           # API and other services
└── scripts/            # Development and build scripts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
