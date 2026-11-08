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

/* ---------- Background ---------- */

// Deterministic pseudo-random so SSR and client match.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const PIXELS = Array.from({ length: 70 }, (_, i) => ({
  left: rand(i + 1) * 100,
  top: rand(i + 101) * 100,
  size: 4 + Math.round(rand(i + 201) * 8),
  tone: rand(i + 301) > 0.5 ? "bg-star" : "bg-star-warm",
  delay: rand(i + 401) * 4,
}));

const SPARKLES = [
  { left: 15, top: 62 },
  { left: 69, top: 50 },
  { left: 79, top: 82 },
  { left: 94, top: 34 },
  { left: 53, top: 98 },
];

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
        <svg key={i} viewBox="0 0 24 24" className="sparkle absolute h-8 w-8 text-star" style={{ left: `${s.left}%`, top: `${s.top}%` }}>
          <path fill="currentColor" d="M11 0h2v9h-2zM11 15h2v9h-2zM0 11h9v2H0zM15 11h9v2h-9zM9 9h6v6H9z" />
        </svg>
      ))}
      <div className="orb absolute left-[5%] top-[34%] h-40 w-40 rounded-full border-[10px] border-star/40 bg-star/20" />
      <div className="orb absolute left-[33%] top-[15%] h-28 w-28 rounded-full bg-ember/40" style={{ animationDelay: "1.5s" }} />
      <div className="orb absolute right-[7%] top-[31%] h-32 w-24 rotate-12 rounded-2xl bg-star-warm/30" style={{ animationDelay: "3s" }} />
    </div>
  );
}

/* ---------- Brand ---------- */

function DemoLogo() {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <svg viewBox="0 0 24 24" className="h-7 w-8" aria-hidden>
        <path fill="currentColor" d="M19.27 5.33A16.6 16.6 0 0 0 15.1 4l-.53 1.07a15.4 15.4 0 0 0-5.14 0L8.9 4a16.5 16.5 0 0 0-4.17 1.33C2.1 9.2 1.38 12.98 1.74 16.7a16.7 16.7 0 0 0 5.1 2.6l1.1-1.5a10.8 10.8 0 0 1-1.73-.84l.42-.33a11.9 11.9 0 0 0 10.74 0l.42.33c-.55.33-1.13.61-1.73.84l1.1 1.5a16.6 16.6 0 0 0 5.1-2.6c.43-4.32-.73-8.06-3-11.37ZM8.68 14.42c-1 0-1.82-.92-1.82-2.05s.8-2.05 1.82-2.05 1.84.93 1.82 2.05c0 1.13-.8 2.05-1.82 2.05Zm6.64 0c-1 0-1.82-.92-1.82-2.05s.8-2.05 1.82-2.05 1.84.93 1.82 2.05c0 1.13-.8 2.05-1.82 2.05Z" />
      </svg>
      <span className="font-display text-lg font-extrabold tracking-tight">Demo</span>
    </div>
  );
}

function ServerIcon({ size = "lg" }: { size?: "lg" | "sm" }) {
  const cls = size === "lg" ? "h-20 w-20 text-2xl rounded-full" : "h-6 w-6 text-[10px] rounded-md";
  return (
    <div className={`flex shrink-0 items-center justify-center bg-ignis font-extrabold text-primary-foreground ${cls}`}>
      iG
    </div>
  );
}

/* ---------- Card pieces ---------- */

const AVATARS = ["bg-avatar-1", "bg-avatar-2", "bg-avatar-3", "bg-avatar-4", "bg-avatar-5"];

function MemberAvatars() {
  return (
    <div className="flex -space-x-2">
      {AVATARS.map((c, i) => (
        <div key={i} className="relative">
          <div className={`h-7 w-7 rounded-full border-[3px] border-card ${c}`} />
          {i < 3 && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-online" />}
        </div>
      ))}
    </div>
  );
}

function Stat({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

type State = "idle" | "loading" | "done";

function AcceptButton() {
  const [state, setState] = useState<State>("idle");
  const click = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("done"), 1400);
  };
  return (
    <button
      type="button"
      onClick={click}
      disabled={state === "loading"}
      className={`flex h-10 w-full items-center justify-center gap-2 rounded-[4px] text-sm font-medium text-primary-foreground transition-colors duration-200 active:translate-y-px ${
        state === "done" ? "bg-success hover:bg-success" : "bg-primary hover:bg-primary-hover"
      } disabled:cursor-wait`}
    >
      {state === "idle" && "Aceitar convite"}
      {state === "loading" && (
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="dot h-1.5 w-1.5 rounded-full bg-primary-foreground" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </span>
      )}
      {state === "done" && "Convite aceito (simulação)"}
    </button>
  );
}

function InviteCard() {
  return (
    <div className="card-in relative w-full max-w-[480px] overflow-hidden rounded-lg bg-card shadow-card max-sm:max-w-none max-sm:rounded-none">
      {/* Banner */}
      <div className="banner h-24 sm:h-28" />

      <div className="-mt-12 flex flex-col items-center px-6 pb-6 text-center sm:px-8 sm:pb-8">
        <div className="rounded-full bg-card p-[5px]">
          <ServerIcon />
        </div>

        <p className="mt-3 text-sm text-foreground">Você foi convidado para entrar em</p>

        <h1 className="mt-1 flex items-center gap-2 text-2xl font-semibold text-foreground">
          <ServerIcon size="sm" />
          iGNISPR
          <svg viewBox="0 0 16 15.2" className="h-4 w-4 text-ember" aria-label="Servidor em destaque">
            <path fill="currentColor" d="m16 7.6-1.86-2.76.4-3.3-3.18-.94L9.63 0 6.6 1.33 3.4.6 2.48 3.7 0 5.97l1.33 3.03-.73 3.21 3.1.92 2.27 2.48L9 14.28l3.2.73.93-3.1z" />
            <path fill="var(--card)" d="M7.4 11.17 4 8.62l1-1.36 2 1.53L10.64 4 12 5z" />
          </svg>
        </h1>

        <div className="mt-2 flex items-center gap-4">
          <Stat dot="bg-online" label="2.302 online" />
          <Stat dot="bg-muted-foreground" label="12.356 membros" />
        </div>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Comunidade gamer do Paraná 🔥 Partidas toda noite, eventos semanais, torneios e muita resenha. Acenda a chama com a gente.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-md bg-secondary px-3 py-2">
          <MemberAvatars />
          <span className="text-xs text-muted-foreground">e mais 2.297 jogando agora</span>
        </div>

        <div className="mt-6 w-full">
          <AcceptButton />
        </div>
      </div>
    </div>
  );
}

function Index() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <SpaceBackground />
      <header className="relative z-10 p-6 sm:px-12 sm:py-10">
        <DemoLogo />
      </header>
      <div className="relative z-10 flex flex-1 items-center justify-center sm:px-4 sm:pb-24">
        <InviteCard />
      </div>
      <footer className="relative z-10 pb-4 text-center text-[11px] text-foreground/60">
        Demonstração fictícia · Não é um convite oficial do Discord
      </footer>
    </main>
  );
}
