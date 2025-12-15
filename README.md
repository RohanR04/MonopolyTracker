# Monopoly Win Tracker

A real-time web application to track Monopoly game results among a friend group. Built with Next.js 14, Tailwind CSS, and Firebase Firestore.

## Features

- **Player Management**: Add and manage players
- **Game Logging**: Log games with players, winner, map, and game type
- **Real-Time Sync**: All connected clients see updates instantly
- **Statistics Dashboard**: View leaderboards, streaks, map statistics, and more
- **Game History**: Browse and manage game history

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database (start in test mode)
   - Configure Firestore security rules:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /{document=**} {
           allow read, write: if true;
         }
       }
     }
     ```
   - Get your Firebase config values from Project Settings

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Hosting**: Vercel

