import Link from "next/link";
import {
  Check,
  Search,
  Sun,
  Briefcase,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Plus,
  Copy,
  Trash2,
  GripVertical,
  MoreHorizontal,
  Car,
  Flame,
  Star,
  Command,
  User,
  Droplet,
  Heart,
  Image as ImageIcon,
  Brain,
  Sparkles,
  MessageSquare,
  StickyNote,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white selection:bg-white/10 overflow-x-hidden font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5">
            <Brain className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-100">
            ThinkBox
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white backdrop-blur-md">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-20 pb-10">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>AI-powered knowledge retrieval</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Your notes,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              instantly
            </span>{" "}
            <br className="hidden md:block" />
            searchable by AI
          </h1>
          <p className="mx-auto max-w-xl text-lg md:text-xl text-zinc-400 mb-10">
            Save your thoughts, ideas, and research. Then ask questions in plain
            language — ThinkBox finds the answers from your own knowledge base.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link href="/signup">
              <button className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1c1c1c] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#252525] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Brain className="h-4 w-4" />
                Start for free
              </button>
            </Link>
          </div>
        </div>

        {/* Central Graphic (UI Showcases) */}
        <div className="relative mt-20 mx-auto max-w-5xl h-[500px] sm:h-[600px] perspective-1000">
          {/* Subtle noise/stars background for the graphic area */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] pointer-events-none mix-blend-overlay" />

          {/* Left Panel: Sidebar Menu */}
          <div className="absolute left-1/2 top-10 w-[300px] -translate-x-[calc(50%+240px)] scale-90 rounded-[28px] border border-white/[0.08] bg-[#1a1a1a]/80 backdrop-blur-2xl p-4 shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:rotate-[-2deg]">
            <div className="relative">
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/5 bg-black/20 px-3 py-2 text-zinc-400">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search notes...</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between relative rounded-xl bg-white/10 px-3 py-2.5 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] cursor-pointer">
                  <div className="flex items-center gap-3">
                    <StickyNote className="h-4 w-4 text-zinc-200" />
                    <span className="font-medium">All Notes</span>
                  </div>

                  {/* Totoro Cursor */}
                  <div className="absolute -bottom-6 -right-6 z-50 flex items-start">
                    {/* Cursor SVG */}
                    <svg
                      className="w-5 h-5 text-purple-500 drop-shadow-md relative top-2 left-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 4l16 7-6 2-3 8-7-17z" />
                    </svg>
                    <div className="rounded-full bg-[#8b5cf6] px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-lg ml-1">
                      You
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4" />
                    <span>Research</span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4" />
                    <span>Ideas</span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Archived</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Icon Grid & Colors */}
          <div className="absolute left-1/2 top-10 w-[300px] -translate-x-[calc(50%-240px)] scale-90 rounded-[28px] border border-white/[0.08] bg-[#1a1a1a]/80 backdrop-blur-2xl p-6 shadow-2xl transition-transform duration-500 hover:-translate-y-2 hover:rotate-[2deg]">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-1.5 w-8 rounded-full bg-white/20"></div>
              <Plus className="h-4 w-4 text-zinc-500" />
            </div>

            <div className="mb-8 grid grid-cols-5 gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Car className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Flame className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center relative rounded-lg bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] cursor-pointer">
                <Brain className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Command className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <User className="h-4 w-4" />
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Droplet className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Heart className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <ImageIcon className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Star className="h-4 w-4" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="h-4 w-4 rounded-full bg-[#fbbc04]"></div>
              <div className="h-4 w-4 rounded-full bg-[#34a853] ring-1 ring-white/30 ring-offset-[#1a1a1a] ring-offset-2"></div>
              <div className="h-4 w-4 rounded-full bg-[#ea4335]"></div>
              <div className="h-4 w-4 rounded-full bg-[#4285f4]"></div>
              <div className="h-4 w-4 rounded-full bg-[#a142f4]"></div>
            </div>
          </div>

          {/* Center Panel (Main active window) */}
          <div className="absolute left-1/2 top-4 w-[340px] md:w-[380px] -translate-x-1/2 rounded-[32px] border border-white/[0.1] bg-[#222222]/95 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-500 hover:-translate-y-2 z-20">
            {/* Inner border wrapper for glow */}
            <div className="rounded-[31px] p-5 relative overflow-hidden">
              {/* Soft purple glow in background of the panel */}
              <div className="absolute -left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="relative mb-6 flex items-center justify-between pt-1">
                <div className="flex items-center gap-3 text-white">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <span className="text-base font-semibold">ThinkBox Chat</span>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                  <Plus className="h-5 w-5" />
                </div>
              </div>

              <div className="relative flex flex-col gap-3">
                {/* User message */}
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#333]">
                    <span className="text-[10px] font-medium text-white">
                      Y
                    </span>
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-medium text-zinc-500">
                      You
                    </p>
                    <p className="text-sm text-zinc-200">
                      What were my key takeaways about React Server Components?
                    </p>
                  </div>
                </div>

                {/* AI response */}
                <div className="relative flex items-start gap-3 rounded-2xl border border-white/10 bg-[#38383a] p-3 shadow-[0_8px_16px_rgba(0,0,0,0.4)] z-30 mt-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-purple-500/20">
                    <Brain className="h-3 w-3 text-purple-400" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-medium text-zinc-400">
                      ThinkBox
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-200">
                      Based on your notes, you highlighted 3 points:
                      <br />
                      <br />
                      <span className="text-purple-400">1.</span> They reduce
                      client JS
                      <br />
                      <span className="text-purple-400">2.</span> Direct DB
                      access
                      <br />
                      <span className="text-purple-400">3.</span> Boundary
                      planning is key
                      <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-purple-400" />
                    </p>
                  </div>

                  {/* AI Cursor */}
                  <div className="absolute -bottom-5 right-10 z-50 flex items-start">
                    <svg
                      className="w-5 h-5 text-orange-500 drop-shadow-md relative top-2 right-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 4l16 7-6 2-3 8-7-17z" />
                    </svg>
                    <div className="rounded-full bg-[#f46f36] px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-lg">
                      AI agent
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Value Proposition / Informative section */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl opacity-50 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-8">
                Turn your fragmented notes into a{" "}
                <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                  knowledge engine
                </span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 transition-colors group-hover:border-purple-500/50 group-hover:text-purple-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      10x Your Productivity
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Stop wasting hours digging through old documents. ThinkBox
                      surfaces the exact information you need in milliseconds.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 transition-colors group-hover:border-blue-500/50 group-hover:text-blue-400">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Private & Secure
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Your data is fully encrypted. Our AI models process your
                      notes securely without training on your personal knowledge
                      base.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 transition-colors group-hover:border-orange-500/50 group-hover:text-orange-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Connect the Dots
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      ThinkBox doesn&apos;t just find keywords; it understands
                      context, helping you synthesize insights across months of
                      research.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side visual / Metric Card */}
            <div className="relative h-full min-h-[300px] w-full rounded-2xl border border-white/10 bg-[#1c1c1c]/50 p-6 flex flex-col justify-between overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wide">
                  Average time saved / week
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-6xl font-bold tracking-tighter text-white">
                    4.2
                  </div>
                  <div className="text-2xl font-medium text-zinc-500">hrs</div>
                </div>
              </div>

              <div className="mt-12 space-y-5 relative z-10">
                {/* Metric 1 */}
                <div>
                  <div className="flex items-center justify-between text-sm text-zinc-300 mb-2 font-medium">
                    <span>Knowledge Retrieval Speed</span>
                    <span className="text-emerald-400">+340%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-black/50 overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-orange-400 w-[85%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.4)]" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div>
                  <div className="flex items-center justify-between text-sm text-zinc-300 mb-2 font-medium">
                    <span>Idea Retention</span>
                    <span className="text-emerald-400">+89%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-black/50 overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[92%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Brain className="w-48 h-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-28 mx-auto max-w-5xl px-6 pb-32">
        <div className="text-center mb-16">
          <div className="mb-6 mx-auto inline-block rounded border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            How it works
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-20">
            Three simple steps from
            <br />
            thoughts to intelligence
          </h2>
        </div>

        {/* Tree connection lines */}
        <div className="relative mx-auto mt-8 mb-4 max-w-3xl hidden md:block">
          <svg
            className="absolute top-0 w-full h-[60px]"
            viewBox="0 0 800 60"
            fill="none"
          >
            <path
              d="M400 0 V 30 H 133 V 60"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            <path
              d="M400 0 V 60"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
            <path
              d="M400 0 V 30 H 667 V 60"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="relative mt-20 md:mt-0 grid gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-12 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1c] text-xs font-semibold text-zinc-400">
              1
            </div>
            <div className="w-full rounded-2xl border border-white/5 bg-[#171717] p-8 h-[240px] opacity-70 group hover:opacity-100 transition-opacity flex flex-col items-center text-center">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <StickyNote className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Capture</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Write notes with a rich text editor. Ideas, research, learnings
                — anything worth remembering.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-12 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1c] text-xs font-semibold text-zinc-400">
              2
            </div>
            <div className="w-full rounded-2xl border border-white/5 bg-[#171717] p-8 h-[240px] opacity-70 group hover:opacity-100 transition-opacity flex flex-col items-center text-center">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Ask</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Query your notes in plain language. No folders to dig through,
                no keywords to guess.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-12 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1c] text-xs font-semibold text-zinc-400">
              3
            </div>
            <div className="w-full rounded-2xl border border-white/5 bg-[#171717] p-8 h-[240px] opacity-70 group hover:opacity-100 transition-opacity flex flex-col items-center text-center">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Understand
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Get AI-generated answers that synthesize across all your notes,
                with streaming responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="border-t border-white/5 py-24 text-center mt-6">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Stop searching.
          <br />
          <span className="text-zinc-500">Start asking.</span>
        </h2>
        <p className="mx-auto max-w-md text-zinc-400 mb-10 text-lg">
          Your notes deserve better than ctrl+F. Give them an AI that actually
          understands what you wrote.
        </p>
        <Link href="/signup">
          <button className="rounded-full border border-white/10 bg-[#1c1c1c] px-8 py-4 text-base font-medium text-white transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            Create Your Free Account
          </button>
        </Link>
      </section>
    </div>
  );
}
