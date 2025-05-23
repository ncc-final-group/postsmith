'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Temp_User = {
  name: 'admin',
  email: 'admin@admin.com',
  password: '1234',
};

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    setLoading(true);

    // 임시 유저 체크
    if (email === Temp_User.email && password === Temp_User.password) {
      router.push('/main');
    } else {
      setErrorMsg('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
    setLoading(false);
  };

  /*setLoading(true);
  try {
    const res = await axios.post('/api/login', { email, password });
    if (res.status === 200) {
      router.push('/dashboard');
    }
  } catch (err) {
    setErrorMsg('로그인에 실패했습니다. 다시 시도해주세요.');
  } finally {
    setLoading(false);
  }*/

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className="mx-auto max-w-[400px] pt-[100px]">
      <Image src="/mainlogo.png" alt="Logo" width={360} height={180} />
      <h5 className="mt-4 mb-2">Email</h5>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorMsg('');
        }}
        onKeyDown={handleKeyDown}
        className="mb-2.5 w-full rounded-[10px] border border-black p-2.5"
      />
      <h5 className="mb-2">Password</h5>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrorMsg('');
        }}
        onKeyDown={handleKeyDown}
        className="mb-2.5 w-full rounded-[10px] border border-black p-2.5"
      />
      {errorMsg && <p className="mb-2 text-red-500">{errorMsg}</p>}

      <div className="relative mt-2">
        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="font-jua w-full rounded bg-[#7FBFFF] py-2 text-xl text-white transition-colors hover:bg-[#5aa3e2] disabled:cursor-not-allowed disabled:bg-blue-200"
        >
          {loading ? '로딩 중...' : '로그인'}
        </button>
        {/* 오른쪽 아래 Sign Up 버튼 (absolute로 배치) */}
        <button
          onClick={handleSignUp}
          className="absolute right-0 bottom-[-34px] px-1 text-xs text-[#298cff] underline hover:text-[#1058a8]"
          type="button"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
