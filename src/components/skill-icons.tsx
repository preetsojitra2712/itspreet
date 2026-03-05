import { Code2 } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { IconType } from "react-icons";
import * as SimpleIcons from "react-icons/si";

type IconComponent = IconType | ComponentType<SVGProps<SVGSVGElement>>;

const iconNameMap: Record<string, string> = {
  Python: "SiPython",
  "C++": "SiCplusplus",
  Java: "SiOpenjdk",
  JavaScript: "SiJavascript",
  TypeScript: "SiTypescript",
  Bash: "SiGnubash",
  PyTorch: "SiPytorch",
  "Hugging Face": "SiHuggingface",
  LangChain: "SiLangchain",
  FastAPI: "SiFastapi",
  "Node.js": "SiNodedotjs",
  Express: "SiExpress",
  PostgreSQL: "SiPostgresql",
  MongoDB: "SiMongodb",
  Elasticsearch: "SiElasticsearch",
  Redis: "SiRedis",
  Docker: "SiDocker",
  Kubernetes: "SiKubernetes",
  Jenkins: "SiJenkins",
  Terraform: "SiTerraform",
  AWS: "SiAmazonwebservices",
  GCP: "SiGooglecloud",
  Prometheus: "SiPrometheus",
  React: "SiReact",
  "Next.js": "SiNextdotjs",
  Tailwind: "SiTailwindcss",
};

export function SkillIcon({ skill, className }: { skill: string; className?: string }) {
  const iconName = iconNameMap[skill];
  const Icon =
    (iconName ? (SimpleIcons[iconName as keyof typeof SimpleIcons] as IconComponent | undefined) : undefined) ?? Code2;
  return <Icon aria-hidden className={className ?? "size-3.5"} />;
}
