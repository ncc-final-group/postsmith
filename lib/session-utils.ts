'use server';

import { cookies } from 'next/headers';

import redisClient from '@lib/redis-client';

export interface IUserSession {
  accessToken?: string;
  userId?: string;
  email?: string;
  role?: string;
  userNickname?: string;
  profileImage?: string;
}

export default async function getUserSession() {
  'use server';
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('CLIENT_SESSION_ID');
  const sessionData = await redisClient.get(sessionId?.value || '');
  const sessionObject = JSON.parse(sessionData || '{}') as IUserSession;
  return Object.keys(sessionObject).length > 0 ? sessionObject : undefined;
}
