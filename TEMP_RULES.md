# Temporary Firestore Rules for Testing

If you're still having issues, try these temporary rules that are more permissive for testing:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Temporary: Allow all authenticated users to read/write properties
    match /properties/{document} {
      allow read: if true; // Allow anyone to read
      allow write: if request.auth != null; // Allow any authenticated user to write
    }
    
    // Allow authenticated users to read admin status
    match /admins/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Important:** These rules are for testing only. Use the secure rules from FIREBASE_SETUP.md in production.

## Steps to test:

1. Update your Firestore rules with the temporary rules above
2. Refresh your admin dashboard
3. Check if properties appear
4. If they do, the issue was with security rules
5. Then switch back to the secure rules and ensure your admin user document is properly set up
