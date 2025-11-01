import { NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { Config } from '@/lib/config';

/**
 * GET /api/test-firebase
 * Test Firebase Admin connection
 */
export async function GET() {
  try {
    // Debug: Check environment variables (without exposing sensitive data)
    const envCheck = {
      projectId: !!Config.firebase.admin.projectId,
      clientEmail: !!Config.firebase.admin.clientEmail,
      privateKey: !!Config.firebase.admin.privateKey,
      privateKeyLength: Config.firebase.admin.privateKey?.length || 0,
      privateKeyStart: Config.firebase.admin.privateKey?.substring(0, 30) || 'undefined',
    };

    const db = getFirestoreAdmin();

    if (!db) {
      return NextResponse.json({
        success: false,
        error: 'Firestore Admin not initialized',
        message: 'Check that Firebase Admin environment variables are set',
        debug: envCheck,
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
