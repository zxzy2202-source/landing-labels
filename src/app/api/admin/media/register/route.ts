import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { mediaFiles } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fileName = typeof body.fileName === 'string' ? body.fileName : '';
    const url = typeof body.url === 'string' ? body.url : '';
    const alt = typeof body.alt === 'string' ? body.alt : '';
    const size = typeof body.size === 'number' ? body.size : 0;
    const contentType = typeof body.contentType === 'string' ? body.contentType : '';
    const thumbUrl = typeof body.thumbUrl === 'string' ? body.thumbUrl : url;

    if (!fileName || !url || (!contentType.startsWith('video/') && !contentType.startsWith('image/'))) {
      return NextResponse.json({ error: 'Invalid media registration payload' }, { status: 400 });
    }

    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2) + Date.now().toString(36);

    const media = {
      id,
      fileName,
      url,
      width: 0,
      height: 0,
      alt: alt || fileName,
      size,
      webpThumbUrl: thumbUrl,
      createdAt: new Date(),
    };

    await db.insert(mediaFiles).values(media);

    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error('Error registering uploaded video:', error);
    return NextResponse.json({ error: 'Failed to register uploaded video' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
