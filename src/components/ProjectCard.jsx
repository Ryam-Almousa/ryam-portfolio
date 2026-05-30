// src/components/ProjectCard.jsx

import { Link } from "react-router-dom";

export default function ProjectCard({ project, lang }) {
  const { slug, title, summary, githubUrl, image } = project;

  const isAr = lang === "ar";
  const displayTitle =
    typeof title === "object" ? title[lang] || title.en : title;
  const displaySummary =
    typeof summary === "object" ? summary[lang] || summary.en : summary;

  return (
    <Link to={`/projects/${slug}`} className="block">
      <article className="bg-[#020824] rounded-2xl md:rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col w-full h-[340px] md:h-full transition-transform duration-300 hover:scale-105">

        {/* الصورة */}
        <div className="h-40 md:h-52 bg-[#020824] flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={displayTitle}
              className="w-full h-full object-top object-cover"
            />
          ) : (
            <span className="text-xs text-slate-500">Image</span>
          )}
        </div>

        {/* المحتوى */}
        <div className="bg-[#f3f4f9] text-slate-900 p-3 md:p-6 pt-10 md:pt-4 pb-6 md:pb-16 relative rounded-b-2xl md:rounded-b-3xl flex-1">

          {/* الأزرار (ثابتة يمين + غير متأثرة باللغة) */}
          <div
            className="absolute top-3 right-3 flex items-center gap-2"
            style={{ direction: "ltr" }}
          >
            {/* زر More (يظهر فقط في md) */}
            <div className="flex w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-[#1b2a55] text-white text-[10px] md:text-xs font-semibold opacity-0 md:opacity-100">
              {isAr ? "المزيد" : "More"}
            </div>

            {/* زر GitHub */}
            {githubUrl && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(githubUrl, "_blank", "noopener,noreferrer");
                }}
                className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#1b2a55] text-white cursor-pointer z-10"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
            )}
          </div>

          {/* العنوان */}
          <h3 className="text-sm md:text-xl font-extrabold mt-2 md:mt-12 line-clamp-1">
            {displayTitle}
          </h3>

          {/* الوصف */}
          <p className="text-[10px] md:text-sm text-[#1e2440] mt-1 md:mt-2 line-clamp-2">
            {displaySummary}
          </p>
        </div>
      </article>
    </Link>
  );
}