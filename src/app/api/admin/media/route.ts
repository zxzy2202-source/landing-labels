import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { imageSlots, mediaFiles } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

function getR2Client() {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
  });
}

export async function GET() {
  try {
    const media = await db.select().from(mediaFiles).orderBy(desc(mediaFiles.createdAt));
    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const alt = (formData.get('alt') as string | null) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const size = file.size;
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    let width = 0;
    let height = 0;
    let imageThumbBuffer: Buffer | null = null;

    if (file.type.startsWith('image/')) {
      const metadata = await sharp(inputBuffer).metadata();
      width = metadata.width || 0;
      height = metadata.height || 0;
      imageThumbBuffer = await sharp(inputBuffer)
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toBuffer();
    }

    const thumbBuffer = imageThumbBuffer ?? inputBuffer;

    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2) + Date.now().toString(36);

    let fileUrl = '';
    let thumbUrl = '';

    const hasR2 = process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY;

    if (hasR2) {
      try {
        const r2Client = getR2Client();
        const bucketName = process.env.R2_BUCKET_NAME || 'landing-labels';
        const r2BaseUrl = process.env.NEXT_PUBLIC_R2_URL || `https://${bucketName}.r2.cloudflarestorage.com`;
        const cleanBaseUrl = r2BaseUrl.endsWith('/') ? r2BaseUrl.slice(0, -1) : r2BaseUrl;

        const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const thumbName = file.type.startsWith('image/')
          ? `thumb-${safeName.replace(/\.[^.]+$/, '')}.webp`
          : safeName;

        await r2Client.send(new PutObjectCommand({
          Bucket: bucketName,
          Key: safeName,
          Body: inputBuffer,
          ContentType: file.type || 'application/octet-stream',
        }));

        fileUrl = `${cleanBaseUrl}/${safeName}`;

        if (file.type.startsWith('image/')) {
          await r2Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: thumbName,
            Body: thumbBuffer,
            ContentType: 'image/webp',
          }));
          thumbUrl = `${cleanBaseUrl}/${thumbName}`;
        } else {
          thumbUrl = fileUrl;
        }
      } catch (r2Error) {
        console.error('R2 upload failed, falling back to local storage:', r2Error);
      }
    }

    if (!fileUrl) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const localFilePath = path.join(uploadsDir, safeName);
      fs.writeFileSync(localFilePath, inputBuffer);
      fileUrl = `/uploads/${safeName}`;

      if (file.type.startsWith('image/')) {
        const thumbName = `thumb-${safeName.replace(/\.[^.]+$/, '')}.webp`;
        const localThumbPath = path.join(uploadsDir, thumbName);
        fs.writeFileSync(localThumbPath, thumbBuffer);
        thumbUrl = `/uploads/${thumbName}`;
      } else {
        thumbUrl = fileUrl;
      }
    }

    await db.insert(mediaFiles).values({
      id,
      fileName: file.name,
      url: fileUrl,
      width,
      height,
      alt: alt || file.name,
      size,
      webpThumbUrl: thumbUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      media: {
        id,
        fileName: file.name,
        url: fileUrl,
        webpThumbUrl: thumbUrl,
        width,
        height,
        alt,
        size,
      },
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing media id' }, { status: 400 });
    }

    const media = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id)).limit(1);
    const target = media[0];

    if (!target) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    const isVideo = /\.(mp4|mov|m4v|webm|ogg)$/i.test(target.fileName) || target.url.includes('/video/') || target.url.endsWith('.mp4');
    if (isVideo) {
      return NextResponse.json({ error: 'Video deletion is not enabled here' }, { status: 400 });
    }

    await db
      .update(imageSlots)
      .set({ mediaFileId: null, updatedAt: new Date() })
      .where(eq(imageSlots.mediaFileId, id));

    const hasR2 = process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY;
    if (hasR2) {
      try {
        const bucketName = process.env.R2_BUCKET_NAME || 'landing-labels';
        const r2BaseUrl = process.env.NEXT_PUBLIC_R2_URL || `https://${bucketName}.r2.cloudflarestorage.com`;
        const cleanBaseUrl = r2BaseUrl.endsWith('/') ? r2BaseUrl.slice(0, -1) : r2BaseUrl;
        const r2Client = getR2Client();

        const keysToDelete = [target.url, target.webpThumbUrl]
          .filter(Boolean)
          .map((url) => url.replace(`${cleanBaseUrl}/`, ''));

        for (const key of keysToDelete) {
          await r2Client.send(
            new DeleteObjectCommand({
              Bucket: bucketName,
              Key: key,
            })
          );
        }
      } catch (r2DeleteError) {
        console.error('Failed to delete media from R2:', r2DeleteError);
      }
    }

    const localPaths = [target.url, target.webpThumbUrl]
      .filter((url) => typeof url === 'string' && url.startsWith('/uploads/'))
      .map((url) => path.resolve(process.cwd(), 'public', url.replace(/^\//, '')));

    for (const filePath of localPaths) {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (localDeleteError) {
        console.error('Failed to delete local media file:', localDeleteError);
      }
    }

    await db.delete(mediaFiles).where(eq(mediaFiles.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
