"use client";

import { useMemo, useState } from "react";
import { Bot, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { answerWithTools } from "@/lib/chat";
import { jobMatch } from "@/lib/job-match";

const demoOnly = process.env.NEXT_PUBLIC_DEMO_ONLY === "true";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export function AskPreetWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: 'Ask me anything about Preet. Try "jobMatch: <job description>" for recruiter-fit bullets.',
    },
  ]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [configured, setConfigured] = useState(true);

  const canSend = useMemo(() => value.trim().length > 1 && !loading, [value, loading]);

  const onSubmit = async () => {
    if (!canSend) return;
    const userText = value.trim();
    setValue("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    if (demoOnly) {
      const lower = userText.toLowerCase();
      const text =
        lower.includes("jobmatch") || lower.includes("job description")
          ? (() => {
              const jd = userText.includes(":") ? userText.split(":").slice(1).join(":").trim() : userText;
              const match = jobMatch(jd);
              return `Demo mode (deterministic match)\nTop matched skills: ${match.topMatchedSkills.join(", ") || "Not in my portfolio data"}\nTop projects: ${
                match.topProjects.map((item) => item.title).join(", ") || "Not in my portfolio data"
              }\nWhy Preet fits:\n${match.whyPreetFits.map((item) => `- ${item}`).join("\n")}`;
            })()
          : `${answerWithTools(userText).text}\n\n(Demo mode: deterministic local portfolio answers. Add YOU_API_KEY for live AI.)`;
      setConfigured(false);
      setMessages((prev) => [...prev, { role: "assistant", text }]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/ask-preet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const isConfigured = response.headers.get("x-ai-configured") === "true";
      setConfigured(isConfigured);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let sseBuffer = "";

      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

      if (!reader) {
        setLoading(false);
        return;
      }

      while (true) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        sseBuffer += decoder.decode(chunk, { stream: true });

        let eventEnd = sseBuffer.indexOf("\n\n");
        while (eventEnd !== -1) {
          const rawEvent = sseBuffer.slice(0, eventEnd);
          sseBuffer = sseBuffer.slice(eventEnd + 2);

          const dataLine = rawEvent
            .split("\n")
            .find((line) => line.startsWith("data:"));
          if (!dataLine) {
            eventEnd = sseBuffer.indexOf("\n\n");
            continue;
          }

          const payloadText = dataLine.slice(5).trimStart();
          try {
            const payload = JSON.parse(payloadText) as { delta?: string; done?: boolean };
            if (payload.done) {
              eventEnd = sseBuffer.indexOf("\n\n");
              continue;
            }
            if (typeof payload.delta === "string") {
              assistantText += payload.delta;
              setMessages((prev) => {
                const cloned = [...prev];
                cloned[cloned.length - 1] = { role: "assistant", text: assistantText };
                return cloned;
              });
            }
          } catch {
            // Ignore malformed event payloads and continue streaming.
          }
          eventEnd = sseBuffer.indexOf("\n\n");
        }
      }
    } catch {
      setConfigured(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "AI not configured - add YOU_API_KEY to enable. Demo mode currently active." },
      ]);
    }
    setLoading(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="fixed right-4 bottom-4 z-50 rounded-full shadow-lg" size="lg">
          <Bot className="size-4" /> Ask Preet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ask Preet</DialogTitle>
        </DialogHeader>
        {!configured ? (
          <p className="rounded-md bg-muted p-2 text-xs">AI not configured - add YOU_API_KEY to enable. Demo mode is active.</p>
        ) : null}
        <div className="h-[45vh] space-y-2 overflow-y-auto rounded-md border border-border p-3">
          {messages.map((item, idx) => (
            <div
              key={`${item.role}-${idx}`}
              className={`max-w-[90%] rounded-md px-3 py-2 text-sm whitespace-pre-wrap ${
                item.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {item.text || (loading ? "Thinking..." : "")}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void onSubmit();
              }
            }}
            placeholder='Ask recruiter-style questions, e.g. "What impact metrics prove backend scale?"'
            value={value}
          />
          <Button disabled={!canSend} onClick={() => void onSubmit()} size="icon" type="button">
            <Send className="size-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
