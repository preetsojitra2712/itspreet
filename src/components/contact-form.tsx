"use client";

import { FormEvent, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { profile } from "@/content/preet";

export function ContactForm() {
  const [status, setStatus] = useState("");

  const onCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Portfolio inquiry from ${name}`,
    )}&body=${encodeURIComponent(`${message}\n\nReply to: ${email}`)}`;

    window.location.href = mailto;
    setStatus("Opened your email client to send this message.");
    toast.success("Email draft opened");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3 rounded-2xl border border-border/70 bg-card/70 p-6">
        <p className="text-sm text-muted-foreground">Reach out directly</p>
        <div className="space-y-3">
          <button
            className="flex items-center gap-2 text-left text-sm hover:underline"
            onClick={() => onCopy(profile.email, "Email")}
            type="button"
          >
            <Copy className="size-4" /> {profile.email}
          </button>
          <button
            className="flex items-center gap-2 text-left text-sm hover:underline"
            onClick={() => onCopy(profile.phone, "Phone")}
            type="button"
          >
            <Copy className="size-4" /> {profile.phone}
          </button>
        </div>
      </div>

      <form className="space-y-3 rounded-2xl border border-border/70 bg-card/70 p-6" onSubmit={onSubmit}>
        <input
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          name="name"
          placeholder="Your name"
          required
        />
        <input
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          name="email"
          placeholder="you@company.com"
          required
          type="email"
        />
        <textarea
          className="min-h-28 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          name="message"
          placeholder="What are you hiring for?"
          required
        />
        <Button className="w-full" type="submit">
          Send message
        </Button>
        {status ? <p className="text-xs text-muted-foreground">{status}</p> : null}
      </form>
    </div>
  );
}
