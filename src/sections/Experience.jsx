import React from "react";

export default function Experience({ lang }) {
  return (
    <section id="experience" className="mb-0">
      <div className="
        bg-white/[0.03] backdrop-blur-xl border border-white/10
        px-5 py-6 md:p-10
        w-[92%] sm:w-[85%] md:w-full
        mx-auto
        rounded-[2.5rem]
        hover:bg-white/[0.06]
        transition-all duration-300
        shadow-xl
      ">

        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">
          {lang === "ar"
            ? "مطور برمجيات"
            : "Software Developer"}
        </h3>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 font-semibold mb-4">
          {lang === "ar"
            ? "تدريب تعاوني"
            : "Cooperative Training"}
        </p>

        <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto text-center">
          {lang === "ar"
            ? "خبرة تدريبية لمدة 5 أشهر شملت تطوير وتحسين تطبيقات الويب والعمل على تنفيذ حلول برمجية تدعم تجربة المستخدم وكفاءة النظام."
            : "A 5-month training experience focused on developing and improving web applications while implementing software solutions that enhance user experience and system efficiency."}
        </p>

      </div>
    </section>
  );
}