import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Copy, Github, Linkedin, Menu, MoveUpRight, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Project = {
  index: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
  tone: string;
  year: string;
  href: string;
};

const projects: Project[] = [
  {
    index: '01',
    title: 'Sahaay',
    summary: 'A civic support platform for finding small, local acts of help.',
    detail: 'A study in reducing friction: clearer information architecture, fewer decisions, and a more human pace for asking for support.',
    tags: ['React', 'Node.js', 'UX research'],
    tone: 'sage',
    year: '2024',
    href: '#contact',
  },
  {
    index: '02',
    title: 'Aarambh',
    summary: 'A quiet onboarding system for first-year students finding their footing.',
    detail: 'Designed around the questions students actually ask, rather than the departments that happen to answer them.',
    tags: ['Figma', 'User flows', 'Prototyping'],
    tone: 'clay',
    year: '2024',
    href: '#contact',
  },
  {
    index: '03',
    title: 'Sentinel',
    summary: 'A lightweight network monitor that makes invisible drift legible.',
    detail: 'A small full-stack experiment in observability, thoughtful defaults, and visual language for uncertainty.',
    tags: ['Python', 'Networking', 'Data viz'],
    tone: 'slate',
    year: '2023',
    href: '#contact',
  },
  {
    index: '04',
    title: 'The Marginalia',
    summary: 'A personal reading log for ideas that refuse to stay in their lane.',
    detail: 'Part notebook, part index: an ongoing exploration of how technology can support slower, more associative thinking.',
    tags: ['TypeScript', 'Next.js', 'Writing'],
    tone: 'linen',
    year: 'Ongoing',
    href: '#contact',
  },
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['01', 'Work', '#work'],
    ['02', 'About', '#about'],
    ['03', 'Notes', '#notes'],
    ['04', 'Contact', '#contact'],
  ];

  const navigate = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 sm:px-8 sm:pt-6">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between">
        <button data-testid="button-home" onClick={() => navigate('#top')} className="group flex items-center gap-3 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border hairline bg-background/90 font-display text-lg text-foreground shadow-sm backdrop-blur-sm">R</span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/75 sm:block">Riya Sonaniya</span>
        </button>
        <nav className="hidden items-center gap-7 rounded-full border hairline bg-background/85 px-5 py-3 shadow-sm backdrop-blur-sm md:flex" aria-label="Primary navigation">
          {links.map(([number, label, href]) => (
            <button key={href} data-testid={`button-nav-${label.toLowerCase()}`} onClick={() => navigate(href)} className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground">
              <span className="font-normal text-accent">{number}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <button data-testid="button-menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-full border hairline bg-background/90 text-foreground shadow-sm backdrop-blur-sm md:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={16} /> : <Menu size={17} />}
        </button>
      </div>
      {open && (
        <nav className="mx-auto mt-3 max-w-[1240px] rounded-2xl border hairline bg-card p-4 shadow-lg md:hidden" aria-label="Mobile navigation">
          {links.map(([number, label, href]) => (
            <button key={href} data-testid={`button-mobile-nav-${label.toLowerCase()}`} onClick={() => navigate(href)} className="flex w-full items-center justify-between border-b hairline py-4 text-left text-sm last:border-0">
              <span className="font-display text-lg">{label}</span><span className="text-xs text-muted-foreground">{number}</span>
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="mb-8 flex items-center gap-3"><span className="font-ui text-[10px] font-semibold tracking-[0.14em] text-accent">{number}</span><span className="h-px w-8 bg-accent/50" /><span className="eyebrow">{children}</span></div>;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-testid={`card-project-${project.index}`} className={`project-card group relative overflow-hidden rounded-2xl border hairline bg-${project.tone} p-6 shadow-sm sm:p-8`}>
      <div className="relative z-10 flex items-start justify-between">
        <span className="eyebrow text-foreground/55">{project.index} / {project.year}</span>
        <a data-testid={`link-project-${project.index}`} href={project.href} className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground" aria-label={`Discuss ${project.title}`}>
          <ArrowUpRight size={15} strokeWidth={1.6} />
        </a>
      </div>
      <div className="relative z-10 mt-16 max-w-xl sm:mt-28">
        <h3 className="font-display text-4xl leading-[.95] tracking-[-0.03em] text-foreground sm:text-5xl">{project.title}</h3>
        <p className="mt-5 max-w-md text-sm leading-6 text-foreground/70">{project.summary}</p>
      </div>
      <div className="relative z-10 mt-12 flex flex-wrap gap-2">
        {project.tags.map((tag) => <span key={tag} className="rounded-full border border-foreground/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/65">{tag}</span>)}
      </div>
      <div className="project-mark absolute -bottom-8 -right-3 font-display text-[12rem] leading-none text-foreground/[0.045]">{project.index}</div>
    </article>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText('riya.sonaniya@example.com'); } catch { /* clipboard unavailable */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return <button data-testid="button-copy-email" onClick={copy} className="group inline-flex items-center gap-2 text-sm text-current transition-colors hover:text-[#a4b8b0]">
    {copied ? <Check size={14} /> : <Copy size={14} />}
    <span>{copied ? 'Copied to clipboard' : 'Copy email address'}</span>
  </button>;
}

function Home() {
  return (
    <main id="top" className="overflow-hidden">
      <Nav />
      <section className="mx-auto grid min-h-[780px] max-w-[1240px] items-end px-5 pb-20 pt-36 sm:px-8 sm:pb-24 lg:min-h-[900px] lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
        <div className="reveal">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="eyebrow text-foreground/60">Computer science / design / in progress</span>
          </div>
          <h1 data-testid="text-hero-heading" className="max-w-4xl font-display text-[clamp(4.5rem,13vw,11rem)] leading-[.78] tracking-[-0.07em] text-foreground">
            Riya<br /><span className="ml-[.32em] text-accent">Sonaniya</span>
          </h1>
          <div className="mt-12 flex max-w-xl flex-col gap-5 sm:ml-[17%] sm:flex-row sm:items-start">
            <span className="mt-2 hidden h-px w-12 bg-accent sm:block" />
            <p data-testid="text-hero-intro" className="max-w-md text-base leading-7 text-muted-foreground">I study computer science at Medi-Caps University and make things that sit somewhere between useful, considered, and still becoming.</p>
          </div>
        </div>
        <div className="reveal reveal-delay-2 mt-20 lg:mb-5 lg:mt-0">
          <div className="quiet-shadow-inset relative mx-auto aspect-[.82] max-w-[330px] rounded-[2rem] border hairline p-6 sm:p-8">
            <div className="flex h-full flex-col justify-between rounded-[1.35rem] border border-foreground/10 bg-secondary/45 p-5 sm:p-7">
              <div className="flex justify-between">
                <span className="eyebrow text-foreground/50">Field notes</span>
                <span className="font-display text-2xl text-accent">°</span>
              </div>
              <div>
                <div className="mb-5 h-px w-12 bg-accent" />
                <p className="font-display text-3xl leading-[1.05] tracking-[-0.025em] text-foreground">Learning to make the invisible feel close.</p>
              </div>
              <div className="flex items-end justify-between text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                <span>Indore, IN</span><span>2021—25</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 text-muted-foreground">
            <ArrowDown size={14} className="animate-bounce" />
            <span className="eyebrow">Scroll to read</span>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
        <SectionLabel number="01">Selected work</SectionLabel>
        <div className="mb-16 grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <h2 data-testid="text-work-heading" className="font-display text-5xl leading-[.94] tracking-[-0.045em] sm:text-6xl">A few things<br /><span className="text-accent">made carefully.</span></h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground lg:justify-self-end">Projects are not proof of arrival. They are evidence of attention: what I noticed, what I tried, and what changed along the way.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.index} project={project} />)}
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-y hairline bg-secondary/35">
        <div className="mx-auto grid max-w-[1240px] gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div><SectionLabel number="02">A little background</SectionLabel><p className="eyebrow leading-5">The short version<br />without the elevator pitch.</p></div>
          <div>
            <h2 data-testid="text-about-heading" className="max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.035em] sm:text-6xl">Curious about systems,<br /><span className="text-accent">loyal to the details.</span></h2>
            <div className="mt-12 grid gap-8 text-sm leading-7 text-muted-foreground sm:grid-cols-2 sm:gap-12">
              <p>I am a Computer Science Engineering student at Medi-Caps University, where I have found equal energy in building software and asking what makes it feel clear to use.</p>
              <p>My work moves between frontend development, interface thinking, and the quiet infrastructure underneath. I like a good constraint, a blank page, and teams that care about the last ten percent.</p>
            </div>
            <div className="mt-14 grid gap-5 border-t hairline pt-7 sm:grid-cols-2">
              <div><span className="eyebrow">Currently based</span><p className="mt-2 text-sm">Indore, Madhya Pradesh</p></div>
              <div><span className="eyebrow">Studying</span><p className="mt-2 text-sm">B.Tech Computer Science Engineering</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[.75fr_1.25fr]">
          <div><SectionLabel number="03">Working knowledge</SectionLabel><p className="max-w-xs text-sm leading-6 text-muted-foreground">A stack is just a vocabulary. I am more interested in what it lets us say.</p></div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {[
              ['Build', 'JavaScript / TypeScript', 'React / Next.js', 'Python', 'HTML / CSS'],
              ['Think with', 'Figma', 'Git & GitHub', 'REST APIs', 'SQL'],
            ].map(([title, ...items]) => <div key={title} className="border-t hairline pt-5"><h3 className="font-display text-2xl">{title}</h3><ul className="mt-5 space-y-3 text-sm text-muted-foreground">{items.map((item) => <li key={item} className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-accent" />{item}</li>)}</ul></div>)}
          </div>
        </div>
      </section>

      <section id="notes" className="scroll-mt-24 border-y hairline bg-[#dfe4df]/45">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div><SectionLabel number="04">Currently exploring</SectionLabel><p className="max-w-xs text-sm leading-6 text-muted-foreground">Questions with no neat endpoint. The useful kind.</p></div>
          <div>
            <div className="border-t border-foreground/15">
              {[
                ['01', 'How can interfaces be quieter?', 'Reading into attention, accessibility, and the cost of asking people to decide.'],
                ['02', 'The shape of trustworthy data', 'Playing with small visual systems that make uncertainty visible instead of hiding it.'],
                ['03', 'Making room for the unfinished', 'A note to self: good work can be useful before it is perfectly resolved.'],
              ].map(([number, title, text]) => <article key={number} className="grid gap-5 border-b border-foreground/15 py-7 sm:grid-cols-[48px_1fr]"><span className="eyebrow text-accent">{number}</span><div><h3 className="font-display text-2xl leading-tight sm:text-3xl">{title}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{text}</p></div></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div><SectionLabel number="05">Beyond coursework</SectionLabel><p className="max-w-xs text-sm leading-6 text-muted-foreground">The parts that do not fit into a transcript.</p></div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ['01', 'Peer learning', 'Helping classmates turn intimidating technical ideas into something they can hold onto.'],
              ['02', 'Long walks', 'A dependable way to debug a thought before debugging the code.'],
              ['03', 'Small experiments', 'Tiny prototypes, half-written notes, and a folder full of questions.'],
            ].map(([number, title, text]) => <div key={number} className="quiet-shadow-inset rounded-2xl border hairline p-6"><span className="eyebrow text-accent">{number}</span><h3 className="mt-12 font-display text-2xl">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t hairline bg-foreground text-background">
        <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
          <SectionLabel number="06"><span className="text-background/55">Open to a conversation</span></SectionLabel>
          <div className="grid gap-16 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <h2 data-testid="text-contact-heading" className="max-w-3xl font-display text-6xl leading-[.9] tracking-[-0.055em] sm:text-8xl">Let’s see<br /><span className="text-[#a4b8b0]">what’s next.</span></h2>
              <p className="mt-9 max-w-md text-sm leading-6 text-background/60">For thoughtful collaborations, internships, or just a good exchange of ideas, I would like to hear from you.</p>
            </div>
            <div className="lg:justify-self-end">
              <a data-testid="link-email" href="mailto:riya.sonaniya@example.com" className="group flex items-center justify-between border-b border-background/25 py-4 text-sm transition-colors hover:border-[#a4b8b0] hover:text-[#a4b8b0] sm:w-80"><span>riya.sonaniya@example.com</span><ArrowUpRight size={15} /></a>
              <div className="mt-5 flex gap-5 text-background/60">
                <a data-testid="link-linkedin" href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs transition-colors hover:text-background"><Linkedin size={14} /> LinkedIn</a>
                <a data-testid="link-github" href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs transition-colors hover:text-background"><Github size={14} /> GitHub</a>
              </div>
              <div className="mt-8 text-background/60"><CopyEmail /></div>
            </div>
          </div>
        </div>
        <footer className="border-t border-background/15">
          <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 px-5 py-6 text-[10px] uppercase tracking-[0.13em] text-background/45 sm:flex-row sm:px-8">
            <span>© 2025 Riya Sonaniya</span><span>Built slowly, with intent.</span><button data-testid="button-back-to-top" onClick={() => scrollToId('#top')} className="flex items-center gap-2 self-start transition-colors hover:text-background sm:self-auto">Back to top <MoveUpRight size={12} /></button>
          </div>
        </footer>
      </section>
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;