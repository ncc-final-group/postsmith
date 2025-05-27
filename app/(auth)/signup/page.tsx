'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignupPage = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // 회원가입 후 login 페이지로 이동
  const handleSignup = async () => {
    if (!name || !email || !password) {
      setErrorMsg('이름, 이메일, 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      // 실제 회원가입 API 연동하는 경우
      // await axios.post('/api/signup', { name, email, password });
    } catch (err) {
      // 에러시 메시지 출력 등 처리 가능
    } finally {
      setLoading(false);
      router.push('/login');
    }
  };

  // 뒤로가기
  const handleBack = () => {
    router.back();
  };

  // 엔터키 입력시 회원가입 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="mx-auto max-w-[400px] pt-[100px]">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleBack}
        className="absolute top-3 left-3 rounded border border-[#7FBFFF] bg-white px-3 py-1 text-sm text-[#298cff] transition-colors hover:bg-[#eaf5ff]"
        type="button"
      >
        ← 뒤로가기
      </button>
      <Image src="/mainlogo.png" alt="Logo" width={360} height={180} />
      <h5 className="mt-4 mb-2">Name</h5>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setErrorMsg('');
        }}
        onKeyDown={handleKeyDown}
        className="mb-2.5 w-full rounded-[10px] border border-black p-2.5"
      />
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
      <h5 className="mt-4 mb-2">Password</h5>
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
        {/* 회원가입 버튼 */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="font-jua w-full rounded bg-[#7FBFFF] py-2 text-xl text-white transition-colors hover:bg-[#5aa3e2] disabled:cursor-not-allowed disabled:bg-blue-200"
        >
          {loading ? '로딩 중...' : '회원가입'}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
