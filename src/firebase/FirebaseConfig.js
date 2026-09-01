// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Guard initialization so a missing API key (e.g. during static prerender in an
// environment without env vars) cannot throw at module load. In real deploys the
// NEXT_PUBLIC_* keys are present and Firebase initializes fully.
const isConfigured = Boolean(firebaseConfig.apiKey);

let app = null;
let storage = null;
let auth = null;
let db = null;

if (isConfigured) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  storage = getStorage(app);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, storage, auth, db, isConfigured };
