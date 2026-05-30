import React from "react";

export default function Education({ lang }) {
  return (
    <section id="education" className="mb-0">
      <div className="
        bg-white/[0.03] backdrop-blur-xl border border-white/10
        px-5 py-6 md:p-10
        w-[92%] sm:w-[85%] md:w-full
        mx-auto
        rounded-[2.5rem]
        hover:bg-white/[0.06]
        transition-all duration-300
        shadow-xl
        overflow-visible
      ">

        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">
          {lang === "ar"
            ? "بكالوريوس في علوم الحاسب"
            : "Bachelor Degree in Computer Science"}
        </h3>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-semibold mb-6">
          {lang === "ar"
            ? "الجامعة السعودية الإلكترونية"
            : "Saudi Electronic University"}
        </p>

        <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed">
          {lang === "ar"
            ? "تخصص دقيق في تطوير التطبيقات المتقدمة"
            : "Specialized in Advanced Application Development"}
        </p>

      </div>
    </section>
  );
}