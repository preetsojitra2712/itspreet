import { describe, expect, it } from "vitest";

import { achievements, counters, experiences, profile, projects, publications, skills } from "@/content/preet";
import { portfolioSchema } from "@/lib/schemas";

describe("portfolio content schema", () => {
  it("matches expected schema", () => {
    const parsed = portfolioSchema.safeParse({
      profile,
      counters,
      experiences,
      achievements,
      publications,
      projects,
      skills,
    });

    expect(parsed.success).toBe(true);
  });
});
