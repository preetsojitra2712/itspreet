import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from "@/content/preet";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Case Study`,
    description: project.oneLiner,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const related = projects
    .filter((item) => item.slug !== project.slug && item.tags.some((tag) => project.tags.includes(tag)))
    .slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <Button asChild variant="ghost">
        <Link href="/">
          <ArrowLeft className="size-4" /> Back home
        </Link>
      </Button>

      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="max-w-3xl text-muted-foreground">{project.oneLiner}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <Button asChild key={link.url} variant="outline">
              <a href={link.url} rel="noreferrer" target="_blank">
                {link.label} <ExternalLink className="size-4" />
              </a>
            </Button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-6">
            <h2 className="font-semibold">Problem</h2>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 p-6">
            <h2 className="font-semibold">Approach</h2>
            <p className="text-sm text-muted-foreground">{project.approach}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3 p-6">
            <h2 className="font-semibold">Architecture</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {project.architectureBullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 p-6">
            <h2 className="font-semibold">Results</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {project.resultsBullets.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="space-y-3 p-6">
          <h2 className="font-semibold">Mermaid Architecture Diagram</h2>
          <pre className="overflow-x-auto rounded-md border border-border bg-muted p-4 text-xs">
            {`mermaid\n${project.mermaid}`}
          </pre>
        </CardContent>
      </Card>

      {project.slug === "systems-optimization-copilot" ? (
        <Card>
          <CardContent className="space-y-3 p-6">
            <h2 className="font-semibold">Live Demo: Paste error log</h2>
            <p className="text-sm text-muted-foreground">
              Use the Ask Preet widget and type: <code>jobMatch:</code> for recruiter mode or ask about this copilot. If
              OPENAI_API_KEY is missing, demo mode remains deterministic.
            </p>
          </CardContent>
        </Card>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Learnings</h2>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {project.learnings.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Related Projects</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
