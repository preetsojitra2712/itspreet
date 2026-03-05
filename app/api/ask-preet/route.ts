import { z } from "zod";

import { answerWithTools } from "@/lib/chat";

const payloadSchema = z.object({
  message: z.string().min(1),
});

async function* streamText(value: string) {
  for (let i = 0; i < value.length; i += 32) {
    const chunk = value.slice(i, i + 32);
    await new Promise((resolve) => setTimeout(resolve, 8));
    yield `data: ${JSON.stringify({ delta: chunk })}\n\n`;
  }
  yield `data: ${JSON.stringify({ done: true })}\n\n`;
}

async function rewriteWithYouApi(userMessage: string, groundedAnswer: string, references: string[]) {
  const apiKey = process.env.YOU_API_KEY;
  if (!apiKey) return null;

  const prompt = [
    "You are a recruiter-facing assistant for Preet Sojitra's portfolio.",
    "Use ONLY the provided grounded facts. Do not add new facts, metrics, employers, or dates.",
    "If missing information, explicitly say: Not in my portfolio data.",
    "Answer clearly and concisely.",
    "",
    `User question: ${userMessage}`,
    "",
    "Grounded facts:",
    groundedAnswer,
    "",
    `References: ${references.join(", ") || "none"}`,
  ].join("\n");

  const response = await fetch("https://api.you.com/v1/agents/runs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent: "express",
      input: prompt,
      stream: false,
    }),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as {
    output?: Array<{ type?: string; text?: string }>;
  };

  const message = data.output?.find((item) => item.type === "message.answer" && item.text)?.text;
  return message?.trim() || null;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const aiConfigured = Boolean(process.env.YOU_API_KEY);
  const answer = answerWithTools(parsed.data.message);
  const rewritten = await rewriteWithYouApi(parsed.data.message, answer.text, answer.references);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let final = rewritten ?? answer.text;
      final += `\n\nReferences: ${answer.references.join(", ")}`;
      if (!aiConfigured) {
        final += "\n\nAI not configured - add YOU_API_KEY to enable You.com responses.";
      }
      for await (const chunk of streamText(final)) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "x-ai-configured": String(aiConfigured),
    },
  });
}
