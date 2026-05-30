// src/sections/Projects.jsx
import { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading)
    return (
      <section className="min-h-[80vh] bg-[#0b1537] text-white flex items-center justify-center">
        <p>Loading projects...</p>
      </section>
    );

  return (
    <section className="relative bg-[#0b1537] text-white py-20 ">

      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Projects
      </h2>

      <div className="flex gap-6 overflow-x-auto px-8 snap-x scrollbar-hide">
        {projects.map((project) => (
          <div key={project.id} className="snap-center flex-shrink-0">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

    </section>
  );
}

