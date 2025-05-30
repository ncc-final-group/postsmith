'use client';

import Image from 'next/image'; // 추가!
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
// import './swiper-custom.css'; // (아래 커스텀 참고, 선택사항)
// import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import QuickLinks from '@components/QuickLinks';

const sliderPosts = [
  { id: 1, title: '이번년도 가장 핫한 코인은 ?', summary: '올해 들어 가장 인기가 많았던 코인중 하나인 비트코인...' },
  { id: 2, title: '게장을 먹는다면 어기를 꼭 가라', summary: '게장은 역시 간장게장이죠? 여러분 제가 소개해 드릴 식당은 바로...' },
  { id: 3, title: '한국의 아름다움', summary: '한국은 4계절이 뚜렷한 나라다. 그렇기에 각 계절마다의 아름다움을 가지고 있다. 그 중 ...' },
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

const userProfile = {
  username: 'admin',
  avatar: '/profile.png',
  subscriber: 1234,
  views: 123456,
  visits: 13,
};

export default function RootPage() {
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  const gridPosts = recommendedPosts.slice(0, 3); // 상단에 3개만 카드를 보여줌
  const listPosts = recommendedPosts.slice(3, 13); // 나머지는 리스트

  useEffect(() => {
    setPaginationEl(paginationRef.current);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <main className="container mx-auto max-w-7xl flex-grow py-10">
        <div className="flex min-w-0 gap-8">
          <section className="flex min-w-0 basis-3/5 flex-col">
            <div className="relative mb-4 w-full rounded-lg bg-white p-6 shadow">
              {/* Swiper는 paginationEl 준비 후에만 렌더 */}
              {paginationEl && (
                <Swiper
                  key={paginationEl ? 'mounted' : 'not-mounted'}
                  modules={[Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  pagination={{
                    clickable: true,
                    el: paginationEl,
                  }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  className="h-60 w-full overflow-hidden rounded-lg"
                >
                  {sliderPosts.map((post) => (
                    <SwiperSlide key={post.id}>
                      <div>
                        <div className="text-lg font-bold">{post.title}</div>
                        <div className="text-gray-600">{post.summary}</div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            {/* Swiper "밖", 완전 맨 아래에 내려서 페이지네이션 이동 */}
            <div ref={paginationRef} className="mb-4 flex justify-center" />
            {/* 추천 게시글 목록 */}
            <div className="mt-0 w-full rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-bold">추천 게시글</h2>
              {/* 그리드(카드) 영역 */}
              <ul className="mb-6 grid grid-cols-3 gap-4">
                {gridPosts.map((post) => (
                  <li key={post.id} className="cursor-pointer rounded border border-blue-200 bg-blue-50 p-4 shadow-sm transition hover:bg-blue-100">
                    <div className="truncate text-base font-semibold">{post.title}</div>
                    <div className="mt-1 line-clamp-2 text-sm text-gray-600">{post.summary}</div>
                  </li>
                ))}
              </ul>
              {/* 리스트 형태(velog-style) */}
              <ul>
                {listPosts.map((post) => (
                  <li key={post.id} className="mb-4 cursor-pointer rounded border-slate-600 bg-slate-50 p-3 transition hover:bg-slate-100">
                    <div className="font-semibold">{post.title}</div>
                    <div className="text-sm text-gray-600">{post.summary}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/*<div className="w-full rounded-lg bg-white p-6 shadow mt-0">
              <h2 className="mb-4 text-xl font-bold">추천 게시글</h2>
              <ul>
                {recommendedPosts.map((post) => (
                  <li key={post.id} className="mb-4 cursor-pointer rounded p-2 hover:bg-gray-100">
                    <div className="font-semibold">{post.title}</div>
                    <div className="text-gray-600">{post.summary}</div>
                  </li>
                ))}
              </ul>
            </div>*/}
          </section>

          {/* 세로 구분선 */}
          <div className="mx-2 w-px bg-gray-300" />

          {/* 오른쪽 4/10 */}
          <aside className="flex min-w-0 basis-2/5 flex-col">
            {/* 프로필 */}
            <div className="mb-6 flex w-full flex-col items-center rounded-lg bg-white p-6 shadow">
              {/* 1. 프로필 사진 + 유저 정보 (좌우로) */}
              <div className="flex w-full items-center">
                <Image src={userProfile.avatar} alt="프로필" width={64} height={64} className="h-16 w-16 rounded-full border object-cover" />
                <div className="ml-4 flex flex-col justify-center">
                  <div className="text-lg font-bold">{userProfile.username}</div>
                  <div className="mt-1 text-xs text-gray-500">구독자 {userProfile.subscriber.toLocaleString()}명</div>
                </div>
              </div>

              {/* 2. 버튼 줄 */}
              <div className="mt-4 flex w-full overflow-hidden rounded-[10px] border border-gray-200">
                <Link href="/writeform" className="flex-1 py-2 text-center text-sm transition hover:bg-gray-50 focus:bg-gray-50">
                  글쓰기
                </Link>
                <div className="w-px bg-gray-200" />
                <Link href="/myblog" className="flex-1 py-2 text-center text-sm transition hover:bg-gray-50 focus:bg-gray-50">
                  내 블로그
                </Link>
                <div className="w-px bg-gray-200" />
                <Link href="/usermanage" className="flex-1 py-2 text-center text-sm transition hover:bg-gray-50 focus:bg-gray-50">
                  내 관리
                </Link>
              </div>

              {/* 3. 조회수/방문자 (구분선, 한 줄씩) */}
              <div className="mt-4 w-full">
                <div className="mb-2 h-px bg-gray-200" />
                <div className="flex justify-between px-1 py-1 text-sm text-gray-700">
                  <span>조회수</span>
                  <span>{userProfile.views.toLocaleString()}회</span>
                </div>
                <div className="my-2 h-px bg-gray-200" />
                <div className="flex justify-between px-1 py-1 text-sm text-gray-700">
                  <span>방문자</span>
                  <span>{userProfile.visits.toLocaleString()}명</span>
                </div>
              </div>
            </div>

            {/* 가로 구분선 */}
            <hr className="mb-6 border-gray-300" />
            <QuickLinks />
          </aside>
        </div>
      </main>
    </div>
  );
}
