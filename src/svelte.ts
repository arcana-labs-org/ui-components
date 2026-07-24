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
import ShadcnSelectComponent from "./svelte/ShadcnSelect.svelte";
import ShadcnInputBooleanComponent from "./svelte/ShadcnInputBoolean.svelte";
import ShadcnNumberStepperComponent from "./svelte/ShadcnNumberStepper.svelte";
import ShadcnRadioCardGroupComponent from "./svelte/ShadcnRadioCardGroup.svelte";
import ShadcnSwitchSegmentedComponent from "./svelte/ShadcnSwitchSegmented.svelte";
import MultiSelectPopoverComponent from "./svelte/MultiSelectPopover.svelte";
import ShadcnInputMaskComponent from "./svelte/ShadcnInputMask.svelte";
import InputCurrencyComponent from "./svelte/InputCurrency.svelte";
import ShadcnDatePickerComponent from "./svelte/ShadcnDatePicker.svelte";
import ShadcnTableComponent from "./svelte/ShadcnTable.svelte";
import ShadcnSummaryTileComponent from "./svelte/ShadcnSummaryTile.svelte";
import ShadcnSummaryTilesComponent from "./svelte/ShadcnSummaryTiles.svelte";
import ShadcnLoadingOverlayComponent from "./svelte/ShadcnLoadingOverlay.svelte";
import ShadcnDialogComponent from "./svelte/ShadcnDialog.svelte";
import ShadcnDropdownComponent from "./svelte/ShadcnDropdown.svelte";
import ShadcnDropdownItemComponent from "./svelte/ShadcnDropdownItem.svelte";
import ShadcnEditFieldModalComponent from "./svelte/ShadcnEditFieldModal.svelte";
import ShadcnRequiredFieldsDialogComponent from "./svelte/ShadcnRequiredFieldsDialog.svelte";
import ShadcnOnboardingPanelComponent from "./svelte/ShadcnOnboardingPanel.svelte";
import SparkGridEmptyStateComponent from "./svelte/SparkGridEmptyState.svelte";
import ShadcnSettingsListComponent from "./svelte/ShadcnSettingsList.svelte";
import ShadcnSettingsListGroupComponent from "./svelte/ShadcnSettingsListGroup.svelte";
import ShadcnSettingsListItemComponent from "./svelte/ShadcnSettingsListItem.svelte";
import ShadcnSettingsEditButtonComponent from "./svelte/ShadcnSettingsEditButton.svelte";
import ShadcnSettingsEditableFieldComponent from "./svelte/ShadcnSettingsEditableField.svelte";
import ShadcnSpecSheetComponent from "./svelte/ShadcnSpecSheet.svelte";
import ShadcnSpecSheetSectionComponent from "./svelte/ShadcnSpecSheetSection.svelte";
import ShadcnSpecSheetFieldComponent from "./svelte/ShadcnSpecSheetField.svelte";

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

/* ── ShadcnSelect ─────────────────────────────────────────────────────────── */
export interface SelectOption {
  label: string;
  value: string | number | boolean | null;
  disabled?: boolean;
  description?: string;
}
export interface ShadcnSelectProps {
  value?: unknown;
  options?: SelectOption[] | string[] | number[];
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  multiple?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onValueChange?: (value: unknown) => void;
  onChange?: (value: unknown) => void;
  class?: string;
}
export const ShadcnSelect = ShadcnSelectComponent as unknown as Component<ShadcnSelectProps>;

/* ── ShadcnInputBoolean ───────────────────────────────────────────────────── */
export interface ShadcnInputBooleanProps {
  value?: unknown;
  variation?: "" | "status" | "nullable" | string;
  disabled?: boolean | number;
  clearable?: boolean;
  placeholder?: string;
  onValueChange?: (value: unknown) => void;
  onChange?: (value: unknown) => void;
  class?: string;
}
export const ShadcnInputBoolean = ShadcnInputBooleanComponent as unknown as Component<ShadcnInputBooleanProps>;

