import { NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';

/**
 * GET /api/invoices/[id]
 * Fetch a specific invoice
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getFirestoreAdmin();

    if (!db) {
      return NextResponse.json(
        { error: 'Firestore Admin not initialized' },
        { status: 500 }
      );
    }

    const docRef = db.collection('invoices').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      invoice: {
        id: doc.id,
        ...doc.data(),
      },
    });
  } catch (error: any) {
    console.error('Error fetching invoice:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoice', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/invoices/[id]
 * Update an invoice
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getFirestoreAdmin();

    if (!db) {
      return NextResponse.json(
        { error: 'Firestore Admin not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const updateData = {
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    // If status is being changed to 'paid', add paidDate
    if (body.status === 'paid' && !body.paidDate) {
      updateData.paidDate = new Date().toISOString();
    }

    const docRef = db.collection('invoices').doc(id);
    await docRef.update(updateData);

    return NextResponse.json({
      success: true,
      invoice: {
        id,
        ...updateData,
      },
    });
  } catch (error: any) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to update invoice', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/invoices/[id]
 * Delete an invoice
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getFirestoreAdmin();

    if (!db) {
      return NextResponse.json(
        { error: 'Firestore Admin not initialized' },
        { status: 500 }
      );
    }

    const docRef = db.collection('invoices').doc(id);
    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: 'Invoice deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    return NextResponse.json(
      { error: 'Failed to delete invoice', details: error.message },
      { status: 500 }
    );
  }
}
