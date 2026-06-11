import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { imageSlots, mediaFiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { DEFAULT_SLOTS } from '@/lib/imageSlots';

export async function GET() {
  try {
    // Get all image slots currently in DB
    const slotsInDb = await db
      .select({
        slotKey: imageSlots.slotKey,
        mediaFileId: imageSlots.mediaFileId,
        url: mediaFiles.url,
        fileName: mediaFiles.fileName,
      })
      .from(imageSlots)
      .leftJoin(mediaFiles, eq(imageSlots.mediaFileId, mediaFiles.id));

    // Map slots by key
    const dbSlotsMap = new Map(slotsInDb.map(s => [s.slotKey, s]));

    // Build the complete slots list with all registered slots
    const slots = Object.keys(DEFAULT_SLOTS).map((key) => {
      const bound = dbSlotsMap.get(key);
      return {
        slotKey: key,
        fallbackUrl: DEFAULT_SLOTS[key],
        mediaFileId: bound?.mediaFileId || null,
        boundUrl: bound?.url || null,
        boundFileName: bound?.fileName || null,
      };
    });

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { slotKey, mediaFileId } = await req.json();

    if (!slotKey) {
      return NextResponse.json({ error: 'Missing slotKey' }, { status: 400 });
    }

    // Insert or update slot mapping
    await db
      .insert(imageSlots)
      .values({
        slotKey,
        mediaFileId: mediaFileId || null, // Allow unbinding
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: imageSlots.slotKey,
        set: {
          mediaFileId: mediaFileId || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating slot binding:', error);
    return NextResponse.json({ error: 'Failed to update slot binding' }, { status: 500 });
  }
}
