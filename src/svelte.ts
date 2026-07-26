// @arcanalabs/ui-components — Svelte 5 entry.
//
// Ports Svelte 5 (runes) dos SFCs Vue arcana-style. Cada componente emite o MESMO
// markup/classes que os equivalentes Vue/React/Angular, reusando o CSS compartilhado,
// agnóstico de framework (`./styles/components.scss` → `@arcanalabs/ui-components/styles.css`).
//
// Convenção de reatividade (documentada — parity com o port React, NÃO `$bindable`):
// - `modelValue` (v-model) → prop `value` + callback `onValueChange` (dispara a cada
//   mudança). O evento `change` do Vue vira o callback separado `onChange`.
// - `emit('x')` → callback prop `onX` (`onClick`, `onDismiss`, ...).
// - slots → snippets (`children` pro default; snippet/`string | Snippet` pros nomeados).
//
// Como o `vue-tsc --noEmit` não entende `.svelte`, os tipos públicos são fixados aqui
// (o shim `src/svelte-modules.d.ts` tipa o import default como `Component` genérico).

import type { Component, Snippet } from "svelte";

import type { CalendarMessages } from "./core/calendar-locale";
import type { ArcanaContextMenuItemSpec, ArcanaContextMenuVariant } from "./core/context-menu";

import ArcanaButtonComponent from "./svelte/ArcanaButton.svelte";
import ArcanaBadgeComponent from "./svelte/ArcanaBadge.svelte";
import ArcanaInputComponent from "./svelte/ArcanaInput.svelte";
import ArcanaCheckboxComponent from "./svelte/ArcanaCheckbox.svelte";
import ArcanaSwitchComponent from "./svelte/ArcanaSwitch.svelte";
import ArcanaSwitchRowComponent from "./svelte/ArcanaSwitchRow.svelte";
import ArcanaSwitchCardComponent from "./svelte/ArcanaSwitchCard.svelte";
import ArcanaSegmentedControlComponent from "./svelte/ArcanaSegmentedControl.svelte";
import ArcanaStatisticComponent from "./svelte/ArcanaStatistic.svelte";
import ArcanaCountdownComponent from "./svelte/ArcanaCountdown.svelte";
import ArcanaProgressComponent from "./svelte/ArcanaProgress.svelte";
import ArcanaRateComponent from "./svelte/ArcanaRate.svelte";
import ArcanaAvatarComponent from "./svelte/ArcanaAvatar.svelte";
import ArcanaAvatarGroupComponent from "./svelte/ArcanaAvatarGroup.svelte";
import ArcanaSkeletonComponent from "./svelte/ArcanaSkeleton.svelte";
import ArcanaNoticeComponent from "./svelte/ArcanaNotice.svelte";
import ArcanaTabsComponent from "./svelte/ArcanaTabs.svelte";
import ArcanaAccordionComponent from "./svelte/ArcanaAccordion.svelte";
import ArcanaAccordionItemComponent from "./svelte/ArcanaAccordionItem.svelte";
import ArcanaSelectComponent from "./svelte/ArcanaSelect.svelte";
import ArcanaInputBooleanComponent from "./svelte/ArcanaInputBoolean.svelte";
import ArcanaNumberStepperComponent from "./svelte/ArcanaNumberStepper.svelte";
import ArcanaRadioIndicatorComponent from "./svelte/ArcanaRadioIndicator.svelte";
import ArcanaRadioComponent from "./svelte/ArcanaRadio.svelte";
import ArcanaRadioCardGroupComponent from "./svelte/ArcanaRadioCardGroup.svelte";
import ArcanaSwitchSegmentedComponent from "./svelte/ArcanaSwitchSegmented.svelte";
import ArcanaMultiSelectPopoverComponent from "./svelte/ArcanaMultiSelectPopover.svelte";
import ArcanaInputMaskComponent from "./svelte/ArcanaInputMask.svelte";
import ArcanaInputCurrencyComponent from "./svelte/ArcanaInputCurrency.svelte";
import ArcanaTreeSelectComponent from "./svelte/ArcanaTreeSelect.svelte";
import ArcanaDatePickerComponent from "./svelte/ArcanaDatePicker.svelte";
import ArcanaTableComponent from "./svelte/ArcanaTable.svelte";
import ArcanaSummaryTileComponent from "./svelte/ArcanaSummaryTile.svelte";
import ArcanaSummaryTilesGroupComponent from "./svelte/ArcanaSummaryTilesGroup.svelte";
import ArcanaLoadingOverlayComponent from "./svelte/ArcanaLoadingOverlay.svelte";
import ArcanaDialogComponent from "./svelte/ArcanaDialog.svelte";
import ArcanaDropdownComponent from "./svelte/ArcanaDropdown.svelte";
import ArcanaDropdownItemComponent from "./svelte/ArcanaDropdownItem.svelte";
import ArcanaContextMenuComponent from "./svelte/ArcanaContextMenu.svelte";
import ArcanaContextMenuItemComponent from "./svelte/ArcanaContextMenuItem.svelte";
import ArcanaEditFieldDialogComponent from "./svelte/ArcanaEditFieldDialog.svelte";
import ArcanaRequiredFieldsDialogComponent from "./svelte/ArcanaRequiredFieldsDialog.svelte";
import ArcanaActionPanelComponent from "./svelte/ArcanaActionPanel.svelte";
import ArcanaSettingsListComponent from "./svelte/ArcanaSettingsList.svelte";
import ArcanaSettingsListGroupComponent from "./svelte/ArcanaSettingsListGroup.svelte";
import ArcanaSettingsListItemComponent from "./svelte/ArcanaSettingsListItem.svelte";
import ArcanaSettingsEditButtonComponent from "./svelte/ArcanaSettingsEditButton.svelte";
import ArcanaSettingsEditableFieldComponent from "./svelte/ArcanaSettingsEditableField.svelte";
import ArcanaSpecSheetComponent from "./svelte/ArcanaSpecSheet.svelte";
import ArcanaSpecSheetSectionComponent from "./svelte/ArcanaSpecSheetSection.svelte";
import ArcanaSpecSheetFieldComponent from "./svelte/ArcanaSpecSheetField.svelte";
import ArcanaAspectRatioComponent from "./svelte/ArcanaAspectRatio.svelte";
import ArcanaHoverCardComponent from "./svelte/ArcanaHoverCard.svelte";
import ArcanaScrollAreaComponent from "./svelte/ArcanaScrollArea.svelte";

