// src/App.jsx

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// صفحاتك
import Overview from "./pages/Overview";
import NotFound from "./pages/NotFound";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";

// المشاريع
import ProjectsSection from "./sections/ProjectsSection";
import ProjectDetails from "./pages/ProjectDetail";

// الأدمن
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminNewProject from "./pages/AdminNewProject";
import ProjectForm from "./pages/ProjectForm";
import SkillForm from "./pages/SkillForm";

// UI
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

function ScrollToHash() {
  const { hash, state } = useLocation();

  useEffect(() => {
    if (hash === "#projects" && state?.fromDetail) {
      setTimeout(() => {
        const el = document.querySelector("#projects");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash, state]);

  return null;
}

function AppShell({ lang, setLang }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");


  const isProjectDetail = location.pathname.startsWith("/projects/");

  return (
    <div className="text-foreground min-h-screen flex flex-col">

      {!isAdminRoute && <Navbar lang={lang} setLang={setLang} />}

      <div className="flex-1">
        <Routes>
          {/* الرئيسية */}
          <Route index element={<Overview lang={lang} />} />

          {/* المشاريع */}
          <Route path="/projects" element={<ProjectsSection lang={lang} />} />
          <Route path="/projects/:slug" element={<ProjectDetails lang={lang} />} />

          {/* ADMIN */}
          <Route path="/admin/login" element={<AdminLogin />} />
         <Route
  path="/admin/projects"
  element={
    <ProtectedRoute>
      <AdminNewProject />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/skills"
  element={
    <ProtectedRoute>
      <AdminNewProject />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/projects/new"
  element={
    <ProtectedRoute>
      <ProjectForm />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/projects/edit/:id"
  element={
    <ProtectedRoute>
      <ProjectForm />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/skills/new"
  element={
    <ProtectedRoute>
      <SkillForm />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/skills/edit/:id"
  element={
    <ProtectedRoute>
      <SkillForm />
    </ProtectedRoute>
  }
/>

         
          <Route path="/achievements" element={<Achievements lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

     
      {!isAdminRoute && !isProjectDetail && <Footer />}
      {!isAdminRoute && !isProjectDetail && <ScrollToTopButton />}

    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");

  return (
    <BrowserRouter>
      <ScrollToHash />
      <AppShell lang={lang} setLang={setLang} />
    </BrowserRouter>
  );
}