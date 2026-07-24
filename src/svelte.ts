// @arcanalabs/ui-components — Svelte 5 entry.
//
// Ports Svelte 5 (runes) dos SFCs Vue shadcn-style. Cada componente emite o MESMO
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

import ShadcnButtonComponent from "./svelte/ShadcnButton.svelte";
import LabeledButtonComponent from "./svelte/LabeledButton.svelte";
import ShadcnBadgeComponent from "./svelte/ShadcnBadge.svelte";
import ShadcnInputComponent from "./svelte/ShadcnInput.svelte";
import ShadcnCheckboxComponent from "./svelte/ShadcnCheckbox.svelte";
import ShadcnSwitchComponent from "./svelte/ShadcnSwitch.svelte";
import ShadcnSwitchRowComponent from "./svelte/ShadcnSwitchRow.svelte";
import ShadcnSwitchCardComponent from "./svelte/ShadcnSwitchCard.svelte";
import ShadcnSegmentedOptionsComponent from "./svelte/ShadcnSegmentedOptions.svelte";
import ShadcnSkeletonComponent from "./svelte/ShadcnSkeleton.svelte";
import ShadcnNoticeComponent from "./svelte/ShadcnNotice.svelte";
import ShadcnTabsComponent from "./svelte/ShadcnTabs.svelte";
import ShadcnAccordionComponent from "./svelte/ShadcnAccordion.svelte";
import ShadcnAccordionItemComponent from "./svelte/ShadcnAccordionItem.svelte";

// ── Utilitários compartilhados (agnósticos de framework) ────────────────────
export { CurrencyFormatter } from "./core/currency";
export { DateFormatter } from "./core/date";
export { acquireZIndex, releaseZIndex } from "./vue/services/dialog-stack";

/* ── ShadcnButton ─────────────────────────────────────────────────────────── */
export type ShadcnButtonVariant =
  | "primary" | "outline" | "outline-danger" | "ghost" | "danger" | "destructive"
  | "destructive-outline" | "success" | "secondary" | "dark" | "indigo" | "alert"
  | "info" | "warning" | "teal";
export interface ShadcnButtonProps {
  variant?: ShadcnButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (ev: MouseEvent) => void;
  class?: string;
  children?: Snippet;
}
export const ShadcnButton = ShadcnButtonComponent as unknown as Component<ShadcnButtonProps>;

/* ── LabeledButton ────────────────────────────────────────────────────────── */
export interface LabeledButtonProps {
  icon?: string;
  color?: string;
  disabled?: boolean;
  label: string;
  shadcn?: boolean;
  loading?: boolean;
  centerLabel?: boolean;
  centerContent?: boolean;
  onClick?: (ev: MouseEvent) => void;
  class?: string;
  [key: string]: unknown;
}
export const LabeledButton = LabeledButtonComponent as unknown as Component<LabeledButtonProps>;

/* ── ShadcnBadge ──────────────────────────────────────────────────────────── */
export type ShadcnBadgeVariant = "neutral" | "blue" | "green" | "red" | "amber" | "violet";
export interface ShadcnBadgeProps {
  variant?: ShadcnBadgeVariant;
  dot?: boolean;
  size?: "sm" | "md";
  clickable?: boolean;
  onClick?: (ev: MouseEvent) => void;
  class?: string;
  children?: Snippet;
}
export const ShadcnBadge = ShadcnBadgeComponent as unknown as Component<ShadcnBadgeProps>;

/* ── ShadcnInput ──────────────────────────────────────────────────────────── */
export interface ShadcnInputProps {
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
export const ShadcnInput = ShadcnInputComponent as unknown as Component<ShadcnInputProps>;

/* ── ShadcnCheckbox ───────────────────────────────────────────────────────── */
export interface ShadcnCheckboxProps {
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
export const ShadcnCheckbox = ShadcnCheckboxComponent as unknown as Component<ShadcnCheckboxProps>;

/* ── ShadcnSwitch ─────────────────────────────────────────────────────────── */
export interface ShadcnSwitchProps {
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
export const ShadcnSwitch = ShadcnSwitchComponent as unknown as Component<ShadcnSwitchProps>;

/* ── ShadcnSwitchRow ──────────────────────────────────────────────────────── */
export interface ShadcnSwitchRowProps {
  value?: boolean;
  label?: string | Snippet;
  description?: string | Snippet;
  disabled?: boolean;
  ariaLabel?: string;
  onValueChange?: (value: boolean) => void;
  onChange?: (value: boolean) => void;
  class?: string;
}
export const ShadcnSwitchRow = ShadcnSwitchRowComponent as unknown as Component<ShadcnSwitchRowProps>;

/* ── ShadcnSwitchCard ─────────────────────────────────────────────────────── */
export interface ShadcnSwitchCardProps {
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
export const ShadcnSwitchCard = ShadcnSwitchCardComponent as unknown as Component<ShadcnSwitchCardProps>;

/* ── ShadcnSegmentedOptions ───────────────────────────────────────────────── */
export interface SegmentedOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: string;
}
export interface ShadcnSegmentedOptionsProps {
  value?: string | number | null;
  options?: SegmentedOption[];
  disabled?: boolean;
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
export const ShadcnSegmentedOptions = ShadcnSegmentedOptionsComponent as unknown as Component<ShadcnSegmentedOptionsProps>;

/* ── ShadcnSkeleton ───────────────────────────────────────────────────────── */
export interface ShadcnSkeletonProps {
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "full" | "none";
  class?: string;
}
export const ShadcnSkeleton = ShadcnSkeletonComponent as unknown as Component<ShadcnSkeletonProps>;

/* ── ShadcnNotice ─────────────────────────────────────────────────────────── */
export type NoticeVariant = "info" | "blue" | "success" | "warning" | "pending" | "destructive";
export interface ShadcnNoticeProps {
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
export const ShadcnNotice = ShadcnNoticeComponent as unknown as Component<ShadcnNoticeProps>;

/* ── ShadcnTabs ───────────────────────────────────────────────────────────── */
export interface ShadcnTabItem {
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
export type ShadcnTabsVariant =
  | "pills" | "underline" | "boxed" | "sidebar" | "sidebar-soft" | "sidebar-shell" | "segmented";
export interface ShadcnTabsProps {
  value: string | number;
  tabs: ShadcnTabItem[];
  variant?: ShadcnTabsVariant;
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
  panel?: Snippet<[ShadcnTabItem]>;
  listHeader?: Snippet;
  class?: string;
}
export const ShadcnTabs = ShadcnTabsComponent as unknown as Component<ShadcnTabsProps>;

/* ── ShadcnAccordion (+Item) ──────────────────────────────────────────────── */
export interface ShadcnAccordionProps {
  value?: string | string[] | null;
  accordion?: boolean;
  onValueChange?: (value: string | string[] | null) => void;
  class?: string;
  children?: Snippet;
}
export const ShadcnAccordion = ShadcnAccordionComponent as unknown as Component<ShadcnAccordionProps>;

export interface ShadcnAccordionItemProps {
  name: string;
  title?: string | Snippet;
  disabled?: boolean;
  class?: string;
  children?: Snippet;
}
export const ShadcnAccordionItem = ShadcnAccordionItemComponent as unknown as Component<ShadcnAccordionItemProps>;
