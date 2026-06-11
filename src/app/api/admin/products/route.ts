import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { productOverrides } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const overrides = await db.select().from(productOverrides);
    return NextResponse.json({ overrides });
  } catch (error) {
    console.error('Error fetching product overrides:', error);
    return NextResponse.json({ error: 'Failed to fetch product overrides' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { categoryIndex, itemIndex, title, desc, longDesc, imgUrl, isEnabled } = body;

    if (categoryIndex === undefined || itemIndex === undefined) {
      return NextResponse.json({ error: 'Missing indexes' }, { status: 400 });
    }

    const id = `${categoryIndex}-${itemIndex}`;

    await db
      .insert(productOverrides)
      .values({
        id,
        categoryIndex,
        itemIndex,
        title: title || null,
        desc: desc || null,
        longDesc: longDesc || null,
        imgUrl: imgUrl || null,
        isEnabled: isEnabled !== undefined ? (isEnabled ? 1 : 0) : 1,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: productOverrides.id,
        set: {
          title: title || null,
          desc: desc || null,
          longDesc: longDesc || null,
          imgUrl: imgUrl || null,
          isEnabled: isEnabled !== undefined ? (isEnabled ? 1 : 0) : 1,
          updatedAt: new Date(),
        },
      });

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving product override:', error);
    return NextResponse.json({ error: 'Failed to save override' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
