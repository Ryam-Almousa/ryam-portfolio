// src/pages/Overview.jsx


import { useEffect, useState, useMemo } from "react";
import DownloadCVButton from "../components/DownloadCVButton";
import About from "../sections/About";
import ProjectsSection from "../sections/ProjectsSection";
import SkillsSection from "../sections/SkillsSection";

export default function Overview({ lang }) {
  const STARS = 180;
  const fullText1 = lang === "ar" ? "أهلاً ، أنا" : "HI, I AM";
  const fullText2 = lang === "ar" ? "ريام الموسى" : "RYAM ALMOUSA";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    let i = 0;
    setText1("");
    setText2("");
    const interval = setInterval(() => {
      if (i <= fullText1.length) {
        setText1(fullText1.slice(0, i));
      } else {
        setText2(fullText2.slice(0, i - fullText1.length));
      }
      i++;
      if (i > fullText1.length + fullText2.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [lang]);

  const stars = useMemo(() => {
    return [...Array(STARS)].map((_, i) => ({
      id: i,
      size: Math.random() > 0.5 ? 2 : 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: 0.3 + Math.random() * 0.7
    }));
  }, []);

  
  useEffect(() => {
    const handleScroll = () => {
      const projects = document.getElementById("projects");
      if (!projects) return;

      const rect = projects.getBoundingClientRect();

      if (rect.top > window.innerHeight || rect.bottom < 0) {
        if (window.location.hash === "#projects") {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={lang === "ar" ? "font-['Cairo']" : ""}>
      {/* ===== BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 35%, rgba(139,92,246,0.35), transparent 55%),
              linear-gradient(to bottom, #050b26 0%, #0b0f3a 40%, #1e1b4b 70%, #3b0764 100%)
            `
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="galaxy" />
        </div>
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute block rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* ===== HERO ===== */}
      <section className="min-h-screen text-white flex flex-col items-center justify-center relative z-10 translate-y-6 px-4">
        <div className="text-center mb-8 md:mb-12 flex flex-col items-center gap-4 md:gap-6 w-full">

          <h1
            className={`
              hero-glow tracking-widest uppercase break-words w-full
              ${
                lang === "ar"
  ? "font-['Cairo'] font-bold text-[42px] sm:text-[58px] md:text-[80px]"
  : "pixel-font text-[34px] sm:text-[48px] md:text-[64px]"
              }
            `}
          >
            {text1}
          </h1>

          <h1
            className={`
              hero-glow tracking-widest uppercase break-words w-full
              ${
                lang === "ar"
  ? "font-['Cairo'] font-extrabold text-[52px] sm:text-[72px] md:text-[90px]"
  : "pixel-font text-[42px] sm:text-[60px] md:text-[72px]"
              }
            `}
          >
            {text2}
          </h1>
        </div>

        <p
          className={`
            text-purple-300 text-center max-w-xs md:max-w-none
            ${lang === "ar" ? "text-sm md:text-lg" : "text-xs md:text-sm"}
          `}
        >
          {lang === "ar"
            ? "شغوفة بالتقنية والابتكار"
            : " Passionate about technology and innovation "}
        </p>

        <div className="mt-8">
          <DownloadCVButton lang={lang} />
        </div>
      </section>

      <div className={lang === "ar" ? "font-['Cairo']" : ""}>
        <About lang={lang} />

        <section id="projects">
          <ProjectsSection lang={lang} />
        </section>

        <SkillsSection lang={lang} />
      </div>
    </div>
  );
}