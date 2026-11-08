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

function ServerIcon() {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-ignis text-2xl font-extrabold text-primary-foreground shadow-lg">
      iG
    </div>
  );
}

function Stat({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function InviteCard() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="w-full max-w-[480px] rounded-md bg-card p-8 text-center shadow-2xl max-sm:rounded-none max-sm:bg-transparent max-sm:shadow-none">
      <div className="flex justify-center"><ServerIcon /></div>
      <p className="mt-4 text-base text-muted-foreground">Você foi convidado para entrar em</p>
      <h1 className="mt-1 flex items-center justify-center gap-2 text-2xl font-semibold text-foreground">
        <svg viewBox="0 0 16 15.2" className="h-4 w-4 text-online" aria-hidden>
          <path fill="currentColor" d="M7.4 11.17 4 8.62l1-1.36 2 1.53L10.64 4 12 5zm8.6-3.57-1.86-2.76.4-3.3-3.18-.94L9.63 0 6.6 1.33 3.4.6 2.48 3.7 0 5.97l1.33 3.03-.73 3.21 3.1.92 2.27 2.48L9 14.28l3.2.73.93-3.1z" />
        </svg>
        iGNISPR
      </h1>
      <div className="mt-2 flex justify-center gap-4">
        <Stat dot="bg-online" label="2.302 Online" />
        <Stat dot="bg-muted-foreground" label="12.356 Membros" />
      </div>
      <button
        type="button"
        onClick={() => setClicked(true)}
        className="mt-6 h-11 w-full rounded-[3px] bg-primary text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        {clicked ? "Demonstração — nenhuma conexão realizada" : "Aceitar convite"}
      </button>
      <p className="mt-6 text-xs text-muted-foreground/80">
        Página de demonstração fictícia. Não é um convite oficial do Discord.
      </p>
    </div>
  );
}

function Index() {
  return (
    <main className="invite-bg relative flex min-h-screen flex-col items-center justify-center px-0 sm:px-4">
      <div className="absolute left-6 top-6 flex items-center gap-2 font-extrabold tracking-tight text-foreground max-sm:left-1/2 max-sm:-translate-x-1/2">
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
          <path fill="currentColor" d="M19.27 5.33A16.6 16.6 0 0 0 15.1 4l-.53 1.07a15.4 15.4 0 0 0-5.14 0L8.9 4a16.5 16.5 0 0 0-4.17 1.33C2.1 9.2 1.38 12.98 1.74 16.7a16.7 16.7 0 0 0 5.1 2.6l1.1-1.5a10.8 10.8 0 0 1-1.73-.84l.42-.33a11.9 11.9 0 0 0 10.74 0l.42.33c-.55.33-1.13.61-1.73.84l1.1 1.5a16.6 16.6 0 0 0 5.1-2.6c.43-4.32-.73-8.06-3-11.37ZM8.68 14.42c-1 0-1.82-.92-1.82-2.05s.8-2.05 1.82-2.05 1.84.93 1.82 2.05c0 1.13-.8 2.05-1.82 2.05Zm6.64 0c-1 0-1.82-.92-1.82-2.05s.8-2.05 1.82-2.05 1.84.93 1.82 2.05c0 1.13-.8 2.05-1.82 2.05Z" />
        </svg>
        <span className="text-lg">Demo</span>
      </div>
      <InviteCard />
    </main>
  );
}