// ── Utilitários compartilhados (agnósticos de framework) ────────────────────
export { CurrencyFormatter } from "./core/currency";
export { maskCurrency, formatCurrencyDigits, currencyDigitsFromValue } from "./core/currency";
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

/* ── ArcanaButton ─────────────────────────────────────────────────────────── */
export type ArcanaButtonVariant =
  | "primary" | "outline" | "outline-danger" | "ghost" | "danger" | "destructive"
  | "destructive-outline" | "success" | "secondary" | "dark" | "indigo" | "alert"
  | "info" | "warning" | "teal";
export interface ArcanaButtonProps {
  variant?: ArcanaButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (ev: MouseEvent) => void;
  class?: string;
  children?: Snippet;
}
export const ArcanaButton = ArcanaButtonComponent as unknown as Component<ArcanaButtonProps>;

/* ── ArcanaBadge ──────────────────────────────────────────────────────────── */
export type ArcanaBadgeVariant = "neutral" | "blue" | "green" | "red" | "amber" | "violet";
export interface ArcanaBadgeProps {
  variant?: ArcanaBadgeVariant;
  dot?: boolean;
  size?: "sm" | "md";
  clickable?: boolean;
  onClick?: (ev: MouseEvent) => void;
  class?: string;
  children?: Snippet;
}
export const ArcanaBadge = ArcanaBadgeComponent as unknown as Component<ArcanaBadgeProps>;

/* ── ArcanaInput ──────────────────────────────────────────────────────────── */
export interface ArcanaInputProps {
  value?: string | number | null;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  maxlength?: string | number;
  autocomplete?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string | number | null) => void;
  onChange?: (value: string | number | null) => void;
  onBlur?: (ev: FocusEvent) => void;
  onFocus?: (ev: FocusEvent) => void;
  onKeydown?: (ev: KeyboardEvent) => void;
  onKeyup?: (ev: KeyboardEvent) => void;
  class?: string;
}
export const ArcanaInput = ArcanaInputComponent as unknown as Component<ArcanaInputProps>;

/* ── ArcanaCheckbox ───────────────────────────────────────────────────────── */
export interface ArcanaCheckboxProps {
  value?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  ariaLabel?: string;
  onValueChange?: (checked: boolean) => void;
  onChange?: (checked: boolean) => void;
  class?: string;
  children?: Snippet;
}
export const ArcanaCheckbox = ArcanaCheckboxComponent as unknown as Component<ArcanaCheckboxProps>;

/* ── ArcanaSwitch ─────────────────────────────────────────────────────────── */
export interface ArcanaSwitchProps {
  value?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  name?: string;
  ariaLabel?: string;
  onValueChange?: (value: boolean) => void;
  onChange?: (value: boolean) => void;
  class?: string;
  tabindex?: number;
  "aria-hidden"?: boolean;
}
export const ArcanaSwitch = ArcanaSwitchComponent as unknown as Component<ArcanaSwitchProps>;

/* ── ArcanaSwitchRow ──────────────────────────────────────────────────────── */
export interface ArcanaSwitchRowProps {
  value?: boolean;
  label?: string | Snippet;
  description?: string | Snippet;
  disabled?: boolean;
  ariaLabel?: string;
  onValueChange?: (value: boolean) => void;
  onChange?: (value: boolean) => void;
  class?: string;
}
export const ArcanaSwitchRow = ArcanaSwitchRowComponent as unknown as Component<ArcanaSwitchRowProps>;

/* ── ArcanaSwitchCard ─────────────────────────────────────────────────────── */
export interface ArcanaSwitchCardProps {
  value?: boolean;
  title?: string | Snippet;
  statusOn?: string;
  statusOff?: string;
  icon?: string;
  iconNode?: Snippet;
  status?: string | Snippet;
  disabled?: boolean;
  ariaLabel?: string;
  onValueChange?: (value: boolean) => void;
  onChange?: (value: boolean) => void;
  class?: string;
}
export const ArcanaSwitchCard = ArcanaSwitchCardComponent as unknown as Component<ArcanaSwitchCardProps>;

/* ── ArcanaSegmentedControl ───────────────────────────────────────────────── */
export interface SegmentedOption {
  /**
   * Rótulo visível do segmento. Vazio (`""`) ou ausente ativa o modo **só-ícone**:
   * o `<span>` de texto nem é renderizado (sem span vazio comendo o `gap`) e o botão
   * recebe `arcana-segmented-control__option--icon-only`. Nesse modo, informe
   * `ariaLabel` — o `<i>` é `aria-hidden`, então é ele que nomeia o botão.
   */
  label?: string;
  value: string | number;
  disabled?: boolean;
  /** Classe do ícone (ex: FontAwesome `fa-solid fa-truck`). */
  icon?: string;
  /**
   * Cor do ícone desta opção. Qualquer string CSS válida (hex, rgb, `var(...)`).
   * Aplicada como inline style no `<i>`, então vence o CSS e permanece válida
   * inclusive quando a opção está ativa (fundo escuro/colorido).
   */
  iconColor?: string;
  /**
   * Nome acessível do botão desta opção (`aria-label`). Nome final =
   * `ariaLabel || label`; com os dois vazios o atributo não é emitido.
   * No modo só-ícone vira também o `title` (tooltip nativa).
   */
  ariaLabel?: string;
}
export type SegmentedControlSize = "sm" | "md" | "lg" | "xl";
export interface ArcanaSegmentedControlProps {
  value?: string | number | null;
  options?: SegmentedOption[];
  disabled?: boolean;
  /**
   * Altura/padding/fonte/ícone do controle. Default `"md"` (tamanho histórico);
   * `"sm"` equivale ao antigo `compact`, `"lg"`/`"xl"` são maiores. Custom via
   * `--arcana-segmented-control-*` (height/font-size/padding-x/icon-size/padding).
   */
  size?: SegmentedControlSize;
  /** @deprecated Use `size="sm"`. Só tem efeito quando `size` não é informado. */
  compact?: boolean;
  squared?: boolean;
  activeColor?: string;
  radio?: boolean;
  autoSelectFirst?: boolean;
  ariaLabel?: string;
  emptyText?: string;
  onValueChange?: (value: string | number) => void;
  onChange?: (value: string | number) => void;
  class?: string;
}
export const ArcanaSegmentedControl = ArcanaSegmentedControlComponent as unknown as Component<ArcanaSegmentedControlProps>;

