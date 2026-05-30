import { useState, useEffect } from "react";
import { createSkillGroup, updateSkillGroup, fetchSkills } from "../lib/api"; 
import { useNavigate, useParams } from "react-router-dom";

export default function SkillForm() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  
  const [skillInputEn, setSkillInputEn] = useState("");
  const [skillsListEn, setSkillsListEn] = useState([]);
  
  const [skillInputAr, setSkillInputAr] = useState("");
  const [skillsListAr, setSkillsListAr] = useState([]);
  
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (id) {
      async function loadOldSkill() {
        try {
          const all = await fetchSkills();
          const group = all.find(s => String(s.id) === String(id));
          if (group) {
            if (typeof group.title === 'object') {
              setTitleEn(group.title.en || "");
              setTitleAr(group.title.ar || "");
            }
            setSkillsListEn(group.skillsEn || group.skills || []);
            setSkillsListAr(group.skillsAr || []);
          }
        } catch (err) {
          console.error("Error fetching skills", err);
        }
      }
      loadOldSkill();
    }
  }, [id]);

  const addSkillEn = () => {
    if (skillInputEn.trim()) {
      setSkillsListEn([...skillsListEn, skillInputEn.trim()]);
      setSkillInputEn("");
    }
  };

  const addSkillAr = () => {
    if (skillInputAr.trim()) {
      setSkillsListAr([...skillsListAr, skillInputAr.trim()]);
      setSkillInputAr("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    
    const payload = { 
      title: { en: titleEn, ar: titleAr }, 
      skillsEn: skillsListEn,
      skillsAr: skillsListAr,
     
    };

    try {
      if (id) await updateSkillGroup(id, payload);
      else await createSkillGroup(payload);
      navigate("/admin/skills");
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b26] text-white font-[Cairo]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} className="space-y-12">
          <h2 className="text-3xl font-black">{id ? "تعديل المهارات" : "إضافة مهارات جديدة"}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white/[0.02] rounded-3xl border border-white/5">
             <div className="space-y-3">
              <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Group Title (EN)</label>
              <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="input-admin-full !text-xl" placeholder="e.g. Programming" required />
            </div>
            <div className="space-y-3 text-right">
              <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">عنوان المجموعة (عربي)</label>
              <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="input-admin-full !text-xl text-right" placeholder="مثلاً: البرمجة" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* EN Skills */}
            <div className="space-y-6">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Skills (EN)</label>
              <div className="flex gap-2">
                <input value={skillInputEn} onChange={(e) => setSkillInputEn(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillEn())} className="input-admin-full !py-3" placeholder="Type..." />
                <button type="button" onClick={addSkillEn} className="bg-indigo-600 px-4 rounded-xl font-bold">ADD</button>
              </div>
              <div className="flex flex-wrap gap-2 p-5 bg-white/[0.03] rounded-2xl border border-dashed border-white/10 min-h-[120px]">
                {skillsListEn.map((s, i) => (
                  <span key={i} className="bg-blue-500/10 text-blue-200 px-4 py-1.5 rounded-lg text-xs font-bold border border-blue-500/20 flex items-center gap-2">
                    {s} <button type="button" onClick={() => setSkillsListEn(skillsListEn.filter((_, idx) => idx !== i))}>×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* AR Skills */}
            <div className="space-y-6 text-right">
              <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">المهارات (عربي)</label>
              <div className="flex flex-row-reverse gap-2">
                <input value={skillInputAr} onChange={(e) => setSkillInputAr(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillAr())} className="input-admin-full !py-3 text-right" placeholder="اكتب..." />
                <button type="button" onClick={addSkillAr} className="bg-emerald-600 px-4 rounded-xl font-bold">إضافة</button>
              </div>
              <div className="flex flex-wrap flex-row-reverse gap-2 p-5 bg-white/[0.03] rounded-2xl border border-dashed border-white/10 min-h-[120px]">
                {skillsListAr.map((s, i) => (
                  <span key={i} className="bg-emerald-500/10 text-emerald-200 px-4 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/20 flex items-center gap-2 flex-row-reverse">
                    {s} <button type="button" onClick={() => setSkillsListAr(skillsListAr.filter((_, idx) => idx !== i))}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-10 border-t border-white/10">
            <button type="button" onClick={() => navigate("/admin/skills")} className="text-slate-500 uppercase font-bold text-xs">Cancel / إلغاء</button>
            <button type="submit" disabled={busy} className="bg-indigo-600 px-12 py-4 rounded-2xl font-black">
              {busy ? "SAVING..." : "SAVE GROUP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}