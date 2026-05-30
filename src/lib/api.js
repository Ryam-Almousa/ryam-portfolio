// src/lib/api.js
import { supabase } from "./supabase";

// ================= PROJECTS =================

export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createProject(project) {
  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select();

  if (error) throw error;

  return data;
}

export async function updateProject(id, updatedProject) {
  const { data, error } = await supabase
    .from("projects")
    .update(updatedProject)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteProject(id) {
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return data;
}

// ================= SKILLS =================

export async function fetchSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createSkillGroup(skill) {
  const { data, error } = await supabase
    .from("skills")
    .insert([skill])
    .select();

  if (error) throw error;

  return data;
}

export async function updateSkillGroup(id, updatedSkill) {
  const { data, error } = await supabase
    .from("skills")
    .update(updatedSkill)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
}

export async function deleteSkillGroup(id) {
  const { data, error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return data;
}