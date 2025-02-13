// app/api/auth/refresh/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token found' }, { status: 401 });
  }

  try {
    const response = await axios.post(
      'https://api.nomba.com/v1/auth/token/refresh',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accountId: process.env.NEXT_PUBLIC_NOMBA_ACCOUNT_ID,
        },
      }
    );

    const newAccessToken = response.data?.data?.access_token;
    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
  }
}
