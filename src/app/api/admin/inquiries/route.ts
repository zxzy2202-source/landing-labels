import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactInquiries, quoteRequests, sampleRequests } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const contacts = await db
      .select()
      .from(contactInquiries)
      .orderBy(desc(contactInquiries.createdAt));

    const quotes = await db
      .select()
      .from(quoteRequests)
      .orderBy(desc(quoteRequests.createdAt));

    const samples = await db
      .select()
      .from(sampleRequests)
      .orderBy(desc(sampleRequests.createdAt));

    return NextResponse.json({ contacts, quotes, samples });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, id, status, trackingNumber, estimatedAmount } = body;

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }

    if (type === 'contact') {
      await db
        .update(contactInquiries)
        .set({ status })
        .where(eq(contactInquiries.id, id));
    } else if (type === 'quote') {
      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (estimatedAmount !== undefined) {
        updateData.estimatedAmount = parseFloat(estimatedAmount) || 0;
      }
      await db
        .update(quoteRequests)
        .set(updateData)
        .where(eq(quoteRequests.id, id));
    } else if (type === 'sample') {
      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (trackingNumber !== undefined) {
        updateData.trackingNumber = trackingNumber;
      }
      await db
        .update(sampleRequests)
        .set(updateData)
        .where(eq(sampleRequests.id, id));
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
