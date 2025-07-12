function Footer() {
  return (
    <footer className="bg-[#f9fafb] text-gray-600 mt-auto py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-zinc-800">StackIt</h2>
        <p className="mt-2 text-sm text-gray-500">A community-driven Q&A platform for developers</p>
        <p className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} StackIt. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;