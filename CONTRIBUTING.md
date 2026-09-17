# Contributing to @creuto/react-native-adaptive-ui

Thank you for considering contributing to `@creuto/react-native-adaptive-ui`!

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/creuto/react-native-adaptive-ui.git
   cd react-native-adaptive-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run TypeScript type checks:
   ```bash
   npm run type-check
   ```

4. Run unit tests:
   ```bash
   npm test
   ```

5. Run linter & formatter checks:
   ```bash
   npm run lint
   npm run format:check
   ```

6. Build the package:
   ```bash
   npm run build
   ```

## Pull Request Guidelines

- Ensure all unit tests pass (`npm test`).
- Keep runtime dependencies at zero.
- Maintain strict accessibility principles: never force-disable accessibility font scaling (`allowFontScaling={false}`) to solve layout overflow.
