/**
 * Gera `src/styles/palette.scss` — o sistema de cores da lib, no modelo do Radix
 * Colors (12 degraus por escala, com significado fixo por degrau).
 *
 * Por que gerado: os valores vêm de `@radix-ui/colors`, que é **devDependency**.
 * O CSS resultante é versionado e entra no bundle, então o consumidor não precisa
 * instalar nada — e a lib continua sem dependência de runtime para cor.
 *
 * O que sai daqui:
 *  1. As 31 escalas cruas (`--arcana-blue-1..12`, `--arcana-slate-1..12`, …) em
 *     claro e escuro, mais as versões alpha (`--arcana-blue-a1..a12`).
 *  2. Os *aliases* semânticos que os componentes realmente consomem
 *     (`--arcana-accent-9`, `--arcana-gray-11`, …). Trocar a paleta é remapear
 *     esses aliases — nenhum componente precisa saber o nome da cor.
 *
 * Uso: `npm run build:palette` (roda automaticamente antes do build).
 */
import * as radix from "@radix-ui/colors";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

/** Escalas cromáticas (têm degrau 9 "sólido" vibrante). */
const ACCENT_SCALES = [
  "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet",
  "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass",
  "orange", "amber", "yellow", "lime", "mint", "sky", "bronze", "gold", "brown"
];

/** Escalas neutras — servem de `gray` (texto, bordas, superfícies). */
const GRAY_SCALES = ["gray", "mauve", "slate", "sage", "olive", "sand"];

const ALL_SCALES = [...GRAY_SCALES, ...ACCENT_SCALES];

/** Cinza que combina com cada acento (recomendação do Radix). */
const PAIRED_GRAY = {
  tomato: "mauve", red: "mauve", ruby: "mauve", crimson: "mauve", pink: "mauve",
  plum: "mauve", purple: "mauve", violet: "mauve", iris: "slate", indigo: "slate",
  blue: "slate", cyan: "slate", teal: "sage", jade: "sage", green: "sage",
  grass: "olive", orange: "sand", amber: "sand", yellow: "sand", lime: "olive",
  mint: "sage", sky: "slate", bronze: "sand", gold: "sand", brown: "sand"
};

/** Degraus 9/10 escuros pedem texto escuro; o resto usa branco. */
const DARK_ON_SOLID = new Set(["sky", "mint", "lime", "yellow", "amber"]);

/**
 * Texto sobre o sólido destas escalas. TEM de ser literal, não `var(--…-12)`.
 * O Radix mantém o degrau 9 destas escalas IGUAL nos dois modos (amber-9 é
 * #ffc53d no claro e no escuro), mas o degrau 12 inverte — no escuro viraria
 * creme claro sobre âmbar claro, 1.3:1, texto invisível. Fixamos o tom escuro.
 */
const onSolidLiteral = (scale) => radix[scale][`${scale}12`];

const steps = (obj, name, prefix) =>
  Array.from({ length: 12 }, (_, i) => {
    const key = `${name}${i + 1}`;
    return obj[key] ? `  --arcana-${prefix}-${i + 1}: ${obj[key]};` : null;
  }).filter(Boolean).join("\n");

const alphaSteps = (obj, name, prefix) =>
  Array.from({ length: 12 }, (_, i) => {
    const key = `${name}A${i + 1}`;
    return obj[key] ? `  --arcana-${prefix}-a${i + 1}: ${obj[key]};` : null;
  }).filter(Boolean).join("\n");

