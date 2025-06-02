'use client';

import Image from 'next/image';
import React from 'react';

export default function PostPage() {
  const image1 = '/image1.png';

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-16 p-8 font-[Jua]">
      {/* 본문 영역 */}
      <div className="flex w-full max-w-4xl flex-col gap-4">
        <div className="text-2xl text-gray-500">카테고리 없음</div>
        <div className="text-3xl font-bold">title</div>

        <div className="flex flex-row items-center text-base text-gray-500">
          <div>2025.05.28. 12:30</div>
          <div className="mx-2 h-4 w-[2px] bg-gray-400"></div>
          <div>작성자 이름</div>
        </div>

        <hr className="my-2 h-px bg-gray-400" />

        <div className="min-h-[20rem] p-4 text-xl">내용내용내용내용내용내용내용</div>

        <div className="bg-gray-100 p-4">
          <div className="flex items-end gap-4">
            <figure className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image src={image1} alt="img" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
            </figure>
            <div className="text-2xl text-black">작성자 이름</div>
          </div>
          <div className="mt-6 ml-10 text-xl text-gray-500">저는 빡빡이입니다.</div>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="flex w-full max-w-4xl flex-col gap-4">
        <div className="text-2xl font-semibold">댓글 10</div>
        <hr className="h-px bg-gray-400" />

        {/* 댓글 */}
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-end gap-4">
            <figure className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image src={image1} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
            </figure>
            <div className="text-xl">user1</div>
          </div>
          <div className="ml-16 text-xl text-gray-500">모발모발</div>
          <div className="ml-16 flex gap-4 text-sm text-gray-500">
            <div>2025.05.29. 12:12</div>
            <button className="border-b border-black">답글</button>
          </div>
        </div>

        {/* 댓글 + 대댓글 */}
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-end gap-4">
            <figure className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image src={image1} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
            </figure>
            <div className="text-xl">user1</div>
          </div>
          <div className="ml-16 text-xl text-gray-500">모발모발</div>
          <div className="ml-16 flex gap-4 text-sm text-gray-500">
            <div>2025.05.29. 12:12</div>
            <button className="border-b border-black">답글</button>
          </div>

          {/* 대댓글 영역 */}
          <div className="mx-16 flex flex-col gap-4 bg-gray-100 p-4">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex items-end gap-4">
                  <figure className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={image1} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
                  </figure>
                  <div className="text-xl">user1</div>
                </div>
                <div className="ml-16 text-xl text-gray-500">모발모발</div>
                <div className="ml-16 flex gap-4 text-sm text-gray-500">
                  <div>2025.05.29. 12:12</div>
                  {idx === 2 ? (
                    <>
                      <button className="border-b border-black">수정</button>
                      <button className="border-b border-black">삭제</button>
                    </>
                  ) : (
                    <button className="border-b border-black">답글</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
