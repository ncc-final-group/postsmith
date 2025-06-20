'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import LoginButton from '@components/login-button';
import { IUserSession } from '@lib/session-utils';

export interface IUserInfo {
  accessToken: string;
  userId: string;
  email: string;
  role: string;
  userNickname: string;
  profileImage: string;
}

export default function Header({ props }: { props: IUserSession | undefined }) {
  const userInfo = useMemo<IUserInfo | undefined>(() => {
    if (props) {
      return {
        accessToken: props.accessToken ? props.accessToken : '',
        userId: props.userId ? props.userId : '',
        email: props.email ? props.email : '',
        role: props.role ? props.role : '',
        userNickname: props.userNickname ? props.userNickname : '',
        profileImage: props.profileImage ? props.profileImage : '',
      };
    }
  }, [props]);

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
          <LoginButton sessionData={userInfo} />
        </div>
      </div>
    </header>
  );
}
