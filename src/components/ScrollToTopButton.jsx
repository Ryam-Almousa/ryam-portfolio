import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`
        fixed bottom-6 right-6 z-50

        /* الجوال */
        w-16 h-16

        /* التابلت */
        sm:w-20 sm:h-20

        /* الديسكتوب */
        lg:w-16 lg:h-16

        rounded-full flex items-center justify-center

        bg-[#4c1d95]
        text-white text-2xl

        shadow-lg shadow-purple-900/40
        transition-all duration-300

        hover:scale-110 hover:bg-[#5b21b6]
        active:scale-95

        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      ↑
    </button>
  );
}