/* ── ArcanaStatistic ──────────────────────────────────────────────────────── */
export type StatisticTone = "neutral" | "success" | "danger" | "warning" | "info";
export type StatisticSize = "sm" | "md" | "lg" | "xl";
export interface ArcanaStatisticProps {
  /** Número exibido. String passa intacta (escape hatch pra valor já formatado). */
  value?: number | string | null;
  title?: string;
  /** Alias de `title` (`title` vence quando os dois vêm). */
  label?: string;
  /** Casas decimais fixas. Omitido = mantém as casas do próprio número. */
  precision?: number;
  /** Separador de milhar (default `","`); `""` desliga o agrupamento. */
  groupSeparator?: string;
  /** Separador decimal (default `"."`). */
  decimalSeparator?: string;
  /** Quando informado, `Intl.NumberFormat` assume e ignora os separadores manuais. */
  locale?: string;
  /** Controle total da string final — tem precedência sobre todo o resto. */
  formatter?: (value: number | string | null) => string;
  prefix?: string;
  suffix?: string;
  tone?: StatisticTone;
  /** Cor CSS arbitrária do valor; vence o `tone`. */
  valueColor?: string;
  size?: StatisticSize;
  /** Classe do ícone (ex: `"fa-solid fa-arrow-trend-up"`). */
  icon?: string;
  titleSlot?: Snippet;
  prefixSlot?: Snippet;
  suffixSlot?: Snippet;
  class?: string;
  style?: string;
}
export const ArcanaStatistic = ArcanaStatisticComponent as unknown as Component<ArcanaStatisticProps>;

/* ── ArcanaCountdown ──────────────────────────────────────────────────────── */
export type CountdownTone = "neutral" | "success" | "danger" | "warning" | "info";
export type CountdownSize = "sm" | "md" | "lg" | "xl";
export interface ArcanaCountdownProps {
  /** Instante ALVO: epoch em ms, `Date` ou string ISO. Inválido/vazio zera o contador. */
  value?: number | string | Date | null;
  /**
   * Tokens `DD`,`D`,`HH`,`H`,`mm`,`m`,`ss`,`s`,`SSS`,`SS`,`S` + literais entre colchetes.
   * A maior unidade presente absorve o excedente (50h → `50:00:00` em `HH:mm:ss`).
   */
  format?: string;
  prefix?: string;
  suffix?: string;
  title?: string;
  tone?: CountdownTone;
  valueColor?: string;
  size?: CountdownSize;
  /** Pausa a contagem (o valor congela). Voltar pra `false` retoma. */
  paused?: boolean;
  /** Período do tick em ms. Default: 50ms com milissegundos no `format`, senão 1000ms. */
  interval?: number;
  onChange?: (remaining: number) => void;
  onFinish?: () => void;
  titleSlot?: Snippet;
  prefixSlot?: Snippet;
  suffixSlot?: Snippet;
  class?: string;
  style?: string;
}
export const ArcanaCountdown = ArcanaCountdownComponent as unknown as Component<ArcanaCountdownProps>;

/* ── ArcanaProgress ───────────────────────────────────────────────────────── */
export type ProgressTone = "accent" | "success" | "danger" | "warning" | "info";
export type ProgressSize = "sm" | "md" | "lg";
export type ProgressVariant = "solid" | "soft";
export type ProgressRadius = "none" | "sm" | "md" | "lg" | "full";
export interface ArcanaProgressProps {
  /** 0–`max`. `null`/`undefined` = indeterminado. Fora da faixa é clampado. */
  value?: number | null;
  /** Teto da escala (default `100`). `max <= 0` cai pro default. */
  max?: number;
  size?: ProgressSize;
  variant?: ProgressVariant;
  tone?: ProgressTone;
  /** Mostra o rótulo `NN%` ao lado da barra. */
  showValue?: boolean;
  /** Rótulo usado no modo indeterminado (default `"…"`). */
  indeterminateText?: string;
  radius?: ProgressRadius;
  ariaLabel?: string;
  valueSlot?: Snippet;
  class?: string;
  style?: string;
}
export const ArcanaProgress = ArcanaProgressComponent as unknown as Component<ArcanaProgressProps>;

/* ── ArcanaRate ───────────────────────────────────────────────────────────── */
export type RateSize = "sm" | "md" | "lg";
export interface ArcanaRateProps {
  value?: number;
  max?: number;
  disabled?: boolean;
  /** Desliga a interação mantendo o contraste cheio — modo "exibir média". */
  readonly?: boolean;
  /** Meia estrela: clique/hover na metade esquerda vale `n - 0.5`; passo do teclado = `0.5`. */
  allowHalf?: boolean;
  showText?: boolean;
  /** Rótulo por nota — `texts[0]` é a nota 1, `texts[max - 1]` a nota `max`. */
  texts?: string[];
  /** Nota numérica. Mutuamente exclusivo com `showText`, que vence. */
  showScore?: boolean;
  /** Custom além da escala: `--arcana-rate-icon-size`/`-gap`/`-font-size`. */
  size?: RateSize;
  /** Cor da estrela cheia. Default: token `--arcana-warning-solid`. */
  color?: string;
  /** Cor da estrela vazia. Default: degrau 6 da escala neutra. */
  voidColor?: string;
  ariaLabel?: string;
  onValueChange?: (value: number) => void;
  onChange?: (value: number) => void;
  class?: string;
}
export const ArcanaRate = ArcanaRateComponent as unknown as Component<ArcanaRateProps>;

