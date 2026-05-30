import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const recommendations = [
  {
    name: "Ms. Fatimah Salman Alkhazl",
    role: "Lecturer at SEU",
    text: "Ryam demonstrated exceptional intellectual curiosity, problem-solving abilities, and a deep understanding of artificial intelligence concepts. I highly recommend Ryam for any future academic or professional opportunities.",
    file: "/letter-fatimah.pdf",

    nameAr: "أ. فاطمة سلمان الخزل",
    roleAr: "محاضِرة في الجامعة السعودية الإلكترونية",
    textAr: "أظهرت ريام فضولًا فكريًا استثنائيًا وقدرات مميزة في حل المشكلات وفهمًا عميقًا لمفاهيم الذكاء الاصطناعي. أوصي بها بشدة لأي فرصة أكاديمية أو مهنية مستقبلية."
  },

  {
    name: "Dr. Mrouj M. Almuhajri",
    role: "Assistant Professor at SEU",
    text: "RYAM was noticed by her determination and ambition to achieve the best. She is a truly distinguished student, and her determination and sense of purpose will enable her to pursue her future plans successfully.",
    file: "/recommendation-mrouj.pdf",

    nameAr: "د. مروج محمد المهاجري",
    roleAr: "أستاذ مساعد في الجامعة السعودية الإلكترونية",
    textAr: "تميزت ريام بإصرارها وطموحها لتحقيق الأفضل. وهي طالبة متميزة بحق، وسيمكنها إصرارها وإحساسها بالهدف من تحقيق خططها المستقبلية بنجاح."
  },

  {
    name: "Aljawharah Alfaleh",
    role: "Lecturer at SEU",
    text: "I have no doubt that Ryam would be a great fit for any position that requires someone with her skillset and qualities. I highly recommend her for any position that requires a bachelor’s degree in Computer Science.",
    file: "/Aljawharah recommendation .pdf",

    nameAr: "الجوهرة الفالح",
    roleAr: "محاضِرة في الجامعة السعودية الإلكترونية",
    textAr: "ليس لدي أي شك في أن ريام ستكون مناسبة لأي منصب يتطلب شخصًا يمتلك مهاراتها وصفاتها، وأوصي بها بشدة لأي وظيفة تتطلب درجة البكالوريوس في علوم الحاسب."
  }
];

export default function Recommendations({ lang }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isRtl = lang === "ar";

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
      setActiveIndex(0);
    }
  }, [lang]);

  return (
    <section
      id="recommendations"
      className="relative w-full pt-20 pb-28"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="relative px-2 md:px-6 lg:pl-24 lg:pr-24 -mt-10 flex justify-center">

        <Swiper
          key={lang}
          dir={isRtl ? "rtl" : "ltr"}
          modules={[Pagination]}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={{ clickable: true }}
          className="pb-6 w-full"
        >

          {recommendations.map((rec, index) => {

            const displayName = isRtl ? rec.nameAr : rec.name;
            const displayRole = isRtl ? rec.roleAr : rec.role;
            const displayText = isRtl ? rec.textAr : rec.text;

            return (
              <SwiperSlide key={index} className="flex justify-center">

                <div
                  className="
                  w-[96%] sm:w-[92%] md:w-[90%] lg:max-w-4xl
                  mx-auto
                  bg-white/5 backdrop-blur-2xl border border-white/10
                  rounded-[2rem] md:rounded-[2.5rem]
                  px-5 py-8 md:px-10 md:py-14
                  relative
                  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_0_20px_rgba(139,92,246,0.15)]
                  transform transition-transform duration-300 hover:scale-105
                "
                >

                  <p className="text-sm sm:text-base md:text-xl text-slate-200 italic leading-relaxed mb-6 md:mb-10 text-center max-w-3xl mx-auto">
                    "{displayText}"
                  </p>

                  <div className="border-t border-white/10 pt-3 md:pt-6 flex flex-col gap-4 md:flex-row md:justify-between">

                    <div className="flex items-center justify-between w-full md:w-auto">

                      <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-7 h-7 md:w-12 md:h-12 min-w-[28px] min-h-[28px] md:min-w-[48px] md:min-h-[48px] bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-xs md:text-base">
                          {isRtl ? displayName.charAt(0) : rec.name.charAt(0)}
                        </div>

                        <div className={isRtl ? "text-right" : "text-left"}>
                          <h4 className="text-xs md:text-base text-white font-semibold leading-tight">
                            {displayName}
                          </h4>

                          <p className="text-[9px] md:text-xs text-blue-300 uppercase tracking-widest">
                            {displayRole}
                          </p>
                        </div>
                      </div>

                      <a
                        href={rec.file}
                        target="_blank"
                        rel="noreferrer"
                        className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition shadow-[0_0_15px_rgba(139,92,246,0.25)] text-white"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    <a
                      href={rec.file}
                      target="_blank"
                      rel="noreferrer"
                      className="hidden md:block p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition shadow-[0_0_15px_rgba(139,92,246,0.25)] text-white"
                    >
                      <ExternalLink size={16} />
                    </a>

                  </div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {activeIndex > 0 && (
          <button
            onClick={() => swiperRef.current.slidePrev()}
            className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-white/10 transition text-white z-20 
              ${isRtl ? "right-[20px]" : "left-[20px]"}`}
          >
            {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}

        {activeIndex < recommendations.length - 1 && (
          <button
            onClick={() => swiperRef.current.slideNext()}
            className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-white/10 transition text-white z-20
              ${isRtl ? "left-[20px]" : "right-[20px]"}`}
          >
            {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}

      </div>

      <style>
        {`
          .swiper-pagination {
            display: flex !important;
            justify-content: center;
            align-items: center;
            position: absolute !important;
            bottom: 20px !important;
          }

          .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.3) !important;
          }

          .swiper-pagination-bullet-active {
            background: #8b5cf6 !important;
          }
        `}
      </style>
    </section>
  );
}