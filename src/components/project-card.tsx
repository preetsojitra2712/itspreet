import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/content/preet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full border-border/70 bg-card/60 backdrop-blur">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
        <ul className="space-y-1 text-sm">
          {project.resultsBullets.slice(0, 2).map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <Link
          className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
          href={`/projects/${project.slug}`}
        >
          Read case study <ArrowUpRight className="size-4" />
        </Link>
        {project.links[0] ? (
          <Link
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            href={project.links[0].url}
            target="_blank"
            rel="noreferrer"
          >
            {project.links[0].label} <ArrowUpRight className="size-4" />
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
