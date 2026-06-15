import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { imageSlots, mediaFiles } from '@/db/schema';
import { and, desc, eq, or } from 'drizzle-orm';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { DeleteObjectCommand, S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function GET() {
  try {
    const files = await db
      .select()
      .from(mediaFiles)
      .orderBy(desc(mediaFiles.createdAt));
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json({ error: 'Failed to list media' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const alt = formData.get('alt') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const size = file.size;

    // Read image metadata using sharp
    let width = 0;
    let height = 0;
    try {
      const metadata = await sharp(buffer).metadata();
      width = metadata.width || 0;
      height = metadata.height || 0;
    } catch (sharpMetaErr) {
      console.error('Sharp reading metadata failed, using default 0:', sharpMetaErr);
    }

    // Generate WebP 400px thumbnail
    let thumbBuffer: any = buffer;
    try {
      thumbBuffer = await sharp(buffer)
        .resize({ width: 400 })
        .toFormat('webp')
        .toBuffer();
    } catch (sharpResizeErr) {
      console.error('Sharp thumbnail resize failed, using original file buffer:', sharpResizeErr);
    }
    
    const thumbFileName = `thumb-${fileName.split('.')[0]}.webp`;

    let fileUrl = '';
    let thumbUrl = '';

    const hasR2 = process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY;

    if (hasR2) {
      try {
        const r2Client = new S3Client({
          region: 'auto',
          endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
          credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
          },
        });

        const bucketName = process.env.R2_BUCKET_NAME || 'landing-labels';

        // 1. Upload original file
        await r2Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
          })
        );

        // 2. Upload thumbnail
        await r2Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: thumbFileName,
            Body: thumbBuffer,
            ContentType: 'image/webp',
          })
        );

        const r2BaseUrl = process.env.NEXT_PUBLIC_R2_URL || `https://${bucketName}.r2.cloudflarestorage.com`;
        const cleanBaseUrl = r2BaseUrl.endsWith('/') ? r2BaseUrl.slice(0, -1) : r2BaseUrl;

        fileUrl = `${cleanBaseUrl}/${fileName}`;
        thumbUrl = `${cleanBaseUrl}/${thumbFileName}`;
        console.log('Successfully uploaded file to Cloudflare R2!');
      } catch (r2Error) {
        console.error('R2 upload failed, falling back to local:', r2Error);
        // Fallback to local will happen below
      }
    }

    // Fallback to local file system if R2 is not configured or fails
    if (!fileUrl) {
      const uploadDir = path.resolve(process.cwd(), 'public/uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, fileName), buffer);
      fs.writeFileSync(path.join(uploadDir, thumbFileName), thumbBuffer);

      fileUrl = `/uploads/${fileName}`;
      thumbUrl = `/uploads/${thumbFileName}`;
      console.log('Successfully saved file locally in public/uploads!');
    }

    // Save to DB
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2) + Date.now().toString(36);

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
      }
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Node.js required for Sharp!
 (!id) {
      return NextResponse.json({ error: 'Missing media id' }, { status: 400 });
    }

    const media = await db.select().from(mediaFiles).where(eq(mediaFiles.id, id)).limit(1);
    const target = media[0];

    if (!target) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
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
export const runtime = 'nodejs'; // Node.js required for Sharp!
