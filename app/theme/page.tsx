'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

interface SmithCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  isHover?: boolean;
}

export default function ThemePage() {
  const smithCards: SmithCardProps[] = [
    { id: '1', name: '스미스 A', category: '반응형', image: '/defaultimage.png', isHover: true },
    { id: '2', name: '스미스 B', category: '쇼핑', image: '/defaultimage.png', isHover: true },
    { id: '3', name: '스미스 C', category: '미니멀', image: '/defaultimage.png', isHover: true },
    { id: '4', name: '스미스 D', category: '반응형', image: '/defaultimage.png', isHover: true },
    { id: '5', name: '스미스 E', category: '쇼핑', image: '/defaultimage.png', isHover: true },
    { id: '6', name: '스미스 F', category: '미니멀', image: '/defaultimage.png', isHover: true },
  ];

  const tags = ['반응형', '블로그형', '쇼핑', '사이트', '커뮤니티', '매거진', '미니멀'];

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-8 font-[Jua]">
      <div className="mb-6 text-2xl font-bold text-gray-900">티스토리 테마</div>

      <div className="mb-8 flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <button key={index} className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            #{tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {smithCards.map((card, index) => (
          <div key={index} className="flex w-full max-w-[22.5rem] flex-col items-center overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div
              className={clsx('flex h-[17rem] w-full items-center justify-center', card.isHover ? 'group relative flex-col gap-3 overflow-hidden bg-gray-600 p-6 text-white' : '')}
            >
              <figure className="relative h-64 w-64 overflow-hidden rounded-lg border border-gray-300 bg-white">
                <Image src={card.image} alt="img" priority={false} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
              </figure>

              {card.isHover && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/70 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <figure className="relative h-24 w-24 overflow-hidden rounded-full border border-gray-400">
                    <Image src={card.image} alt="img" priority={false} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain" />
                  </figure>
                  <div className="min-h-8 w-64 truncate text-xl font-bold">{card.name}</div>
                  <div className="scrollbar-hide h-16 w-64 overflow-y-auto text-base text-gray-400">스킬설명~~~~~~~~~~~~~~~~스킬설명스킬설명스킬설명스킬설명</div>
                  <div className="flex h-16 flex-row items-center border-b border-white px-2 text-base text-gray-400">
                    <div className="flex h-8 w-40 items-end overflow-hidden text-base whitespace-nowrap text-white">dasd</div>
                    <div className="flex h-8 w-8 items-end">link</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 p-4">
              <div className="text-xl font-bold text-black">{card.name}</div>
              <div className="text-sm text-blue-600">#{card.category}</div>
              <div className="flex gap-2">
                <button className="w-24 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-bold hover:bg-blue-300 hover:text-white">작품 예시보기</button>
                <button className="w-24 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-bold hover:bg-blue-300 hover:text-white">적용</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
