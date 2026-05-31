import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import {
  fetchProjects,
  deleteProject,
  fetchSkills,
  deleteSkillGroup
} from "../lib/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate("/admin/login");
};

  const [tab, setTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === "projects") {
        const data = await fetchProjects();
        setProjects(data);
      } else {
        const data = await fetchSkills();
        setSkills(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [tab]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      if (tab === "projects") {
        await deleteProject(id);
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        await deleteSkillGroup(id);
        setSkills(prev => prev.filter(s => s.id !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const currentData = tab === "projects" ? projects : skills;


  const getDisplayText = (field) => {
    if (typeof field === "object" && field !== null) {
      return field.en || field.ar || "No Title";
    }
    return field || "No Title";
  };

  return (
    <div className="min-h-screen bg-[#020824] text-white flex">
      <aside className="w-64 bg-[#050b26] border-r border-white/5 fixed h-full p-6">
        <h1 className="text-xl font-bold text-indigo-500 mb-10">RYAM ADMIN</h1>

        <nav className="space-y-2">
          <button
            onClick={() => setTab("projects")}
            className={`w-full text-left px-4 py-3 rounded-xl transition ${
              tab === "projects" ? "bg-indigo-600" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            📁 Projects
          </button>

          <button
            onClick={() => setTab("skills")}
            className={`w-full text-left px-4 py-3 rounded-xl transition ${
              tab === "skills" ? "bg-indigo-600" : "text-slate-400 hover:bg-white/5"
            }`}
          >
            ⚡ Skills
          </button>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <div className="flex justify-between items-center mb-8">
  <h2 className="text-3xl font-bold capitalize">{tab}</h2>

  <div className="flex items-center gap-4">
    <button
      onClick={handleLogout}
      className="bg-red-500 px-5 py-2 rounded-lg font-bold hover:bg-red-400 transition"
    >
      Logout
    </button>

    <button
      onClick={() => navigate(`/admin/${tab}/new`)}
      className="bg-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-indigo-500 transition"
    >
      + New {tab === "projects" ? "Project" : "Skill"}
    </button>
  </div>
</div>

        <div className="bg-[#050b26] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-10 text-center text-slate-400">Loading...</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase">
                  <th className="p-5">Title</th>
                  <th className="p-5">
                    {tab === "projects" ? "Slug" : "Count"}
                  </th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition">
                    
                    <td className="p-5 font-medium">
                      {getDisplayText(item.title)}
                    </td>

                    <td className="p-5 text-slate-500 text-sm">
                      {tab === "projects"
                        ? item.slug
                        : `${item.skillsEn?.length || 0} items`}
                    </td>

                    <td className="p-5 text-right flex justify-end gap-4">
                      <button
                        onClick={() => navigate(`/admin/${tab}/edit/${item.id}`)}
                        className="text-indigo-400 hover:text-indigo-300 text-xs font-bold"
                      >
                        MODIFY
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-10 text-center text-slate-500">
                      No {tab} found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}