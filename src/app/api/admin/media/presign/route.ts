import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 is not fully configured');
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fileName = typeof body.fileName === 'string' ? body.fileName : '';
    const contentType = typeof body.contentType === 'string' ? body.contentType : '';

    if (!fileName || !contentType) {
      return NextResponse.json({ error: 'Missing fileName or contentType' }, { status: 400 });
    }

    if (!contentType.startsWith('video/')) {
      return NextResponse.json({ error: `Unsupported video content type: ${contentType}` }, { status: 400 });
    }

    const safeFileName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const bucketName = process.env.R2_BUCKET_NAME || 'landing-labels';
    const r2BaseUrl = process.env.NEXT_PUBLIC_R2_URL || `https://${bucketName}.r2.cloudflarestorage.com`;
    const cleanBaseUrl = r2BaseUrl.endsWith('/') ? r2BaseUrl.slice(0, -1) : r2BaseUrl;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: safeFileName,
    });

    const uploadUrl = await getSignedUrl(getR2Client(), command, { expiresIn: 60 * 10 });

    return NextResponse.json({
      success: true,
      uploadUrl,
      key: safeFileName,
      fileUrl: `${cleanBaseUrl}/${safeFileName}`,
    });
  } catch (error) {
    console.error('Error creating video upload URL:', error);
    return NextResponse.json({ error: 'Failed to create video upload URL' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
