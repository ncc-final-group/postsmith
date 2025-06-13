'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Theme {
  id: number;
  name: string;
  cover_image: string;
  image: string;
  description: string;
  author: string;
  author_link: string;
  theme: string;
  tag: string;
}

function useThemes() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/themes')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch error');
        return res.json();
      })
      .then(setThemes)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { themes, loading, error };
}

function ThemeCard({ theme }: { theme: Theme }) {
  return (
    <div className="group flex h-[480px] w-[320px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="relative flex h-[20rem] w-full items-center justify-center bg-gray-600 p-6 text-white">
        <figure className="relative h-64 w-64 overflow-hidden rounded-lg border border-gray-300 bg-white">
          <Image src={theme.image || '/defaultimage.png'} alt={theme.name} fill sizes="288px" className="object-contain" />
        </figure>

        <div className="absolute inset-0 z-5 flex flex-col items-center justify-center gap-4 bg-black/70 p-4 text-center text-white opacity-0 group-hover:opacity-100">
          <div className="text-xl font-bold">{theme.name}</div>
          <div className="max-h-24 overflow-y-auto text-sm">{theme.description || '설명 없음'}</div>
          <div className="text-xs">
            제작자:{' '}
            <a href={theme.author_link} target="_blank" rel="noopener noreferrer" className="underline">
              {theme.author}
            </a>
          </div>
        </div>
      </div>

      <div className="flex grow flex-col items-center justify-center gap-3 p-4">
        <div className="text-xl font-bold text-black">{theme.name}</div>
        <div className="text-sm text-blue-600">#{theme.theme}</div>
        <div className="flex gap-2">
          <button className="w-28 rounded-md border border-gray-500 px-3 py-1.5 text-xs font-bold hover:bg-gray-200">작품 예시보기</button>
          <button className="w-28 rounded-md border border-gray-500 px-3 py-1.5 text-xs font-bold hover:bg-gray-200">적용</button>
        </div>
      </div>
    </div>
  );
}

function TagFilter({ tags, selectedTag, onSelect }: { tags: string[]; selectedTag: string | null; onSelect: (tag: string | null) => void }) {
  return (
    <div className="mb-8 flex gap-3 overflow-x-auto whitespace-nowrap">
      <button
        onClick={() => onSelect(null)}
        className={`max-w-[120px] truncate rounded-md px-3 py-1 text-sm ${selectedTag === null ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
      >
        #전체보기
      </button>
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onSelect(tag)}
          className={`max-w-[120px] truncate rounded-md px-3 py-1 text-sm ${selectedTag === tag ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}

export default function ThemePage() {
  const { themes, loading, error } = useThemes();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const filteredThemes = selectedTag ? themes.filter((t) => t.theme === selectedTag) : themes;

  const minGridItems = 9;
  const emptyCount = Math.max(0, minGridItems - filteredThemes.length);

  const uniqueTags = Array.from(new Set(themes.map((t) => t.theme)));
  return (
    <main className="mx-auto min-h-screen max-w-[1024px] px-6 py-8">
      <div className="mb-6 text-2xl font-bold">티스토리 테마</div>

      <TagFilter tags={uniqueTags} selectedTag={selectedTag} onSelect={setSelectedTag} />

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: 'repeat(3, 320px)',
          gridAutoRows: '480px',
          justifyContent: 'center',
        }}
      >
        {filteredThemes.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
        {[...Array(emptyCount)].map((_, idx) => (
          <div key={idx} className="invisible h-[480px] w-[320px]" />
        ))}
        {filteredThemes.length === 0 && <p className="text-center text-gray-500">선택한 태그에 해당하는 테마가 없습니다.</p>}
      </div>
    </main>
  );
}
