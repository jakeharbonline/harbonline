import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreAdmin } from '@/lib/firebase-admin';
import { QuoteRequest } from '@/lib/mock-quotes';

/**
 * POST /api/quotes
 * Save a new quote request to Firestore
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.name || !body.projectType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();
    if (!db) {
      console.error('Firestore Admin not initialized');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Create quote document
    const quoteData: Omit<QuoteRequest, 'id'> = {
      status: 'new',
      createdAt: new Date().toISOString(),
      projectType: body.projectType,
      services: {
        design: body.services?.design || false,
        development: body.services?.development || false,
        ecommerce: body.services?.ecommerce || false,
        customSoftware: body.services?.customSoftware || false,
        seo: body.services?.seo || false,
        maintenance: body.services?.maintenance || false,
      },
      timeline: body.timeline || '',
      budget: body.budget || '',
      hasContent: body.hasContent || '',
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      description: body.description || '',
    };

    // Add to Firestore
    const docRef = await db.collection('quotes').add(quoteData);

    console.log('✅ Quote saved to Firestore:', docRef.id);

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: 'Quote request saved successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error saving quote:', error);
    return NextResponse.json(
      { error: 'Failed to save quote request' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/quotes
 * Fetch all quote requests from Firestore
 */
export async function GET() {
  try {
    const db = getFirestoreAdmin();
    if (!db) {
      console.error('Firestore Admin not initialized');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Fetch all quotes, ordered by creation date (newest first)
    const quotesSnapshot = await db
      .collection('quotes')
      .orderBy('createdAt', 'desc')
      .get();

    const quotes: QuoteRequest[] = quotesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as QuoteRequest[];

    return NextResponse.json({ quotes }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}