/* ── ArcanaAvatar ─────────────────────────────────────────────────────────── */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";
export interface ArcanaAvatarProps {
  src?: string;
  alt?: string;
  /** Texto curto do fallback (o CSS aplica `text-transform: uppercase`). */
  initials?: string;
  /** Classe de ícone do fallback (ex: `fa-solid fa-user`). */
  icon?: string;
  /** Degrau da escala (default `"md"` = 40px) ou um número de px. */
  size?: AvatarSize | number;
  shape?: AvatarShape;
  /** Cor de fundo do fallback. Default: token `--arcana-solid` (acento da paleta). */
  color?: string;
  onError?: (event: Event) => void;
  class?: string;
}
export const ArcanaAvatar = ArcanaAvatarComponent as unknown as Component<ArcanaAvatarProps>;

/* ── ArcanaAvatarGroup ────────────────────────────────────────────────────── */
export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  initials?: string;
  /** Classe de ícone do fallback (ex: `fa-solid fa-user`). */
  icon?: string;
  /** Cor de fundo do fallback deste avatar. */
  color?: string;
}
export interface ArcanaAvatarGroupProps {
  avatars?: AvatarGroupItem[];
  /** Máximo de itens de `avatars` a exibir; o excedente vira "+N". `0` = sem limite. */
  max?: number;
  /** "+N" manual, para quando os avatares vêm pelo snippet (o grupo não fatia). */
  overflowCount?: number;
  /** Propaga aos filhos (inclusive os do snippet). Omitido = cada avatar usa o seu. */
  size?: AvatarSize | number;
  /** Normaliza os filhos (inclusive os do snippet). Omitido = cada avatar usa o seu. */
  shape?: AvatarShape;
  /** px que cada avatar cobre do anterior. Default: 30% do tamanho. */
  overlap?: number;
  /** Espaçamento positivo (px). Informado, vence o `overlap`. */
  spacing?: number;
  ariaLabel?: string;
  children?: Snippet;
  class?: string;
}
export const ArcanaAvatarGroup = ArcanaAvatarGroupComponent as unknown as Component<ArcanaAvatarGroupProps>;

/* ── ArcanaSkeleton ───────────────────────────────────────────────────────── */
export interface ArcanaSkeletonProps {
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "full" | "none";
  class?: string;
}
export const ArcanaSkeleton = ArcanaSkeletonComponent as unknown as Component<ArcanaSkeletonProps>;

/* ── ArcanaNotice ─────────────────────────────────────────────────────────── */
export type NoticeVariant = "info" | "blue" | "success" | "warning" | "pending" | "destructive";
export interface ArcanaNoticeProps {
  variant?: NoticeVariant;
  title?: string | Snippet;
  icon?: string;
  iconNode?: Snippet;
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  class?: string;
  children?: Snippet;
}
export const ArcanaNotice = ArcanaNoticeComponent as unknown as Component<ArcanaNoticeProps>;

/* ── ArcanaTabs ───────────────────────────────────────────────────────────── */
export interface ArcanaTabItem {
  name: string | number;
  label: string;
  disabled?: boolean;
  icon?: string;
  iconColor?: string;
  badge?: string | number;
  group?: string;
  tone?: "default" | "danger";
  eager?: boolean;
}
export type ArcanaTabsVariant =
  | "pills" | "underline" | "boxed" | "sidebar" | "sidebar-soft" | "sidebar-shell" | "segmented";
export interface ArcanaTabsProps {
  value: string | number;
  tabs: ArcanaTabItem[];
  variant?: ArcanaTabsVariant;
  orientation?: "horizontal" | "vertical";
  ariaLabel?: string;
  keepAlive?: boolean;
  flush?: boolean;
  tooltipPlacement?: string;
  onValueChange?: (name: string | number) => void;
  onChange?: (name: string | number) => void;
  /** Mapa `tab.name` → snippet do painel (equivale aos slots nomeados do Vue). */
  panels?: Record<string, Snippet>;
  /** Alternativa a `panels`: snippet único que recebe o tab a renderizar. */
  panel?: Snippet<[ArcanaTabItem]>;
  listHeader?: Snippet;
  class?: string;
}
export const ArcanaTabs = ArcanaTabsComponent as unknown as Component<ArcanaTabsProps>;

/* ── ArcanaAccordion (+Item) ──────────────────────────────────────────────── */
export interface ArcanaAccordionProps {
  value?: string | string[] | null;
  accordion?: boolean;
  /** `false` (default): abre/fecha instantâneo. `true`: slide de altura + fade (~200ms). */
  animated?: boolean;
  onValueChange?: (value: string | string[] | null) => void;
  class?: string;
  children?: Snippet;
}
export const ArcanaAccordion = ArcanaAccordionComponent as unknown as Component<ArcanaAccordionProps>;

export interface ArcanaAccordionItemProps {
  name: string;
  title?: string | Snippet;
  disabled?: boolean;
  /** `undefined` = herda o `animated` do `<ArcanaAccordion>`; informado = tem precedência. */
  animated?: boolean;
  class?: string;
  children?: Snippet;
}
export const ArcanaAccordionItem = ArcanaAccordionItemComponent as unknown as Component<ArcanaAccordionItemProps>;

/* ── ArcanaSelect ─────────────────────────────────────────────────────────── */
export interface SelectOption {
  label: string;
  value: string | number | boolean | null;
  disabled?: boolean;
  description?: string;
  /** Cor CSS da bolinha do item (e do trigger em `triggerMode="dots"`). */
  color?: string;
}
export interface ArcanaSelectProps {
  value?: unknown;
  options?: SelectOption[] | string[] | number[];
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  multiple?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  /** `"labels"` (default) ou `"dots"` (bolinhas coloridas no trigger; requer `multiple`). */
  triggerMode?: "labels" | "dots";
  /** Classe FontAwesome de um ícone à esquerda no trigger. */
  icon?: string;
  /** Cor CSS inline aplicada no `icon`. */
  iconColor?: string;
  /** Rodapé do panel (só em `multiple`) com contagem + botão de limpar. */
  showFooter?: boolean;
  /** Texto da contagem; `{count}` vira o total selecionado. */
  footerCountLabel?: string;
  /** Rótulo do botão de limpar do rodapé. */
  clearLabel?: string;
  onValueChange?: (value: unknown) => void;
  onChange?: (value: unknown) => void;
  class?: string;
}
export const ArcanaSelect = ArcanaSelectComponent as unknown as Component<ArcanaSelectProps>;

