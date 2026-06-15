import { unstable_noStore as noStore } from 'next/cache';
import { db } from '@/db';
import { imageSlots, mediaFiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { DEFAULT_SLOTS } from './imageSlotsData';

export { DEFAULT_SLOTS };

export async function getSlottedImage(slotKey: string): Promise<string> {
  noStore();
  try {
    const result = await db
      .select({
        url: mediaFiles.url,
      })
      .from(imageSlots)
      .innerJoin(mediaFiles, eq(imageSlots.mediaFileId, mediaFiles.id))
      .where(eq(imageSlots.slotKey, slotKey))
      .limit(1);

    if (result.length > 0 && result[0].url) {
      return result[0].url;
    }
  } catch (error) {
    // Fail silently to use fallback
  }
  return DEFAULT_SLOTS[slotKey] || '';
}

export async function getSlottedImages(keys: string[]): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  await Promise.all(
    keys.map(async (key) => {
      result[key] = await getSlottedImage(key);
    })
  );
  return result;
}
