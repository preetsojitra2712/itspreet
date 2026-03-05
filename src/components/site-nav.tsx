"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/preet";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [active, setActive] = useState(sections[0].id);
  const observerOptions = useMemo(
    () => ({
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.01,
    }),
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, observerOptions);

    sections.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [observerOptions]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          {profile.name}
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                className={`rounded-md px-3 py-2 text-sm transition ${
                  active === section.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                href={`#${section.id}`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <a href="#contact">Let&apos;s build</a>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
