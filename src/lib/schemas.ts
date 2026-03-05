import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  titles: z.array(z.string().min(1)).min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  location: z.string().min(1),
  github: z.string().url(),
  linkedin: z.string(),
  summary: z.string().min(20),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  featured: z.boolean(),
  oneLiner: z.string().min(1),
  problem: z.string().min(1),
  approach: z.string().min(1),
  architectureBullets: z.array(z.string().min(1)).min(1),
  resultsBullets: z.array(z.string().min(1)).min(1),
  learnings: z.array(z.string().min(1)).min(1),
  techStack: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).min(1),
  links: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url(),
      }),
    )
    .min(1),
  mermaid: z.string().min(1),
});

export const portfolioSchema = z.object({
  profile: profileSchema,
  counters: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
      source: z.string().min(1),
    }),
  ),
  experiences: z.array(
    z.object({
      company: z.string().min(1),
      role: z.string().min(1),
      period: z.string().min(1),
      location: z.string().min(1),
      bullets: z.array(z.string().min(1)).min(1),
      tags: z.array(z.string().min(1)).min(1),
    }),
  ),
  achievements: z.array(
    z.object({
      title: z.string().min(1),
      subtitle: z.string().min(1),
    }),
  ),
  publications: z.array(
    z.object({
      title: z.string().min(1),
      venue: z.string().min(1),
      year: z.string().optional(),
    }),
  ),
  projects: z.array(projectSchema),
  skills: z.record(z.string(), z.array(z.string())),
});
