import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Convite para iGNISPR — Demonstração" },
      { name: "description", content: "Demonstração visual fictícia de um convite de servidor iGNISPR." },
      { property: "og:title", content: "Convite para iGNISPR — Demonstração" },
      { property: "og:description", content: "Demonstração visual fictícia de um convite de servidor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

/* ---------- Background (mirrors the original invite scene) ---------- */

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const PIXELS = Array.from({ length: 90 }, (_, i) => ({
  left: rand(i + 1) * 100,
  top: rand(i + 101) * 100,
  size: rand(i + 201) > 0.75 ? 12 : rand(i + 501) > 0.5 ? 8 : 5,
  tone: rand(i + 301) > 0.7 ? "bg-pixel-pink" : rand(i + 601) > 0.4 ? "bg-pixel-light" : "bg-pixel-blue",
  delay: rand(i + 401) * 6,
}));

const SPARKLES = [
  { left: 15.5, top: 62, size: 32 },
  { left: 69.3, top: 49.5, size: 32 },
  { left: 79.3, top: 81.8, size: 40 },
  { left: 94, top: 33.6, size: 36 },
  { left: 53.4, top: 98, size: 32 },
];

function Sparkle({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path fill="currentColor" d="M12 0c.6 7 5 11.4 12 12-7 .6-11.4 5-12 12-.6-7-5-11.4-12-12 7-.6 11.4-5 12-12Z" />
    </svg>
  );
}

function SpaceBackground() {
  return (
    <div aria-hidden className="invite-bg pointer-events-none absolute inset-0 overflow-hidden">
      {PIXELS.map((p, i) => (
        <span
          key={i}
          className={`pixel absolute ${p.tone}`}
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s` }}
        />
      ))}
      {SPARKLES.map((s, i) => (
        <span key={i} className="sparkle absolute text-pixel-light" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
          <Sparkle size={s.size} />
        </span>
      ))}
      {/* Blurred 3D props: bubble, potion, crystal */}
      <div className="prop prop-bubble absolute left-[5%] top-[34%] h-40 w-40 rounded-full" />
      <div className="prop prop-potion absolute left-[32%] top-[15%] h-32 w-28 rounded-full" style={{ animationDelay: "2s" }} />
      <div className="prop prop-crystal absolute right-[6%] top-[31%] h-36 w-28 rotate-[24deg] rounded-xl" style={{ animationDelay: "4s" }} />
    </div>
  );
}

/* ---------- Header ---------- */

function DiscordMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M19.27 5.33A16.6 16.6 0 0 0 15.1 4l-.53 1.07a15.4 15.4 0 0 0-5.14 0L8.9 4a16.5 16.5 0 0 0-4.17 1.33C2.1 9.2 1.38 12.98 1.74 16.7a16.7 16.7 0 0 0 5.1 2.6l1.1-1.5a10.8 10.8 0 0 1-1.73-.84l.42-.33a11.9 11.9 0 0 0 10.74 0l.42.33c-.55.33-1.13.61-1.73.84l1.1 1.5a16.6 16.6 0 0 0 5.1-2.6c.43-4.32-.73-8.06-3-11.37ZM8.68 14.42c-1 0-1.82-.92-1.82-2.05s.8-2.05 1.82-2.05 1.84.93 1.82 2.05c0 1.13-.8 2.05-1.82 2.05Zm6.64 0c-1 0-1.82-.92-1.82-2.05s.8-2.05 1.82-2.05 1.84.93 1.82 2.05c0 1.13-.8 2.05-1.82 2.05Z" />
    </svg>
  );
}

function Header() {
  return (
    <header className="absolute left-0 top-0 z-10 flex w-full items-center p-6 max-sm:justify-center sm:px-12 sm:py-12">
      <div className="flex items-center gap-2 text-foreground">
        <DiscordMark className="h-6 w-8" />
        <span className="font-display text-lg font-extrabold tracking-tight">Discord</span>
      </div>
    </header>
  );
}

/* ---------- Invite card ---------- */

function ServerIcon({ size = "lg" }: { size?: "lg" | "sm" }) {
  const cls = size === "lg" ? "h-20 w-20 rounded-full text-2xl" : "h-6 w-6 rounded-md text-[9px]";
  return (
    <div className={`flex shrink-0 items-center justify-center bg-ignis font-bold text-primary-foreground ${cls}`}>
      iG
    </div>
  );
}

function Stat({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1 text-xs leading-4 text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function AcceptButton() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const click = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("done"), 1200);
  };
  return (
    <button
      type="button"
      onClick={click}
      disabled={state === "loading"}
      className={`flex h-10 w-full items-center justify-center rounded-[8px] text-sm font-medium text-primary-foreground transition-colors duration-150 disabled:cursor-wait ${
        state === "done" ? "bg-success" : "bg-primary hover:bg-primary-hover active:bg-primary-active"
      }`}
    >
      {state === "idle" && "Aceitar convite"}
      {state === "loading" && (
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="dot h-1.5 w-1.5 rounded-full bg-primary-foreground" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </span>
      )}
      {state === "done" && "Convite aceito (demonstração)"}
    </button>
  );
}

function InviteCard() {
  return (
    <div className="card-in w-full max-w-[480px] rounded-lg border border-card-border bg-card p-8 text-center shadow-card max-sm:max-w-none max-sm:rounded-none max-sm:border-x-0 max-sm:px-4">
      <div className="flex justify-center">
        <ServerIcon />
      </div>
      <p className="mt-4 text-sm leading-[18px] text-foreground">Você foi convidado para se juntar a</p>
      <h1 className="mt-2 flex items-center justify-center gap-2 text-2xl font-semibold leading-[30px] text-foreground">
        <ServerIcon size="sm" />
        iGNISPR
      </h1>
      <div className="mt-2 flex items-center justify-center gap-4">
        <Stat dot="bg-online" label="2.302 online" />
        <Stat dot="bg-offline" label="12.356 membros" />
      </div>
      <div className="mt-10">
        <AcceptButton />
      </div>
    </div>
  );
}

function Index() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <SpaceBackground />
      <Header />
      <div className="relative z-10 flex w-full justify-center sm:px-4">
        <InviteCard />
      </div>
      <p className="absolute bottom-3 z-10 w-full text-center text-[11px] text-foreground/50">
        Demonstração fictícia · Não é um convite oficial do Discord
      </p>
    </main>
  );
}
