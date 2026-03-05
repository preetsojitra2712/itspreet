import { z } from "zod";

import { jobMatch } from "@/lib/job-match";

const schema = z.object({
  jobDescriptionText: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  return Response.json(jobMatch(parsed.data.jobDescriptionText));
}
