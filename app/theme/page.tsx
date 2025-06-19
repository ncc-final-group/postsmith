'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Theme {
  id: number;
  name: string;
  coverImage: string;
  image: string;
  description: string;
  author: string;
  authorLink: string;
  theme: string;
  tag: string;
}

interface Tag {
  id: number;
  type: string;
  name: string;
}

interface ThemeTag {
  theme: Theme;
  tag: Tag;
}

function useThemes() {
  const [themeTags, setThemeTags] = useState<ThemeTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchThemeTags = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/themes/a`);
      if (!res.ok) throw new Error('Themes fetch error');
      const data: ThemeTag[] = await res.json();
      setThemeTags(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchThemeTags()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return {
    themeTags,
    loading,
    error,
  };
}

function ThemeCard({ theme, tag, onApply }: { theme: Theme; tag: Tag; onApply: (theme: Theme) => void }) {
  return (
    <div className="group flex h-[480px] w-[400px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="relative flex h-[20rem] w-full items-center justify-center bg-gray-600 p-6 text-white">
        <figure className="relative h-64 w-64 overflow-hidden rounded-lg border border-gray-300 bg-white">
          <Image src={theme.image || '/defaultimage.png'} alt={theme.name} fill sizes="288px" className="object-contain" />
        </figure>

        <div className="absolute inset-0 z-5 flex flex-col items-center justify-center gap-4 bg-black/70 p-4 text-center text-white opacity-0 group-hover:opacity-100">
          <div className="text-xl font-bold">{theme.name}</div>
          <div className="max-h-24 overflow-y-auto text-sm">{theme.description || '설명 없음'}</div>
          <div className="text-xs">
            제작자:{' '}
            <a href={theme.authorLink} target="_blank" rel="noopener noreferrer" className="underline">
              {theme.author}
            </a>
          </div>
        </div>
      </div>

      <div className="flex grow flex-col items-center justify-center gap-3 p-4">
        <div className="text-xl font-bold text-black">{theme.name}</div>
        <div className="text-sm text-blue-600">#{tag.name}</div>
        <div className="flex gap-2">
          <a
            href={theme.authorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-28 rounded-md border border-gray-500 px-3 py-1.5 text-center text-xs font-bold hover:bg-gray-200"
          >
            작품 예시보기
          </a>
          <button onClick={() => onApply(theme)} className="w-28 rounded-md border border-gray-500 px-3 py-1.5 text-xs font-bold hover:bg-gray-200">
            적용
          </button>
        </div>
      </div>
    </div>
  );
}

function TagFilter({ tags, selectedTag, onSelect }: { tags: Tag[]; selectedTag: string | null; onSelect: (tag: string | null) => void }) {
  return (
    <div className="mb-4 flex overflow-x-auto whitespace-nowrap">
      <button
        onClick={() => onSelect(null)}
        className={`max-w-[120px] truncate rounded-md px-2 text-sm ${selectedTag === null ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
      >
        #전체보기
      </button>
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onSelect(tag.name)}
          className={`max-w-[120px] truncate rounded-md px-2 text-sm ${selectedTag === tag.name ? 'text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
        >
          #{tag.name}
        </button>
      ))}
    </div>
  );
}

export default function ThemePage() {
  const { themeTags, loading, error } = useThemes();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  const blogId = 1;
  const themeId = 11;

  const handleApplyTheme = async (theme: Theme) => {
    if (applying) return;
    setApplying(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/themes/applyTheme/blogId/${blogId}/themeId/${themeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!res.ok) throw new Error('테마 적용 실패');
      alert('테마가 성공적으로 적용되었습니다.');
    } catch (err) {
      alert('테마 적용 중 오류가 발생했습니다.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const filteredThemes = selectedTag ? themeTags.filter((t) => t.tag.name === selectedTag) : themeTags;

  const minGridItems = 9;
  const emptyCount = Math.max(0, minGridItems - filteredThemes.length);

  const uniqueTags = Array.from(new Map(themeTags.map((t) => [t.tag.id, t.tag])).values());

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8">
        <div className="mb-4 text-2xl font-bold">티스토리 테마</div>

        <TagFilter tags={uniqueTags} selectedTag={selectedTag} onSelect={setSelectedTag} />

        <div className="mb-8 h-px w-full bg-gray-300" />

        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(3, 400px)',
            gridAutoRows: '480px',
            justifyContent: 'center',
          }}
        >
          {filteredThemes.map((themeTags) => (
            <ThemeCard key={themeTags.theme.id} theme={themeTags.theme} tag={themeTags.tag} onApply={handleApplyTheme} />
          ))}
          {[...Array(emptyCount)].map((_, idx) => (
            <div key={idx} className="invisible h-[480px] w-[320px]" />
          ))}
          {filteredThemes.length === 0 && <p className="text-center text-gray-500">선택한 태그에 해당하는 테마가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
}
