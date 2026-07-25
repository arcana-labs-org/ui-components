// @arcanalabs/ui-components — React 18/19 entry.
//
// Ports React (lote 1) dos SFCs Vue arcana-style. Emitem o MESMO markup/classes que os
// componentes Vue, reusando o CSS compartilhado, agnóstico de framework
// (`./styles/components.scss` → `@arcanalabs/ui-components/styles.css`).

// ── Estilos compartilhados ──────────────────────────────────────────────────
// Importado como side-effect pra que o build também embuta o CSS a partir da entry
// React (o bundle usa `cssCodeSplit: false` → um único `dist/ui-components.css`).
import "./styles/components.scss";

// ── Componentes React ───────────────────────────────────────────────────────
export * from "./react/index";

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
export { acquireZIndex, releaseZIndex } from "./vue/services/dialog-stack";