/* ── ArcanaTreeSelect ─────────────────────────────────────────────────────── */
/** Nó da árvore. `children` vazio/ausente ⇒ folha. */
export interface TreeSelectNode {
  id: string | number;
  name: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}
export type TreeSelectValue = string | number | null | (string | number)[];
export interface ArcanaTreeSelectProps {
  value?: TreeSelectValue;
  options?: TreeSelectNode[];
  /** Seleção múltipla: `value` vira array e o trigger mostra tags removíveis. */
  multiple?: boolean;
  /** `false` (default): nós com filhos apenas expandem; só folhas selecionam. */
  allowParentSelection?: boolean;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  /** Classe extra no painel portado pro `<body>` (escopa tema por instância). */
  panelClass?: string;
  onValueChange?: (value: TreeSelectValue) => void;
  onChange?: (value: TreeSelectValue) => void;
}
export const ArcanaTreeSelect = ArcanaTreeSelectComponent as unknown as Component<ArcanaTreeSelectProps>;

/* ── ArcanaInputBoolean ───────────────────────────────────────────────────── */
export interface ArcanaInputBooleanProps {
  value?: unknown;
  variation?: "" | "status" | "nullable" | string;
  disabled?: boolean | number;
  clearable?: boolean;
  placeholder?: string;
  onValueChange?: (value: unknown) => void;
  onChange?: (value: unknown) => void;
  class?: string;
}
export const ArcanaInputBoolean = ArcanaInputBooleanComponent as unknown as Component<ArcanaInputBooleanProps>;

/* ── ArcanaNumberStepper ──────────────────────────────────────────────────── */
export interface ArcanaNumberStepperProps {
  value?: number | string | null;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  ariaLabel?: string;
  onValueChange?: (value: number | null) => void;
  onChange?: (value: number) => void;
  class?: string;
}
export const ArcanaNumberStepper = ArcanaNumberStepperComponent as unknown as Component<ArcanaNumberStepperProps>;

/* ── ArcanaRadioIndicator ─────────────────────────────────────────────────── */
export interface ArcanaRadioIndicatorProps {
  checked?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "solid" | "on-solid";
  class?: string;
}
export const ArcanaRadioIndicator = ArcanaRadioIndicatorComponent as unknown as Component<ArcanaRadioIndicatorProps>;

/* ── ArcanaRadio ──────────────────────────────────────────────────────────── */
export interface ArcanaRadioProps {
  value?: string | number | boolean | null;
  /** Valor selecionado do grupo — marcado quando `groupValue === value`. */
  groupValue?: string | number | boolean | null;
  /** Força o estado marcado (alternativa a `groupValue`/`value`; vence). */
  checked?: boolean;
  name?: string;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  tone?: "solid" | "on-solid";
  onChange?: (value: string | number | boolean | null | undefined) => void;
  children?: Snippet;
  class?: string;
}
export const ArcanaRadio = ArcanaRadioComponent as unknown as Component<ArcanaRadioProps>;

/* ── ArcanaRadioCardGroup ─────────────────────────────────────────────────── */
export interface RadioCardOption {
  label: string;
  value: string | number | boolean | null;
  description?: string;
  icon?: string;
  badge?: string;
  disabled?: boolean;
  iconBg?: string;
  iconColor?: string;
  iconBorder?: string;
}
export interface ArcanaRadioCardGroupProps {
  value?: string | number | boolean | null;
  options: RadioCardOption[];
  name?: string;
  ariaLabel?: string;
  disabled?: boolean;
  inline?: boolean;
  columns?: number;
  /** Lado do círculo do radio. Default `'start'`. */
  radioPosition?: "start" | "end";
  /**
   * Lado do chip do ícone. Default `'start'`. Em `'end'` o ícone é renderizado
   * depois do texto/badge, encostado na direita — combina com qualquer `radioPosition`.
   */
  iconPosition?: "start" | "end";
  onValueChange?: (value: string | number | boolean | null) => void;
  onChange?: (value: string | number | boolean | null) => void;
  class?: string;
}
export const ArcanaRadioCardGroup = ArcanaRadioCardGroupComponent as unknown as Component<ArcanaRadioCardGroupProps>;

/* ── ArcanaSwitchSegmented ────────────────────────────────────────────────── */
export interface ArcanaSwitchSegmentedProps {
  value?: boolean;
  offLabel?: string;
  onLabel?: string;
  /** Classe FontAwesome do ícone da opção esquerda (ex: `"fa-solid fa-moon"`). */
  offIcon?: string;
  /** Classe FontAwesome do ícone da opção direita (ex: `"fa-solid fa-sun"`). */
  onIcon?: string;
  /** Cor inline do `offIcon` (qualquer string CSS válida). */
  offIconColor?: string;
  /** Cor inline do `onIcon`. */
  onIconColor?: string;
  disabled?: boolean;
  ariaLabel?: string;
  compact?: boolean;
  squared?: boolean;
  activeColor?: string;
  radio?: boolean;
  offSlot?: Snippet;
  onSlot?: Snippet;
  onValueChange?: (value: boolean) => void;
  onChange?: (value: boolean) => void;
  class?: string;
}
export const ArcanaSwitchSegmented = ArcanaSwitchSegmentedComponent as unknown as Component<ArcanaSwitchSegmentedProps>;

