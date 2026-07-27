import { useMemo } from "react";
import { DocsShell, type DocsGroup, type DocsSection } from "./components/DocsShell";
import { VueDemo } from "./components/VueDemo";
import { COMPONENTS, CATEGORY_ORDER } from "./components/registry";
import { COMPONENT_DOCS, type PropRow } from "./components/componentDocs";
import { installCode, usageSnippets, stylesSnippets, maskaSnippets, paletteSnippets, frameworkCode, sameForAll } from "./components/snippets";
import { PaletteExplorer } from "./components/PaletteExplorer";
import { DependenciesTable } from "./components/DependenciesTable";
import { FRAMEWORK_SNIPPETS } from "./components/frameworkSnippets";
import { rich, useLang, type Messages } from "./i18n";

function P({ children }: { children: string }) {
  return <p>{rich(children)}</p>;
}

function PropsTable({ rows, events, slots, msg }: {
  rows: PropRow[];
  events?: string[];
  slots?: string[];
  msg: Messages;
}) {
  const t = msg.propsTable;
  return <>
    <div className="ref-table-wrap">
      <div className="section-code-label">{t.caption}</div>
      <table className="ref-table">
        <thead><tr><th>{t.name}</th><th>{t.type}</th><th>{t.default}</th><th>{t.description}</th></tr></thead>
        <tbody>
          {rows.map((row) => <tr key={row.name}>
            <td><code>{row.name}</code></td>
            <td className="t-muted"><span className="t-type">{row.type}</span></td>
            <td className="t-muted"><code>{row.default}</code></td>
            <td className="t-muted">{row.description}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    {events?.length ? <div className="events-block">
      <div className="section-code-label">{t.eventsTitle}</div>
      <ul className="doc-list">{events.map((event) => <li key={event}><code>{event}</code></li>)}</ul>
    </div> : null}
    {slots?.length ? <div className="events-block">
      <div className="section-code-label">{t.slotsTitle}</div>
      <ul className="doc-list">{slots.map((slot) => <li key={slot}><code>{slot}</code></li>)}</ul>
    </div> : null}
  </>;
}

function buildGroups(msg: Messages): DocsGroup[] {
  const groups: DocsGroup[] = [];

  // ── Getting started ────────────────────────────────────────────────────
  const gs = msg.gettingStarted;
  groups.push({
    label: msg.categories.gettingStarted,
    sections: [
      {
        id: "installation",
        title: gs.install.title,
        body: <><P>{gs.install.p1}</P><P>{gs.install.p2}</P></>,
        code: sameForAll("terminal", installCode)
      },
      {
        id: "usage",
        title: gs.usage.title,
        body: <><P>{gs.usage.p1}</P><P>{gs.usage.p2}</P></>,
        code: usageSnippets
      },
      {
        id: "styles",
        title: gs.styles.title,
        body: <><P>{gs.styles.p1}</P><P>{gs.styles.p2}</P></>,
        code: stylesSnippets
      },
      {
        id: "colors",
        title: gs.palette.title,
        body: <><P>{gs.palette.p1}</P><P>{gs.palette.p2}</P></>,
        preview: <PaletteExplorer />,
        previewLabel: msg.palette.previewTitle,
        code: paletteSnippets
      },
      {
        id: "dependencies",
        title: gs.deps.title,
        body: <><P>{gs.deps.p1}</P><P>{gs.deps.p2}</P></>,
        preview: <DependenciesTable />,
        previewLabel: gs.deps.title
      },
      {
        id: "v-maska",
        title: gs.maska.title,
        body: <><P>{gs.maska.p1}</P><P>{gs.maska.p2}</P></>,
        code: maskaSnippets
      }
    ]
  });

  // ── Component categories ───────────────────────────────────────────────
  for (const category of CATEGORY_ORDER) {
    if (category === "gettingStarted") continue;
    const entries = COMPONENTS.filter((entry) => entry.category === category);
    if (!entries.length) continue;

    const sections: DocsSection[] = entries.map((entry) => {
      if (entry.docKey) {
        const doc = COMPONENT_DOCS[entry.docKey];
        const prose = msg.components[entry.docKey];
        const section: DocsSection = {
          id: entry.id,
          title: entry.label,
          body: <P>{prose.blurb}</P>,
          preview: <VueDemo component={doc.demo} />,
          previewLabel: msg.demoCaption,
          code: frameworkCode(entry.name, { vue: doc.vueSnippet, ...FRAMEWORK_SNIPPETS[entry.docKey] }),
          reference: <PropsTable rows={doc.props} events={doc.events} slots={doc.slots} msg={msg} />
        };
        return section;
      }
      // Stub — registered but not yet documented.
      return {
        id: entry.id,
        title: entry.label,
        body: <p className="stub-note">{rich(msg.comingSoon)}</p>
      } satisfies DocsSection;
    });

    groups.push({ label: msg.categories[category], sections });
  }

  return groups;
}

export function App() {
  const { msg } = useLang();
  const groups = useMemo(() => buildGroups(msg), [msg]);
  return <DocsShell groups={groups} />;
}
