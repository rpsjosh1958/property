# Corrected Firestore Security Rules

Based on your successful test, here are the proper security rules to use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Properties collection
    match /properties/{document} {
      // Allow anyone to read visible properties
      allow read: if resource.data.isVisible == true;
      
      // Allow authenticated users to read ALL properties (admin dashboard needs this)
      allow read: if request.auth != null;
      
      // Allow authenticated users to write (create/update/delete) properties
      allow write: if request.auth != null;
    }
    
    // Admin collection - allow authenticated users to read their own admin status
    match /admins/{document} {
      allow read, write: if request.auth != null && document == request.auth.uid;
    }
  }
}
```

## Alternative (More Secure) Rules:

If you want more security and only allow actual admins to manage properties:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Properties collection
    match /properties/{document} {
      // Allow anyone to read visible properties
      allow read: if resource.data.isVisible == true;
      
      // Allow admins to read ALL properties (including hidden ones)
      allow read: if isAdmin();
      
      // Allow only admins to write (create/update/delete) properties
      allow write: if isAdmin();
    }
    
    // Admin collection
    match /admins/{document} {
      // Allow users to read their own admin status
      allow read: if request.auth != null && document == request.auth.uid;
      
      // Allow admins to manage admin users
      allow write: if isAdmin();
    }
  }
}
```

## Steps to Apply:

1. **Go to Firebase Console** → Firestore Database → Rules
2. **Replace the current rules** with one of the rule sets above
3. **Click "Publish"**
4. **Test your admin dashboard** - it should continue working

## Recommendation:

Use the **first set of rules** initially since they're simpler and you've confirmed authentication works. Once everything is stable, you can upgrade to the more secure second set.

The key difference is that the corrected rules allow authenticated users to read all properties, which is what your admin dashboard needs to function properly.
