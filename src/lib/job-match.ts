import { projects, skills } from "@/content/preet";

export type JobMatchResult = {
  topMatchedSkills: string[];
  topProjects: Array<{ slug: string; title: string; score: number }>;
  whyPreetFits: string[];
  suggestedAtsKeywords: string[];
};

type TokenScore = { token: string; count: number };

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "from",
  "into",
  "your",
  "you",
  "our",
  "this",
  "are",
  "has",
  "have",
  "will",
  "can",
  "using",
  "use",
  "able",
  "job",
  "role",
  "years",
  "year",
  "experience",
]);

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9+\-/. ]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export function keywordOverlap(jobDescriptionText: string): TokenScore[] {
  const counts = new Map<string, number>();
  for (const token of tokenize(jobDescriptionText)) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([token, count]) => ({ token, count }))
    .sort((a, b) => b.count - a.count || a.token.localeCompare(b.token));
}

export function jobMatch(jobDescriptionText: string): JobMatchResult {
  const overlaps = keywordOverlap(jobDescriptionText);
  const tokenSet = new Set(overlaps.map((item) => item.token));

  const flattenedSkills = Object.values(skills).flat();
  const topMatchedSkills = flattenedSkills
    .filter((skill) => tokenize(skill).some((part) => tokenSet.has(part)))
    .slice(0, 10);

  const topProjects = projects
    .map((project) => {
      const text =
        `${project.title} ${project.oneLiner} ${project.tags.join(" ")} ${project.techStack.join(" ")}`.toLowerCase();
      const score = overlaps.reduce((acc, item) => acc + (text.includes(item.token) ? item.count : 0), 0);
      return { slug: project.slug, title: project.title, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const whyPreetFits = [
    "Built production backends serving 500K+ MAU and 2M+ monthly queries, aligned with high-scale engineering roles.",
    "Hands-on AI/ML delivery across LLM agents, retrieval systems, and model evaluation pipelines.",
    "Experience shipping full-stack systems from architecture to observability and deployment.",
    "Strong distributed systems exposure with Kubernetes, CI/CD, and cloud-native automation.",
    "Demonstrated measurable impact, including 84% faster debugging workflows and 65% release lead-time reduction.",
    "Comfortable with fast iteration in startup-style environments while maintaining engineering rigor.",
  ];

  const suggestedAtsKeywords = Array.from(
    new Set([
      ...overlaps.slice(0, 12).map((item) => item.token),
      ...topMatchedSkills.map((skill) => skill.toLowerCase()),
      ...topProjects.map((project) => project.title.toLowerCase()),
    ]),
  ).slice(0, 20);

  return {
    topMatchedSkills,
    topProjects,
    whyPreetFits,
    suggestedAtsKeywords,
  };
}