/* ── ShadcnNumberStepper ──────────────────────────────────────────────────── */
export interface ShadcnNumberStepperProps {
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
export const ShadcnNumberStepper = ShadcnNumberStepperComponent as unknown as Component<ShadcnNumberStepperProps>;

/* ── ShadcnRadioCardGroup ─────────────────────────────────────────────────── */
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
export interface ShadcnRadioCardGroupProps {
  value?: string | number | boolean | null;
  options: RadioCardOption[];
  name?: string;
  ariaLabel?: string;
  disabled?: boolean;
  inline?: boolean;
  columns?: number;
  radioPosition?: "start" | "end";
  onValueChange?: (value: string | number | boolean | null) => void;
  onChange?: (value: string | number | boolean | null) => void;
  class?: string;
}
export const ShadcnRadioCardGroup = ShadcnRadioCardGroupComponent as unknown as Component<ShadcnRadioCardGroupProps>;

/* ── ShadcnSwitchSegmented ────────────────────────────────────────────────── */
export interface ShadcnSwitchSegmentedProps {
  value?: boolean;
  offLabel?: string;
  onLabel?: string;
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
export const ShadcnSwitchSegmented = ShadcnSwitchSegmentedComponent as unknown as Component<ShadcnSwitchSegmentedProps>;

/* ── MultiSelectPopover ───────────────────────────────────────────────────── */
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
export interface MultiSelectPopoverProps {
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
export const MultiSelectPopover = MultiSelectPopoverComponent as unknown as Component<MultiSelectPopoverProps>;

/* ── ShadcnInputMask ──────────────────────────────────────────────────────── */
export interface ShadcnInputMaskProps {
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
export const ShadcnInputMask = ShadcnInputMaskComponent as unknown as Component<ShadcnInputMaskProps>;

/* ── InputCurrency ────────────────────────────────────────────────────────── */
export interface InputCurrencyProps {
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
export const InputCurrency = InputCurrencyComponent as unknown as Component<InputCurrencyProps>;

/* ── ShadcnDatePicker ─────────────────────────────────────────────────────── */
export interface ShadcnDatePickerProps {
  value?: string | string[] | null;
  type?: string;
  disabled?: boolean;
  clearable?: boolean;
  editable?: boolean;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string | null) => void;
  onChange?: (value: string | null) => void;
  onBlur?: (ev: FocusEvent) => void;
  onFocus?: (ev: FocusEvent) => void;
  class?: string;
}
export const ShadcnDatePicker = ShadcnDatePickerComponent as unknown as Component<ShadcnDatePickerProps>;

/* ── ShadcnTable ──────────────────────────────────────────────────────────── */
export interface ShadcnTableColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "right";
  valueGetter?: (value: unknown, row: unknown, index: number) => unknown;
  render?: Snippet<[{ row: unknown; value: unknown; index: number }]>;
}
export interface ShadcnTableProps {
  columns: ShadcnTableColumn[];
  rows?: unknown[];
  emptyText?: string;
  footer?: Snippet;
  class?: string;
}
export const ShadcnTable = ShadcnTableComponent as unknown as Component<ShadcnTableProps>;

/* ── ShadcnSummaryTile (+Tiles) ───────────────────────────────────────────── */
export type SummaryTileTone = "neutral" | "positive" | "negative" | "indigo";
export interface ShadcnSummaryTileProps {
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
export const ShadcnSummaryTile = ShadcnSummaryTileComponent as unknown as Component<ShadcnSummaryTileProps>;

export interface ShadcnSummaryTilesProps {
  columns?: number | string;
  children?: Snippet;
  class?: string;
}
export const ShadcnSummaryTiles = ShadcnSummaryTilesComponent as unknown as Component<ShadcnSummaryTilesProps>;

/* ── ShadcnLoadingOverlay ─────────────────────────────────────────────────── */
export interface ShadcnLoadingOverlayProps {
  visible?: boolean;
  text?: string;
  class?: string;
}
export const ShadcnLoadingOverlay = ShadcnLoadingOverlayComponent as unknown as Component<ShadcnLoadingOverlayProps>;

/* ── ShadcnDialog (overlay imperativo) ────────────────────────────────────── */
export type ShadcnDialogSize = "sm" | "md" | "lg" | "xl" | "full" | number;
export interface ShadcnDialogProps {
  title?: string;
  description?: string;
  size?: ShadcnDialogSize;
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
 * <ShadcnDialog bind:this={dialog}>...</ShadcnDialog>
 * <button onclick={() => dialog.show()}>Abrir</button>
 * ```
 */
export interface ShadcnDialogHandle {
  show: () => void;
  hide: () => void;
}
export const ShadcnDialog = ShadcnDialogComponent as unknown as Component<ShadcnDialogProps>;

/* ── ShadcnDropdown (+Item) ───────────────────────────────────────────────── */
export type ShadcnDropdownPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";
export type ShadcnDropdownSize = "default" | "comfortable";
export interface ShadcnDropdownProps {
  placement?: ShadcnDropdownPlacement;
  offset?: number;
  disabled?: boolean;
  size?: ShadcnDropdownSize;
  /** Snippet do gatilho — recebe `{ open, toggle }`. */
  trigger?: Snippet<[{ open: boolean; toggle: () => void }]>;
  /** Snippet do painel — recebe `{ close }`. */
  children?: Snippet<[{ close: () => void }]>;
  onOpen?: () => void;
  onClose?: () => void;
}
export const ShadcnDropdown = ShadcnDropdownComponent as unknown as Component<ShadcnDropdownProps>;

export interface ShadcnDropdownItemProps {
  icon?: string;
  iconColor?: string;
  variant?: "default" | "danger" | "success" | "warning";
  disabled?: boolean;
  divided?: boolean;
  closeOnClick?: boolean;
  size?: ShadcnDropdownSize | null;
  suffix?: Snippet;
  children?: Snippet;
  onClick?: (e: MouseEvent) => void;
}
export const ShadcnDropdownItem = ShadcnDropdownItemComponent as unknown as Component<ShadcnDropdownItemProps>;

/* ── ShadcnEditFieldModal ─────────────────────────────────────────────────── */
export interface ShadcnEditFieldModalProps {
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
/** API imperativa `show()`/`hide()` via `bind:this` (delega pro ShadcnDialog interno). */
export interface ShadcnEditFieldModalHandle {
  show: () => void;
  hide: () => void;
}
export const ShadcnEditFieldModal = ShadcnEditFieldModalComponent as unknown as Component<ShadcnEditFieldModalProps>;

/* ── ShadcnRequiredFieldsDialog ───────────────────────────────────────────── */
export interface RequiredField {
  key: string;
  label: string;
  hint: string;
}
export interface ShadcnRequiredFieldsDialogProps {
  title?: string;
  description?: string;
  fields?: RequiredField[];
  buttonLabel?: string;
  size?: number | string;
}
/** API imperativa `show()`/`hide()` via `bind:this`. */
export interface ShadcnRequiredFieldsDialogHandle {
  show: () => void;
  hide: () => void;
}
export const ShadcnRequiredFieldsDialog = ShadcnRequiredFieldsDialogComponent as unknown as Component<ShadcnRequiredFieldsDialogProps>;

/* ── ShadcnOnboardingPanel ────────────────────────────────────────────────── */
export interface ShadcnOnboardingPanelProps {
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
export const ShadcnOnboardingPanel = ShadcnOnboardingPanelComponent as unknown as Component<ShadcnOnboardingPanelProps>;

/* ── SparkGridEmptyState ──────────────────────────────────────────────────── */
export interface SparkGridEmptyStateProps {
  total: number;
  loading: boolean;
  filtered: boolean;
  icon: string;
  title: string;
  description?: string;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryActionIcon?: string;
  subHint?: string;
  children?: Snippet;
  onAction?: () => void;
  onSecondaryAction?: () => void;
  onPanelVisible?: (visible: boolean) => void;
}
export const SparkGridEmptyState = SparkGridEmptyStateComponent as unknown as Component<SparkGridEmptyStateProps>;

/* ── ShadcnSettingsList (família) ─────────────────────────────────────────── */
export type SettingsGroupIconColor =
  | "blue" | "emerald" | "amber" | "rose" | "violet" | "indigo" | "teal" | "slate";

export interface ShadcnSettingsListProps {
  children?: Snippet;
}
export const ShadcnSettingsList = ShadcnSettingsListComponent as unknown as Component<ShadcnSettingsListProps>;

export interface ShadcnSettingsListGroupProps {
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
export const ShadcnSettingsListGroup = ShadcnSettingsListGroupComponent as unknown as Component<ShadcnSettingsListGroupProps>;

export interface ShadcnSettingsListItemProps {
  label?: string | Snippet;
  caption?: string | Snippet;
  disabled?: boolean;
  nested?: boolean;
  children?: Snippet;
}
export const ShadcnSettingsListItem = ShadcnSettingsListItemComponent as unknown as Component<ShadcnSettingsListItemProps>;

/** Helper aditivo (parity React/Angular): botão "Alterar" pro slot de ação do item. */
export interface ShadcnSettingsEditButtonProps {
  disabled?: boolean;
  label?: string;
  onClick?: (e: MouseEvent) => void;
}
export const ShadcnSettingsEditButton = ShadcnSettingsEditButtonComponent as unknown as Component<ShadcnSettingsEditButtonProps>;

export interface EditableFieldSelectOption {
  label: string;
  value: string | number | boolean | null;
}
export interface ShadcnSettingsEditableFieldProps {
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
export const ShadcnSettingsEditableField = ShadcnSettingsEditableFieldComponent as unknown as Component<ShadcnSettingsEditableFieldProps>;

/* ── ShadcnSpecSheet (família) ────────────────────────────────────────────── */
export type SpecSheetAccentColor =
  | "blue" | "emerald" | "amber" | "rose" | "violet" | "indigo" | "teal" | "slate";

export interface ShadcnSpecSheetProps {
  docNum?: string;
  title?: string | Snippet;
  metaLabel?: string;
  flat?: boolean;
  header?: Snippet;
  meta?: Snippet;
  footer?: Snippet;
  children?: Snippet;
}
export const ShadcnSpecSheet = ShadcnSpecSheetComponent as unknown as Component<ShadcnSpecSheetProps>;

export interface ShadcnSpecSheetSectionProps {
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
export const ShadcnSpecSheetSection = ShadcnSpecSheetSectionComponent as unknown as Component<ShadcnSpecSheetSectionProps>;

export interface ShadcnSpecSheetFieldProps {
  label: string;
  value?: string | number | null;
  emptyText?: string;
  span?: number | string;
  children?: Snippet;
}
export const ShadcnSpecSheetField = ShadcnSpecSheetFieldComponent as unknown as Component<ShadcnSpecSheetFieldProps>;
