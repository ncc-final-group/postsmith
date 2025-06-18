// app/page.tsx (서버 컴포넌트)
import { cookies } from 'next/headers';
import ClientRoot from 'components/ClientRoot';

export default async function RootPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('CLIENT_SESSION_ID');
  const isLoggedIn = /*sessionCookie !== undefined;*/true;

  return <ClientRoot isLoggedIn={isLoggedIn} />;
}
