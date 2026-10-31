"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

const roles = ["Photographer", "Event planner", "Studio / agency", "Couple or host", "Other"];

/**
 * Demo / contact form, built on shadcn/ui Field + NativeSelect (MIT). Posts to /api/demo, which emails the Snapdaps team.
 * Used in the Book a demo popup, on /contact and in each use-case page's LeadCapture
 * (`source="use-case"`, with the page's `event` and a preselected `defaultRole`).
 */
export function DemoForm({
  source,
  showMessage = false,
  defaultRole = "",
  event,
  submitLabel = "Request demo",
}: {
  source: "popup" | "contact" | "use-case";
  showMessage?: boolean;
  /** Preselects "I am a" (one of the roles). */
  defaultRole?: string;
  /** The event type the request is about, sent with the request (e.g. "Wedding"). */
  event?: string;
  submitLabel?: string;
}) {
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
        body: JSON.stringify({ ...data, source, event, page: window.location.pathname }),
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
    <form onSubmit={onSubmit} noValidate={false}>
      <FieldGroup className="gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={id("name")}>Name</FieldLabel>
            <Input id={id("name")} name="name" required autoComplete="name" />
          </Field>
          <Field>
            <FieldLabel htmlFor={id("phone")}>Phone / WhatsApp</FieldLabel>
            <Input
              id={id("phone")}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              aria-describedby={id("phone-help")}
            />
            <FieldDescription id={id("phone-help")}>Used only to set up your demo.</FieldDescription>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor={id("email")}>Email</FieldLabel>
          <Input id={id("email")} name="email" type="email" required autoComplete="email" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={id("role")}>I am a</FieldLabel>
            <NativeSelect id={id("role")} name="role" required defaultValue={defaultRole}>
              <NativeSelectOption value="" disabled>
                Choose one
              </NativeSelectOption>
              {roles.map((r) => (
                <NativeSelectOption key={r}>{r}</NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel htmlFor={id("city")}>City</FieldLabel>
            <Input id={id("city")} name="city" autoComplete="address-level2" />
          </Field>
        </div>
        {showMessage && (
          <Field>
            <FieldLabel htmlFor={id("message")}>Message (optional)</FieldLabel>
            <Textarea id={id("message")} name="message" placeholder="Tell us about your events" />
          </Field>
        )}
      </FieldGroup>
      {/* Honeypot: hidden from people, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Company website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-5 rounded-md bg-before px-3 py-2 text-sm text-before-ink">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === "sending"}>
        <SubmitState status={status} error={error} label={submitLabel} />
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We only use these details to contact you about Snapdaps.
      </p>
    </form>
  );
}

function SubmitState({
  status,
  error,
  label,
}: {
  status: "idle" | "sending" | "sent" | "error";
  error?: string;
  label: string;
}) {
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
  return <>{error ? "Try again" : label}</>;
}
