export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 상위 Layout Header 숨기기 */}
      <style>{`
        header { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
