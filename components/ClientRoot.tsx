'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'; // 추가!
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IUserSession } from '@app/page';

import 'swiper/css/pagination';
import 'swiper/css';
import QuickLinks from '@components/QuickLinks';

const sliderPosts = [
  { id: 1, title: '이번년도 가장 핫한 코인은 ?', summary: '올해 들어 가장 인기가 많았던 코인중 하나인 비트코인...', imageUrl: '/defaultimage1.png' },
  { id: 2, title: '게장을 먹는다면 여기를 꼭 가라', summary: '게장은 역시 간장게장이죠? 여러분 제가 소개해 드릴 식당은 바로...', imageUrl: '/defaultimage2.png' },
  { id: 3, title: '한국의 아름다움', summary: '한국은 4계절이 뚜렷한 나라다. 그렇기에 각 계절마다의 아름다움을 가지고 있다. 그 중 ...', imageUrl: '/defaultimage3.png' },
]; // <= 13개로 제한!

interface Post {
  id: number;
  title: string;
  contentPlain: string;
  imageUrl?: string; // 슬라이더처럼 이미지가 없을 수도 있으므로 optional
  contentHtml?: string; // 이미지가 없을 때 대체로 쓸 내용
  createdAt: string;
  blogAddress: string;
  myBlogAddress: string;
  sequence: number;
}

interface ClientRootProps {
  props?: IUserSession;
}

