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

export { ArcanaSegmentedControl } from "./ArcanaSegmentedControl";
export type {
    ArcanaSegmentedControlProps,
    SegmentedControlSize,
    SegmentedOption,
} from "./ArcanaSegmentedControl";

export { ArcanaRate } from "./ArcanaRate";
export type { ArcanaRateProps, RateSize } from "./ArcanaRate";

export { ArcanaAvatar } from "./ArcanaAvatar";
export type { ArcanaAvatarProps, AvatarSize, AvatarShape } from "./ArcanaAvatar";

export { ArcanaAvatarGroup } from "./ArcanaAvatarGroup";
export type { ArcanaAvatarGroupProps, AvatarGroupItem } from "./ArcanaAvatarGroup";

export { ArcanaStatistic } from "./ArcanaStatistic";
export type {
    ArcanaStatisticProps,
    StatisticTone,
    StatisticSize,
} from "./ArcanaStatistic";

export { ArcanaCountdown } from "./ArcanaCountdown";
export type {
    ArcanaCountdownProps,
    ArcanaCountdownHandle,
    CountdownTone,
    CountdownSize,
} from "./ArcanaCountdown";

export { ArcanaProgress } from "./ArcanaProgress";
export type {
    ArcanaProgressProps,
    ProgressTone,
    ProgressSize,
    ProgressVariant,
    ProgressRadius,
} from "./ArcanaProgress";

export { ArcanaAspectRatio } from "./ArcanaAspectRatio";
export type { ArcanaAspectRatioProps } from "./ArcanaAspectRatio";

export { ArcanaHoverCard } from "./ArcanaHoverCard";
export type { ArcanaHoverCardProps } from "./ArcanaHoverCard";
export type {
    HoverCardAlign,
    HoverCardPlacement,
    HoverCardSide,
} from "../core/hover-card";

export { ArcanaTooltip } from "./ArcanaTooltip";
export type { ArcanaTooltipProps } from "./ArcanaTooltip";
export type {
    HoverCardAlign as TooltipAlign,
    HoverCardPlacement as TooltipPlacement,
    HoverCardSide as TooltipSide,
} from "../core/hover-card";

export { ArcanaScrollArea } from "./ArcanaScrollArea";
export type {
    ArcanaScrollAreaProps,
    ScrollAreaOrientation,
    ScrollAreaType,
} from "./ArcanaScrollArea";

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

export { ArcanaAccordion } from "./ArcanaAccordion";
export type { ArcanaAccordionProps } from "./ArcanaAccordion";
export { ArcanaAccordionItem } from "./ArcanaAccordionItem";
export type { ArcanaAccordionItemProps } from "./ArcanaAccordionItem";

// ── React lote 2 ────────────────────────────────────────────────────────────

export { ArcanaSelect } from "./ArcanaSelect";
export type { ArcanaSelectProps, SelectOption } from "./ArcanaSelect";

export { ArcanaInputBoolean } from "./ArcanaInputBoolean";
export type { ArcanaInputBooleanProps } from "./ArcanaInputBoolean";

export { ArcanaNumberStepper } from "./ArcanaNumberStepper";
export type { ArcanaNumberStepperProps } from "./ArcanaNumberStepper";

export { ArcanaRadioIndicator } from "./ArcanaRadioIndicator";
export type { ArcanaRadioIndicatorProps } from "./ArcanaRadioIndicator";

export { ArcanaRadio } from "./ArcanaRadio";
export type { ArcanaRadioProps } from "./ArcanaRadio";

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

export { ArcanaContextMenu, ArcanaContextMenuItem } from "./ArcanaContextMenu";
export type {
    ArcanaContextMenuProps,
    ArcanaContextMenuItemProps,
} from "./ArcanaContextMenu";
export type {
    ArcanaContextMenuItemSpec,
    ArcanaContextMenuVariant,
} from "../core/context-menu";

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

export { ArcanaActionPanel } from "./ArcanaActionPanel";
export type { ArcanaActionPanelProps } from "./ArcanaActionPanel";

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

export { ArcanaQuickSearch } from "./ArcanaQuickSearch";
export type { ArcanaQuickSearchProps, ArcanaQuickSearchHandle } from "./ArcanaQuickSearch";
