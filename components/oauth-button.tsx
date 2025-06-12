import clsx from 'clsx';

import GithubLogo from 'public/logo/github.svg';
import GoogleLogo from 'public/logo/google.svg';
import KakaoLogo from 'public/logo/kakao.svg';
import NaverLogo from 'public/logo/naver.svg';

type ProviderType = 'google' | 'github' | 'kakao' | 'naver';

export default function OAuthButton({ provider }: { provider: ProviderType }) {
  function handleOnClick() {
    console.log('OAuth 로그인 버튼 클릭됨');
  }

  const providerText = {
    google: '구글로 로그인',
    github: '깃허브로 로그인',
    kakao: '카카오로 로그인',
    naver: '네이버로 로그인',
  };

  const providerStyles = {
    google: 'bg-white text-black',
    github: 'bg-gray-800 text-white',
    kakao: 'bg-yellow-500 text-black',
    naver: 'bg-green-500 text-white',
  };
  const providerIcons = {
    google: <GoogleLogo className="h-5 w-5" />,
    github: <GithubLogo className="h-5 w-5" />,
    kakao: <KakaoLogo className="h-5 w-5" />,
    naver: <NaverLogo className="h-5 w-5" />,
  };

  return (
    <button onClick={handleOnClick} className={clsx('w-full rounded', providerStyles[provider])}>
      <figure className="flex items-center justify-center space-x-2">{providerIcons[provider]}</figure>
      <span className="text-sm font-medium">{providerText[provider]}</span>
    </button>
  );
}
