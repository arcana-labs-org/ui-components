// @arcanalabs/ui-components — Angular 17+ entry.
//
// Compilado por `ngc` em partial compilation (`npm run build:angular` →
// `dist/angular/`); o linker do consumidor finaliza o AOT. NÃO importa os SFCs
// Vue nem o CSS (o CSS é embutido pelo build Vite, distribuído em
// `@arcanalabs/ui-components/styles.css` — importe-o no app Angular).

// ── Componentes/diretivas Angular ───────────────────────────────────────────
export * from "./angular/index";

// ── Utilitários compartilhados (agnósticos de framework) ────────────────────
export { CurrencyFormatter } from "./core/currency";
export { DateFormatter } from "./core/date";
export {
  DEFAULT_COUNTDOWN_FORMAT,
  countdownTickInterval,
  formatCountdown,
  formatDuration,
  parseCountdownTarget,
  remainingMs,
  splitDuration
} from "./core/countdown";
export type { CountdownParts } from "./core/countdown";
export { formatStatisticValue } from "./core/statistic";
export type { StatisticFormatOptions } from "./core/statistic";
export { clampProgressValue, formatProgressLabel, progressPercent } from "./core/progress";
