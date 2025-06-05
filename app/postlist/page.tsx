'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface PostProps {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  like: string;
  unlike: string;
}

export default function PostListPage() {
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');

  const posts: PostProps[] = Array(4).fill({
    id: '1',
    title: '스미스 A',
    content: 'blogA',
    image: '/defaultimage.png',
    date: '2025.05.12 12:12',
    like: '123',
    unlike: '12',
  });

  return (
    <main className="flex min-h-screen w-screen flex-col items-center overflow-hidden bg-white font-[Jua]">
      <div className="flex w-[1024px] flex-col gap-4 px-6 py-8">
        <div className="text-center text-3xl font-bold text-gray-900">UserName의 블로그</div>

        <div className="mt-16 flex items-end justify-between">
          <div className="text-xl text-gray-500">전체 3글</div>
          <div className="flex gap-4">
            <button onClick={() => setViewType('list')} className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-400">
              L
            </button>
            <button onClick={() => setViewType('grid')} className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-400">
              G
            </button>
          </div>
        </div>

        {viewType === 'list' && (
          <div className="flex w-full flex-col items-center border-t-2 border-black">
            {posts.map((post, index) => (
              <div key={index} className="flex w-full items-center gap-4 border-b border-gray-400 p-4">
                <Image src={post.image} alt={post.title} width={160} height={160} />
                <div className="flex w-[768px] flex-col">
                  <div className="text-2xl font-bold">{post.title}</div>
                  <div className="text-lg text-gray-500">{post.content}</div>
                  <div className="mt-2 flex gap-2 text-sm text-gray-600">
                    <div>{post.date}</div>
                    <div>추천</div>
                    <div className="text-blue-400">{post.like}</div>
                    <div>비추천</div>
                    <div className="text-orange-400">{post.unlike}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewType === 'grid' && (
          <div className="grid w-full grid-cols-3 gap-4 border-t-2 border-black">
            {posts.map((post, index) => (
              <div key={index} className="flex flex-col items-center gap-2 border-b border-gray-400 p-4">
                <Image src={post.image} alt={post.title} width={160} height={160} />
                <div className="text-xl font-semibold">{post.title}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
