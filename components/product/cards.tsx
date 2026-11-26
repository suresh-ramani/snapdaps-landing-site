"use client";

import Image from "next/image";
import {
  Bell,
  CircleCheckBig,
  Copy,
  Download,
  FolderOpen,
  ImageDown,
  Lock,
  MessageCircle,
  QrCode,
  ScanFace,
  UploadCloud,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { detectScenes } from "@/components/mock/detect";
import { useEventSample } from "@/components/mock/photo-pool";
import { PhotoTile, ProfilePic, QrPattern } from "@/components/mock/primitives";
import type { PersonName } from "@/components/mock/profiles";
import { cn } from "@/lib/utils";

/**
 * Snapdaps product cards, built from real shadcn components (Card, Item, Progress,
 * Avatar, Badge, Button) the way ui.shadcn.com's homepage shows its product.
 * They're illustrations: decorative, non-interactive (inert), hidden from screen readers and
 * marked data-nosnippet so search engines and AI answers never quote their sample numbers.
 * The names and numbers are sample data, not customers.
 * Small CSS loops make them feel live (keyframes in globals.css, reduced-motion safe):
 * upload bars keep filling (`.upload-fill`), activity rows arrive (`.feed-row`), the QR and
 * faces get a scan line (`.animate-scan`), matched photos pop in (`.animate-pop`).
 */

function Static({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div aria-hidden="true" data-nosnippet inert className={cn("pointer-events-none select-none", className)}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------- */
export function UploadCard({ className }: { className?: string }) {
  const sample = useEventSample();
  const folders = [
    { name: sample.folders[2], count: "1,204 photos", pct: 100 },
    { name: sample.folders[1], count: "860 photos", pct: 72 },
    { name: sample.folders[3], count: "1,530 photos", pct: 34 },
  ];
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Upload photos</CardTitle>
          <CardDescription>From your computer or Google Drive</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col items-center rounded-lg border border-dashed px-4 py-5 text-center">
            <UploadCloud className="size-6 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag & drop photos here</p>
            <p className="text-xs text-muted-foreground">Thousands of photos at once</p>
          </div>
          <ItemGroup className="gap-2">
            {folders.map((f) => (
              <Item key={f.name} variant="outline" size="sm" className="flex-col items-stretch gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <FolderOpen className="size-4 text-muted-foreground" />
                    {f.name}
                  </span>
                  {f.pct === 100 ? (
                    <span className="flex items-center gap-1 text-xs text-after-ink">
                      <CircleCheckBig className="size-3.5" /> {f.count}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Uploading…</span>
                  )}
                </div>
                <Progress
                  value={f.pct}
                  className={cn("h-1.5", f.pct < 100 && "upload-fill")}
                  style={{ "--fill-from": `-${100 - f.pct}%` } as React.CSSProperties}
                />
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */
export function FaceMatchCard({ className, count = 38 }: { className?: string; count?: number }) {
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="relative size-11 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-card [--scan-distance:2.75rem]">
              <ProfilePic seed={2} className="size-full rounded-none" />
              <span className="animate-scan absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--primary)]" />
            </div>
            <div className="grid gap-1">
              <CardTitle>{count} photos found</CardTitle>
              <CardDescription>Matched from your selfie</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 4, 6, 9, 3, 12, 7, 2].map((s, i) => (
              <PhotoTile key={s} seed={s} people={1} className="animate-pop aspect-square" delayMs={600 + i * 90} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm" className="flex-1">
            <Download /> Download all
          </Button>
          <Button size="sm" variant="outline">
            <ImageDown /> Select
          </Button>
        </CardFooter>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */

export function ShareCard({ className }: { className?: string }) {
  return (
    <Static className={className}>
      <Card className="gap-5">
        <CardContent className="flex justify-center pt-0">
          <div className="relative overflow-hidden rounded-xl border bg-white p-3 [--scan-distance:8rem]">
            <QrPattern className="size-32" />
            <span className="animate-scan absolute inset-x-0 top-3 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--primary)]" />
          </div>
        </CardContent>
        <CardHeader className="text-center">
          <CardTitle>Scan to find your photos</CardTitle>
          <CardDescription>Guests scan at the venue or open the link — no app, no login.</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <div className="flex w-full items-center gap-2 rounded-md border px-3 py-2 text-xs">
            <span className="truncate text-muted-foreground">snapdaps.ai/e/riya-arjun</span>
            <Copy className="ml-auto size-3.5 shrink-0" />
          </div>
          <Button size="sm" className="w-full bg-whatsapp text-white hover:bg-whatsapp/90">
            <MessageCircle /> Invite on WhatsApp
          </Button>
        </CardFooter>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */
export function GuestActivityCard({ className }: { className?: string }) {
  const rows: { seed: number; name: PersonName; text: string; time: string }[] = [
    { seed: 1, name: "Priya", text: "found 24 photos", time: "2m" },
    { seed: 3, name: "Rahul", text: "downloaded 12 photos", time: "5m" },
    { seed: 5, name: "Ananya", text: "found 41 photos", time: "9m" },
    { seed: 7, name: "Kabir", text: "shared 6 photos on WhatsApp", time: "14m" },
  ];
  return (
    <Static className={className}>
      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-4" /> Guest activity
          </CardTitle>
          <CardDescription>Live from your event page</CardDescription>
        </CardHeader>
        <CardContent className="px-3">
          <ItemGroup>
            {rows.map((r, i) => (
              <Item key={r.name} size="sm" className="feed-row px-3" style={{ "--i": i } as React.CSSProperties}>
                <ItemMedia>
                  <Avatar size="sm">
                    <AvatarFallback className="p-0">
                      <ProfilePic person={r.name} className="size-full" />
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="font-normal">
                    <span className="font-medium">{r.name}</span> {r.text}
                  </ItemTitle>
                </ItemContent>
                <ItemActions className="text-xs text-muted-foreground">{r.time}</ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */
function FakeSwitch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors",
        on ? "bg-primary" : "bg-input",
      )}
    >
      <span className={cn("size-4 rounded-full bg-white shadow-sm transition-transform", on && "translate-x-4")} />
    </span>
  );
}

export function PrivacyCard({ className }: { className?: string }) {
  const settings = [
    { title: "Guests see only their photos", desc: "Face search shows each guest their own matches", on: true },
    { title: "Allow downloads", desc: "One photo or all at once", on: true },
    { title: "Client photo selection", desc: "Your client picks their favourites", on: true },
  ];
  return (
    <Static className={className}>
      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-4" /> Privacy & access
          </CardTitle>
          <CardDescription>Control who sees what</CardDescription>
        </CardHeader>
        <CardContent className="px-3">
          <ItemGroup>
            {settings.map((s) => (
              <Item key={s.title} size="sm" className="px-3">
                <ItemContent>
                  <ItemTitle>{s.title}</ItemTitle>
                  <ItemDescription className="text-xs">{s.desc}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <FakeSwitch on={s.on} />
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */
export function GalleryCard({ className }: { className?: string }) {
  const folders = ["All", ...useEventSample().folders];
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Event gallery</CardTitle>
          <CardDescription>Organised by folder, ready on any device</CardDescription>
          <CardAction>
            <QrCode className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {folders.map((f, i) => (
              <Badge key={f} variant={i === 3 ? "default" : "outline"} className="font-normal">
                {f}
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <PhotoTile key={i} seed={i + 2} people={((i + 1) % 3) as 0 | 1 | 2} className="aspect-square" />
            ))}
          </div>
        </CardContent>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */
export function SelfieSearchCard({ className }: { className?: string }) {
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader className="text-center">
          <CardTitle>Find your photos</CardTitle>
          <CardDescription>Take a selfie — AI does the searching</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="relative size-24 overflow-hidden rounded-full ring-2 ring-primary ring-offset-4 ring-offset-card [--scan-distance:5.5rem]">
            <ProfilePic seed={4} className="size-full rounded-none" />
            <span className="animate-scan absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--primary)]" />
          </div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
            <ScanFace className="size-3.5" /> Matching your face…
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline" className="w-full">
            Retake selfie
          </Button>
        </CardFooter>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */
export function CreateEventCard({ className }: { className?: string }) {
  const sample = useEventSample();
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>New event</CardTitle>
          <CardDescription>Ready in under two minutes</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium">Event name</p>
            <div className="rounded-md border px-3 py-2 text-sm">{sample.name}</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium">Folders</p>
            <div className="flex flex-wrap gap-1.5">
              {sample.folders.map((f) => (
                <Badge key={f} variant="secondary" className="gap-1 font-normal">
                  <FolderOpen /> {f}
                </Badge>
              ))}
              <Badge variant="outline" className="font-normal">
                + Add folder
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" className="w-full">
            Create event
          </Button>
        </CardFooter>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */

export function DetectFacesCard({ className }: { className?: string }) {
  // The page's own kind of event (PhotoPool → detect), so the corporate page boxes a corporate team.
  const scene = detectScenes[useEventSample().detect ?? "wedding"];
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanFace className="size-4 text-primary" /> AI face detection
          </CardTitle>
          <CardDescription>Runs in the background after upload</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* One real group photo with a box on every face (measured on the photo, not guessed). A scan line
              sweeps down and each box pops in as the line reaches it — one 6s CSS loop (.detect-*), all
              boxes shown and still under reduced motion. */}
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={scene.img}
              alt=""
              sizes="(min-width: 768px) 420px, 90vw"
              className="aspect-[16/10] w-full rounded-lg object-cover"
            />
            <span aria-hidden="true" className="detect-sweep pointer-events-none absolute inset-0">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_12px_3px_var(--primary)]" />
            </span>
            {scene.faces.map((f, i) => (
              <span
                key={i}
                className="detect-box absolute rounded-md border-2 border-white shadow-[0_0_0_1px_var(--primary)]"
                style={
                  {
                    left: `${f.l - f.w * 0.15}%`,
                    top: `${f.t - f.h * 0.15}%`,
                    width: `${f.w * 1.3}%`,
                    height: `${f.h * 1.3}%`,
                    // Pop in when the 3.6s sweep passes the box.
                    animationDelay: `${(f.t / 100) * 3.6}s`,
                  } as React.CSSProperties
                }
              />
            ))}
            <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-xs font-medium shadow-sm ring-1 ring-border">
              <ScanFace className="size-3.5 text-primary" />
              {scene.faces.length} faces found
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium">Scanning photos</span>
              <span className="tabular-nums text-muted-foreground">3,904 / 4,812</span>
            </div>
            <Progress value={81} />
          </div>
        </CardContent>
      </Card>
    </Static>
  );
}
