import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, Mail, Phone, MapPin, Copy, Check, GraduationCap,
  BadgeCheck, Smartphone, Globe, Server, Wrench, Layers, PenTool, Terminal,
} from 'lucide-react';

/* Dwight Angelo Decena — Portfolio
   Fonts: Anton (display), Plus Jakarta Sans (body), JetBrains Mono (data).
   Palette: obsidian #070708, white headings, #9CA3AF body, crimson #DC2626. */

// Transparent-background cutout served from site/public. Set to null for the silhouette.
const PORTRAIT_SRC = '/portrait.webp';

const PROFILE = {
  name: 'Dwight Angelo Decena',
  first: 'Dwight Angelo',
  last: 'Decena',
  title: 'Mobile & Web Application Developer',
  bio: 'Mobile & Web Application Developer with a focus on building clean, user-centric digital experiences using React Native, React, and TypeScript. Passionate about turning complex ideas into functional, responsive code from concept to deployment.',
  email: 'dwightangelodecena@gmail.com',
  phone: '+63 977 346 4090',
  github: 'https://github.com/dwightangelodecena-cloud',
  githubHandle: 'dwightangelodecena-cloud',
  location: 'Philippines',
};

const PROJECTS = [
  {
    id: '01', kind: 'WEB', title: 'Bridges of Hope', sub: 'Web Portal',
    desc: 'Comprehensive healthcare web system for managing admissions, patient records, and staff analytics.',
    stack: ['React (JSX)', 'JavaScript', 'Tailwind CSS', 'Supabase'],
    live: 'https://bridgesofhope-delta.vercel.app/',
    repo: 'https://github.com/dwightangelodecena-cloud/-BridgesOfHope---Backup',
    span: 'lg:col-span-4', mono: 'BOH',
  },
  {
    id: '02', kind: 'MOBILE', title: 'Bridges of Hope', sub: 'Mobile App',
    desc: 'Cross-platform mobile companion app for patient families to track admissions and receive real-time notifications.',
    stack: ['React Native', 'TypeScript', 'Supabase'],
    repo: 'https://github.com/dwightangelodecena-cloud/-BridgesOfHope---Backup',
    span: 'lg:col-span-2', mono: 'BOH',
  },
  {
    id: '03', kind: 'MOBILE', title: 'Rhayz Kicks', sub: 'Mobile App',
    desc: 'Cross-platform mobile e-commerce application with dynamic store repositories and delivery tracking.',
    stack: ['Flutter', 'Dart', 'Laravel API'],
    repo: 'https://github.com/dwightangelodecena-cloud/RhayzKicks',
    span: 'lg:col-span-2', mono: 'RK',
  },
  {
    id: '04', kind: 'WEB', title: 'Rhayz Kicks', sub: 'Web Platform',
    desc: 'High-performance sneaker e-commerce web platform featuring interactive cart drawers and wishlist management.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Laravel API'],
    live: 'https://rhayz-kicks.vercel.app/',
    repo: 'https://github.com/dwightangelodecena-cloud/RhayzKicks',
    span: 'lg:col-span-4', mono: 'RK',
  },
  {
    id: '05', kind: 'CAPSTONE', title: 'Integrated Service & Warranty Management System', sub: 'Web System',
    desc: 'Web-based capstone system streamlining service requests, warranty tracking, and administrative workflows.',
    stack: ['React', 'PHP', 'MySQL', 'Supabase'],
    span: 'lg:col-span-3', mono: 'ISWM',
  },
  {
    id: '06', kind: 'UI/UX', title: 'Travel Booking & Checkout UI', sub: 'Figma Prototype',
    desc: 'Low-fidelity Figma wireframes and interactive prototypes mapping search, booking, and payment user flows.',
    stack: ['Figma', 'UI/UX', 'Wireframing'],
    span: 'lg:col-span-3', mono: 'TRVL',
  },
];

