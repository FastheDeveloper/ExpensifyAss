# The Remote Mobile Challenge by Farouq Ayodamola Seriki

## Getting Started

### Running the main application

1. Open the terminal in the project directory and run `yarn` to install all dependencies

2. Start the development server by running `yarn start`

3. In terminal click `i` to run on ios or `a` to run on android

4. Scan QR code in terminal with physical device to open the app on your phone

### Running the story application to test components in a standalone environment

1. Open the terminal in the project directory and run `yarn` to install all dependencies

2. Run `yarn storybook:ios` to open the Story on ios or `yarn storybook:android` to open the Story on android

3. Scan QR code in terminal with physical device to open on your phone

## Development Process

### Figma Link To Design

https://www.figma.com/design/6cck8nl8XiIbBm8rhQP85r/Expensify-App?m=auto&t=cgIVuCJ4u7Scllvd-6

### Tasks and Duration

- Tuesday `Recieved Accessment`

  - Figuring out the API
  - Translating API into low fidelity design
  - Translating project requirements
  - Brainstorming on approach

- Wednesday `Project Started`

  - Setting up Project and Repository
  - Setting up Storybook to create testable custom components
  - Setting up folder structure
  - Asset and PressKit setup
  - Started converting Low fidelity design into figma design

- Thursday `Figma Design Completed || Development Begins`

  - Figma Design Complete
  - React Native Dependency Setup
  - Navigator Setup
  - Context Provider Setup
  - Component Development
  - Login Screen Design and Implementation
  - HomeScreen Design and Implentation
  - Splashscreen animation in Adobe After effects and generating Json format
  - Splashscreen implementation
  - Extensive testing

- Friday `Development Continue`

  - Transaction List Design and Implementation
  - Add Transaction Design and Implementation
  - Modal Design and Implementation
  - Transaction Detail Design and Implementation
  - Onboarding Screen Design and Implementation
  - Extensive testing

- Monday `Finalising `
  - Testing
  - Documentation
  - Commenting

### Technology Stack Decisions

I carefully considered the minimum tech stack needed to accomplish the project requirements efficiently. Here's an overview of my key decisions:

1. State Management: Context API

   - Chose Context API over external state management libraries like MobX or Redux
   - Rationale: Only two global states (Authentication and Transaction) needed tracking

2. Styling: React Native StyleSheet

   - Selected StyleSheet over external libraries like NativeWind (Tailwind CSS)
   - Rationale: Aligns with the goal of a succinct application, using only essential tools

3. Component Development and Testing: Storybook
   - Implemented Storybook for component creation and verification
   - Rationale: Ensures component functionality and versatility while maintaining a focused approach

### Enhanced User Experience: Additional Features

To create a more comprehensive and engaging application, I implemented several features beyond the core requirements

1. App Icon and Animated Splash Screen

   - Purpose: Enhances initial user engagement
   - Features: Custom app icon and an animated splash screen for a dynamic launch experience

2. Onboarding Screen

   - Purpose: Introduces new users to the app's key features
   - Content: Concise overview of app functionality, setting user expectations

3. View All Transactions Screen:

   - Purpose: Improves transaction management
   - Key Feature: Search functionality allowing users to filter transactions by merchant name

4. Transaction Detail Screen:

   - Purpose: Provides in-depth information on individual transactions. Allows users to access and review comprehensive transaction data, enhancing overall utility

5. Offline Mode Handling:
   - Purpose: Manages user experience during network disruptions
   - Features:
     - Dedicated "No Internet Connection" screen
     - Clear visual indication of offline status
     - Prompts users to check and reestablish their connection
   - Benefits:
     - Enhances app reliability and user trust
     - Prevents confusion or frustration from unexplained app behavior
     - Guides users towards resolving connectivity issues

### Challenges and Solutions

#### Authentication Token Expiration

- Challenge:

  - Unable to determine the exact expiration time of the authentication token due to limitations in decoding the token using JWT.decode().

- Solution:
  - Consulted with Rory to obtain the official token expiration time (2 hours)
  - Set the application's token refresh time to 1 hour and 55 minutes, this provides a 5-minute safety buffer before actual expiration
