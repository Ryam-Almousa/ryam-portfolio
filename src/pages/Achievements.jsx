// src/pages/Achievements.jsx
import React, { useEffect, useState, useMemo } from "react";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Recommendations from "../sections/Recommendations";
import { GraduationCap, Briefcase, Quote } from "lucide-react";

export default function Achievements({ lang }) {
  const STARS = 180;

  const fullText1 = lang === "ar" ? "هذه هي" : "THIS IS MY";
  const fullText2 = lang === "ar" ? "رحلتي" : "JOURNEY"; 

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

  return (
    <div className={`min-h-screen bg-[#050b26] text-white py-12 relative overflow-hidden ${lang === "ar" ? "font-['Cairo']" : "font-sans"}`}>

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `radial-gradient(circle at 50% 35%, rgba(139,92,246,0.35), transparent 55%), linear-gradient(to bottom, #050b26 0%, #0b0f3a 40%, #1e1b4b 70%, #3b0764 100%)` 
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
      {/* 🌠 Shooting Stars */}
<div
  className="shooting-star absolute"
  style={{
    top: "10%",
    left: "5%",
    animationDelay: "0s"
  }}
/>

<div
  className="shooting-star absolute"
  style={{
    top: "40%",
    left: "35%",
    animationDelay: "10s"
  }}
/>

<div
  className="shooting-star absolute"
  style={{
    top: "70%",
    left: "60%",
    animationDelay: "20s"
  }}
/>
      </div>
      <div className="container mx-auto px-6 relative z-10" dir={lang === "ar" ? "rtl" : "ltr"}>

        {/* HEADER */}
        <div className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">

            <h1 className={`hero-glow tracking-widest uppercase text-white leading-tight ${
              lang === "ar"
                ? "font-['Cairo'] font-bold text-[32px] sm:text-[42px] md:text-[72px]"
                : "pixel-font text-[24px] sm:text-[32px] md:text-[64px]"
            }`}>
              {text1}
            </h1>

            <h1 className={`hero-glow tracking-widest uppercase text-white leading-tight ${
              lang === "ar"
                ? "font-['Cairo'] font-extrabold text-[38px] sm:text-[48px] md:text-[86px] -mt-2"
                : "pixel-font text-[28px] sm:text-[36px] md:text-[64px]"
            }`}>
              {text2}
            </h1>

          </div>
        </div>

        {/* TIMELINE */}
        <div className="max-w-7xl mx-auto relative mt-10">
          <div className={`absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-600/50 via-purple-600/50 to-transparent ${lang === "ar" ? "right-6 md:right-12" : "left-6 md:left-12"}`} />

          <div className="space-y-56">

            {/* Education */}
            <div className="relative flex flex-col gap-6">
              <div className="relative flex items-center h-20">
                <div className={`absolute -translate-x-1/2 z-10 ${lang === "ar" ? "right-6 md:right-12 translate-x-1/2" : "left-6 md:left-12"}`}>
                  <div className="p-4 bg-[#0b1537] border border-blue-500/30 rounded-2xl text-blue-400">
                    <GraduationCap size={32} />
                  </div>
                </div>
                <div className={`${lang === "ar" ? "mr-20 md:mr-36" : "ml-20 md:ml-36"}`}>
                  <h2 className={`text-[24px] sm:text-[32px] md:text-5xl font-black uppercase tracking-tight ${lang === "ar" ? "font-['Cairo']" : "font-sans"}`}>
                    {lang === "ar" ? "التعليم" : "Education"}
                  </h2>
                </div>
              </div>

              <div className="relative flex items-center mt-2">
                <div className={`absolute -translate-x-1/2 z-10 ${lang === "ar" ? "right-6 md:right-12 translate-x-1/2" : "left-6 md:left-12"}`}>
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white overflow-hidden shadow-2xl border-2 border-white/20">
                    <img src="/university-logo.jpg" className="w-full h-full object-contain" alt="University Logo" />
                  </div>
                </div>
                <div className={`${lang === "ar" ? "mr-20 md:mr-36" : "ml-20 md:ml-36"} flex-1`}>
                  <Education lang={lang} />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="relative flex flex-col gap-6">
              <div className="relative flex items-center h-20">
                <div className={`absolute -translate-x-1/2 z-10 ${lang === "ar" ? "right-6 md:right-12 translate-x-1/2" : "left-6 md:left-12"}`}>
                  <div className="p-4 bg-[#0b1537] border border-purple-500/30 rounded-2xl text-purple-400">
                    <Briefcase size={32} />
                  </div>
                </div>
                <div className={`${lang === "ar" ? "mr-20 md:mr-36" : "ml-20 md:ml-36"}`}>
                  <h2 className={`text-[24px] sm:text-[32px] md:text-5xl font-black uppercase tracking-tight ${lang === "ar" ? "font-['Cairo']" : "font-sans"}`}>
                    {lang === "ar" ? "الخبرة" : "Experience"}
                  </h2>
                </div>
              </div>

              <div className="relative flex items-center mt-2">
                <div className={`absolute -translate-x-1/2 z-10 ${lang === "ar" ? "right-6 md:right-12 translate-x-1/2" : "left-6 md:left-12"}`}>
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white overflow-hidden shadow-2xl border-2 border-white/20">
                    <img src="/almajdouielogo.jpg" className="w-full h-full object-contain" alt="Almajdouie Logo" />
                  </div>
                </div>
                <div className={`${lang === "ar" ? "mr-20 md:mr-36" : "ml-20 md:ml-36"} flex-1`}>
                  <Experience lang={lang} />
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="relative flex flex-col gap-6 pb-20">
              <div className="relative flex items-center h-20">
                <div className={`absolute -translate-x-1/2 z-10 ${lang === "ar" ? "right-6 md:right-12 translate-x-1/2" : "left-6 md:left-12"}`}>
                  <div className="p-4 bg-[#0b1537] border border-green-500/30 rounded-2xl text-green-400">
                    <Quote size={32} />
                  </div>
                </div>
                <div className={`${lang === "ar" ? "mr-20 md:mr-36" : "ml-20 md:ml-36"}`}>
                  <h2 className={`text-[24px] sm:text-[32px] md:text-5xl font-black uppercase tracking-tight ${lang === "ar" ? "font-['Cairo']" : "font-sans"}`}>
                    {lang === "ar" ? "التوصيات" : "Recommendations"}
                  </h2>
                </div>
              </div>
              <div className={`${lang === "ar" ? "mr-20 md:mr-36" : "ml-20 md:ml-36"}`}>
                <Recommendations lang={lang} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>
        {`
        .pixel-font { font-family: 'Press Start 2P', cursive; }
        .hero-glow { text-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3); }
       .shooting-star {
  position: absolute;

  width: 3px;
  height: 120px;

  background: linear-gradient(
    to top,
    white,
    rgba(255,255,255,0.6),
    transparent
  );

  filter: blur(1px);

  transform: rotate(45deg);

  opacity: 0;

  animation: shooting 30s linear infinite;
}
    @keyframes shooting {
      0% {
        transform: translate(0px, 0px) rotate(45deg);
        opacity: 0;
      }

      2% {
        opacity: 1;
      }

      6% {
        transform: translate(600px, -400px) rotate(45deg);
        opacity: 0;
      }

      100% {
        transform: translate(600px, -400px) rotate(45deg);
        opacity: 0;
      }
    }
        `}
      </style>
    </div>
  );
}