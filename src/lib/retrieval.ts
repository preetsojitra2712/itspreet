import { achievements, experiences, profile, projects, publications, skills } from "@/content/preet";

export type EvidenceChunk = {
  id: string;
  text: string;
  source: string;
};

function buildCorpus(): EvidenceChunk[] {
  const chunks: EvidenceChunk[] = [];
  chunks.push({
    id: "profile-summary",
    text: `${profile.name} - ${profile.titles.join(", ")}. ${profile.summary}`,
    source: "profile.summary",
  });

  experiences.forEach((exp, index) => {
    chunks.push({
      id: `experience-${index}`,
      text: `${exp.company} ${exp.role} ${exp.period} ${exp.bullets.join(" ")}`,
      source: `experiences[${index}]`,
    });
  });

  projects.forEach((project, index) => {
    chunks.push({
      id: `project-${index}`,
      text: `${project.title}. ${project.oneLiner}. Results: ${project.resultsBullets.join(
        " ",
      )}. Tech: ${project.techStack.join(", ")}`,
      source: `projects[${index}]`,
    });
  });

  achievements.forEach((item, index) => {
    chunks.push({
      id: `achievement-${index}`,
      text: `${item.title} - ${item.subtitle}`,
      source: `achievements[${index}]`,
    });
  });

  publications.forEach((item, index) => {
    chunks.push({
      id: `publication-${index}`,
      text: `${item.title} (${item.venue}${item.year ? `, ${item.year}` : ""})`,
      source: `publications[${index}]`,
    });
  });

  Object.entries(skills).forEach(([key, list]) => {
    chunks.push({
      id: `skills-${key.toLowerCase()}`,
      text: `${key}: ${list.join(", ")}`,
      source: `skills.${key}`,
    });
  });
  return chunks;
}

const corpus = buildCorpus();

export function retrieve(query: string, k = 4): EvidenceChunk[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = corpus
    .map((chunk) => {
      const text = chunk.text.toLowerCase();
      const score = tokens.reduce((acc, token) => acc + (text.includes(token) ? 1 : 0), 0);
      return { chunk, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((item) => item.chunk);

  return scored.length > 0 ? scored : corpus.slice(0, k);
}
