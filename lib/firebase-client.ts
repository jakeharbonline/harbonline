import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { Config } from './config';

/**
 * Firebase Client SDK
 *
 * Used in the browser for:
 * - Authentication
 * - Firestore database operations
 * - Real-time updates
 */

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

/**
 * Initialize Firebase Client App (Singleton Pattern)
 */
function initializeFirebaseClient() {
  // Return existing app if already initialized
  if (getApps().length > 0) {
    return getApp();
  }

  // Check if Firebase is configured
  if (!Config.flags.enableFirebase) {
    console.warn('⚠️  Firebase is not configured. Client SDK disabled.');
    return null;
  }

  // Initialize new app
  const firebaseConfig = Config.firebase.client;

  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn('⚠️  Firebase configuration incomplete. Client SDK disabled.');
    return null;
  }

  try {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase Client initialized');
    return app;
  } catch (error) {
    console.error('❌ Firebase Client initialization failed:', error);
    return null;
  }
}

/**
 * Get Firestore instance
 */
export function getFirestoreClient(): Firestore | null {
  if (!db) {
    const firebaseApp = initializeFirebaseClient();
    if (!firebaseApp) return null;
    db = getFirestore(firebaseApp);
  }
  return db;
}

/**
 * Get Auth instance
 */
export function getAuthClient(): Auth | null {
  if (!auth) {
    const firebaseApp = initializeFirebaseClient();
    if (!firebaseApp) return null;
    auth = getAuth(firebaseApp);
  }
  return auth;
}

/**
 * Get Firebase App instance
 */
export function getFirebaseClient(): FirebaseApp | null {
  if (!app) {
    app = initializeFirebaseClient() ?? undefined;
  }
  return app ?? null;
}

export { app, db, auth };
