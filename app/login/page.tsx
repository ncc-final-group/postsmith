import OAuthButton from '@components/oauth-button';

export default function LoginPage() {
  return (
    <main>
      <section className="flex min-h-[90vh] items-center justify-center">
        <div className="flex w-96 flex-col gap-5">
          <OAuthButton provider="github" />
          <OAuthButton provider="google" />
          <OAuthButton provider="kakao" />
          <OAuthButton provider="naver" />
        </div>
      </section>
    </main>
  );
}
