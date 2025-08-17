# Firebase Setup Instructions

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name (e.g., "dm-property-management")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable "Email/Password" sign-in provider
3. Click "Save"

## Step 3: Create Firestore Database
1. Go to "Firestore Database" > "Create database"
2. Choose "Start in test mode" (we'll add security rules later)
3. Select a location (choose closest to your users)
4. Click "Create"

## Step 4: Enable Storage
1. Go to "Storage" > "Get started"
2. Start in test mode
3. Choose the same location as Firestore
4. Click "Done"

## Step 5: Get Configuration Keys
1. Go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web" icon (</>) to add a web app
4. Enter app nickname (e.g., "Property Website")
5. Copy the configuration object

## Step 6: Update Firebase Config
Replace the placeholder values in `/lib/firebase.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 7: Create Admin User
1. In Firebase Console, go to "Authentication" > "Users"
2. Click "Add user"
3. Enter your email and password
4. Copy the User UID
5. Go to "Firestore Database"
6. Create a new collection called "admins"
7. Create a document with the User UID as the document ID
8. Add a field: `isAdmin: true`

## Step 8: Set Up Security Rules

### Firestore Rules
Go to "Firestore Database" > "Rules" and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to visible properties for everyone
    match /properties/{document} {
      allow read: if resource.data.isVisible == true;
      // Allow admin to read/write all properties
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Admin collection - only authenticated admins can read/write
    match /admins/{document} {
      allow read, write: if request.auth != null && 
        document == request.auth.uid;
    }
  }
}
```

### Storage Rules
Go to "Storage" > "Rules" and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 9: Test the Admin System
1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/admin/login`
3. Log in with the admin credentials you created
4. You should be redirected to the admin dashboard
5. Try adding a new property with images

## Step 10: Deploy (Optional)
Once everything is working locally, you can deploy to Vercel, Netlify, or Firebase Hosting.

## Troubleshooting
- Make sure all Firebase services are enabled
- Check that security rules are properly set
- Verify admin user document exists in Firestore
- Check browser console for any Firebase errors
- Ensure environment variables are set correctly if deploying

## Free Tier Limits
- Authentication: 50,000 monthly active users
- Firestore: 1 GiB storage, 50K reads/day, 20K writes/day
- Storage: 5 GB storage, 1 GB/day downloads
- These limits should be sufficient for most small to medium property websites
