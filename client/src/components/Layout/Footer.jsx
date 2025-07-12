function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container py-6">
        <div className="text-center">
          <h2 className="text-lg font-bold">StackIt</h2>
          <p className="mt-2 text-sm text-gray-300">A community-driven Q&A platform</p>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} StackIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;