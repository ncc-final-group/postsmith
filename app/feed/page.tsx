'use client';

import Image from 'next/image';
import React from 'react';

interface BlogProps {
  id: string;
  userName: string;
  blogName: string;
  image: string;
}

function RecommendedBlog({ userName, blogName, image }: BlogProps) {
  return (
    <div className="flex min-w-[20rem] flex-col items-center gap-4 rounded-xl bg-white p-4">
      <figure className="relative h-60 w-60 overflow-hidden rounded-full border border-gray-500">
        <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
      </figure>
      <div className="text-xl">{blogName}</div>
      <div className="text-gray-500">{userName}</div>
      <button className="h-8 w-20 rounded-md border border-gray-500 bg-white">팔로잉</button>
    </div>
  );
}

export default function FeedPage() {
  const image1 = '/defaultimage.png';
  const RecommendedBlogs: BlogProps[] = Array(6).fill({
    id: '1',
    userName: '스미스 A',
    blogName: 'blogA',
    image: '/defaultimage.png',
  });

  const FeedItem = () => (
    <div className="flex max-w-[64rem] flex-row items-center gap-4 border-b border-gray-500 p-4">
      <Image src={image1} alt="" width={160} height={160} />
      <div className="flex max-w-[52.5rem] flex-col">
        <div className="h-10 text-2xl">Title</div>
        <div className="h-24 text-xl text-gray-500">content</div>
        <div className="flex flex-row gap-2 text-base">
          <div className="text-gray-500">2025.05.28</div>
          <div>추천</div>
          <div className="text-blue-400">123</div>
          <div>비추천</div>
          <div className="text-orange-400">321</div>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-center">
        <figure className="relative h-30 w-30 overflow-hidden rounded-full border border-gray-500">
          <Image src={image1} alt="" width={120} height={120} />
        </figure>
        <div className="text-base">BlogName</div>
        <div className="text-base text-gray-500">userName</div>
      </div>
    </div>
  );

  return (
    <main className="flex flex-col items-center p-12 font-[Jua]">
      <div className="flex flex-col gap-4 p-8">
        <div className="text-2xl font-bold text-gray-900">피드</div>
        <div className="flex h-[40rem] min-w-[64rem] flex-col overflow-y-auto border-t-2 border-black">
          <FeedItem />
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </div>
      </div>
      <div className="m-16 w-full rounded-xl bg-gray-100 p-12">
        <div className="mb-4 text-lg">추천 블로그입니다. 팔로우 해보세요</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
          {RecommendedBlogs.map((blog, index) => (
            <RecommendedBlog key={index} {...blog} />
          ))}
        </div>
      </div>
    </main>
  );
}
