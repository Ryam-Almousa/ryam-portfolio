
// src/sections/ProjectsSection.jsx


import { useEffect, useRef, useState } from "react";
import { fetchProjects } from "../lib/api";
import ProjectCard from "../components/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

function useViewportWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function ProjectsSection({ lang }) {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(false);

  const width = useViewportWidth();

  const isDesktop = width >= 1024;

  const isTablet =
    width >= 768 && width < 1024;

  // ✅ عرض الكروت
  const cardWidth = isDesktop
    ? "calc((100% - 3rem) / 3)"
    : isTablet
    ? "calc((100% - 1.5rem) / 2)"
    : "280px";

  const checkScroll = () => {
    const el = scrollRef.current;

    if (!el) return;

    const max =
      el.scrollWidth - el.clientWidth;

    const pos = Math.abs(el.scrollLeft);

    if (lang === "ar") {
      setCanScrollRight(pos > 10);
      setCanScrollLeft(pos < max - 10);
    } else {
      setCanScrollLeft(pos > 10);
      setCanScrollRight(pos < max - 10);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: "instant",
      });

      setTimeout(checkScroll, 100);
    }
  }, [lang]);

  useEffect(() => {
    async function loadProjects() {
      try {
        setStatus("loading");

        const data = await fetchProjects();

        setProjects([...data].reverse());

        setStatus("success");

        setTimeout(checkScroll, 100);

      } catch (err) {

        setError(
          err.message ||
            "Failed to fetch projects"
        );

        setStatus("error");
      }
    }

    loadProjects();
  }, [lang]);

  function handleScroll(direction) {
    const container = scrollRef.current;

    if (!container) return;

    const scrollAmount =
      container.clientWidth;

    let move;

    if (direction === "right") {
      move = -scrollAmount;
    } else {
      move = scrollAmount;
    }

    const finalMove =
      lang === "ar" ? -move : move;

    container.scrollBy({
      left: finalMove,
      behavior: "smooth",
    });
  }

  const STARS = 28;

  return (
    <section
      id="projects"
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative bg-transparent text-white pt-20 md:pt-24 pb-20 overflow-hidden -mt-[1px]"
    >

      {/* النجوم */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(STARS)].map((_, i) => (
          <span
            key={i}
            className="absolute block w-[2px] h-[2px] rounded-full bg-[#c7d2fe]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-4">

        {/* العنوان */}
        <h2 className="mt-8 md:mt-10 text-4xl md:text-6xl font-extrabold tracking-tight text-center mb-10 md:mb-16">
          {lang === "ar"
            ? "المشاريع :"
            : "Projects :"}
        </h2>

{status === "loading" ? (

  <div className="w-full min-h-[420px] flex items-center justify-center">

    <div className="flex flex-col items-center gap-6">

      <div className="relative w-20 h-20">

        <div className="absolute inset-0 rounded-full border-2 border-indigo-400/20" />

        <div className="absolute inset-0 rounded-full border-t-2 border-indigo-400 animate-spin" />

      </div>

      <p className="text-indigo-200 tracking-[0.3em] uppercase text-sm animate-pulse text-center">
        {lang === "ar"
          ? "جاري تحميل المشاريع"
          : "Loading Projects"}
      </p>

    </div>

  </div>

) : status === "error" ? (

  <div className="w-full text-center text-red-300 py-20">
    {lang === "ar"
      ? "فشل تحميل المشاريع"
      : "Failed to load projects."}
  </div>

) : (

  <div className="flex items-center">

    {/* زر اليسار */}
    <div className="w-14 hidden lg:flex justify-center shrink-0">

      {(lang === "ar"
        ? canScrollRight
        : canScrollLeft) && (
        <button
          onClick={() =>
            handleScroll("right")
          }
          className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-white/10 hover:scale-110 transition duration-300 text-white z-20"
        >
          {lang === "ar" ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      )}

    </div>

    {/* الكروت */}
    <div
      ref={scrollRef}
      onScroll={checkScroll}
      className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-8 pt-2 px-[10%] md:px-1 snap-x snap-mandatory"
    >

      {projects.map((project) => (
        <div
          key={
            project.id ||
            project.slug
          }
          className="flex-none snap-center"
          style={{
            width: cardWidth,
            minWidth: cardWidth,
          }}
        >

          <ProjectCard
            project={project}
            lang={lang}
          />

        </div>
      ))}

    </div>

    {/* زر اليمين */}
    <div className="w-14 hidden lg:flex justify-center shrink-0">

      {(lang === "ar"
        ? canScrollLeft
        : canScrollRight) && (
        <button
          onClick={() =>
            handleScroll("left")
          }
          className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-white/10 hover:scale-110 transition duration-300 text-white z-20"
        >
          {lang === "ar" ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      )}

    </div>

  </div>

)}
  </div>
    </section>
  );
}