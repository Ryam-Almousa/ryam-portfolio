export default function Footer() {
  return (
    <footer className="relative mt-20 text-white overflow-hidden">

      {/* الخلفية */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to top, #3b0764 0%, #1e1b4b 60%, #0b0f3a 100%)
          `
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-4 text-purple-200 text-xs md:text-sm">

        {/*  الجوال */}
        <div className="flex flex-col items-center gap-1 md:hidden text-center">

          <span>
            © {new Date().getFullYear()} Ryam. All rights reserved.
          </span>

          <a
            href="mailto:ryamalmousa554@gmail.com"
            className="text-purple-300 hover:text-white transition-colors"
          >
            ryamalmousa554@gmail.com
          </a>

        </div>

        {/*  الديسكتوب */}
        <div className="hidden md:flex items-center justify-between">

          <div className="flex items-center gap-4">

            <span>
              © {new Date().getFullYear()} Ryam. All rights reserved.
            </span>

            <span className="text-white/20">|</span>

            <a
              href="mailto:ryamalmousa554@gmail.com"
              className="text-purple-300 hover:text-white transition-colors"
            >
              ryamalmousa554@gmail.com
            </a>

          </div>

        </div>

      </div>

      {/* الخط */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

    </footer>
  );
}