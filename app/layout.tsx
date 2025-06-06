import { Geist, Geist_Mono } from 'next/font/google';
import { ReactNode } from 'react';

import type { Metadata } from 'next';

import Header from '@components/layouts/Header';
import 'swiper/css/pagination';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PostSmith',
  description: '블로그 포스팅해주는 서비스입니다.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
