import { useLang } from "../i18n";

/**
 * Tabela de dependências da lib.
 *
 * Os pacotes e as faixas de versão vêm do `package.json` via `__ARCANA_DEPS__`
 * (ver `define` em `docs/vite.config.ts`) — nunca escritos à mão, senão a tabela
 * mente no primeiro `npm install` que mudar alguma coisa.
 *
 * A única parte hand-written é PARA QUE serve cada pacote, que não existe no
 * `package.json`. Um pacote sem entrada aqui ainda aparece na tabela, só que sem
 * descrição — assim uma dependência nova nunca some da vista por esquecimento.
 */

/** Chave de tradução com o propósito de cada pacote. */
const PURPOSE_KEY: Record<string, string> = {
  maska: "depMaska",
  vue: "depVue",
  react: "depReact",
  "react-dom": "depReactDom",
  "@angular/core": "depAngular",
  "@angular/common": "depAngular",
  svelte: "depSvelte",
  "@fortawesome/fontawesome-free": "depFontAwesome"
};

interface Row {
  name: string;
  range: string;
  kind: "runtime" | "peer" | "peerOptional";
}

function buildRows(): Row[] {
  const { dependencies, peerDependencies, peerDependenciesMeta } = __ARCANA_DEPS__;

  const runtime: Row[] = Object.entries(dependencies)
    .map(([name, range]) => ({ name, range, kind: "runtime" as const }));

  const peers: Row[] = Object.entries(peerDependencies).map(([name, range]) => ({
    name,
    range,
    kind: peerDependenciesMeta[name]?.optional ? ("peerOptional" as const) : ("peer" as const)
  }));

  const byName = (a: Row, b: Row) => a.name.localeCompare(b.name);
  return [...runtime.sort(byName), ...peers.sort(byName)];
}

export function DependenciesTable() {
  const { msg } = useLang();
  const t = msg.dependencies;
  const rows = buildRows();

  const kindLabel: Record<Row["kind"], string> = {
    runtime: t.kindRuntime,
    peer: t.kindPeer,
    peerOptional: t.kindPeerOptional
  };

  return <div className="deps-block">
    <div className="ref-table-wrap">
      <table className="ref-table deps-table">
        <thead>
          <tr>
            <th>{t.colPackage}</th>
            <th>{t.colVersion}</th>
            <th>{t.colKind}</th>
            <th>{t.colPurpose}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => <tr key={`${row.kind}-${row.name}`}>
            <td><code>{row.name}</code></td>
            <td className="t-muted"><code>{row.range}</code></td>
            <td className="t-muted">
              <span className={`dep-kind dep-kind--${row.kind}`}>{kindLabel[row.kind]}</span>
            </td>
            <td className="t-muted">{msg.demos[PURPOSE_KEY[row.name]] ?? ""}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <p className="deps-note">{t.note}</p>
  </div>;
}
