// src/sections/SkillsSection.jsx


import { useEffect, useMemo, useState } from "react";
import { fetchSkills } from "../lib/api"; 

export default function SkillsSection({ lang }) {
  const STARS = 26;
  const stars = useMemo(() => 
    new Array(STARS).fill(0).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: 0.25 + Math.random() * 0.4,
      scale: 0.7 + Math.random() * 0.7,
      delay: Math.random(),
      dur: 3 + Math.random() * 4,
    })), []);

  const [groups, setGroups] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function load() {
      try {
        setStatus("loading");
        const data = await fetchSkills();
        setGroups(data);
        setStatus("success");
      } catch (e) {
        console.error("Failed to load skills");
        setStatus("error");
      }
    }
    load();
  }, []);

  return (
    <section 
      id="skills" 
      className={`relative bg-transparent text-white pt-52 md:pt-64 pb-32 md:pb-40 overflow-hidden ${lang === "ar" ? "font-[Cairo]" : ""}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* ⭐ Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <span 
            key={s.id} 
            className="absolute block w-[4px] h-[4px] rounded-full bg-[#87a5ff]" 
            style={{ 
              top: s.top, 
              left: s.left, 
              opacity: s.opacity, 
              transform: `scale(${s.scale})`, 
              animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite` 
            }} 
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className={`text-4xl md:text-6xl font-extrabold mb-20 text-center ${lang === "ar" ? "md:text-right" : "md:text-left"}`}>
          {lang === "ar" ? "المهارات " : "Skills & Abilities"} <span className="font-black">:</span>
        </h2>

        <div className="relative">
          <div className={`hidden md:block absolute top-0 bottom-0 w-[2px] bg-white/15 rounded-full ${lang === "ar" ? "right-[34%]" : "left-[34%]"}`} />

          <div className="space-y-5">
            {groups.map((group, idx) => (
              <div key={idx} className="relative grid grid-cols-1 md:grid-cols-[280px_auto_1fr] gap-6 items-center">
                
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl px-6 py-5 text-center font-extrabold shadow-[0_0_20px_rgba(96,165,250,0.3)] relative">

                  <span className="block text-sm md:text-base uppercase">
                    {typeof group.title === 'object' ? group.title[lang] : group.title}
                  </span>

                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[2px] h-6 bg-white/20 md:hidden" />

                </div>

                <div className="hidden md:flex items-center justify-center relative">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#60A5FA] z-10" />
                  <span className="absolute left-1/2 -translate-x-1/2 w-16 h-[2px] bg-white/15" />
                </div>

                <div className={`flex flex-wrap gap-3 w-full overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-[2px] ${lang === "ar" ? "justify-start" : "justify-start"}`}>
                  {(lang === "ar" ? (group.skillsAr || group.skills) : (group.skillsEn || group.skills))?.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full whitespace-nowrap bg-[#87a5ff] text-[#050b26] text-[10px] sm:text-xs md:text-sm font-black shadow-[0_0_20px_rgba(135,165,255,0.4)] hover:scale-110 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


