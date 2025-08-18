# Property Management Platform

A modern, responsive real estate website built with Next.js, Chakra UI, and Firebase. This platform features property listings with advanced search functionality and a comprehensive admin dashboard for property management.

## Features

### Public Site
- Modern property listings with search and filtering
- Property details with image galleries
- Responsive design with yellow/black theme
- Search by purpose (rent/sale), location, price range
- Contact section with enquiry form

### Admin Dashboard
- Secure admin authentication
- Full CRUD operations for properties
- Image upload and management
- Property visibility toggle
- Real-time data synchronization with Firebase

## Tech Stack

- **Frontend**: Next.js, React, Chakra UI
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Node.js**: Version 20+ required (for Firebase AI features)
- **Deployment**: Ready for Netlify/Vercel deployment

## Prerequisites

- Node.js 20.0.0 or higher
- npm 9.0.0 or higher
- Firebase project

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd property
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore, and Storage
3. Copy your Firebase configuration

### 4. Environment Variables
1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in your Firebase configuration values in `.env.local`:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### 5. Development
```bash
npm run dev
```

## Deployment

### Netlify Deployment

1. **Connect your repository** to Netlify through their dashboard

2. **Set environment variables** in Netlify:
   - Go to Site settings → Environment variables
   - Add all the environment variables from your `.env.local` file:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
     - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

3. **Build settings** (these are configured in `netlify.toml`):
   - Build command: `npm run build`
   - Node version: 20 (required for Firebase AI features)
   - The site uses the Netlify Next.js plugin automatically

4. **Deploy**: Netlify will automatically deploy when you push to your main branch

### Vercel Deployment

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy**: Vercel will automatically build and deploy

### Important Notes for Deployment

- All Firebase environment variables must be prefixed with `NEXT_PUBLIC_` to be available in the browser
- Make sure your Firebase project has the correct CORS settings for your domain
- The `.env.local` file is not deployed - you must set environment variables in your hosting platform
- If you get Firebase auth errors during deployment, double-check that all environment variables are correctly set
- **Secrets scanning**: Firebase public environment variables will appear in the client-side JavaScript bundle, which is expected behavior. The `netlify.toml` configuration disables secrets scanning for this reason.

## Troubleshooting

### Netlify Secrets Scanning Warning
If you see "Secrets scanning found secrets in build" during deployment:

**This is expected behavior** - Firebase client configuration variables (prefixed with `NEXT_PUBLIC_`) are meant to be public and included in the client-side JavaScript bundle. The `netlify.toml` file is configured to disable secrets scanning to prevent this false positive.

### Firebase Auth Error During Build
If you see `Firebase: Error (auth/invalid-api-key)` during deployment:

1. **Check environment variables**: Ensure all Firebase environment variables are set in your hosting platform
2. **Verify API key**: Make sure the API key is correct and hasn't been regenerated
3. **Check Firebase project**: Ensure the Firebase project is active and billing is enabled if required
4. **Domain authorization**: Add your deployment domain to Firebase Authentication → Settings → Authorized domains