const out = [];
out.push(`// Listas consumidas por tokens.scss para re-emitir os tokens de uso em cada
// contexto de tema. NÃO são CSS: são variáveis Sass (o @import compartilha escopo).
$arcana-accent-scales: ${[...ACCENT_SCALES, "gray"].join(", ")};
$arcana-gray-scales: ${GRAY_SCALES.join(", ")};
`);
out.push(`/**
 * Paleta Arcana — GERADO por scripts/build-palette.mjs. NÃO EDITE À MÃO.
 *
 * Modelo Radix: cada escala tem 12 degraus com papel fixo —
 *   1 fundo da app · 2 fundo sutil · 3 fundo de componente · 4 componente (hover)
 *   5 componente (ativo) · 6 borda sutil · 7 borda · 8 borda (hover)
 *   9 sólido · 10 sólido (hover) · 11 texto secundário · 12 texto principal
 *
 * Os componentes NUNCA usam o nome da cor: consomem os aliases semânticos
 * (--arcana-accent-*, --arcana-gray-*, --arcana-danger-*, …). Trocar a paleta é
 * só trocar a classe no elemento raiz:
 *
 *   <div class="arcana-accent-violet">…</div>     (acento)
 *   <div class="arcana-gray-slate">…</div>        (neutro, opcional)
 *   <html class="arcana-dark">                     (modo escuro)
 */`);

/* ── 1. escalas cruas ───────────────────────────────────────────────────── */
for (const scale of ALL_SCALES) {
  const light = radix[scale];
  const dark = radix[`${scale}Dark`];
  const lightA = radix[`${scale}A`];
  const darkA = radix[`${scale}DarkA`];
  if (!light) continue;
  out.push(`\n/* ${scale} */\n:root, .arcana-light {\n${steps(light, scale, scale)}\n${alphaSteps(lightA ?? {}, scale, scale)}\n}`);
  if (dark) {
    // Os objetos *Dark do Radix reusam as chaves da escala clara (`blue1`, não
    // `blueDark1`) — passar o nome com sufixo geraria blocos vazios.
    out.push(`.arcana-dark {\n${steps(dark, scale, scale)}\n${alphaSteps(darkA ?? {}, scale, scale)}\n}`);
  }
}

/* ── 1b. alphas absolutos ────────────────────────────────────────────────
   `blackA`/`whiteA` NÃO invertem entre claro e escuro — é justamente o que se
   quer num scrim de modal: `--arcana-gray-a9` viraria branco no tema escuro e
   clarearia a página em vez de escurecê-la. */
{
  const black = Array.from({ length: 12 }, (_, i) =>
    radix.blackA?.[`blackA${i + 1}`] ? `  --arcana-black-a${i + 1}: ${radix.blackA[`blackA${i + 1}`]};` : null
  ).filter(Boolean).join("\n");
  const white = Array.from({ length: 12 }, (_, i) =>
    radix.whiteA?.[`whiteA${i + 1}`] ? `  --arcana-white-a${i + 1}: ${radix.whiteA[`whiteA${i + 1}`]};` : null
  ).filter(Boolean).join("\n");
  out.push(`\n/* alphas absolutos (iguais nos dois temas) */\n:root {\n${black}\n${white}\n}`);
}

/* ── 2. aliases semânticos ──────────────────────────────────────────────── */

/**
 * Aponta os tokens `--arcana-{to}-*` para a escala `{from}`.
 *
 * CUIDADO com `from === to`: a escala neutra do Radix se chama "gray" e o alias
 * semântico do neutro TAMBÉM se chama `--arcana-gray-*`. Emitir
 * `--arcana-gray-1: var(--arcana-gray-1)` cria um ciclo, e pelo spec de custom
 * properties toda propriedade num ciclo computa para o *guaranteed-invalid* —
 * ou seja, os 12 degraus do neutro sumiriam no tema claro padrão. Nesse caso
 * usamos os valores literais (`literalBlock`) em vez de `var()`.
 */
const aliasBlock = (from, to) => {
  if (from === to) throw new Error(`aliasBlock("${from}", "${to}"): auto-referência — use literalBlock`);
  return Array.from({ length: 12 }, (_, i) => `  --arcana-${to}-${i + 1}: var(--arcana-${from}-${i + 1});`).join("\n") + "\n" +
    Array.from({ length: 12 }, (_, i) => `  --arcana-${to}-a${i + 1}: var(--arcana-${from}-a${i + 1});`).join("\n");
};

/** Como `aliasBlock`, mas gravando os valores crus — para quando from === to. */
const literalBlock = (obj, name, to) =>
  Array.from({ length: 12 }, (_, i) => {
    const key = `${name}${i + 1}`;
    return obj[key] ? `  --arcana-${to}-${i + 1}: ${obj[key]};` : null;
  }).filter(Boolean).join("\n") + "\n" +
  Array.from({ length: 12 }, (_, i) => {
    const key = `${name}A${i + 1}`;
    return obj[key] ? `  --arcana-${to}-a${i + 1}: ${obj[key]};` : null;
  }).filter(Boolean).join("\n");

