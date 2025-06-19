'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Blog {
  id: string;
  name: string;
  nickname: string;
  description: string;
  logoImage: string;
  address: string;
}

interface Content {
  id: string;
  category_id: string;
  blog_id: string;
  sequence: string;
  type: string;
  title: string;
  contentPlain: string;
  likes: string;
  createdAt: string;
  name: string;
  nickname: string;
  contentHtml: string;
}

interface FeedContent {
  content: Content;
  blog: Blog;
}

function useRecommendedBlogs() {
  const [feedContents, setFeedContents] = useState<FeedContent[]>([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFeedContents = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/feedContents/userId/2`);
      if (!res.ok) throw new Error('Feed fetch error');
      const data: FeedContent[] = await res.json();
      setFeedContents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err as Error);
    }
  };

  const fetchRecommendedBlogs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/blogs/recommendedBlogs/userId/2`);
      if (!res.ok) throw new Error('Recommended blogs fetch error');
      const data: Blog[] = await res.json();
      setRecommendedBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchFeedContents(), fetchRecommendedBlogs()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return {
    feedContents,
    recommendedBlogs,
    loading,
    error,
    fetchFeedContents,
    fetchRecommendedBlogs,
  };
}

function FeedContentsCard({ content, blog }: { content: Content; blog: Blog }) {
  const html = content.contentHtml || '';
  const thumbNailImg = (() => {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
    return match ? match[1] : '';
  })();

  return (
    <Link href={`http://${blog.address}.postsmith/blog/${content.sequence}`} className="w-full">
      <div className="flex w-full cursor-pointer flex-col items-center gap-4 border-b border-gray-500 p-4 transition hover:bg-gray-100 sm:flex-row">
        <div className="mt-4 flex w-32 flex-col items-center gap-2 self-end">
          <figure className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-500">
            <Image fill style={{ objectFit: 'contain' }} priority src={blog.logoImage || '/defaultimage.png'} alt="profile" />
          </figure>
          <div className="max-w-32 overflow-hidden text-sm text-ellipsis whitespace-nowrap">{blog.name}</div>
          <div className="max-w-32 overflow-hidden text-sm text-ellipsis whitespace-nowrap text-gray-500">{blog.nickname}</div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="text-xl font-bold">{content.title}</div>
          <div className="line-clamp-2 h-[48px] overflow-hidden break-all text-gray-500">{content.contentPlain}</div>
          <div className="mt-2 flex flex-row gap-2 text-sm text-gray-600">
            <div>추천</div>
            <div className="text-blue-400">{content.likes}</div>
            <div>·</div>
            <div>{content.createdAt.replace('T', ' ')}</div>
          </div>
        </div>
        {thumbNailImg && (
          <figure className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl border border-gray-300">
            <Image src={thumbNailImg} alt={content.title} fill sizes="160px" className="object-cover" />
          </figure>
        )}
      </div>
    </Link>
  );
}

function RecommendedBlogsCard({ recommendedBlog, onSubscribed }: { recommendedBlog: Blog; onSubscribed: () => void }) {
  const handleSubscribe = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/api/blogs/subscription/subscriberId/2/blogId/${recommendedBlog.id}`, { method: 'PUT' });
      if (!response.ok) throw new Error('Failed to subscribe');
      alert(`"${recommendedBlog.nickname}" 블로그를 구독했습니다!`);
      onSubscribed();
    } catch {
      alert('구독에 실패했습니다.');
    }
  };

  return (
    <div className="flex max-w-sm flex-col items-center gap-3 rounded-xl bg-white p-6 shadow">
      <figure className="relative h-24 w-24 overflow-hidden rounded-full border border-gray-500">
        <Image fill style={{ objectFit: 'contain' }} priority src={recommendedBlog.logoImage || '/defaultimage.png'} alt="profile" />
      </figure>
      <div className="text-lg font-semibold">{recommendedBlog.nickname}</div>
      <div className="text-center text-sm text-gray-600">{recommendedBlog.description}</div>
      <div className="text-xs text-gray-400">{recommendedBlog.name}</div>
      <button onClick={handleSubscribe} className="mt-2 h-8 w-24 rounded-md border border-gray-500 bg-white hover:bg-gray-100">
        구독
      </button>
    </div>
  );
}

export default function FeedPage() {
  const { feedContents, recommendedBlogs, loading, error, fetchFeedContents, fetchRecommendedBlogs } = useRecommendedBlogs();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(feedContents.length / itemsPerPage);
  const pagedFeedContents = feedContents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSubscribed = () => {
    fetchRecommendedBlogs();
    fetchFeedContents();
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900">피드</h2>
        <div className="flex w-full flex-col border-t-2 border-black">
          {pagedFeedContents.map(({ content, blog }, idx) =>
            content && content.id ? (
              <FeedContentsCard key={content.id} content={content} blog={blog} />
            ) : (
              <div key={`invalid-${idx}`} className="p-4 text-red-500">
                잘못된 콘텐츠 데이터입니다.
              </div>
            ),
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="rounded border px-4 py-1 disabled:opacity-50">
            이전
          </button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded border px-4 py-1 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>

      <div className="m-8 w-full max-w-7xl overflow-hidden rounded-xl bg-gray-100 p-6 sm:p-12">
        <h3 className="mb-6 text-lg">추천 블로그입니다. 구독해보세요</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendedBlogs.slice(0, 8).map((blog) => (
            <RecommendedBlogsCard key={blog.id} recommendedBlog={blog} onSubscribed={handleSubscribed} />
          ))}
        </div>
      </div>
    </div>
  );
}