/* ── ArcanaMultiSelectPopover ───────────────────────────────────────────────────── */
export interface MultiSelectTab {
  key: string;
  label: string;
  icon?: string;
  placeholder?: string;
  fetch: () => Promise<unknown[]>;
  searchFields?: string[];
  countLabel?: string;
}
export interface MultiSelectTriggerContext {
  open: () => void;
  toggle: () => void;
  isOpen: boolean;
  summary: string;
  isEmpty: boolean;
  selectedCount: number;
}
export interface ArcanaMultiSelectPopoverProps {
  value?: Record<string, number[]>;
  tabs: MultiSelectTab[];
  emptyLabel?: string;
  triggerIcon?: string;
  defaultTab?: string;
  onValueChange?: (value: Record<string, number[]>) => void;
  onChange?: (value: Record<string, number[]>) => void;
  onOpen?: () => void;
  onClose?: () => void;
  renderTrigger?: Snippet<[MultiSelectTriggerContext]>;
  renderItem?: Snippet<[{ item: unknown; tab?: MultiSelectTab; selected: boolean }]>;
  class?: string;
}
export const ArcanaMultiSelectPopover = ArcanaMultiSelectPopoverComponent as unknown as Component<ArcanaMultiSelectPopoverProps>;

/* ── ArcanaInputMask ──────────────────────────────────────────────────────── */
export interface ArcanaInputMaskProps {
  value?: string | number | null;
  mask: string | string[];
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
  onBlur?: (ev: FocusEvent) => void;
  onFocus?: (ev: FocusEvent) => void;
  class?: string;
}
export const ArcanaInputMask = ArcanaInputMaskComponent as unknown as Component<ArcanaInputMaskProps>;

/* ── ArcanaInputCurrency ────────────────────────────────────────────────────────── */
export interface ArcanaInputCurrencyProps {
  value?: string | number;
  disabled?: boolean | number;
  allowBlank?: boolean;
  fraction?: number;
  name?: string;
  showIcon?: boolean;
  prefix?: string;
  icon?: string;
  max?: number;
  min?: number;
  formatCurrency?: boolean;
  shadcn?: boolean;
  prepend?: Snippet;
  append?: Snippet;
  onValueChange?: (value: string) => void;
  onChange?: (ev: unknown) => void;
  onEnter?: (ev: KeyboardEvent) => void;
  onBlur?: (ev: FocusEvent) => void;
  class?: string;
}
export const ArcanaInputCurrency = ArcanaInputCurrencyComponent as unknown as Component<ArcanaInputCurrencyProps>;

/* ── ArcanaDatePicker ─────────────────────────────────────────────────────── */
export type ArcanaDatePickerType = "date" | "month" | "year" | "daterange" | "datetime";
export interface ArcanaDatePickerProps {
  value?: string | string[] | null;
  type?: ArcanaDatePickerType;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
  /** Locale BCP-47 dos nomes de meses/dias (via Intl). Default `'pt-BR'`. */
  locale?: string;
  /** Override parcial dos textos do calendário (clear, nav, confirmar, placeholders). */
  messages?: Partial<CalendarMessages>;
  onValueChange?: (value: string | string[] | null) => void;
  onChange?: (value: string | string[] | null) => void;
}
export const ArcanaDatePicker = ArcanaDatePickerComponent as unknown as Component<ArcanaDatePickerProps>;

/* ── ArcanaTable ──────────────────────────────────────────────────────────── */
export interface ArcanaTableColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "right";
  valueGetter?: (value: unknown, row: unknown, index: number) => unknown;
  render?: Snippet<[{ row: unknown; value: unknown; index: number }]>;
}
export interface ArcanaTableProps {
  columns: ArcanaTableColumn[];
  rows?: unknown[];
  emptyText?: string;
  footer?: Snippet;
  class?: string;
}
export const ArcanaTable = ArcanaTableComponent as unknown as Component<ArcanaTableProps>;

/* ── ArcanaSummaryTile (+Tiles) ───────────────────────────────────────────── */
export type SummaryTileTone = "neutral" | "positive" | "negative" | "indigo";
export interface ArcanaSummaryTileProps {
  label: string;
  value?: string | number | null;
  icon?: string;
  sub?: string;
  tone?: SummaryTileTone;
  valueSlot?: Snippet;
  subSlot?: Snippet;
  class?: string;
  style?: string;
}
export const ArcanaSummaryTile = ArcanaSummaryTileComponent as unknown as Component<ArcanaSummaryTileProps>;

export interface ArcanaSummaryTilesGroupProps {
  columns?: number | string;
  format?: "columns" | "rows";
  children?: Snippet;
  class?: string;
}
export const ArcanaSummaryTilesGroup = ArcanaSummaryTilesGroupComponent as unknown as Component<ArcanaSummaryTilesGroupProps>;

/* ── ArcanaLoadingOverlay ─────────────────────────────────────────────────── */
export interface ArcanaLoadingOverlayProps {
  visible?: boolean;
  text?: string;
  class?: string;
}
export const ArcanaLoadingOverlay = ArcanaLoadingOverlayComponent as unknown as Component<ArcanaLoadingOverlayProps>;

/* ── ArcanaDialog (overlay imperativo) ────────────────────────────────────── */
export type ArcanaDialogSize = "sm" | "md" | "lg" | "xl" | "full" | number;
export interface ArcanaDialogProps {
  title?: string;
  description?: string;
  size?: ArcanaDialogSize;
  fullHeight?: boolean;
  closeable?: boolean;
  contentClass?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  noBodyPadding?: boolean;
  bodyScrollable?: boolean;
  flatFooter?: boolean;
  /** Snippet que substitui o header padrão (title/description). */
  header?: Snippet;
  /** Snippet do rodapé — recebe `hide` no primeiro argumento. */
  footer?: Snippet<[() => void]>;
  children?: Snippet;
  onShow?: () => void;
  onHide?: () => void;
}
/**
 * API imperativa: `show()` / `hide()` acessíveis via `bind:this`.
 * ```svelte
 * <script>let dialog; </script>
 * <ArcanaDialog bind:this={dialog}>...</ArcanaDialog>
 * <button onclick={() => dialog.show()}>Abrir</button>
 * ```
 */
export interface ArcanaDialogHandle {
  show: () => void;
  hide: () => void;
}
export const ArcanaDialog = ArcanaDialogComponent as unknown as Component<ArcanaDialogProps>;

