// QuickLinks.tsx
import Link from 'next/link';
import { SiCanva, SiFigma, SiNotion, SiOpenai, SiRemovedotbg, SiUnsplash } from 'react-icons/si';
import clsx from 'clsx';

const quickMenu = [
  {
    label: 'Notion',
    icon: <SiNotion size={24} />,
    href: 'https://www.notion.so/',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    tagline: '당신의 모든 것을 기록하고 관리하세요',
  },
  {
    label: 'Canva',
    icon: <SiCanva size={24} />,
    href: 'https://www.canva.com/',
    bgColor: 'bg-sky-100',
    textColor: 'text-sky-700',
    tagline: '누구나 쉽게 디자인할 수 있어요',
  },
  {
    label: 'Remove.bg',
    icon: <SiRemovedotbg size={24} />,
    href: 'https://www.remove.bg/',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-700',
    tagline: '이미지 배경 제거, 한 번의 클릭으로',
  },
  {
    label: 'Unsplash',
    icon: <SiUnsplash size={24} />,
    href: 'https://unsplash.com/',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    tagline: '고퀄리티 무료 이미지를 찾으세요',
  },
  {
    label: 'Figma',
    icon: <SiFigma size={24} />,
    href: 'https://www.figma.com/',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
    tagline: '팀과 함께 실시간 디자인 협업',
  },
  {
    label: 'ChatGPT',
    icon: <SiOpenai size={24} />,
    href: 'https://chat.openai.com/',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    tagline: 'AI와 함께 생각하고 성장하세요',
  },
];

export default function QuickLinks() {
  return (
    <ul className="mt-1 w-full space-y-2">
      {quickMenu.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'flex transform flex-col items-start gap-2 rounded-lg px-4 py-4 shadow-sm',
              'transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md',
              item.bgColor,
              item.textColor
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-base font-semibold">{item.label}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{item.tagline}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
