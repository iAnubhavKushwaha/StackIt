function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300 mt-auto py-6">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white">StackIt</h2>
        <p className="mt-2 text-sm text-gray-400">A community-driven Q&A platform for developers</p>
        <p className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} StackIt. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;