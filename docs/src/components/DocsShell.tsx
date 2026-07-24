import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import { LangSwitcher } from "./LangSwitcher";
import { fmt, useLang } from "../i18n";
import arcanaLogo from "../assets/arcana-logo-light.png";

export type Framework = "react" | "vue" | "angular" | "svelte";

export interface SectionCode {
  file: string;
  code: string;
}

export interface DocsSection {
  id: string;
  title: string;
  body: ReactNode;
  preview?: ReactNode;
  previewLabel?: string;
  /** Optional per-framework code. Omitted for stub ("coming soon") sections. */
  code?: Record<Framework, SectionCode>;
  /** Optional props/events reference, shown in its own tab. */
  reference?: ReactNode;
}

export interface DocsGroup {
  label: string;
  sections: DocsSection[];
}

const FW_KEY = "arcana-docs-framework";
const GITHUB_URL = "https://github.com/arcana-labs-org/ui-components";

function ReactLogo() {
  return <svg className="fw-logo" viewBox="-11.5 -10.23 23 20.46" aria-hidden="true">
    <circle r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>;
}

function VueLogo() {
  return <svg className="fw-logo" viewBox="0 0 256 221" aria-hidden="true">
    <path fill="#41b883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0Z" />
    <path fill="#41b883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0Z" />
    <path fill="#35495e" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0Z" />
  </svg>;
}

function AngularLogo() {
  return <svg className="fw-logo" viewBox="0 0 250 250" aria-hidden="true">
    <path fill="#dd0031" d="M125 30 31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" />
    <path fill="#c3002f" d="M125 30v200l78.9-43.7 14.2-123.1z" />
    <path fill="#fff" d="M125 52.1 66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2h21.7L125 52.1zm17 83.3h-34l17-40.9 17 40.9z" />
  </svg>;
}

function SvelteLogo() {
  return <svg className="fw-logo" viewBox="0 0 107 128" aria-hidden="true">
    <path fill="#ff3e00" d="M94.157 22.819c-10.4-14.885-30.94-19.297-45.792-9.835L22.282 29.608A29.92 29.92 0 0 0 8.764 49.65a31.5 31.5 0 0 0 3.108 20.231 30 30 0 0 0-4.477 11.183 31.9 31.9 0 0 0 5.448 24.116c10.402 14.887 30.942 19.297 45.791 9.835l26.083-16.624A29.92 29.92 0 0 0 98.235 78.35a31.53 31.53 0 0 0-3.105-20.232 30 30 0 0 0 4.474-11.182 31.88 31.88 0 0 0-5.447-24.116" />
    <path fill="#fff" d="M45.817 106.582a20.72 20.72 0 0 1-22.237-8.243 19.17 19.17 0 0 1-3.277-14.503 18 18 0 0 1 .624-2.435l.49-1.498 1.337.981a33.6 33.6 0 0 0 10.203 5.098l.97.294-.09.968a5.85 5.85 0 0 0 1.052 3.878 6.24 6.24 0 0 0 6.695 2.485 5.8 5.8 0 0 0 1.603-.704L69.27 76.28a5.43 5.43 0 0 0 2.45-3.631 5.8 5.8 0 0 0-.987-4.371 6.24 6.24 0 0 0-6.698-2.487 5.7 5.7 0 0 0-1.6.704l-9.953 6.345a19 19 0 0 1-5.296 2.326 20.72 20.72 0 0 1-22.237-8.243 19.17 19.17 0 0 1-3.277-14.502 17.99 17.99 0 0 1 8.13-12.052l26.081-16.623a19 19 0 0 1 5.3-2.329 20.72 20.72 0 0 1 22.237 8.243 19.17 19.17 0 0 1 3.277 14.503 18 18 0 0 1-.624 2.435l-.49 1.498-1.337-.98a33.6 33.6 0 0 0-10.203-5.1l-.97-.294.09-.968a5.86 5.86 0 0 0-1.052-3.878 6.24 6.24 0 0 0-6.696-2.485 5.8 5.8 0 0 0-1.602.704L37.73 51.72a5.42 5.42 0 0 0-2.449 3.63 5.79 5.79 0 0 0 .986 4.372 6.24 6.24 0 0 0 6.698 2.486 5.8 5.8 0 0 0 1.602-.704l9.952-6.342a19 19 0 0 1 5.295-2.328 20.72 20.72 0 0 1 22.237 8.242 19.17 19.17 0 0 1 3.277 14.503 18 18 0 0 1-8.13 12.053l-26.081 16.622a19 19 0 0 1-5.3 2.328" />
  </svg>;
}

export const FW_BADGE: Record<Framework, string> = {
  react: "React",
  vue: "Vue 3",
  angular: "Angular",
  svelte: "Svelte"
};

function readStoredFramework(): Framework {
  try {
    const stored = localStorage.getItem(FW_KEY);
    return (["react", "vue", "angular", "svelte"] as Framework[]).includes(stored as Framework)
      ? (stored as Framework)
      : "vue";
  } catch {
    return "vue";
  }
}

