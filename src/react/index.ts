// @arcanalabs/ui-components — React barrel (lote 1).
//
// Ports React dos SFCs Vue de mesmo nome. Cada componente emite o MESMO markup e as
// MESMAS classes shadcn do equivalente Vue, reusando o CSS compartilhado
// (`@arcanalabs/ui-components/styles.css`). Só a reatividade/eventos é re-implementada
// (props Vue → props React; `emit('update:modelValue')`/v-model → `value` +
// `onValueChange`; `emit('x')` → `onX`; slots → `children`/props ReactNode).

export { ArcanaButton } from "./ArcanaButton";
export type { ArcanaButtonProps, ArcanaButtonVariant } from "./ArcanaButton";

export { ArcanaBadge } from "./ArcanaBadge";
export type { ArcanaBadgeProps, ArcanaBadgeVariant } from "./ArcanaBadge";

export { ArcanaInput } from "./ArcanaInput";
export type { ArcanaInputProps } from "./ArcanaInput";

export { ArcanaCheckbox } from "./ArcanaCheckbox";
export type { ArcanaCheckboxProps } from "./ArcanaCheckbox";

export { ArcanaSwitch } from "./ArcanaSwitch";
export type { ArcanaSwitchProps } from "./ArcanaSwitch";

export { ArcanaSwitchRow } from "./ArcanaSwitchRow";
export type { ArcanaSwitchRowProps } from "./ArcanaSwitchRow";

export { ArcanaSwitchCard } from "./ArcanaSwitchCard";
export type { ArcanaSwitchCardProps } from "./ArcanaSwitchCard";

export { ArcanaSegmentedOptions } from "./ArcanaSegmentedOptions";
export type {
    ArcanaSegmentedOptionsProps,
    SegmentedOption,
} from "./ArcanaSegmentedOptions";

export { ArcanaSkeleton } from "./ArcanaSkeleton";
export type { ArcanaSkeletonProps } from "./ArcanaSkeleton";

export { ArcanaNotice } from "./ArcanaNotice";
export type { ArcanaNoticeProps, NoticeVariant } from "./ArcanaNotice";

export { ArcanaTabs } from "./ArcanaTabs";
export type {
    ArcanaTabsProps,
    ArcanaTabItem,
    ArcanaTabsVariant,
} from "./ArcanaTabs";

export { ArcanaAccordion, ArcanaAccordionItem } from "./ArcanaAccordion";
export type {
    ArcanaAccordionProps,
    ArcanaAccordionItemProps,
} from "./ArcanaAccordion";

// ── React lote 2 ────────────────────────────────────────────────────────────

export { ArcanaSelect } from "./ArcanaSelect";
export type { ArcanaSelectProps, SelectOption } from "./ArcanaSelect";

export { ArcanaInputBoolean } from "./ArcanaInputBoolean";
export type { ArcanaInputBooleanProps } from "./ArcanaInputBoolean";

export { ArcanaNumberStepper } from "./ArcanaNumberStepper";
export type { ArcanaNumberStepperProps } from "./ArcanaNumberStepper";

export { ArcanaRadioCardGroup } from "./ArcanaRadioCardGroup";
export type {
    ArcanaRadioCardGroupProps,
    RadioCardOption,
} from "./ArcanaRadioCardGroup";

export { ArcanaSwitchSegmented } from "./ArcanaSwitchSegmented";
export type { ArcanaSwitchSegmentedProps } from "./ArcanaSwitchSegmented";

export { ArcanaMultiSelectPopover } from "./ArcanaMultiSelectPopover";
export type {
    ArcanaMultiSelectPopoverProps,
    MultiSelectTab,
    MultiSelectTriggerContext,
} from "./ArcanaMultiSelectPopover";

export { ArcanaInputMask } from "./ArcanaInputMask";
export type { ArcanaInputMaskProps } from "./ArcanaInputMask";

export { ArcanaInputCurrency } from "./ArcanaInputCurrency";
export type { ArcanaInputCurrencyProps } from "./ArcanaInputCurrency";

export { ArcanaDatePicker } from "./ArcanaDatePicker";
export type { ArcanaDatePickerProps } from "./ArcanaDatePicker";

export { ArcanaTreeSelect } from "./ArcanaTreeSelect";
export type {
    ArcanaTreeSelectProps,
    TreeSelectNode,
    TreeSelectValue,
} from "./ArcanaTreeSelect";

export { ArcanaTable } from "./ArcanaTable";
export type { ArcanaTableProps, ArcanaTableColumn } from "./ArcanaTable";

export { ArcanaSummaryTile } from "./ArcanaSummaryTile";
export type {
    ArcanaSummaryTileProps,
    SummaryTileTone,
} from "./ArcanaSummaryTile";

export { ArcanaSummaryTilesGroup } from "./ArcanaSummaryTilesGroup";
export type { ArcanaSummaryTilesGroupProps } from "./ArcanaSummaryTilesGroup";

export { ArcanaLoadingOverlay } from "./ArcanaLoadingOverlay";
export type { ArcanaLoadingOverlayProps } from "./ArcanaLoadingOverlay";

// ── React lote 3 (final): overlay / composição ──────────────────────────────

export { ArcanaDialog } from "./ArcanaDialog";
export type {
    ArcanaDialogProps,
    ArcanaDialogHandle,
    ArcanaDialogSize,
} from "./ArcanaDialog";

export { ArcanaDropdown, ArcanaDropdownItem } from "./ArcanaDropdown";
export type {
    ArcanaDropdownProps,
    ArcanaDropdownItemProps,
    ArcanaDropdownPlacement,
    ArcanaDropdownSize,
} from "./ArcanaDropdown";

export { ArcanaEditFieldDialog } from "./ArcanaEditFieldDialog";
export type {
    ArcanaEditFieldDialogProps,
    ArcanaEditFieldDialogHandle,
} from "./ArcanaEditFieldDialog";

export { ArcanaRequiredFieldsDialog } from "./ArcanaRequiredFieldsDialog";
export type {
    ArcanaRequiredFieldsDialogProps,
    ArcanaRequiredFieldsDialogHandle,
    RequiredField,
} from "./ArcanaRequiredFieldsDialog";

export { ArcanaOnboardingPanel } from "./ArcanaOnboardingPanel";
export type { ArcanaOnboardingPanelProps } from "./ArcanaOnboardingPanel";

export {
    ArcanaSettingsList,
    ArcanaSettingsListGroup,
    ArcanaSettingsListItem,
    ArcanaSettingsEditButton,
} from "./ArcanaSettingsList";
export type {
    ArcanaSettingsListProps,
    ArcanaSettingsListGroupProps,
    ArcanaSettingsListItemProps,
    ArcanaSettingsEditButtonProps,
    SettingsGroupIconColor,
} from "./ArcanaSettingsList";

export { ArcanaSettingsEditableField } from "./ArcanaSettingsEditableField";
export type { ArcanaSettingsEditableFieldProps } from "./ArcanaSettingsEditableField";

export {
    ArcanaSpecSheet,
    ArcanaSpecSheetSection,
    ArcanaSpecSheetField,
} from "./ArcanaSpecSheet";
export type {
    ArcanaSpecSheetProps,
    ArcanaSpecSheetSectionProps,
    ArcanaSpecSheetFieldProps,
} from "./ArcanaSpecSheet";
