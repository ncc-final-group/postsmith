'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';

export default function AddThemePage() {
  const tags = ['반응형', '블로그형', '사이트', '커뮤니티', '매거진', '미니멀'];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [themeName, setThemeName] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 16) {
      setThemeName(e.target.value);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 10 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const image1 = '/image1.png';
  const title = 'Skin\n나만의 테마을 만들어보세요.';

  return (
    <main className="min-h-screen font-[Jua]">
      <div className="mx-auto flex h-[80vh] min-w-[80rem] flex-col gap-8">
        <div className="flex min-h-[16rem] items-end justify-center bg-blue-300/50 text-4xl font-bold whitespace-pre-line text-white">
          <figure className="relative h-40 w-56">
            <Image
              src={image1}
              alt="img"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </figure>
          <div>{title}</div>
        </div>

        <div className="flex max-w-[55rem] flex-col self-center border-2 border-gray-500">
          <div className="flex items-center gap-4 border border-gray-500 p-4">
            <div className="w-40 text-xl">테마명</div>
            <input
              placeholder="테마명을 입력하세요."
              className="min-w-[24rem] focus:outline-none"
              value={themeName}
              onChange={handleChange}
            />
            <div className="ml-auto self-end text-sm text-gray-500">{themeName.length}/16</div>
          </div>

          <div className="flex items-center gap-4 border border-gray-500 p-4">
            <div className="w-40 text-xl">게시글 주소</div>
            <input placeholder="https://" className="min-w-[24rem] focus:outline-none" />
          </div>

          <div className="flex items-start gap-4 border border-gray-500 p-4">
            <div className="w-40 text-xl">태그</div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-500">내 테마과 맞는 태그를 선택해주세요.</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <button key={index} className={`cursor-pointer rounded-md border-none px-3 py-1 text-sm 
                  ${selectedTags.includes(tag) ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`} onClick={() => toggleTag(tag)} >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 border border-gray-500 p-4">
            <div className="w-40 text-xl">대표 이미지</div>

            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden"/>

            {!selectedImage && (
              <button onClick={handleUploadClick} className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-gray-500 text-gray-500 text-2xl">
                +
              </button>
            )}

            {selectedImage && (
              <div onClick={handleUploadClick} className="relative h-12 w-12 cursor-pointer overflow-hidden rounded border" title="이미지를 클릭하면 변경할 수 있습니다">
                <Image src={selectedImage} alt="미리보기" fill className="object-cover" />
              </div>
            )}

            <div className="text-sm text-gray-500">형식: jpg, jpeg, png / 용량: 10MB 이내</div>
          </div>
        </div>

        <div className="flex gap-4 self-center">
          <button className="h-12 w-30 rounded-md border-2 border-gray-500 text-sm font-bold hover:bg-gray-200">
            취소
          </button>
          <button className="h-12 w-30 rounded-md border-2 border-gray-500 text-sm font-bold hover:bg-gray-200">
            저장
          </button>
        </div>

        <div className="mt-16 border-t-2 border-gray-300 pt-8 pl-12 text-sm text-gray-500">
          테마 정보가 테마 페이지 운영 정책과 맞지 않다고 판단되는 경우 사전 통보 없이 삭제 될 수 있습니다.
        </div>
      </div>
    </main>
  );
}
