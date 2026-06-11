import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactInquiries, quoteRequests, sampleRequests } from '@/db/schema';
import { notifyAll } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, clientName, contactMethod, productCategory, quantity, technicalSpecs } = body;

    // Validate fields
    if (!clientName || !contactMethod || !productCategory || !quantity) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2) + Date.now().toString(36);

    const qty = parseInt(quantity, 10) || 10000;
    const specs = technicalSpecs || '';

    let estimatedAmount: number | undefined;

    if (type === 'quote') {
      // Calculate B2B estimated amount
      let pricePerPiece = 0.05;
      if (productCategory === 'Canning') pricePerPiece = 0.05;
      else if (productCategory === 'Cosmetic') pricePerPiece = 0.08;
      else if (productCategory === 'Logistics') pricePerPiece = 0.03;
      else if (productCategory === 'Special') pricePerPiece = 0.15;

      estimatedAmount = qty * pricePerPiece;

      await db.insert(quoteRequests).values({
        id,
        clientName,
        contactMethod,
        productCategory,
        quantity: qty,
        technicalSpecs: specs,
        estimatedAmount,
        status: 'pending',
        createdAt: new Date(),
      });
    } else if (type === 'sample') {
      await db.insert(sampleRequests).values({
        id,
        clientName,
        contactMethod,
        productCategory,
        quantity: qty,
        technicalSpecs: specs,
        trackingNumber: '', // Starts as empty tracking number
        status: 'pending',
        createdAt: new Date(),
      });
    } else {
      // Default: contact
      await db.insert(contactInquiries).values({
        id,
        clientName,
        contactMethod,
        productCategory,
        quantity: qty,
        technicalSpecs: specs,
        status: 'pending',
        createdAt: new Date(),
      });
    }

    // Trigger double-safeguard notification (awaited as requested!)
    await notifyAll(type || 'contact', {
      clientName,
      contactMethod,
      productCategory,
      quantity: qty,
      technicalSpecs: specs,
      estimatedAmount,
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}
