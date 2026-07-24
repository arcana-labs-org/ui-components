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

import ArcanaButtonComponent from "./svelte/ArcanaButton.svelte";
import ArcanaBadgeComponent from "./svelte/ArcanaBadge.svelte";
import ArcanaInputComponent from "./svelte/ArcanaInput.svelte";
import ArcanaCheckboxComponent from "./svelte/ArcanaCheckbox.svelte";
import ArcanaSwitchComponent from "./svelte/ArcanaSwitch.svelte";
import ArcanaSwitchRowComponent from "./svelte/ArcanaSwitchRow.svelte";
import ArcanaSwitchCardComponent from "./svelte/ArcanaSwitchCard.svelte";
import ArcanaSegmentedOptionsComponent from "./svelte/ArcanaSegmentedOptions.svelte";
import ArcanaSkeletonComponent from "./svelte/ArcanaSkeleton.svelte";
import ArcanaNoticeComponent from "./svelte/ArcanaNotice.svelte";
import ArcanaTabsComponent from "./svelte/ArcanaTabs.svelte";
import ArcanaAccordionComponent from "./svelte/ArcanaAccordion.svelte";
import ArcanaAccordionItemComponent from "./svelte/ArcanaAccordionItem.svelte";
import ArcanaSelectComponent from "./svelte/ArcanaSelect.svelte";
import ArcanaInputBooleanComponent from "./svelte/ArcanaInputBoolean.svelte";
import ArcanaNumberStepperComponent from "./svelte/ArcanaNumberStepper.svelte";
import ArcanaRadioCardGroupComponent from "./svelte/ArcanaRadioCardGroup.svelte";
import ArcanaSwitchSegmentedComponent from "./svelte/ArcanaSwitchSegmented.svelte";
import ArcanaMultiSelectPopoverComponent from "./svelte/ArcanaMultiSelectPopover.svelte";
import ArcanaInputMaskComponent from "./svelte/ArcanaInputMask.svelte";
import ArcanaInputCurrencyComponent from "./svelte/ArcanaInputCurrency.svelte";
import ArcanaDatePickerComponent from "./svelte/ArcanaDatePicker.svelte";
import ArcanaTableComponent from "./svelte/ArcanaTable.svelte";
import ArcanaSummaryTileComponent from "./svelte/ArcanaSummaryTile.svelte";
import ArcanaSummaryTilesGroupComponent from "./svelte/ArcanaSummaryTilesGroup.svelte";
import ArcanaLoadingOverlayComponent from "./svelte/ArcanaLoadingOverlay.svelte";
import ArcanaDialogComponent from "./svelte/ArcanaDialog.svelte";
import ArcanaDropdownComponent from "./svelte/ArcanaDropdown.svelte";
import ArcanaDropdownItemComponent from "./svelte/ArcanaDropdownItem.svelte";
import ArcanaEditFieldModalComponent from "./svelte/ArcanaEditFieldModal.svelte";
import ArcanaRequiredFieldsDialogComponent from "./svelte/ArcanaRequiredFieldsDialog.svelte";
import ArcanaOnboardingPanelComponent from "./svelte/ArcanaOnboardingPanel.svelte";
import ArcanaSettingsListComponent from "./svelte/ArcanaSettingsList.svelte";
import ArcanaSettingsListGroupComponent from "./svelte/ArcanaSettingsListGroup.svelte";
import ArcanaSettingsListItemComponent from "./svelte/ArcanaSettingsListItem.svelte";
import ArcanaSettingsEditButtonComponent from "./svelte/ArcanaSettingsEditButton.svelte";
import ArcanaSettingsEditableFieldComponent from "./svelte/ArcanaSettingsEditableField.svelte";
import ArcanaSpecSheetComponent from "./svelte/ArcanaSpecSheet.svelte";
import ArcanaSpecSheetSectionComponent from "./svelte/ArcanaSpecSheetSection.svelte";
import ArcanaSpecSheetFieldComponent from "./svelte/ArcanaSpecSheetField.svelte";

// ── Utilitários compartilhados (agnósticos de framework) ────────────────────
export { CurrencyFormatter } from "./core/currency";
export { DateFormatter } from "./core/date";
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

/* ── ArcanaSegmentedOptions ───────────────────────────────────────────────── */
export interface SegmentedOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: string;
}
export interface ArcanaSegmentedOptionsProps {
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
export const ArcanaSegmentedOptions = ArcanaSegmentedOptionsComponent as unknown as Component<ArcanaSegmentedOptionsProps>;

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
  onValueChange?: (value: string | string[] | null) => void;
  class?: string;
  children?: Snippet;
}
export const ArcanaAccordion = ArcanaAccordionComponent as unknown as Component<ArcanaAccordionProps>;

export interface ArcanaAccordionItemProps {
  name: string;
  title?: string | Snippet;
  disabled?: boolean;
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
  onValueChange?: (value: unknown) => void;
  onChange?: (value: unknown) => void;
  class?: string;
}
export const ArcanaSelect = ArcanaSelectComponent as unknown as Component<ArcanaSelectProps>;

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
  radioPosition?: "start" | "end";
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
export interface ArcanaDatePickerProps {
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

/* ── ArcanaEditFieldModal ─────────────────────────────────────────────────── */
export interface ArcanaEditFieldModalProps {
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
export interface ArcanaEditFieldModalHandle {
  show: () => void;
  hide: () => void;
}
export const ArcanaEditFieldModal = ArcanaEditFieldModalComponent as unknown as Component<ArcanaEditFieldModalProps>;

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

/* ── ArcanaOnboardingPanel ────────────────────────────────────────────────── */
export interface ArcanaOnboardingPanelProps {
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
export const ArcanaOnboardingPanel = ArcanaOnboardingPanelComponent as unknown as Component<ArcanaOnboardingPanelProps>;

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
