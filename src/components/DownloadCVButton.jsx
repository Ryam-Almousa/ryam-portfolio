// src/components/DownloadCVButton.jsx
import confetti from "canvas-confetti";

export default function DownloadCVButton({ lang }) {
  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#7C3AED", "#60A5FA", "#C084FC"],
    });

    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "RyamCV.pdf";
    link.click();
  };

  return (
    <button
      onClick={handleClick}
      // التعديلات: 
      // 1. تقليل px-10 إلى px-6 في الجوال لتفادي ضخامة الزر، وزيادتها في الشاشات الكبيرة md:px-10.
      // 2. تقليل نص الزر قليلاً في الجوال text-base ليناسب المساحة.
      className="px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-bold text-white rounded-xl 
                 bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] 
                 hover:brightness-110 transition-all duration-300 shadow-[0_0_30px_rgba(96,165,250,0.5)]
                 whitespace-nowrap active:scale-95"
    >
      {lang === "ar" ? "تحميل السيرة الذاتية" : "Download CV"}
    </button>
  );
}