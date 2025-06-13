'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  /*여기는 일단 임시 유저로 받음*/
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 처음 마운트될 때 localStorage에서 상태 읽기
    const loggedIn = window.localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    // 필요하다면 이동처리 등 추가
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-10 min-h-[74px] w-full min-w-[1230px] border-b border-gray-200 bg-white px-4 py-1 shadow-sm">
      <div className="flex flex-shrink-0 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/main" className="flex items-center text-xl font-bold text-black">
            <Image src="/logo.png" alt="Logo" width={144} height={74} className="mr-2 inline-block" />
          </Link>

          <nav className="hidden gap-6 text-gray-700 md:flex">
            <Link href="/main">홈</Link>
            <Link href="/feed">피드</Link>
            <Link href="/skin">테마</Link>
          </nav>
        </div>

        {/* 오른쪽: 로그인 버튼 */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="rounded-full bg-black px-4 py-2 text-white">
              로그아웃
            </button>
          ) : (
            <Link href="/login" className="rounded-full bg-black px-4 py-2 text-white">
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
