import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { QuoteStatus } from '@/lib/mock-quotes';

/**
 * GET /api/quotes/[id]
 * Fetch a single quote by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getFirestoreAdmin();
    if (!db) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const doc = await db.collection('quotes').doc(params.id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(
      {
        quote: {
          id: doc.id,
          ...doc.data(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error fetching quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/quotes/[id]
 * Update a quote (status, notes, quoted amount)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const db = getFirestoreAdmin();

    if (!db) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const updateData: {
      status?: QuoteStatus;
      notes?: string;
      quotedAmount?: string;
      lastUpdated: string;
    } = {
      lastUpdated: new Date().toISOString(),
    };

    // Only include fields that are provided
    if (body.status) updateData.status = body.status;
    if (body.notes !== undefined) updateData.notes = body.notes;
    if (body.quotedAmount !== undefined)
      updateData.quotedAmount = body.quotedAmount;

    await db.collection('quotes').doc(params.id).update(updateData);

    console.log('✅ Quote updated:', params.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Quote updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error updating quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/quotes/[id]
 * Delete a quote
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getFirestoreAdmin();
    if (!db) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    await db.collection('quotes').doc(params.id).delete();

    console.log('✅ Quote deleted:', params.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Quote deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error deleting quote:', error);
    return NextResponse.json(
      { error: 'Failed to delete quote' },
      { status: 500 }
    );
  }
}
