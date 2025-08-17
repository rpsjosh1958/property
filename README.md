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
- **Deployment**: Ready for Vercel deployment

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

2. Update `.env.local` with your actual Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### 5. Set up Firestore Security Rules
Apply the security rules from `CORRECTED_RULES.md` to your Firestore database.

### 6. Create Admin User
Add an admin user to the `admins` collection in Firestore with the structure:
```json
{
  "email": "admin@example.com",
  "role": "admin",
  "createdAt": "timestamp"
}
```

### 7. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Admin Access

Visit `/admin/login` to access the admin dashboard. Use the email address you added to the `admins` collection.

## Project Structure

```
├── components/          # Reusable UI components
├── pages/              # Next.js pages
│   ├── admin/          # Admin dashboard pages
│   ├── property/       # Property detail pages
│   └── api/            # API routes
├── lib/                # Firebase configuration
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── styles/             # CSS styles
```

## Security

- Firebase credentials are stored in environment variables
- Firestore security rules protect data access
- Admin authentication required for management features
- `.env.local` is excluded from version control

## Deployment

This project is ready for deployment on Vercel. Make sure to:
1. Add your environment variables to your deployment platform
2. Update Firestore security rules for production
3. Configure your Firebase project for your production domain
