import { ArrowRight, ExternalLink } from "lucide-react";

import { AskPreetWidget } from "@/components/ask-preet-widget";
import { ContactForm } from "@/components/contact-form";
import { ProjectCard } from "@/components/project-card";
import { SectionBlock } from "@/components/section-block";
import { SiteNav } from "@/components/site-nav";
import { SkillIcon } from "@/components/skill-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { achievements, counters, experiences, links, profile, projects, publications, skills } from "@/content/preet";

const featuredProjects = projects.filter((item) => item.featured);
const moreProjects = projects.filter((item) => !item.featured);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6" id="main-content">
        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-sky-500/10 via-background to-violet-500/10 px-6 py-14 sm:px-10 sm:py-20">
          <div className="absolute inset-0 noise opacity-20" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <Badge variant="secondary">{profile.location}</Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
              <p className="text-lg text-muted-foreground">{profile.titles.join(" • ")}</p>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{profile.summary}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#projects">
                    View Projects <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#contact">Contact Preet</a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href={links.resumePath} rel="noreferrer" target="_blank">
                    Resume
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {counters.map((item) => (
                <Card key={item.label} className="border-border/70 bg-card/60 backdrop-blur">
                  <CardContent className="space-y-2 p-5">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SectionBlock id="about" subtitle="Builder profile at a glance." title="About">
          <Card className="border-border/70 bg-card/60">
            <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
              <p>
                Preet builds scalable AI and software systems across agentic AI platforms, multimodal evaluation, and
                distributed infrastructure.
              </p>
              <p>
                Recent impact includes LLM-based internationalization triage, edge CV systems, and backend reliability
                improvements at production scale.
              </p>
            </CardContent>
          </Card>
        </SectionBlock>

        <SectionBlock id="experience" subtitle="Timeline of high-impact engineering work." title="Experience">
          <div className="space-y-4">
            {experiences.map((item) => (
              <Card className="border-border/70 bg-card/60" key={item.company}>
                <CardContent className="space-y-3 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <p className="text-xs text-muted-foreground">{item.period}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.company} • {item.location}
                  </p>
                  <ul className="space-y-1 text-sm">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>- {bullet}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="achievements" title="Achievements">
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((item) => (
              <Card className="border-border/70 bg-card/60" key={item.title}>
                <CardContent className="space-y-2 p-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          id="projects"
          subtitle="Case-study style project storytelling with metrics."
          title="Featured Projects"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <h3 className="mt-8 text-lg font-semibold">More Projects</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="skills" title="Skills">
          <div className="space-y-4">
            {Object.entries(skills).map(([category, list]) => (
              <Card className="border-border/70 bg-card/60" key={category}>
                <CardContent className="space-y-4 p-6">
                  <h3 className="text-sm font-semibold">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {list.map((skill) => (
                      <Badge className="gap-2 rounded-full px-3 py-1" key={skill} variant="secondary">
                        <SkillIcon skill={skill} />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="publications" title="Publications">
          <div className="space-y-3">
            {publications.map((item) => (
              <Card className="border-border/70 bg-card/60" key={item.title}>
                <CardContent className="space-y-1 p-6">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.venue}
                    {item.year ? ` • ${item.year}` : ""}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="contact" subtitle="Fastest response via email." title="Contact">
          <ContactForm />
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <a
              className="inline-flex items-center gap-1 hover:underline"
              href={links.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub <ExternalLink className="size-4" />
            </a>
            {links.linkedin ? (
              <a
                className="inline-flex items-center gap-1 hover:underline"
                href={links.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn <ExternalLink className="size-4" />
              </a>
            ) : null}
          </div>
        </SectionBlock>
      </main>
      <footer className="border-t border-border/70 py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-2 px-4 text-xs text-muted-foreground sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with Next.js, Tailwind, shadcn/ui, Framer Motion, and agentic AI routes.</p>
        </div>
      </footer>
      <AskPreetWidget />
    </div>
  );
}
