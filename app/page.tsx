import { cookies } from 'next/headers';

import redisClient from '@lib/redis-client';
import ClientRoot from 'components/ClientRoot';

export interface IUserSession {
  accessToken?: string;
  userId?: string;
  email?: string;
  role?: string;
  userNickname?: string;
  profileImage?: string;
  blogAddress?: string;
  myBlogAddress?: string;
}

async function serverAction() {
  'use server';
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('CLIENT_SESSION_ID');
  const sessionData = await redisClient.get(sessionId?.value || '');
  const sessionObject = JSON.parse(sessionData || '{}') as IUserSession;
  if (!sessionObject.userId || !sessionObject.accessToken) {
    return undefined;
  }

  if (!sessionObject.userId || !sessionObject.accessToken) {
    return undefined;
  }

  if (!sessionObject.blogAddress) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/mainContents/blog-address/${sessionObject.userId}`);
    if (res.ok) {
      const myBlogAddress = await res.text();
      sessionObject.myBlogAddress = myBlogAddress;

      // Redis에도 다시 저장 (선택 사항)
      await redisClient.set(sessionId?.value || '', JSON.stringify(sessionObject));
    }
  }
  return sessionObject;
}

export default async function RootPage() {
  const props = await serverAction(); // 모든 사용자 + 통계 정보 포함됨
  return <ClientRoot props={props} />;
}