const STACK = [
  { key: 'core', label: 'Core', icon: Layers, span: 'lg:col-span-6',
    items: ['Mobile & Web Application Development', 'UI/UX & Wireframing', 'Database Architecture', 'Version Control'] },
  { key: 'mobile', label: 'Mobile', icon: Smartphone, span: 'lg:col-span-2',
    items: ['Flutter', 'Dart', 'React Native'] },
  { key: 'web', label: 'Web Frontend', icon: Globe, span: 'lg:col-span-2',
    items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { key: 'backend', label: 'Backend / DB', icon: Server, span: 'lg:col-span-2',
    items: ['PHP', 'MySQL', 'Supabase', 'Laravel API'] },
  { key: 'tools', label: 'Tools', icon: Wrench, span: 'lg:col-span-6',
    items: ['Figma', 'VS Code', 'Android Studio', 'Oracle VirtualBox', 'Wireshark', 'Git/GitHub'] },
];

const PROCESS = [
  { n: '01', t: 'Map the flow', d: 'Wireframe screens and user journeys in Figma before writing code.' },
  { n: '02', t: 'Model the data', d: 'Design tables, relations and auth in MySQL or Supabase.' },
  { n: '03', t: 'Build the interface', d: 'Ship responsive UI in React, React Native or Flutter.' },
  { n: '04', t: 'Deploy & iterate', d: 'Push to Vercel, version with Git, refine from feedback.' },
];

// Certiport verification: visitors enter the code at verify.certiport.com.
const CERTS = [
  {
    title: 'IT Specialist — Databases', issuer: 'Certiport · Pearson',
    awarded: 'SEP 18, 2025', expires: 'SEP 2030',
    code: 'CHrG-Dwzr', score: 914, max: 1000,
    href: 'https://verify.certiport.com',
  },
];

const NAV = [
  { id: 'hero', label: '01-HERO' },
  { id: 'work', label: '02-WORK' },
  { id: 'stack', label: '03-STACK' },
  { id: 'info', label: '04-INFO' },
];

const go = (id) => (e) => {
  e?.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ---------- small pieces ---------- */

// lucide-react v1 dropped brand icons, so the GitHub mark is inlined.
function Github({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

function SectionHead({ index, label, title, ghost }) {
  return (
    <div className="relative mb-10 md:mb-14">
      <span aria-hidden className="pointer-events-none absolute -top-8 right-0 font-display text-[clamp(4rem,14vw,11rem)] leading-none text-white/[0.035] select-none">
        {ghost}
      </span>
      <div className="relative flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-crimson">
        <span>{index}</span>
        <span className="h-px w-10 bg-crimson/60" />
        <span className="text-mute">{label}</span>
      </div>
      <h2 className="relative mt-4 max-w-3xl text-3xl md:text-5xl font-semibold tracking-tight text-white [text-wrap:balance]">
        {title}
      </h2>
    </div>
  );
}

function Pill({ children, active }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors duration-200 ${active ? 'border-crimson/60 bg-crimson/10 text-white' : 'border-white/10 bg-white/[0.03] text-mute'}`}>
      {children}
    </span>
  );
}

function CopyRow({ icon: Icon, label, value, href }) {
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      const r = document.createRange();
      r.selectNodeContents(ref.current);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    }
  };
  return (
    <div className="group flex items-center gap-4 border-b border-white/10 py-4">
      <Icon className="h-4 w-4 shrink-0 text-crimson" />
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] tracking-[0.2em] text-mute/70">{label}</div>
        {href ? (
          <a ref={ref} href={href} target="_blank" rel="noreferrer" className="block break-all text-white hover:text-crimson transition-colors">{value}</a>
        ) : (
          <span ref={ref} className="block break-all text-white select-all">{value}</span>
        )}
      </div>
      <button onClick={copy} aria-label={`Copy ${label.toLowerCase()}`}
        className="rounded-md border border-white/10 p-2 text-mute hover:border-crimson/60 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson">
        {done ? <Check className="h-3.5 w-3.5 text-crimson" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function Portrait() {
  if (PORTRAIT_SRC) {
    return (
      <img src={PORTRAIT_SRC} alt={PROFILE.name}
        className="relative z-10 w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] [mask-image:linear-gradient(to_bottom,black_72%,transparent)]" />
    );
  }
  return (
    <svg viewBox="0 0 400 500" className="relative z-10 w-full" role="img" aria-label="Portrait placeholder">
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24252a" />
          <stop offset="1" stopColor="#070708" />
        </linearGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#DC2626" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#DC2626" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M200 70c-46 0-78 36-78 86 0 34 13 62 33 79l-4 34c-58 12-103 46-121 96-8 22-12 64-12 135h364c0-71-4-113-12-135-18-50-63-84-121-96l-4-34c20-17 33-45 33-79 0-50-32-86-78-86z"
        fill="url(#body)" stroke="url(#rim)" strokeWidth="2" />
      <text x="200" y="440" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="3" fill="#9CA3AF" opacity="0.6">PORTRAIT_SRC</text>
    </svg>
  );
}

function ContributionGrid() {
  const weeks = 52;
  const cells = [];
  let seed = 20260428;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let w = 0; w < weeks; w++) {
    const burst = Math.sin(w / 4.2) * 0.5 + 0.5;
    for (let d = 0; d < 7; d++) {
      const weekend = d === 0 || d === 6 ? 0.45 : 1;
      const v = rand() * (0.35 + burst * 0.75) * weekend;
      cells.push(v < 0.18 ? 0 : v < 0.38 ? 1 : v < 0.58 ? 2 : v < 0.78 ? 3 : 4);
    }
  }
  const shade = ['bg-white/[0.05]', 'bg-crimson/25', 'bg-crimson/45', 'bg-crimson/70', 'bg-crimson'];
  const months = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'];
  return (
    <div className="min-w-0">
      <div className="overflow-x-auto pb-2">
        <div className="w-max">
          <div className="mb-2 grid grid-cols-12 font-mono text-[9px] tracking-widest text-mute/60" style={{ width: weeks * 13 }}>
            {months.map((m) => <span key={m}>{m}</span>)}
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
            {cells.map((l, i) => (
              <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${shade[l]} transition-transform duration-150 hover:scale-150`} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-widest text-mute/70">
        <span>ILLUSTRATIVE PATTERN · LIVE GRAPH ON GITHUB</span>
        <span className="flex items-center gap-1.5">
          LESS {shade.map((s) => <span key={s} className={`h-[10px] w-[10px] rounded-[2px] ${s}`} />)} MORE
        </span>
      </div>
    </div>
  );
}

/* ---------- sections ---------- */

function Header({ active }) {
  return (
    <header className="fixed inset-x-0 z-50 flex justify-center px-gutter" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 14px)' }}>
      <nav className="flex w-full max-w-[1400px] items-center justify-between gap-4 rounded-full border border-white/10 bg-black/50 py-2 pl-5 pr-2 backdrop-blur-xl">
        <a href="#hero" onClick={go('hero')} className="font-display text-xl tracking-wide text-white">
          DAD<span className="text-crimson">.</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={go(n.id)}
                className={`rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] transition-colors ${active === n.id ? 'bg-white/10 text-white' : 'text-mute hover:text-white'}`}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={go('contact')}
          className="rounded-full bg-crimson px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-white transition hover:bg-white hover:text-black">
          CONTACT ↗
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const toolCount = STACK.filter((s) => s.key !== 'core').reduce((n, s) => n + s.items.length, 0);
  return (
    <section id="hero" className="relative overflow-hidden pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.2em] text-mute">
          <span>DEV/PORTFOLIO — 2026 · PH</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/10 px-3 py-1.5 text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
            </span>
            AVAILABLE FOR PROJECTS &amp; INTERNSHIPS
          </span>
        </div>

        <div className="relative mt-6 md:mt-4">
          <h1 aria-label={PROFILE.name}
            className="hero-word select-none whitespace-nowrap text-center font-display leading-[0.82] tracking-[-0.01em] text-[clamp(4.25rem,22.4vw,20.5rem)]">
            PORTFOLIO
          </h1>
        </div>

        <div className="relative grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-1 lg:col-span-4 lg:pb-10">
            <div className="font-mono text-[11px] tracking-[0.2em] text-crimson">// HELLO, I'M</div>
            <p className="mt-3 text-4xl md:text-5xl font-semibold leading-[1.02] tracking-tight text-white">
              {PROFILE.first}<br />{PROFILE.last}
            </p>
            <p className="mt-4 text-base text-mute">{PROFILE.title}</p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5 font-mono">
              {[
                ['02', 'PROJECTS'],
                [String(toolCount), 'TOOLS'],
                ['BSIT', 'NU-D'],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="text-[10px] tracking-[0.2em] text-mute/70">{k}</dt>
                  <dd className="mt-1 text-xl text-white tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-4 -mt-[16vw] md:-mt-[14vw] lg:-mt-[10.5rem]">
            <div className="relative mx-auto w-[min(78vw,400px)]">
              <div aria-hidden className="absolute inset-x-[8%] bottom-[10%] top-[18%] rounded-full bg-crimson/30 blur-[70px]" />
              <Portrait />
              <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-obsidian to-transparent" />
            </div>
          </div>

          <div className="order-3 lg:col-span-4 lg:pb-10">
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-mute">{PROFILE.bio}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#work" onClick={go('work')}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-mono text-[12px] tracking-wider text-black transition hover:bg-crimson hover:text-white">
                [ View Selected Work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> ]
              </a>
              <a href="#contact" onClick={go('contact')}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-mono text-[12px] tracking-wider text-white transition hover:border-crimson hover:text-crimson">
                [ Let&apos;s Connect <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> ]
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 border-y border-white/10 bg-white/[0.02] py-3 overflow-hidden">
        <div className="marquee flex w-max gap-10 font-mono text-[11px] tracking-[0.25em] text-mute/80">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10" aria-hidden={k === 1}>
              {['REACT', 'REACT NATIVE', 'TYPESCRIPT', 'FLUTTER', 'SUPABASE', 'LARAVEL API', 'TAILWIND CSS', 'FIGMA', 'MYSQL'].map((t) => (
                <span key={t} className="flex items-center gap-10">{t}<span className="text-crimson">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <article className={`group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-crimson/50 hover:shadow-[0_0_0_1px_rgba(220,38,38,0.25),0_24px_70px_-20px_rgba(220,38,38,0.45)] motion-reduce:transform-none ${p.span}`}>
      <div className="relative h-40 overflow-hidden border-b border-white/10 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(220,38,38,0.18),transparent_55%)]">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
        <span aria-hidden className="absolute -bottom-6 left-4 font-display text-[7.5rem] leading-none text-white/[0.06] transition-colors duration-300 group-hover:text-crimson/25">
          {p.mono}
        </span>
        <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
          <span className="text-crimson">{p.id}</span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-mute">{p.kind}</span>
        </div>
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 font-mono text-[12px] tracking-[0.15em] text-white">
              VIEW LIVE <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        )}
        {p.live && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" /> LIVE
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="font-mono text-[10px] tracking-[0.2em] text-mute/70">{p.sub.toUpperCase()}</div>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white [text-wrap:balance]">{p.title}</h3>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-mute">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => <Pill key={s}>{s}</Pill>)}
        </div>
        <div className="mt-auto flex flex-wrap gap-4 pt-6 font-mono text-[11px] tracking-[0.15em]">
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-white hover:text-crimson">
              LIVE <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {p.repo ? (
            <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-mute hover:text-white">
              <Github className="h-3.5 w-3.5" /> SOURCE
            </a>
          ) : (
            <span className="text-mute/50">PRIVATE · ACADEMIC</span>
          )}
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <SectionHead index="02" label="SELECTED WORK" ghost="WORK" title="Web portals, mobile apps and prototypes, built end to end." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const [filter, setFilter] = useState('all');
  return (
    <section id="stack" className="scroll-mt-24 py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <SectionHead index="03" label="STACK & PROCESS" ghost="STACK" title="The tools I reach for, and the order I use them in." />

        <div role="tablist" aria-label="Filter stack" className="mb-6 flex flex-wrap gap-2">
          {[{ key: 'all', label: 'All' }, ...STACK].map((c) => (
            <button key={c.key} role="tab" aria-selected={filter === c.key} onClick={() => setFilter(c.key)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.15em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson ${filter === c.key ? 'border-crimson bg-crimson text-white' : 'border-white/10 text-mute hover:border-white/30 hover:text-white'}`}>
              {c.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {STACK.map((c) => {
            const on = filter === 'all' || filter === c.key;
            const Icon = c.icon;
            return (
              <div key={c.key}
                className={`group min-w-0 rounded-2xl border p-5 md:p-6 transition duration-300 ${c.span} ${c.key === 'core' || c.key === 'tools' ? 'md:col-span-2' : ''} ${on ? 'border-white/10 bg-white/[0.04] opacity-100' : 'border-white/5 bg-white/[0.015] opacity-35'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-crimson" />
                    <span className="font-mono text-[11px] tracking-[0.2em] text-white">{c.label.toUpperCase()}</span>
                  </div>
                  <span className="font-mono text-[10px] text-mute/60 tabular-nums">{String(c.items.length).padStart(2, '0')}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.items.map((s) => (
                    <span key={s}
                      className="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-mute transition duration-200 hover:-translate-y-0.5 hover:border-crimson hover:bg-crimson/15 hover:text-white hover:shadow-[0_0_24px_-4px_rgba(220,38,38,0.6)]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-mute">
          <Terminal className="h-4 w-4 text-crimson" /> WORK PROCESS
        </div>
        <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s) => (
            <li key={s.n} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-crimson/40">
              <span className="font-display text-6xl leading-none text-white/10 transition-colors group-hover:text-crimson">{s.n}</span>
              <h3 className="mt-6 text-lg font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Info() {
  return (
    <section id="info" className="scroll-mt-24 py-24 md:py-32 border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-gutter">
        <SectionHead index="04" label="EDUCATION & CREDENTIALS" ghost="INFO" title="Trained in mobile and web application development." />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-4">
            <span aria-hidden className="absolute -right-4 -top-6 font-display text-[9rem] leading-none text-white/[0.04]">NU</span>
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-crimson">
              <GraduationCap className="h-4 w-4" /> EDUCATION
            </div>
            <h3 className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight text-white">National University Dasmariñas</h3>
            <p className="mt-2 text-mute">BS in Information Technology</p>
            <div className="mt-6 inline-flex flex-wrap gap-2">
              <Pill active>Specialization · Mobile &amp; Web App Development</Pill>
              <Pill>Cavite, PH</Pill>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {CERTS.map((c) => (
              <div key={c.title} className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-crimson/40">
                <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-crimson">
                  <BadgeCheck className="h-4 w-4" /> CERTIFICATION
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{c.title}</h3>
                <p className="mt-1 font-mono text-[11px] tracking-wider text-mute">{c.issuer}</p>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-[10px] tracking-[0.2em] text-mute/70">EXAM SCORE</span>
                    <span className="text-white tabular-nums"><span className="text-2xl">{c.score}</span><span className="text-mute">/{c.max}</span></span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-crimson" style={{ width: `${(c.score / c.max) * 100}%` }} />
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-3 gap-3 font-mono text-[10px] tracking-[0.15em]">
                  {[['AWARDED', c.awarded], ['EXPIRES', c.expires], ['CODE', c.code]].map(([k, v]) => (
                    <div key={k} className="min-w-0">
                      <dt className="text-mute/60">{k}</dt>
                      <dd className="mt-1 break-words text-white select-all">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a href={c.href} target="_blank" rel="noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-crimson/60 px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-white transition hover:bg-crimson">
                  [ ❰ Verify Certificate ❱ ]
                </a>
                <p className="mt-2 font-mono text-[10px] tracking-wider text-mute/60">Enter code {c.code} at verify.certiport.com</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-white/10 pt-24 md:pt-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] max-w-full -translate-x-1/2 rounded-full bg-crimson/15 blur-[120px]" />
      <div className="relative mx-auto max-w-[1400px] px-gutter">
        <div className="font-mono text-[11px] tracking-[0.2em] text-crimson">05 — CONTACT</div>
        <h2 className="mt-5 font-display text-[clamp(3rem,10.5vw,10rem)] leading-[0.88] text-white [text-wrap:balance]">
          LET&apos;S CREATE SOMETHING <span className="text-crimson">EXTRAORDINARY</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-6">
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-2 lg:col-span-3">
            <CopyRow icon={Mail} label="EMAIL" value={PROFILE.email} />
            <CopyRow icon={Phone} label="PHONE" value={PROFILE.phone} />
            <CopyRow icon={Github} label="GITHUB" value={`github.com/${PROFILE.githubHandle}`} href={PROFILE.github} />
            <div className="flex items-center gap-4 py-4">
              <MapPin className="h-4 w-4 text-crimson" />
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-mute/70">LOCATION</div>
                <span className="text-white">{PROFILE.location} · GMT+8</span>
              </div>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:col-span-3">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-white">
                <Github className="h-4 w-4 text-crimson" /> COMMIT ACTIVITY
              </div>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-mute hover:text-white">
                @{PROFILE.githubHandle} <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <ContributionGrid />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/10 py-8 font-mono text-[10px] tracking-[0.2em] text-mute/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {PROFILE.name.toUpperCase()}</span>
          <span className="flex items-center gap-2"><PenTool className="h-3 w-3" /> DESIGNED &amp; BUILT IN REACT + TAILWIND</span>
          <a href="#hero" onClick={go('hero')} className="hover:text-white">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const ids = [...NAV.map((n) => n.id), 'contact'];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id === 'contact' ? 'info' : e.target.id);
      }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian font-sans text-mute antialiased selection:bg-crimson selection:text-white">
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.06]" />
      <Header active={active} />
      <main>
        <Hero />
        <Work />
        <Stack />
        <Info />
      </main>
      <Contact />
    </div>
  );
}
