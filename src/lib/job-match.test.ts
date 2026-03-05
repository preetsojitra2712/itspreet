import { describe, expect, it } from "vitest";

import { jobMatch, tokenize } from "@/lib/job-match";

describe("jobMatch", () => {
  it("tokenizes text while removing stop words", () => {
    const tokens = tokenize("Looking for a Python and Kubernetes engineer for distributed systems.");
    expect(tokens).toContain("python");
    expect(tokens).toContain("kubernetes");
    expect(tokens).not.toContain("and");
  });

  it("returns deterministic overlap-based output", () => {
    const result = jobMatch("Need Python, Kubernetes, and distributed systems with LLM experience");
    expect(result.topMatchedSkills.length).toBeGreaterThan(0);
    expect(result.whyPreetFits).toHaveLength(6);
    expect(result.suggestedAtsKeywords.length).toBeGreaterThan(0);
  });
});
