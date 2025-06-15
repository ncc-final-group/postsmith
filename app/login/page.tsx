// 'use client';

// import { useRouter } from 'next/navigation';

// import { useMemo } from 'react';

import OAuthButton from '@components/oauth-button';

export default function LoginPage() {
  // const router = useRouter();
  let b;
  const a = fetch('http://localhost:3000/api').then((res) => res.json()).then((data) => {
    // console.log(data);
    b = data.a;
    return data.a;
  });

  function getServerUrl() {
    console.log(b);
  }
  return (
    <main>
      <section className="flex min-h-[90vh] items-center justify-center">
        <button>aaa {a}dd</button>
        <div className="flex w-96 flex-col gap-5">
          <OAuthButton provider="github" />
          <OAuthButton provider="google" />
          <OAuthButton provider="kakao" />
          <OAuthButton provider="naver" />
        </div>
      </section>
    </main>
  );
}