const STARS_KEY = "arcana-docs-stars";

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "")}k`;
  return String(n);
}

/**
 * GitHub star count next to the topbar link. Cache-first (localStorage, TTL 6h)
 * so each visitor makes at most one unauthenticated request per window. Any
 * failure keeps the cached value; the link itself never breaks.
 */
function GithubStars() {
  const { msg } = useLang();
  const [stars, setStars] = useState<number | null>(() => {
    try {
      const raw = localStorage.getItem(STARS_KEY);
      if (raw) { const parsed = JSON.parse(raw); if (typeof parsed.count === "number") return parsed.count; }
    } catch { /* ignore */ }
    return null;
  });

  useEffect(() => {
    // Always refresh on mount so the count never gets stuck on a stale cached
    // value (e.g. a 0 fetched before the repo had any stars). The cached value
    // above is only for an instant first paint; the network result wins.
    const controller = new AbortController();
    fetch("https://api.github.com/repos/arcana-labs-org/ui-components", { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("gh"))))
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
          try { localStorage.setItem(STARS_KEY, JSON.stringify({ count: data.stargazers_count, ts: Date.now() })); } catch { /* ignore */ }
        }
      })
      .catch(() => { /* rate-limited/offline: keep the cached value, if any */ });
    return () => controller.abort();
  }, []);

  if (stars == null) return null;
  return <span className="gh-stars" aria-label={fmt(msg.shell.githubStars, { count: String(stars) })}>
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" /></svg>
    {formatStars(stars)}
  </span>;
}

type WorkbenchTab = "preview" | "code" | "reference";

const PreviewIcon = () => <svg className="seg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
const CodeIcon = () => <svg className="seg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
const ReferenceIcon = () => <svg className="seg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>;

function SectionWorkbench({ section, framework }: { section: DocsSection; framework: Framework }) {
  const { msg } = useLang();
  const tabs: WorkbenchTab[] = [];
  if (section.preview) tabs.push("preview");
  if (section.code) tabs.push("code");
  if (section.reference) tabs.push("reference");
  const [tab, setTab] = useState<WorkbenchTab>(tabs[0] ?? "preview");
  const id = useId();

  // Stub sections carry no interactive surface.
  if (tabs.length === 0) return null;

  // Code-only sections (e.g. installation) — no tabs to toggle.
  if (tabs.length === 1 && tabs[0] === "code") {
    const activeCode = section.code![framework];
    return <div className="section-code-only">
      <div className="section-code-label">{msg.shell.codeOnlyLabel}<span className="seg-fw-badge">{FW_BADGE[framework]}</span></div>
      <CodeBlock key={`${section.id}-${framework}`} file={activeCode.file} code={activeCode.code} />
    </div>;
  }

  // Preview-only sections — nothing to toggle.
  if (tabs.length === 1 && tabs[0] === "preview") {
    return <div className="section-workbench">
      <div className="section-workbench-header">
        <span className="section-preview-caption">{section.previewLabel ?? msg.shell.defaultPreviewCaption}</span>
      </div>
      <div className="section-panel section-panel--preview">
        <div className="section-preview-body">{section.preview}</div>
      </div>
    </div>;
  }

  // Guard the active tab against sections that lack it (should not happen, but keeps types honest).
  const activeTab = tabs.includes(tab) ? tab : tabs[0];
  const tabLabel: Record<WorkbenchTab, string> = { preview: msg.shell.previewTab, code: msg.shell.codeTab, reference: msg.shell.referenceTab };
  const tabIcon: Record<WorkbenchTab, ReactNode> = { preview: <PreviewIcon />, code: <CodeIcon />, reference: <ReferenceIcon /> };
  const activeCode = section.code?.[framework];

  return <div className="section-workbench">
    <div className="section-workbench-header">
      <span className="section-preview-caption">{section.previewLabel ?? msg.shell.defaultPreviewCaption}</span>
      <div className="section-seg" role="tablist" aria-label={fmt(msg.shell.sectionExampleAria, { title: section.title })}>
        {tabs.map((key) => <button key={key} id={`${id}-${key}-tab`} type="button" role="tab" aria-selected={activeTab === key} aria-controls={`${id}-panel`} onClick={() => setTab(key)}>
          {tabIcon[key]}
          {tabLabel[key]}
          {key === "code" ? <span className="seg-fw-badge">{FW_BADGE[framework]}</span> : null}
        </button>)}
      </div>
    </div>
    <div id={`${id}-panel`} className={`section-panel section-panel--${activeTab}`} role="tabpanel" aria-labelledby={`${id}-${activeTab}-tab`}>
      {activeTab === "preview" ? <div className="section-preview-body">{section.preview}</div>
        : activeTab === "reference" ? <div className="section-reference-body">{section.reference}</div>
        : <CodeBlock key={`${section.id}-${framework}`} file={activeCode!.file} code={activeCode!.code} />}
    </div>
  </div>;
}

export function DocsShell({ groups }: { groups: DocsGroup[] }) {
  const { msg } = useLang();
  const allSections = useMemo(() => groups.flatMap((group) => group.sections), [groups]);
  const [framework, setFramework] = useState<Framework>(readStoredFramework);
  const [activeId, setActiveId] = useState<string>(() => {
    const hash = window.location.hash.replace("#", "");
    return allSections.some((section) => section.id === hash) ? hash : allSections[0]?.id ?? "";
  });
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onHashChange = () => {
      setNavOpen(false);
      const hash = window.location.hash.replace("#", "");
      if (allSections.some((section) => section.id === hash)) setActiveId(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [allSections]);

  useEffect(() => {
    try { localStorage.setItem(FW_KEY, framework); } catch { /* private mode */ }
  }, [framework]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".doc-section"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); });
    }, { rootMargin: "-80px 0px -62% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 8 && sections.length) {
        setActiveId(sections[sections.length - 1].id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [allSections]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const normalizedQuery = query.trim().toLocaleLowerCase(msg.meta.locale);
  const visibleGroups = useMemo(() => {
    if (!normalizedQuery) return groups;
    return groups
      .map((group) => ({ ...group, sections: group.sections.filter((section) => section.title.toLocaleLowerCase(msg.meta.locale).includes(normalizedQuery)) }))
      .filter((group) => group.sections.length > 0);
  }, [groups, normalizedQuery, msg.meta.locale]);

  const closeNav = () => setNavOpen(false);

  return <>
    <header className="topbar">
      <button className="menu-btn" type="button" aria-label={navOpen ? msg.shell.closeNav : msg.shell.openNav} aria-expanded={navOpen} aria-controls="docs-sidebar" onClick={() => setNavOpen((open) => !open)}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12" /></svg>
      </button>
      <a className="brand" href={`#${groups[0]?.sections[0]?.id ?? ""}`}>
        <img className="brand-logo" src={arcanaLogo} alt="Arcana" />
        <span className="brand-lib">{msg.shell.brandLib}</span>
      </a>
      <div className="topbar-search" role="search">
        <input ref={searchRef} type="search" placeholder={msg.shell.searchPlaceholder} aria-label={msg.shell.searchAria} value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      <div className="topbar-right">
        <div className="fw-toggle" role="group" aria-label={msg.shell.chooseFramework}>
          <button type="button" className={framework === "vue" ? "fw-btn is-active" : "fw-btn"} aria-pressed={framework === "vue"} onClick={() => setFramework("vue")}><VueLogo />Vue</button>
          <button type="button" className={framework === "react" ? "fw-btn is-active" : "fw-btn"} aria-pressed={framework === "react"} onClick={() => setFramework("react")}><ReactLogo />React</button>
          <button type="button" className={framework === "angular" ? "fw-btn is-active" : "fw-btn"} aria-pressed={framework === "angular"} onClick={() => setFramework("angular")}><AngularLogo />Angular</button>
          <button type="button" className={framework === "svelte" ? "fw-btn is-active" : "fw-btn"} aria-pressed={framework === "svelte"} onClick={() => setFramework("svelte")}><SvelteLogo />Svelte</button>
        </div>
        <LangSwitcher />
        <a className="gh-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
          <span>GitHub</span>
          <GithubStars />
        </a>
      </div>
    </header>

    {navOpen ? <button className="nav-scrim" type="button" aria-label={msg.shell.closeNav} onClick={closeNav} /> : null}

    <div className="layout">
      <nav className={navOpen ? "sidebar is-open" : "sidebar"} id="docs-sidebar" aria-label={msg.shell.sidebarAria}>
        {visibleGroups.length === 0 ? <p className="nav-empty">{msg.shell.noSectionsFound}</p> : null}
        {visibleGroups.map((group) => <div className="nav-group" key={group.label}>
          <div className="nav-group-title">{group.label}</div>
          <ul>
            {group.sections.map((section) => <li key={section.id}>
              <a
                className={section.id === activeId ? "nav-link is-active" : "nav-link"}
                aria-current={section.id === activeId ? "true" : undefined}
                href={`#${section.id}`}
                onClick={() => { setActiveId(section.id); closeNav(); }}
              >{section.title}</a>
            </li>)}
          </ul>
        </div>)}
      </nav>

      <main className="content">
        <div className="content-inner">
          <div className="doc-kicker">{msg.shell.kicker}</div>
          <h1 className="doc-title">{msg.shell.docTitle}</h1>
          <p className="doc-lead">{msg.shell.lead}</p>

          {groups.map((group) => <div key={group.label}>
            <div className="group-divider">{group.label}</div>
            {group.sections.map((section) => <section className="doc-section" id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.body}
              <SectionWorkbench section={section} framework={framework} />
            </section>)}
          </div>)}

          <footer className="doc-footer">
            {msg.shell.footer} · <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/arcana-labs-org/ui-components</a>
          </footer>
        </div>
      </main>
    </div>
  </>;
}
