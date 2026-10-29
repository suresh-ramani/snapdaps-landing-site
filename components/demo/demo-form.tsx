"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const roles = ["Photographer", "Event planner", "Studio / agency", "Couple or host", "Other"];

/**
 * Demo / contact form. Posts to /api/demo, which emails the Snapdaps team.
 * Used in the Book a demo popup and on /contact.
 */
export function DemoForm({ source, showMessage = false }: { source: "popup" | "contact"; showMessage?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(undefined);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, page: window.location.pathname }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Your request didn't go through.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Your request didn't go through.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg bg-after p-6 text-center">
        <CheckCircle2 className="mx-auto size-8 text-after-ink" />
        <p className="mt-3 font-display text-lg font-semibold">Request sent</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The Snapdaps team will email you within one working day to schedule your demo.
        </p>
      </div>
    );
  }

  const id = (name: string) => `${source}-${name}`;
  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={id("name")}>Name</Label>
          <Input id={id("name")} name="name" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={id("phone")}>Phone / WhatsApp</Label>
          <Input id={id("phone")} name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={id("email")}>Email</Label>
        <Input id={id("email")} name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={id("role")}>I am a</Label>
          <select
            id={id("role")}
            name="role"
            required
            defaultValue=""
            className="h-10 rounded-md border border-input bg-card px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
          >
            <option value="" disabled>
              Choose one
            </option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor={id("city")}>City</Label>
          <Input id={id("city")} name="city" autoComplete="address-level2" />
        </div>
      </div>
      {showMessage && (
        <div className="grid gap-2">
          <Label htmlFor={id("message")}>Message (optional)</Label>
          <Textarea id={id("message")} name="message" placeholder="Tell us about your events" />
        </div>
      )}
      {/* Honeypot: hidden from people, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Company website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <p role="alert" className="rounded-md bg-before px-3 py-2 text-sm text-before-ink">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === "sending"}>
        <SubmitState status={status} error={error} />
      </Button>
      <p className="text-xs text-muted-foreground">
        We only use these details to contact you about Snapdaps.
      </p>
    </form>
  );
}

function SubmitState({ status, error }: { status: "idle" | "sending" | "sent" | "error"; error?: string }) {
  if (status === "sending")
    return (
      <span className="inline-flex items-center gap-2">
        <Loader2 className="size-4 animate-spin" /> Sending…
      </span>
    );
  if (status === "sent")
    return (
      <span className="inline-flex items-center gap-2">
        <CheckCircle2 className="size-4" /> Request sent
      </span>
    );
  return <>{error ? "Try again" : "Request demo"}</>;
}
