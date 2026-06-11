import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'zxpapers-super-secret-key-2026-dynamic-signing-token-9988'
);

export async function signJWT(payload: { id: string; username: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Expire in 24 hours
    .sign(SECRET);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { id: string; username: string; role: string };
  } catch (error) {
    return null;
  }
}
