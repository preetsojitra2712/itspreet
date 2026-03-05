import { profile, projects } from "@/content/preet";
import { jobMatch } from "@/lib/job-match";
import { getProject, getSkillsByCategory, listExperience, listProjects } from "@/lib/portfolio-tools";
import { retrieve } from "@/lib/retrieval";

export type ChatTool = "listProjects" | "getProject" | "listExperience" | "getSkillsByCategory" | "jobMatch";

export type ChatAnswer = {
  text: string;
  references: string[];
  toolUsed?: ChatTool;
  toolPayload?: unknown;
};

export function answerWithTools(input: string): ChatAnswer {
  const query = input.trim().toLowerCase();

  const isGreeting = /^(hi|hello|hey|hii|hiii|hallo|hola|yo)\b/.test(query);
  const isShortSmallTalk = query.split(/\s+/).length <= 2;

  if (isGreeting) {
    return {
      text: `Hey! I can help with recruiter-focused answers.\n\nTry one of these:\n- listProjects\n- listExperience\n- getProject: systems-optimization-copilot\n- skills: AI/ML\n- jobMatch: <paste job description>`,
      references: [],
    };
  }

  if (isShortSmallTalk && !query.includes(":")) {
    return {
      text: `I can answer best when you ask a specific portfolio question.\n\nExamples:\n- "What are Preet's top backend impact metrics?"\n- "listProjects"\n- "jobMatch: <job description>"`,
      references: [],
    };
  }

  if (query.startsWith("getproject:")) {
    const slug = input.split(":").slice(1).join(":").trim().toLowerCase();
    const payload = getProject(slug);
    return {
      text: payload
        ? `${payload.title}\nProblem: ${payload.problem}\nApproach: ${payload.approach}\nResults: ${payload.resultsBullets.join("; ")}`
        : "Not in my portfolio data",
      references: payload ? [`projects.${payload.slug}`] : ["projects"],
      toolUsed: "getProject",
      toolPayload: payload,
    };
  }

  if (query.includes("list project") || query.includes("projects")) {
    const payload = listProjects();
    return {
      text: `Here are projects from ${profile.name}'s portfolio:\n${payload.map((p) => `- ${p.title}: ${p.oneLiner}`).join("\n")}`,
      references: ["projects"],
      toolUsed: "listProjects",
      toolPayload: payload,
    };
  }

  if (query.includes("experience")) {
    const payload = listExperience();
    return {
      text: `Experience timeline:\n${payload
        .map((exp) => `- ${exp.role} at ${exp.company} (${exp.period})`)
        .join("\n")}`,
      references: ["experiences"],
      toolUsed: "listExperience",
      toolPayload: payload,
    };
  }

  if (query.includes("skill") && query.includes(":")) {
    const category = input.split(":")[1]?.trim() ?? "";
    const payload = getSkillsByCategory(category);
    if (!payload) {
      return {
        text: `I could not find that skill category in the portfolio data.`,
        references: ["skills"],
        toolUsed: "getSkillsByCategory",
        toolPayload: null,
      };
    }
    return {
      text: `${payload.category} skills: ${payload.skills.join(", ")}`,
      references: [`skills.${payload.category}`],
      toolUsed: "getSkillsByCategory",
      toolPayload: payload,
    };
  }

  if (query.includes("job match") || query.includes("jd:") || query.includes("job description")) {
    const jd = input.includes(":") ? input.split(":").slice(1).join(":").trim() : input;
    const payload = jobMatch(jd);
    const topProjects = payload.topProjects.length
      ? payload.topProjects.map((item) => `- ${item.title} (score ${item.score})`).join("\n")
      : "- Not in my portfolio data";
    return {
      text: `Top matched skills: ${payload.topMatchedSkills.join(", ") || "Not in my portfolio data"}\n\nTop projects:\n${topProjects}\n\nWhy Preet fits:\n${payload.whyPreetFits
        .map((line) => `- ${line}`)
        .join("\n")}\n\nSuggested ATS keywords: ${payload.suggestedAtsKeywords.join(", ")}`,
      references: ["projects", "skills", "experiences"],
      toolUsed: "jobMatch",
      toolPayload: payload,
    };
  }

  const matchedProject = projects.find(
    (project) => query.includes(project.slug) || query.includes(project.title.toLowerCase()),
  );
  if (matchedProject) {
    const payload = getProject(matchedProject.slug);
    return {
      text: payload
        ? `${payload.title}\nProblem: ${payload.problem}\nApproach: ${payload.approach}\nResults: ${payload.resultsBullets.join("; ")}`
        : "Not in my portfolio data",
      references: [`projects.${matchedProject.slug}`],
      toolUsed: "getProject",
      toolPayload: payload,
    };
  }

  const evidence = retrieve(input, 2);
  return {
    text: `Based on portfolio data:\n${evidence.map((item) => `- ${item.text}`).join("\n")}\n\nYou can also use:\n- getProject: <slug>\n- skills: <category>\n- jobMatch: <job description>`,
    references: evidence.map((item) => item.source),
  };
}
