'use client';

import clsx from 'clsx';
import Image from 'next/image';

type ProviderType = 'google' | 'github' | 'kakao' | 'naver';

export default function OAuthButton({ provider }: { provider: ProviderType }) {
  function handleOnClick() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_SERVER}/oauth2/authorize/${provider}`;
  }

  const providerText = {
    google: '구글로 로그인',
    github: '깃허브로 로그인',
    kakao: '카카오로 로그인',
    naver: '네이버로 로그인',
  };

  const providerStyles = {
    google: 'border border-[#e3e3e3] bg-white text-black hover:bg-[#f2f2f2]',
    github: 'bg-[#171717] text-white hover:bg-[#383838]',
    kakao: 'bg-[#ffe500] text-black hover:bg-[#f4dc00]',
    naver: 'bg-[#00c73c] text-white hover:bg-[#00af35]',
  };
  const providerIcons = {
    google: <Image src="/logo/google.svg" alt="Google Logo" width={20} height={20} className="w-auto" />,
    github: <Image src="/logo/github.svg" alt="Github Logo" width={20} height={20} className="w-auto" />,
    kakao: <Image src="/logo/kakao.svg" alt="Kakao Logo" width={20} height={20} className="w-auto" />,
    naver: <Image src="/logo/naver.svg" alt="Naver Logo" width={20} height={20} className="w-auto" />,
  };

  return (
    <a onClick={handleOnClick} className={clsx('flex h-14 w-72 cursor-pointer items-center justify-between rounded-lg', providerStyles[provider])}>
      <figure className="flex w-16 items-center justify-center space-x-2 pl-2">{providerIcons[provider]}</figure>
      <span className="font-base w-full text-center text-lg">{providerText[provider]}</span>
    </a>
  );
}
