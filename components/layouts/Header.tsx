import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import LoginButton from '@components/login-button';
import redisClient from '@lib/redis-client';

export interface IUserSession {
  accessToken?: string;
  userId?: string;
  email?: string;
  role?: string;
  userNickname?: string;
  profileImage?: string;
}

async function serverAction() {
  'use server';
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('CLIENT_SESSION_ID');
  const sessionData = await redisClient.get(sessionId?.value || '');
  const sessionObject = JSON.parse(sessionData || '{}') as IUserSession;
  return Object.keys(sessionObject).length > 0 ? sessionObject : undefined;
}

export default async function Header() {
  const props = await serverAction();
  return (
    <header className="sticky top-0 z-10 min-h-[74px] w-full min-w-[1230px] border-b border-gray-200 bg-white px-4 py-1 shadow-sm">
      <div className="flex flex-shrink-0 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center text-xl font-bold text-black">
            <Image src="/logo.png" alt="Logo" width={144} height={74} className="mr-2 inline-block" />
          </Link>
          <nav className="hidden gap-6 text-gray-700 md:flex">
            <Link href="/">홈</Link>
            <Link href="/feed">피드</Link>
            <Link href="/theme">테마</Link>
          </nav>
        </div>
        <div>
          <LoginButton sessionData={props} />
        </div>
      </div>
    </header>
  );
}