/* ── ArcanaDropdown (+Item) ───────────────────────────────────────────────── */
export type ArcanaDropdownPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";
export type ArcanaDropdownSize = "default" | "comfortable";
export interface ArcanaDropdownProps {
  placement?: ArcanaDropdownPlacement;
  offset?: number;
  disabled?: boolean;
  size?: ArcanaDropdownSize;
  /** Snippet do gatilho — recebe `{ open, toggle }`. */
  trigger?: Snippet<[{ open: boolean; toggle: () => void }]>;
  /** Snippet do painel — recebe `{ close }`. */
  children?: Snippet<[{ close: () => void }]>;
  onOpen?: () => void;
  onClose?: () => void;
}
export const ArcanaDropdown = ArcanaDropdownComponent as unknown as Component<ArcanaDropdownProps>;

export interface ArcanaDropdownItemProps {
  icon?: string;
  iconColor?: string;
  variant?: "default" | "danger" | "success" | "warning";
  disabled?: boolean;
  divided?: boolean;
  closeOnClick?: boolean;
  size?: ArcanaDropdownSize | null;
  suffix?: Snippet;
  children?: Snippet;
  onClick?: (e: MouseEvent) => void;
}
export const ArcanaDropdownItem = ArcanaDropdownItemComponent as unknown as Component<ArcanaDropdownItemProps>;

/* ── ArcanaContextMenu (+Item) ────────────────────────────────────────────── */
export type { ArcanaContextMenuItemSpec, ArcanaContextMenuVariant };

export interface ArcanaContextMenuProps {
  /** Não abre o menu — deixa o menu nativo do navegador aparecer. */
  disabled?: boolean;
  /** Classe extra no painel portado pro body (tematização de portais). */
  panelClass?: string;
  /** Rótulo acessível do `role="menu"`. */
  ariaLabel?: string;
  /** Modo data-driven — ignorado quando o snippet `children` é usado. */
  items?: ArcanaContextMenuItemSpec[];
  /** Snippet do gatilho (a área que responde ao clique direito) — recebe `{ open, close }`. */
  trigger?: Snippet<[{ open: boolean; close: () => void }]>;
  /** Snippet do painel (os itens) — recebe `{ close }`. */
  children?: Snippet<[{ close: () => void }]>;
  onOpen?: () => void;
  onClose?: () => void;
  /** Só no modo `items`. */
  onSelect?: (item: ArcanaContextMenuItemSpec, index: number) => void;
}
export const ArcanaContextMenu = ArcanaContextMenuComponent as unknown as Component<ArcanaContextMenuProps>;

export interface ArcanaContextMenuItemProps {
  icon?: string;
  /** Atalho exibido à direita (ex: "⌘C"). */
  suffix?: string | Snippet;
  variant?: ArcanaContextMenuVariant;
  disabled?: boolean;
  /** Separador acima deste item. */
  divided?: boolean;
  closeOnClick?: boolean;
  children?: Snippet;
  onClick?: (e: MouseEvent) => void;
  /** Ativação semântica — também dispara pelo Enter/Espaço. */
  onSelect?: (e: MouseEvent) => void;
}
export const ArcanaContextMenuItem = ArcanaContextMenuItemComponent as unknown as Component<ArcanaContextMenuItemProps>;

/* ── ArcanaEditFieldDialog ────────────────────────────────────────────────── */
export interface ArcanaEditFieldDialogProps {
  title: string;
  description?: string;
  cancelLabel?: string;
  saveLabel?: string;
  cancelColor?: string;
  saveColor?: string;
  cancelClass?: string;
  saveClass?: string;
  size?: "sm" | "md" | "lg" | "xl" | number;
  children?: Snippet;
  onSave?: () => void;
}
/** API imperativa `show()`/`hide()` via `bind:this` (delega pro ArcanaDialog interno). */
export interface ArcanaEditFieldDialogHandle {
  show: () => void;
  hide: () => void;
}
export const ArcanaEditFieldDialog = ArcanaEditFieldDialogComponent as unknown as Component<ArcanaEditFieldDialogProps>;

/* ── ArcanaRequiredFieldsDialog ───────────────────────────────────────────── */
export interface RequiredField {
  key: string;
  label: string;
  hint: string;
}
export interface ArcanaRequiredFieldsDialogProps {
  title?: string;
  description?: string;
  fields?: RequiredField[];
  buttonLabel?: string;
  size?: number | string;
}
/** API imperativa `show()`/`hide()` via `bind:this`. */
export interface ArcanaRequiredFieldsDialogHandle {
  show: () => void;
  hide: () => void;
}
export const ArcanaRequiredFieldsDialog = ArcanaRequiredFieldsDialogComponent as unknown as Component<ArcanaRequiredFieldsDialogProps>;

/* ── ArcanaActionPanel ────────────────────────────────────────────────── */
export interface ArcanaActionPanelProps {
  icon: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: string;
  actionLoading?: boolean;
  secondaryActionLabel?: string;
  secondaryActionIcon?: string;
  subHint?: string;
  subHintIcon?: string;
  children?: Snippet;
  action?: Snippet;
  subHintSlot?: Snippet;
  onAction?: () => void;
  onSecondaryAction?: () => void;
}
export const ArcanaActionPanel = ArcanaActionPanelComponent as unknown as Component<ArcanaActionPanelProps>;

/* ── ArcanaSettingsList (família) ─────────────────────────────────────────── */
export type SettingsGroupIconColor =
  | "blue" | "emerald" | "amber" | "rose" | "violet" | "indigo" | "teal" | "slate";

export interface ArcanaSettingsListProps {
  children?: Snippet;
}
export const ArcanaSettingsList = ArcanaSettingsListComponent as unknown as Component<ArcanaSettingsListProps>;

export interface ArcanaSettingsListGroupProps {
  title?: string | Snippet;
  sectionNum?: string;
  meta?: string | Snippet;
  icon?: string;
  iconColor?: SettingsGroupIconColor;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  compact?: boolean;
  children?: Snippet;
}
export const ArcanaSettingsListGroup = ArcanaSettingsListGroupComponent as unknown as Component<ArcanaSettingsListGroupProps>;

