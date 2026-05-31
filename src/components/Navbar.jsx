
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ lang, setLang }) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      to: "/",
      label: lang === "ar" ? "الرئيسية" : "Overview",
    },
    {
      to: "/achievements",
      label: lang === "ar" ? "الإنجازات" : "Achievements",
    },
    {
      to: "/contact",
      label: lang === "ar" ? "تواصل" : "Contact",
    },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="container h-16 flex items-center justify-between">

        <Link to="/" className="flex items-center pt-5">
  <img
    src="/ryamlogo.PNG"
    alt="Ryam Almousa"
    className="h-16 md:h-20 w-auto object-contain"
  />
</Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `
                    px-5 py-2 rounded-full border text-sm md:text-base font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-white text-black border-white shadow-[0_0_22px_rgba(255,255,255,0.6)]"
                        : "border-white text-white hover:bg-white hover:text-black"
                    }
                    `
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}

          
            <li>
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="px-5 py-2 rounded-full border border-white text-white text-sm md:text-base font-medium transition-colors duration-200 hover:bg-white hover:text-black"
              >
                {lang === "en" ? "AR" : "EN"}
              </button>
            </li>
          </ul>

          {/* Mobile button */}
          <button
  className="md:hidden p-3 rounded-lg text-white text-3xl hover:bg-white/10"
  onClick={() => setOpen(true)}
>
  ☰
</button>
        </nav>
      </header>

      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* mobile menu */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#0b1b3a] text-white p-6
        transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between mb-6">
          <span className="font-bold">
            {lang === "ar" ? "القائمة" : "Menu"}
          </span>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-white/10"
              >
                {l.label}
              </NavLink>
            </li>
          ))}

         
          <li className="mt-6">
            <button
              onClick={() => {
                setLang(lang === "en" ? "ar" : "en");
                setOpen(false);
              }}
              className="
                w-full
                px-4 py-3
                rounded-xl
                border border-white/20
                bg-white/5
                backdrop-blur-md
                text-center font-semibold tracking-wide
                transition-all duration-300

                hover:bg-white hover:text-black
              "
            >
              {lang === "en" ? "AR" : "EN"}
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}