out.push(`
/* ── Aliases semânticos ──────────────────────────────────────────────────
   O default reproduz exatamente o visual histórico da lib: acento neutro
   (preto/zinc) sobre cinza. Nenhum consumidor existente muda de aparência. */
:root, .arcana-dark {
${aliasBlock("gray", "accent")}
  --arcana-on-accent: #ffffff;
}
/* O neutro padrão É a escala gray, já emitida acima em :root/.arcana-dark — não
   re-aliasamos aqui: --arcana-gray-1: var(--arcana-gray-1) seria um ciclo, e
   pelo spec toda propriedade num ciclo vira guaranteed-invalid. */

/* Estados: fixos, não seguem o acento (vermelho de erro precisa ser vermelho).
   Precisam valer no escuro também — senão --arcana-success-3 fica preso no verde
   claro enquanto --arcana-green-3 já virou escuro. */
:root, .arcana-dark {
${aliasBlock("red", "danger")}
${aliasBlock("green", "success")}
${aliasBlock("amber", "warning")}
${aliasBlock("blue", "info")}
  --arcana-on-danger: #ffffff;
  --arcana-on-success: #ffffff;
  /* amber-9 é amarelo claro: branco daria ~1.6:1. Literal, não var(--amber-12):
     o degrau 12 inverte no escuro e o texto sumiria sobre o âmbar. */
  --arcana-on-warning: ${onSolidLiteral("amber")};
  --arcana-on-info: #ffffff;
}`);

/* ── 3. classes de troca de paleta ──────────────────────────────────────── */
out.push(`\n/* ── Trocar o acento: .arcana-accent-{escala} ─────────────────────────── */`);
for (const scale of ACCENT_SCALES) {
  const gray = PAIRED_GRAY[scale] ?? "gray";
  out.push(`.arcana-accent-${scale} {
${aliasBlock(scale, "accent")}
  --arcana-on-accent: ${DARK_ON_SOLID.has(scale) ? onSolidLiteral(scale) : "#ffffff"};
  /* Os tokens de uso (--arcana-solid e cia) são emitidos por tokens.scss, que
     precisa repeti-los em cada contexto — ver a nota lá sobre substituição. */
  /* cinza pareado pelo Radix (harmoniza com o acento); sobreponha com .arcana-gray-* */
${aliasBlock(gray, "gray")}
}`);
}
/* acento neutro explícito */
out.push(`.arcana-accent-gray {\n${aliasBlock("gray", "accent")}\n  --arcana-on-accent: #ffffff;\n}`);

out.push(`\n/* ── Trocar só o neutro: .arcana-gray-{escala} ────────────────────────── */`);
for (const scale of GRAY_SCALES) {
  if (scale === "gray") {
    // Volta ao neutro padrão — útil para desfazer o cinza pareado que um
    // `.arcana-accent-*` impôs. Tem de ser literal (alias seria ciclo), e por
    // isso o escuro precisa de uma regra própria: não há como dizer "a versão
    // escura de mim mesmo" com `var()`.
    out.push(`.arcana-gray-gray {\n${literalBlock({ ...radix.gray, ...radix.grayA }, "gray", "gray")}\n}`);
    out.push(`.arcana-dark .arcana-gray-gray, .arcana-gray-gray.arcana-dark {\n${literalBlock({ ...radix.grayDark, ...radix.grayDarkA }, "gray", "gray")}\n}`);
    continue;
  }
  out.push(`.arcana-gray-${scale} {\n${aliasBlock(scale, "gray")}\n}`);
}

const target = "src/styles/palette.scss";
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, out.join("\n") + "\n", "utf8");

const scaleCount = ALL_SCALES.length;
console.log(`palette.scss gerado — ${scaleCount} escalas (claro+escuro+alpha), ${ACCENT_SCALES.length} acentos, ${GRAY_SCALES.length} neutros`);
