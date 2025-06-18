export default function Footer() {
  return (
    <footer className="flex h-16 w-full items-center justify-center bg-gray-100">
      <div className="text-sm text-gray-500">© {new Date().getFullYear()} PostSmith. All rights reserved.</div>
    </footer>
  );
}
