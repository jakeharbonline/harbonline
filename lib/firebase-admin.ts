import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { Config } from './config';

/**
 * Firebase Admin SDK
 *
 * Server-side only (never sent to browser):
 * - Admin operations
 * - Backend API routes
 * - Server actions
 * - Elevated privileges
 */

let adminApp: App | undefined;
let adminDb: Firestore | undefined;
let adminAuth: Auth | undefined;

/**
 * Initialize Firebase Admin (Singleton Pattern)
 */
function initializeFirebaseAdmin(): App | null {
  // Return existing app if already initialized
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Check if Firebase Admin is configured
  const { projectId, clientEmail, privateKey } = Config.firebase.admin;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('⚠️  Firebase Admin not configured. Admin SDK disabled.');
    return null;
  }

  try {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey, // Already has newline fix from config.ts
      }),
    });

    console.log('✅ Firebase Admin initialized');
    return adminApp;
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error);
    return null;
  }
}

/**
 * Get Firestore Admin instance
 */
export function getFirestoreAdmin(): Firestore | null {
  if (!adminDb) {
    const app = initializeFirebaseAdmin();
    if (!app) return null;
    adminDb = getFirestore(app);
  }
  return adminDb;
}

/**
 * Get Auth Admin instance
 */
export function getAuthAdmin(): Auth | null {
  if (!adminAuth) {
    const app = initializeFirebaseAdmin();
    if (!app) return null;
    adminAuth = getAuth(app);
  }
  return adminAuth;
}

/**
 * Get Firebase Admin App instance
 */
export function getFirebaseAdmin(): App | null {
  if (!adminApp) {
    adminApp = initializeFirebaseAdmin() ?? undefined;
  }
  return adminApp ?? null;
}

export { adminApp, adminDb, adminAuth };
