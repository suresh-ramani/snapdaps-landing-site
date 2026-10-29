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
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
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
import { Face, PhotoTile, QrPattern } from "@/components/mock/primitives";
import { cn } from "@/lib/utils";

/**
 * Snapdaps product cards, built from real shadcn components (Card, Item, Progress,
 * Avatar, Badge, Button) the way ui.shadcn.com's homepage shows its product.
 * They're illustrations: decorative, non-interactive (inert) and hidden from screen readers.
 * The names and numbers are sample data, not customers.
 */

function Static({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div aria-hidden="true" inert className={cn("pointer-events-none select-none", className)}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------- */
export function EventOverviewCard({ className }: { className?: string }) {
  return (
    <Static className={className}>
      <Card className="gap-5">
        <CardHeader>
          <CardTitle>Riya & Arjun&apos;s wedding</CardTitle>
          <CardDescription>Jaipur · 14 Dec · 6 folders</CardDescription>
          <CardAction>
            <Badge variant="secondary">Shared</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              ["4,812", "Photos"],
              ["612", "Guests"],
              ["9,340", "Downloads"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-lg bg-muted/60 py-3">
                <p className="text-lg font-semibold tabular-nums">{n}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium">
                <ScanFace className="size-3.5 text-primary" /> Faces indexed
              </span>
              <span className="text-muted-foreground">100%</span>
            </div>
            <Progress value={100} />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <AvatarGroup>
            {[0, 1, 2, 3].map((s) => (
              <Avatar key={s} size="sm">
                <AvatarFallback className="p-0">
                  <Face seed={s} className="size-full" />
                </AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount className="size-6 text-[10px]">+608</AvatarGroupCount>
          </AvatarGroup>
          <Button size="sm">Share event</Button>
        </CardFooter>
      </Card>
    </Static>
  );
}

/* --------------------------------------------------------------------------- */
export function UploadCard({ className }: { className?: string }) {
  const folders = [
    { name: "Wedding ceremony", count: "1,204 photos", pct: 100 },
    { name: "Sangeet", count: "860 photos", pct: 72 },
    { name: "Reception", count: "1,530 photos", pct: 34 },
  ];
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Upload photos</CardTitle>
          <CardDescription>From your computer or Google Drive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center rounded-lg border border-dashed px-4 py-5 text-center">
            <UploadCloud className="size-6 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag & drop photos here</p>
            <p className="text-xs text-muted-foreground">JPG, PNG, HEIC · no size limit</p>
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
                    <span className="text-xs tabular-nums text-muted-foreground">{f.pct}%</span>
                  )}
                </div>
                <Progress value={f.pct} className="h-1.5" />
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
              <Face seed={2} className="size-full rounded-none" />
              <span className="animate-scan absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--primary)]" />
            </div>
            <div className="grid gap-1">
              <CardTitle>{count} photos found</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Sparkles className="size-3 text-primary" /> Matched in 2.1 seconds
              </CardDescription>
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
          <div className="rounded-xl border bg-white p-3">
            <QrPattern className="size-32" />
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
  const rows = [
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
            {rows.map((r) => (
              <Item key={r.name} size="sm" className="px-3">
                <ItemMedia>
                  <Avatar size="sm">
                    <AvatarFallback className="p-0">
                      <Face seed={r.seed} className="size-full" />
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
    { title: "Allow downloads", desc: "Original quality, one photo or all", on: true },
    { title: "Watermark photos", desc: "Add your studio logo", on: false },
    { title: "PIN-protect event", desc: "Ask for a 4-digit PIN", on: true },
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
  const folders = ["All", "Haldi", "Sangeet", "Wedding", "Reception"];
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
        <CardContent className="space-y-3">
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
            <Face seed={4} className="size-full rounded-none" />
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
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>New event</CardTitle>
          <CardDescription>Ready in under two minutes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-xs font-medium">Event name</p>
            <div className="rounded-md border px-3 py-2 text-sm">Riya & Arjun&apos;s wedding</div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-medium">Folders</p>
            <div className="flex flex-wrap gap-1.5">
              {["Haldi", "Sangeet", "Wedding", "Reception"].map((f) => (
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
  return (
    <Static className={className}>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanFace className="size-4 text-primary" /> AI face detection
          </CardTitle>
          <CardDescription>Runs in the background after upload</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <PhotoTile seed={5} people={3} className="aspect-[16/10] w-full rounded-lg" />
            {[26, 50, 74].map((x, i) => (
              <span
                key={x}
                className="absolute size-[15%] rounded-md border-2 border-white shadow-[0_0_0_1px_var(--primary)]"
                style={{ left: `${x - 8}%`, top: i === 1 ? "38%" : "43%" }}
              />
            ))}
          </div>
          <div className="space-y-2">
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
