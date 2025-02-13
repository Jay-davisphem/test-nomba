import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req) {
  const { refreshToken } = await req.json();
  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token provided' }, { status: 400 });
  }
  const cookie = serialize('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
  });
  const response = NextResponse.json({ message: 'Refresh token stored' });
  response.headers.set('Set-Cookie', cookie);
  return response;
}