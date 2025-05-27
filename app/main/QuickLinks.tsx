// QuickLinks.tsx
import Link from 'next/link';

const quickMenu = [
  { label: 'shortcut1', icon: '🏡', href: '/' },
  { label: 'shortcut2', icon: '📝', href: '/' },
  { label: 'shortcut3', icon: '👥', href: '/' },
  { label: 'shortcut4', icon: '📚', href: '/' },
  { label: 'shortcut5', icon: '📊', href: '/' },
  { label: 'shortcut6', icon: '📎', href: '/' },
];

export default function QuickLinks() {
  return (
    <ul className="mt-1 w-full space-y-1">
      {quickMenu.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="flex items-center gap-3 rounded-lg
            bg-white px-3 py-5 text-base font-medium
            text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
