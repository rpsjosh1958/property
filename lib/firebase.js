import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
// You'll need to replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyDltsz7zNTRMLUDBn776skYyapBHRulEvI",
  authDomain: "dm-property-management-f9222.firebaseapp.com",
  projectId: "dm-property-management-f9222",
  storageBucket: "dm-property-management-f9222.firebasestorage.app",
  messagingSenderId: "620598049880",
  appId: "1:620598049880:web:35cd55300258b3fcd69e2d",
  measurementId: "G-6NGG2VQLSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
