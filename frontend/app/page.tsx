"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Brain,
  MessageSquare,
  StickyNote,
  Zap,
  ArrowRight,
  Sparkles,
  Search,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/chat");
    }
  }, [session, isPending, router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Atmospheric glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.45_0.15_250/0.15),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.4_0.12_280/0.1),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.35_0.1_200/0.08),transparent_70%)] blur-3xl" />
      </div>

      {/* Subtle grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 backdrop-blur-sm">
            <Brain className="h-4 w-4 text-primary" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
            ThinkBox
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="gap-1.5 rounded-lg px-4">
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-16 text-center md:pt-24 lg:pt-32">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/40 px-4 py-1.5 text-xs backdrop-blur-sm">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-muted-foreground">
            AI-powered knowledge retrieval
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Your notes,{" "}
          <span className="bg-gradient-to-r from-primary via-[oklch(0.72_0.14_220)] to-[oklch(0.65_0.15_280)] bg-clip-text text-transparent">
            instantly
          </span>
          <br />
          searchable by AI
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Save your thoughts, ideas, and research. Then ask questions in plain
          language — ThinkBox finds the answers from your own knowledge base.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/signup">
            <Button
              size="lg"
              className="gap-2 rounded-xl px-8 text-base shadow-lg shadow-primary/20"
            >
              <Brain className="h-4 w-4" />
              Start for Free
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 rounded-xl px-8 text-base border-border/50"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Social proof hint */}
        <p className="mt-6 text-xs text-muted-foreground/50">
          No credit card required · Works with your existing notes
        </p>
      </section>

      {/* Terminal-style preview window */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <div className="overflow-hidden rounded-2xl border border-border/30 bg-card/60 shadow-2xl shadow-black/20 backdrop-blur-md">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border/20 px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.2_25)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.75_0.15_85)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.15_150)]" />
            <span className="ml-3 font-mono text-xs text-muted-foreground/50">
              ThinkBox Chat
            </span>
          </div>

          {/* Chat preview */}
          <div className="space-y-4 p-6">
            {/* User message */}
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary">
                <span className="text-[10px] font-medium">Y</span>
              </div>
              <div>
                <p className="mb-0.5 text-[10px] font-medium text-muted-foreground">
                  You
                </p>
                <p className="text-sm text-foreground/90">
                  What were my key takeaways about React Server Components?
                </p>
              </div>
            </div>

            {/* AI response */}
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/15">
                <Brain className="h-3 w-3 text-primary" />
              </div>
              <div>
                <p className="mb-0.5 text-[10px] font-medium text-muted-foreground">
                  ThinkBox
                </p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  Based on your notes from Feb 15, you highlighted three main
                  points:
                  <br />
                  <br />
                  <span className="text-primary/80">1.</span> Server Components
                  reduce client-side JavaScript by rendering on the server
                  <br />
                  <span className="text-primary/80">2.</span> They enable direct
                  database access without API routes
                  <br />
                  <span className="text-primary/80">3.</span> You noted that
                  mixing server and client components requires careful boundary
                  planning
                  <span className="ml-0.5 inline-block h-3.5 w-1 animate-pulse rounded-sm bg-primary" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 border-t border-border/20 bg-card/20 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="mb-14 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl">
              How it works
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Three steps from raw thoughts to intelligent retrieval.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<StickyNote className="h-5 w-5" />}
              step="01"
              title="Capture"
              description="Write notes with a rich text editor. Ideas, research, learnings — anything worth remembering."
            />
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              step="02"
              title="Ask"
              description="Query your notes in plain language. No folders to dig through, no keywords to guess."
            />
            <FeatureCard
              icon={<MessageSquare className="h-5 w-5" />}
              step="03"
              title="Understand"
              description="Get AI-generated answers that synthesize across all your notes, with streaming responses."
            />
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <DiffCard
            icon={<Zap className="h-5 w-5 text-[oklch(0.75_0.15_85)]" />}
            title="Semantic Search"
            description="Powered by vector embeddings, not basic keyword matching. Ask naturally and get meaningful results."
          />
          <DiffCard
            icon={<Brain className="h-5 w-5 text-primary" />}
            title="RAG-Powered Answers"
            description="Retrieval-Augmented Generation finds relevant notes and synthesizes coherent answers in real-time."
          />
          <DiffCard
            icon={<Shield className="h-5 w-5 text-[oklch(0.65_0.15_150)]" />}
            title="Your Data, Your Control"
            description="Notes stay in your account. AI queries only search your personal knowledge — nothing shared."
          />
          <DiffCard
            icon={<Sparkles className="h-5 w-5 text-[oklch(0.65_0.15_280)]" />}
            title="Streaming Responses"
            description="Watch answers form in real-time as the AI processes your notes — no waiting for a full response."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 border-t border-border/20">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center md:py-28">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Stop searching.
            <br />
            <span className="text-muted-foreground">Start asking.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Your notes deserve better than ctrl+F. Give them an AI that actually
            understands what you wrote.
          </p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button
              size="lg"
              className="gap-2 rounded-xl px-10 text-base shadow-lg shadow-primary/20"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/10 px-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <Brain className="h-3 w-3" />
            <span>ThinkBox</span>
          </div>
          <p className="text-xs text-muted-foreground/40">
            Built with ❤ and AI
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  step,
  title,
  description,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-2xl border border-border/20 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-border/40 hover:bg-card/60">
      <span className="absolute right-5 top-5 font-mono text-xs text-muted-foreground/30">
        {step}
      </span>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
        {icon}
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-base font-semibold">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function DiffCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-border/10 bg-card/20 p-5 transition-colors hover:border-border/25 hover:bg-card/30">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background/50">
        {icon}
      </div>
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