export default function ClientRoot({ props }: ClientRootProps) {
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  const isLoggedIn = props !== undefined;

  async function fetchRecommendedAndLatestPosts() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_SERVER + '/api/mainContents/all'); // 본인이 만든 API 엔드포인트로 변경
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();

      setRecommendedPosts(data.recommended ?? []);
      setLatestPosts(data.latest ?? []);
    } catch (err) {}
  }

  function extractFirstImageSrc(html: string): string | null {
    if (!html) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const img = doc.querySelector('img');
    return img?.getAttribute('src') || null;
  }

  useEffect(() => {
    setPaginationEl(paginationRef.current);
    fetchRecommendedAndLatestPosts();
  }, []);

  const crown = ['🥇', '🥈', '🥉'];

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 transition-colors duration-500 dark:bg-zinc-900 dark:text-gray-100">
      <main className="container mx-auto max-w-[1600px] flex-grow px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="flex flex-col gap-10 lg:flex-row">
          <section className="flex w-full flex-col lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative mb-6 w-full rounded-3xl border border-gray-200 bg-white p-0 shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
            >
              {paginationEl && (
                <Swiper
                  key="swiper-mounted"
                  modules={[Pagination, Autoplay]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop
                  pagination={{ clickable: true, el: paginationEl }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  className="max-h-[300px] w-full cursor-pointer overflow-hidden rounded-3xl"
                >
                  {sliderPosts.map((post) => (
                    <SwiperSlide key={post.id}>
                      <div className="relative min-h-[300px] w-full bg-cover bg-center" style={{ backgroundImage: `url(/defaultimage${post.id}.png)` }}>
                        <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                          <div className="text-xl font-bold">{post.title}</div>
                          <div className="text-sm">{post.summary}</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </motion.div>
            <div ref={paginationRef} className="mb-6 flex justify-center" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
            >
              <h2 className="mb-6 text-2xl font-extrabold text-amber-600 dark:text-yellow-300">💡 추천 게시글</h2>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {recommendedPosts.map((post, index) => {
                  const imageUrl = extractFirstImageSrc(post.contentHtml ?? '') ?? `/defaultimage.png`;

                  return (
                    <motion.li
                      key={post.id}
                      whileHover={{ scale: 1.05 }}
                      className="relative min-w-[280px] cursor-pointer rounded-xl via-white to-yellow-50 transition-transform dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-700"
                    >
                      <a href={`https://${post.blogAddress}.${process.env.NEXT_PUBLIC_BASE_URL}/${post.sequence}`} target="_blank" rel="noopener noreferrer" className="block">
                        <figure className="relative h-40 rounded-xl border border-gray-300">
                          <Image src={imageUrl} alt={post.title} fill className="mb-2 w-full rounded-md object-cover" />
                        </figure>
                        <div className="absolute -top-3 -left-3 text-2xl">{crown[index]}</div>
                        <div className="mb-1 truncate text-lg font-semibold text-yellow-800 dark:text-yellow-200">{post.title}</div>
                        <div className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">{post.contentPlain}</div>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
              <h2 className="mb-4 text-xl font-bold text-amber-700 dark:text-yellow-300">🕒 최신 게시글</h2>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {latestPosts.map((post) => {
                  const imageUrl = extractFirstImageSrc(post.contentHtml ?? '') ?? `/defaultimage.png`;

                  return (
                    <motion.li
                      key={post.id}
                      whileHover={{ scale: 1.02 }}
                      className="mb-4 flex items-start justify-between gap-4 rounded-xl bg-zinc-50 p-4 shadow-sm transition hover:shadow-md dark:bg-zinc-700"
                    >
                      <a href={`https://${post.blogAddress}.${process.env.NEXT_PUBLIC_BASE_URL}/${post.sequence}`} target="_blank" rel="noopener noreferrer" className="flex gap-4">
                        <Image src={imageUrl} alt={post.title} width={80} height={80} className="h-20 w-20 rounded-md object-cover" />
                        <div className="flex-1">
                          <div className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-200">{post.title}</div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">{post.contentPlain}</div>
                          <div className="pt-1 text-xs text-gray-400 dark:text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</div>
                        </div>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </section>
          <aside className="w-full space-y-6 lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-800"
            >
              {isLoggedIn ? (
                <>
                  {/* 유저 프로필 정보 */}
                  <div className="flex min-h-[100px] items-center gap-4">
                    <Link href={`https://${props.myBlogAddress}.${process.env.NEXT_PUBLIC_BASE_URL}/blog/${props.userId}`}>
                      <Image
                        src={props.profileImage || '/defaultimage.png'}
                        alt="프로필"
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full border-4 border-yellow-300 object-cover dark:border-zinc-500"
                      />
                    </Link>
                    <div className="flex flex-col">
                      <div className="text-lg font-bold">{props.userNickname}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">구독자 {props.myBlogAddress ? '3' : '0'}명</div>
                    </div>
                  </div>

                  {/* 블로그 주소 유무로 분기 */}
                  {props.myBlogAddress ? (
                    <>
                      {/* 블로그가 있는 경우: 버튼 + 통계 */}
                      <div className="mt-4 grid grid-cols-3 divide-x divide-gray-200 overflow-hidden rounded-xl border text-sm dark:divide-gray-600">
                        <Link href={`https://${props.myBlogAddress}.${process.env.NEXT_PUBLIC_BASE_URL}/edit`} className="py-2 text-center hover:bg-gray-50 dark:hover:bg-zinc-700">
                          글쓰기
                        </Link>
                        <Link
                          href={`https://${props.myBlogAddress}.${process.env.NEXT_PUBLIC_BASE_URL}/blog/${props.userId}`}
                          className="py-2 text-center hover:bg-gray-50 dark:hover:bg-zinc-700"
                        >
                          내 블로그
                        </Link>
                        <Link
                          href={`https://${props.myBlogAddress}.${process.env.NEXT_PUBLIC_BASE_URL}/usermanage`}
                          className="py-2 text-center hover:bg-gray-50 dark:hover:bg-zinc-700"
                        >
                          내 관리
                        </Link>
                      </div>

                      {/* 통계 영역 */}
                      <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex justify-between">
                          <span>조회수</span>
                          <span>76회</span>
                        </div>
                        <div className="flex justify-between">
                          <span>방문자</span>
                          <span>6명</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 블로그 없는 경우: 안내문 + 생성 버튼 */}
                      <div className="mt-6 text-center text-sm font-medium text-red-500">블로그가 존재하지 않습니다. 블로그를 생성해주세요.</div>
                      <div className="mt-4 flex justify-center">
                        <Link
                          href={`https://${props.myBlogAddress}.${process.env.NEXT_PUBLIC_BASE_URL}/blog/${props.userId}`}
                          className="rounded-full bg-yellow-500 px-6 py-2 text-white shadow transition hover:bg-yellow-600"
                        >
                          블로그 생성하러 가기
                        </Link>
                      </div>
                    </>
                  )}
                </>
              ) : (
                // 로그인 안 된 사용자
                <div className="text-center">
                  <div className="mb-4 text-lg font-semibold">Postsmith에 오신 걸 환영합니다 👋</div>
                  <Link href="/login" className="rounded-full bg-yellow-500 px-6 py-2 text-white shadow transition hover:bg-yellow-600">
                    시작하기
                  </Link>
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow dark:border-zinc-700 dark:bg-zinc-800"
            >
              <QuickLinks />
            </motion.div>
          </aside>
        </motion.div>
      </main>
    </div>
  );
}
