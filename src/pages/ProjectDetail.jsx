// src/pages/ProjectDetail.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProjects } from "../lib/api";

export default function ProjectDetail({ lang }) {
  const { slug } = useParams();

  const [data, setData] = useState(null);

  const [err, setErr] = useState("");

  const isAr = lang === "ar";

  useEffect(() => {

    window.scrollTo(0, 0);

    async function load() {

      try {

        const projects = await fetchProjects();

        const project = projects.find(
          (p) => p.slug === slug
        );

        if (project) {

          setData(project);

        } else {

          setErr(
            isAr
              ? "المشروع غير موجود"
              : "Project not found."
          );
        }

      } catch (e) {

        setErr(
          isAr
            ? "فشل تحميل المشروع"
            : "Failed to load project detail."
        );
      }
    }

    if (slug) load();

  }, [slug, lang, isAr]);

  if (err)
    return (
      <div className="min-h-screen bg-[#0b1537] text-red-400 p-20 text-center">
        {err}
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-[#0b1537] text-white p-20 text-center italic">
        {isAr ? "جاري التحميل..." : "Loading project..."}
      </div>
    );

  const displayTitle =
    typeof data.title === "object"
      ? data.title[lang] || data.title.en
      : data.title;

  const displaySummary =
    typeof data.summary === "object"
      ? data.summary[lang] || data.summary.en
      : data.summary;

  const displayContent =
    typeof data.content === "object"
      ? data.content[lang] || data.content.en
      : data.content;

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#0b1537] text-white pt-24 pb-16"
    >
      <div className="max-w-3xl mx-auto px-6">

        <Link
          to="/#projects"
          state={{ fromDetail: true }}
          className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-2 mb-10"
        >
          ← {isAr ? "العودة للمشاريع" : "Back to Projects"}
        </Link>

        <header className="text-center mb-12">

          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {displayTitle}
          </h1>

          <p className="text-lg text-slate-400">
            {displaySummary}
          </p>

        </header>

        {data.image && (
          <div className="rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-xl">
            <img
              src={data.image}
              alt={displayTitle}
              className="w-full"
            />
          </div>
        )}

        {data.video && (
          <div className="rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-xl">
            <video
              src={data.video}
              controls
              className="w-full"
            />
          </div>
        )}

        <div className="mb-14">

          <h3 className="text-indigo-300 font-bold uppercase tracking-widest text-sm mb-6 text-center">
            {isAr
              ? "نظرة عامة على المشروع"
              : "Project Overview"}
          </h3>

          <div className="text-slate-300 text-lg leading-loose text-center max-w-2xl mx-auto">
            {displayContent}
          </div>

        </div>

        {Array.isArray(data.tags) && data.tags.length > 0 && (

          <div className="mb-14 text-center">

            <h3 className="text-indigo-300 font-bold uppercase tracking-widest text-sm mb-6">
              {isAr
                ? "التقنيات المستخدمة"
                : "Technologies"}
            </h3>

            <div className="flex flex-wrap justify-center gap-3">

              {data.tags.map((tag, i) => (

                <span
                  key={i}
                  className="px-4 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-bold"
                >
                  {tag}
                </span>

              ))}

            </div>

          </div>
        )}

        <div className="space-y-4">

          {data.liveUrl && (
            <a
              href={data.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full max-w-md mx-auto py-3 text-sm bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-500 transition shadow-md"
            >
              {isAr ? "عرض المشروع" : "View Project"}
            </a>
          )}

          {data.githubUrl && (
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-full max-w-md mx-auto py-3 text-sm bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              {isAr ? "كود GitHub" : "View Code"}
            </a>
          )}

        </div>

      </div>
    </section>
  );
}