export interface ArcanaSettingsListItemProps {
  label?: string | Snippet;
  caption?: string | Snippet;
  disabled?: boolean;
  nested?: boolean;
  children?: Snippet;
}
export const ArcanaSettingsListItem = ArcanaSettingsListItemComponent as unknown as Component<ArcanaSettingsListItemProps>;

/** Helper aditivo (parity React/Angular): botão "Alterar" pro slot de ação do item. */
export interface ArcanaSettingsEditButtonProps {
  disabled?: boolean;
  label?: string;
  onClick?: (e: MouseEvent) => void;
}
export const ArcanaSettingsEditButton = ArcanaSettingsEditButtonComponent as unknown as Component<ArcanaSettingsEditButtonProps>;

export interface EditableFieldSelectOption {
  label: string;
  value: string | number | boolean | null;
}
export interface ArcanaSettingsEditableFieldProps {
  value?: string | number | boolean | null;
  label: string;
  caption?: string;
  type?: "text" | "currency" | "number" | "select";
  options?: EditableFieldSelectOption[];
  disabled?: boolean;
  nested?: boolean;
  displayFormatter?: (value: unknown) => string;
  modalTitle?: string;
  modalDescription?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  min?: number | string;
  max?: number | string;
  emptyText?: string;
  labelSlot?: Snippet;
  /** Wrapper do campo no modal (substitui o FormGroup global do host); recebe `{ label, input }`. */
  formGroup?: Snippet<[{ label: string; input: Snippet }]>;
  onValueChange?: (value: string | number | boolean | null) => void;
  onSave?: (value: string | number | boolean | null) => void;
}
export const ArcanaSettingsEditableField = ArcanaSettingsEditableFieldComponent as unknown as Component<ArcanaSettingsEditableFieldProps>;

/* ── ArcanaSpecSheet (família) ────────────────────────────────────────────── */
export type SpecSheetAccentColor =
  | "blue" | "emerald" | "amber" | "rose" | "violet" | "indigo" | "teal" | "slate";

export interface ArcanaSpecSheetProps {
  docNum?: string;
  title?: string | Snippet;
  metaLabel?: string;
  flat?: boolean;
  header?: Snippet;
  meta?: Snippet;
  footer?: Snippet;
  children?: Snippet;
}
export const ArcanaSpecSheet = ArcanaSpecSheetComponent as unknown as Component<ArcanaSpecSheetProps>;

export interface ArcanaSpecSheetSectionProps {
  title?: string | Snippet;
  sectionNum?: string;
  icon?: string;
  iconColor?: SpecSheetAccentColor;
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | string;
  noRowDividers?: boolean;
  compact?: boolean;
  actions?: Snippet;
  children?: Snippet;
}
export const ArcanaSpecSheetSection = ArcanaSpecSheetSectionComponent as unknown as Component<ArcanaSpecSheetSectionProps>;

export interface ArcanaSpecSheetFieldProps {
  label: string;
  value?: string | number | null;
  emptyText?: string;
  span?: number | string;
  children?: Snippet;
}
export const ArcanaSpecSheetField = ArcanaSpecSheetFieldComponent as unknown as Component<ArcanaSpecSheetFieldProps>;

/* ── ArcanaAspectRatio ────────────────────────────────────────────────────── */
export interface ArcanaAspectRatioProps {
  /** Largura ÷ altura. Default `16 / 9`; valores não-finitos ou ≤ 0 caem no default. */
  ratio?: number;
  class?: string;
  children?: Snippet;
}
export const ArcanaAspectRatio = ArcanaAspectRatioComponent as unknown as Component<ArcanaAspectRatioProps>;

/* ── ArcanaHoverCard ──────────────────────────────────────────────────────── */
export type { HoverCardAlign, HoverCardPlacement, HoverCardSide } from "./core/hover-card";
export interface ArcanaHoverCardProps {
  /** ms até abrir depois do `mouseenter` (o foco por teclado abre na hora). Default `300`. */
  openDelay?: number;
  /** ms de carência antes de fechar (default `150`) — cobre o trajeto gatilho → cartão. */
  closeDelay?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** Atalho `"{side}-{align}"` (ex: `"bottom-start"`); vence `side`/`align`. */
  placement?: string;
  /** Distância entre gatilho e cartão em px. Default `8`. */
  offset?: number;
  disabled?: boolean;
  /** Classe extra no cartão portado pro `<body>` (tema por instância). */
  panelClass?: string;
  /** O gatilho (slot `trigger` do Vue). */
  trigger?: Snippet;
  /** O conteúdo do cartão (slot default do Vue). */
  children?: Snippet;
  onOpenChange?: (open: boolean) => void;
  class?: string;
}
export const ArcanaHoverCard = ArcanaHoverCardComponent as unknown as Component<ArcanaHoverCardProps>;

/* ── ArcanaScrollArea ─────────────────────────────────────────────────────── */
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaType = "auto" | "always" | "hover";
export interface ArcanaScrollAreaProps {
  /** Eixos liberados. Default `"vertical"` (o outro eixo fica `overflow: hidden`). */
  orientation?: ScrollAreaOrientation;
  /** Altura fixa do viewport. `number` = px; string = valor CSS cru. */
  height?: number | string | null;
  /** Altura máxima do viewport. `number` = px; string = valor CSS cru. */
  maxHeight?: number | string | null;
  /** Espessura da barra em px (WebKit; no Firefox a espessura é `thin`). Default `10`. */
  scrollbarSize?: number;
  /** `"auto"` (default) | `"always"` (calha sempre) | `"hover"` (auto-ocultar). */
  type?: ScrollAreaType;
  /** Atraso do auto-ocultar (ms) — só com `type="hover"`. Default `500`. */
  hideDelay?: number;
  /** `tabindex={0}` no viewport pra rolar por teclado sem foco interno. Default `true`. */
  tabbable?: boolean;
  /** `bind:viewport` — o elemento que realmente rola (`scrollTo`, `scrollTop`, …). */
  viewport?: HTMLDivElement;
  class?: string;
  children?: Snippet;
}
export const ArcanaScrollArea = ArcanaScrollAreaComponent as unknown as Component<ArcanaScrollAreaProps>;
