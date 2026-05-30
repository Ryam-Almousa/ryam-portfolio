// src/sections/About.jsx


export default function About({ lang }) {
  const STARS = 22;

  return (
    <section
      id="about"
      dir={lang === "ar" ? "rtl" : "ltr"}
     className="relative bg-transparent text-white overflow-hidden pt-20 md:pt-36 pb-36 md:pb-44"
    >
      {/* ⭐ النجوم */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(STARS)].map((_, i) => (
          <span
            key={i}
            className="absolute block w-[4px] h-[4px] rounded-full bg-[#87a5ff]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.25 + Math.random() * 0.35,
              transform: `scale(${0.6 + Math.random() * 0.8})`,
              animation: `starTwinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random()}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ===== المحتوى - تعديل المحاذاة للجوال ===== */}
      <div
        className={`
          relative z-10 max-w-6xl mx-auto px-6 md:px-8
          ${lang === "ar" ? "text-center md:text-right" : "text-center md:text-left"}
        `}
      >
        {/* تصغير مقاس العنوان قليلاً للجوال */}
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 md:mb-8">
          {lang === "ar" ? "نبذة عني" : "About Me"} :
        </h2>

        {/* جعل الخط متجاوباً بين 16px و 20px */}
        <p className="max-w-4xl text-[16px] md:text-[20px] leading-relaxed text-slate-200 mx-auto md:mx-0">
          {lang === "ar"
            ?"خريجة علوم حاسب مهتمة بتحليل البيانات وتطوير البرمجيات، أسعى لإيجاد حلول تقنية مبتكرة والمساهمة في مجال تقنية المعلومات . لدي شغف كبير بتطوير برمجيات مفيدة وسهلة الاستخدام تلبي احتياجات المستخدمين، إلى جانب شغفي بتحليل البيانات بدءًا من فهم المشكلة وحتى عرض النتائج . عملت على عدد من المشاريع في مجالات مختلفة من علوم الحاسب، مما ساهم في تنمية خبرتي العملية وتوسيع مهاراتي."
            : "Computer Science graduate interested in data analysis and software development, seeking to build innovative technical solutions and contribute to the field of information technology . I have a strong passion for developing useful and user-friendly software that meets user needs, along with a passion for data analysis, from understanding the problem to presenting results . I have worked on several projects across different areas of computer science, which has helped me develop practical experience and expand my skill set."}
        </p>
      </div>
    </section>
  );
}