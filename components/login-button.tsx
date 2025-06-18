'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { IUserSession } from '@components/layouts/Header';
import queryFunction from '@lib/query-function';

interface LoginButtonProps {
  sessionData?: IUserSession;
}

interface LogoutResponse {
  message?: string;
  success: boolean;
}

export default function LoginButton({ sessionData }: LoginButtonProps) {
  const { postAxios } = queryFunction<LogoutResponse>('/logout');
  const useLogout = useMutation({ mutationFn: () => postAxios({}) });
  const isLoggedIn = sessionData !== undefined ? true : false;

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (useLogout && useLogout.data) {
      if (useLogout.data.success) {
        window.location.href = '/';
      }
    }
  }, [useLogout]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const dropdown = document.getElementById('login-dropdown-menu');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  function handleOnClick() {
    if (isLoggedIn) {
      useLogout.mutate();
    } else {
      window.location.href = '/login';
    }
  }

  function toggleDropdown() {
    setDropdownOpen((prev) => !prev);
  }

  return (
    <div className="relative inline-block">
      {isLoggedIn ? (
        <div>
          <button onClick={toggleDropdown} className="flex cursor-pointer items-center gap-2 rounded-full border-[1px] border-gray-300" type="button">
            <Image src={sessionData?.profileImage || '/defaultImage.png'} alt="profile_image" width={36} height={36} className="rounded-full" />
          </button>
          {isDropdownOpen && (
            <div id="login-dropdown-menu" className="absolute right-0 z-50 mt-2 rounded-lg border border-gray-200 bg-white whitespace-nowrap shadow-lg">
              <div className="px-4 py-2">
                <Link href="/blog" className="text- font-bold hover:underline">
                  {sessionData?.userNickname}
                </Link>
                <p className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">{sessionData?.email}</span>
                  <Link href="/blog" className="text-sm text-gray-400 hover:underline">
                    블로그관리
                  </Link>
                </p>
              </div>
              <hr className="text-gray-200" />
              <button onClick={handleOnClick} className="cursor-pointer px-4 py-2 text-sm hover:underline">
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleOnClick} className="cursor-pointer rounded-4xl bg-gray-800 px-4 py-2 text-white" type="button">
          시작하기
        </button>
      )}
    </div>
  );
}
