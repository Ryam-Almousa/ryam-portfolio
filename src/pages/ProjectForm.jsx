// src/pages/ProjectForm.jsx


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProject, updateProject, fetchProjects } from "../lib/api";

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: { ar: "", en: "" },
    slug: "",
    summary: { ar: "", en: "" },
    content: { ar: "", en: "" },
    image: "",
    githubUrl: "",
    liveUrl: "",
    video: "",
    tags: ""
  });

  const [originalVideo, setOriginalVideo] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function load() {
      const data = await fetchProjects();
      const project = data.find(p => p.id === parseInt(id));

      if (project) {
        setForm({
          ...project,
          title: project.title || { ar: "", en: "" },
          summary: project.summary || { ar: "", en: "" },
          content: project.content || { ar: "", en: "" },
          tags: Array.isArray(project.tags)
            ? project.tags.join(", ")
            : ""
        });

        setOriginalVideo(project.video || ""); 
      }
    }

    load();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    if (file.size > 5 * 1024 * 1024) {
      alert("الفيديو كبير جدًا (أقصى شيء 5MB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        video: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map(t => t.trim())
      };

      
      if (form.video === originalVideo) {
        delete payload.video;
      }

      if (id) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }

      navigate("/admin/projects");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020824] text-white p-10">
      <h1 className="text-3xl font-bold mb-10 text-center">
        {id ? "Edit Project" : "New Project"}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">

        {/* Title */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Title (EN)"
            value={form.title.en}
            onChange={e =>
              setForm({
                ...form,
                title: { ...form.title, en: e.target.value }
              })
            }
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full"
          />

          <input
            placeholder="العنوان (AR)"
            value={form.title.ar}
            onChange={e =>
              setForm({
                ...form,
                title: { ...form.title, ar: e.target.value }
              })
            }
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full text-right"
          />
        </div>

        {/* Slug */}
        <input
          placeholder="Slug"
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
          className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full"
        />

        {/* Summary */}
        <div className="grid md:grid-cols-2 gap-4">
          <textarea
            placeholder="Summary (EN)"
            value={form.summary.en}
            onChange={e =>
              setForm({
                ...form,
                summary: { ...form.summary, en: e.target.value }
              })
            }
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full h-32"
          />

          <textarea
            placeholder="الوصف (AR)"
            value={form.summary.ar}
            onChange={e =>
              setForm({
                ...form,
                summary: { ...form.summary, ar: e.target.value }
              })
            }
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full h-32 text-right"
          />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-4">
          <textarea
            placeholder="Content (EN)"
            value={form.content.en}
            onChange={e =>
              setForm({
                ...form,
                content: { ...form.content, en: e.target.value }
              })
            }
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full h-40"
          />

          <textarea
            placeholder="تفاصيل المشروع (AR)"
            value={form.content.ar}
            onChange={e =>
              setForm({
                ...form,
                content: { ...form.content, ar: e.target.value }
              })
            }
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full h-40 text-right"
          />
        </div>

        {/* Image */}
        <div>
          <label className="text-sm text-slate-400 block mb-2">
            Project Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full"
          />

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-40 mt-3 rounded-xl border border-white/10"
            />
          )}
        </div>

        {/* GitHub + Live + Video */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="GitHub"
            value={form.githubUrl}
            onChange={e => setForm({ ...form, githubUrl: e.target.value })}
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full"
          />

          <input
            placeholder="Live URL"
            value={form.liveUrl}
            onChange={e => setForm({ ...form, liveUrl: e.target.value })}
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full"
          />

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full"
          />
        </div>

        {/* Preview Video */}
        {form.video && (
          <video
            src={form.video}
            controls
            className="w-40 mt-3 rounded-xl border border-white/10"
          />
        )}

        {/* Tags */}
        <input
          placeholder="React, Node"
          value={form.tags}
          onChange={e => setForm({ ...form, tags: e.target.value })}
          className="input-admin-full bg-white/5 border border-white/10 p-3 rounded-lg w-full"
        />

        {/* Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white/10 px-10 py-3 rounded-xl font-bold hover:bg-white/20 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 px-10 py-3 rounded-xl font-bold hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Project"}
          </button>
        </div>

      </form>
    </div>
  );
}