'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'; // 추가!
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';

import QuickLinks from '@components/QuickLinks';

const userProfile = {
  id: 1,
  username: 'admin',
  avatar: '/profile.png',
  subscriber: 1234,
  views: 123456,
  visits: 13,
};

const sliderPosts = [
  { id: 1, title: '이번년도 가장 핫한 코인은 ?', summary: '올해 들어 가장 인기가 많았던 코인중 하나인 비트코인...', imageUrl: '/defaultimage1.png' },
  { id: 2, title: '게장을 먹는다면 어기를 꼭 가라', summary: '게장은 역시 간장게장이죠? 여러분 제가 소개해 드릴 식당은 바로...', imageUrl: '/defaultimage2.png' },
  { id: 3, title: '한국의 아름다움', summary: '한국은 4계절이 뚜렷한 나라다. 그렇기에 각 계절마다의 아름다움을 가지고 있다. 그 중 ...', imageUrl: '/defaultimage3.png' },
];

const recommendedPosts = [
  { id: 11, title: '구내염에는 알보칠이 별로다?', summary: '여러분 구내염에 걸렸을 때, 알보칠 많이 바르시죠? 그거 생각보다 별...' },
  { id: 12, title: '6월의 휴일', summary: '여러분 이번 6월, 재선거때문에 생긴 휴일 어떻게 쓸지 고민중이신가요?...' },
  { id: 13, title: '코끼리', summary: '아저씨는 코가 손이래' },
  { id: 14, title: '왜 항상 우리팀 야스오는', summary: '과학인가? 궁금하셧죠? 제가 그것과 관련된 연구를 했습...' },
  { id: 15, title: '뭐쓰지', summary: '뭐하지' },
  { id: 16, title: '아침형 인간의 장단점', summary: '일찍 일어나는 새가 벌레를 잡는다고 하는데, 과연 그럴까요?' },
  { id: 17, title: '나만의 공부법 공유', summary: '효율적인 암기법과 시간 활용 노하우를 정리합니다.' },
  { id: 18, title: '혼밥 맛집 추천', summary: '혼자서도 부담 없이 방문할 수 있는 서울 맛집 리스트입니다.' },
  { id: 19, title: '스마트폰 사진 꿀팁', summary: '카메라 앱 설정부터 후보정까지, 스마트폰 사진 잘 찍는 법!' },
  { id: 20, title: '운동 루틴 공개', summary: '초보자도 쉽게 따라할 수 있는 홈트레이닝 루틴을 소개합니다.' },
  { id: 21, title: '대체 왜이럴까?', summary: '인생에는 늘 생각지 못한 일이 벌어진다.' },
  { id: 22, title: '맛집 리스트 총정리', summary: '분위기 좋은 카페, AND 코스요리까지!' },
  { id: 23, title: '여행을 떠나요', summary: '힐링이 필요할 땐 여행만한 게 없다.' },
]; // <= 13개로 제한!

interface Post{
  id:number,
  title:string,
  summary:string,
  imageUrl:string,
}

interface ClientRootProps {
  isLoggedIn?: boolean;
}


export default function ClientRoot({ isLoggedIn }: ClientRootProps) {
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);


  async function fetchRecommendedAndLatestPosts() {
    try {
      const res = await fetch( process.env.NEXT_PUBLIC_API_SERVER + '/api/mainContents/all'); // 본인이 만든 API 엔드포인트로 변경
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();

      setRecommendedPosts(data.recommended ?? []);
      setLatestPosts(data.latest ?? []);
    }
    catch (err) {
    }
  }


  useEffect(() => {
    setPaginationEl(paginationRef.current);
    fetchRecommendedAndLatestPosts();
  }, []);


  const crown = ['🥇', '🥈', '🥉'];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <main className="container mx-auto max-w-7xl flex-grow py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row gap-10"
        >
          <section className="flex flex-col w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative mb-6 w-full rounded-3xl bg-white dark:bg-zinc-800 p-0 shadow-xl border border-gray-200 dark:border-zinc-700"
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
                  className="h-64 w-full overflow-hidden rounded-3xl"
                >
                  {sliderPosts.map((post) => (
                    <SwiperSlide key={post.id}>
                      <div
                        className="relative h-64 w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(/defaultimage${post.id}.png)` }}
                      >
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
              className="w-full rounded-3xl bg-white dark:bg-zinc-800 p-6 shadow-xl border border-gray-100 dark:border-zinc-700"
            >
              <h2 className="mb-6 text-2xl font-extrabold text-amber-600 dark:text-yellow-300">
                💡 추천 게시글
              </h2>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {recommendedPosts.map((post, index) => (
                  <motion.li
                    key={post.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-xl bg-gradient-to-br
                    from-amber-50 via-white to-yellow-50 dark:from-zinc-700
                    dark:via-zinc-800 dark:to-zinc-700 p-5 shadow-md hover:shadow-xl transition-transform"
                  >
                    <div className="absolute -top-3 -left-3 text-2xl">{crown[index]}</div>
                    <div className="truncate text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                      {post.title}
                    </div>
                    <div className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                      {post.summary}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
              <h2 className="mb-4 text-xl font-bold text-amber-700 dark:text-yellow-300">
                🕒 최신 게시글
              </h2>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {latestPosts.map((post) => (
                  <motion.li
                    key={post.id}
                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                    whileHover={{ scale: 1.02 }}
                    className="mb-4 flex justify-between items-start gap-4 rounded-xl bg-zinc-50 dark:bg-zinc-700 p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      <div className="font-semibold text-base text-gray-900 dark:text-gray-200 mb-1">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {post.summary}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap pt-1">
                      {new Date().toLocaleDateString()}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </section>
          <aside className="w-full lg:w-2/5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl bg-white dark:bg-zinc-800 p-6 shadow-xl border border-gray-100 dark:border-zinc-700"
            >
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-4">
                    <Image
                      src={userProfile.avatar}
                      alt="프로필"
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full border-4 border-yellow-300 dark:border-zinc-500 object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="text-lg font-bold">{userProfile.username}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        구독자 {userProfile.subscriber.toLocaleString()}명
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-600 border rounded-xl overflow-hidden text-sm">
                    <Link href="/edit" className="py-2 text-center hover:bg-gray-50 dark:hover:bg-zinc-700">글쓰기</Link>
                    <Link href="/myblog" className="py-2 text-center hover:bg-gray-50 dark:hover:bg-zinc-700">내 블로그</Link>
                    <Link href="/usermanage" className="py-2 text-center hover:bg-gray-50 dark:hover:bg-zinc-700">내 관리</Link>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>조회수</span>
                      <span>{userProfile.views.toLocaleString()}회</span>
                    </div>
                    <div className="flex justify-between">
                      <span>방문자</span>
                      <span>{userProfile.visits.toLocaleString()}명</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-4 text-lg font-semibold">
                    Postsmith에 오신 걸 환영합니다 👋
                  </div>
                  <Link
                    href="/login"
                    className="rounded-full bg-yellow-500 px-6 py-2 text-white shadow hover:bg-yellow-600 transition"
                  >
                    시작하기
                  </Link>
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow border border-gray-100 dark:border-zinc-700"
            >
              <QuickLinks />
            </motion.div>
          </aside>
        </motion.div>
      </main>
    </div>
  );
}

