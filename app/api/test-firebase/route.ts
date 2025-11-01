import { NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';

/**
 * GET /api/test-firebase
 * Test Firebase Admin connection
 */
export async function GET() {
  try {
    const db = getFirestoreAdmin();

    if (!db) {
      return NextResponse.json({
        success: false,
        error: 'Firestore Admin not initialized',
        message: 'Check that Firebase Admin environment variables are set',
      });
    }

    // Try to write a test document
    const testRef = await db.collection('_test').add({
      timestamp: new Date().toISOString(),
      message: 'Connection test',
    });

    // Try to read it back
    const testDoc = await testRef.get();

    // Delete the test document
    await testRef.delete();

    return NextResponse.json({
      success: true,
      message: 'Firebase Admin SDK is working!',
      testDocId: testRef.id,
      testData: testDoc.data(),
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.toString(),
    });
  }
}
