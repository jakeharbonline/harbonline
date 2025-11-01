import { NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import type { Invoice } from '@/lib/invoices';

/**
 * GET /api/invoices
 * Fetch all invoices from Firestore
 */
export async function GET() {
  try {
    const db = getFirestoreAdmin();

    if (!db) {
      return NextResponse.json(
        { error: 'Firestore Admin not initialized' },
        { status: 500 }
      );
    }

    const invoicesSnapshot = await db
      .collection('invoices')
      .orderBy('createdAt', 'desc')
      .get();

    const invoices: Invoice[] = [];
    invoicesSnapshot.forEach((doc) => {
      invoices.push({
        id: doc.id,
        ...doc.data(),
      } as Invoice);
    });

    return NextResponse.json({ invoices });
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/invoices
 * Create a new invoice
 */
export async function POST(request: Request) {
  try {
    const db = getFirestoreAdmin();

    if (!db) {
      return NextResponse.json(
        { error: 'Firestore Admin not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();

    const invoiceData = {
      ...body,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    const docRef = await db.collection('invoices').add(invoiceData);

    return NextResponse.json({
      success: true,
      id: docRef.id,
      invoice: { id: docRef.id, ...invoiceData },
    });
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice', details: error.message },
      { status: 500 }
    );
  }
}
