export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-16 bg-gray-100">
      <div className="text-sm text-gray-500">
        © {new Date().getFullYear()} PostSmith. All rights reserved.
      </div>
    </footer>
  );
}