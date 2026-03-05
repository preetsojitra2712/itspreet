import { experiences, projects, skills } from "@/content/preet";

export function listProjects() {
  return projects.map(({ slug, title, oneLiner, tags, featured }) => ({
    slug,
    title,
    oneLiner,
    tags,
    featured,
  }));
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function listExperience() {
  return experiences.map(({ company, role, period, location, bullets, tags }) => ({
    company,
    role,
    period,
    location,
    bullets,
    tags,
  }));
}

export function getSkillsByCategory(category: string) {
  const key = Object.keys(skills).find((item) => item.toLowerCase() === category.toLowerCase());
  return key ? { category: key, skills: skills[key as keyof typeof skills] } : null;
}
