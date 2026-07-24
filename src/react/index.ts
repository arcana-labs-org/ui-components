// @arcanalabs/ui-components — React barrel (lote 1).
//
// Ports React dos SFCs Vue de mesmo nome. Cada componente emite o MESMO markup e as
// MESMAS classes shadcn do equivalente Vue, reusando o CSS compartilhado
// (`@arcanalabs/ui-components/styles.css`). Só a reatividade/eventos é re-implementada
// (props Vue → props React; `emit('update:modelValue')`/v-model → `value` +
// `onValueChange`; `emit('x')` → `onX`; slots → `children`/props ReactNode).

export { ShadcnButton } from "./ShadcnButton";
export type { ShadcnButtonProps, ShadcnButtonVariant } from "./ShadcnButton";

export { LabeledButton } from "./LabeledButton";
export type { LabeledButtonProps } from "./LabeledButton";

export { ShadcnBadge } from "./ShadcnBadge";
export type { ShadcnBadgeProps, ShadcnBadgeVariant } from "./ShadcnBadge";

export { ShadcnInput } from "./ShadcnInput";
export type { ShadcnInputProps } from "./ShadcnInput";

export { ShadcnCheckbox } from "./ShadcnCheckbox";
export type { ShadcnCheckboxProps } from "./ShadcnCheckbox";

export { ShadcnSwitch } from "./ShadcnSwitch";
export type { ShadcnSwitchProps } from "./ShadcnSwitch";

export { ShadcnSwitchRow } from "./ShadcnSwitchRow";
export type { ShadcnSwitchRowProps } from "./ShadcnSwitchRow";

export { ShadcnSwitchCard } from "./ShadcnSwitchCard";
export type { ShadcnSwitchCardProps } from "./ShadcnSwitchCard";

export { ShadcnSegmentedOptions } from "./ShadcnSegmentedOptions";
export type {
    ShadcnSegmentedOptionsProps,
    SegmentedOption,
} from "./ShadcnSegmentedOptions";

export { ShadcnSkeleton } from "./ShadcnSkeleton";
export type { ShadcnSkeletonProps } from "./ShadcnSkeleton";

export { ShadcnNotice } from "./ShadcnNotice";
export type { ShadcnNoticeProps, NoticeVariant } from "./ShadcnNotice";

export { ShadcnTabs } from "./ShadcnTabs";
export type {
    ShadcnTabsProps,
    ShadcnTabItem,
    ShadcnTabsVariant,
} from "./ShadcnTabs";

export { ShadcnAccordion, ShadcnAccordionItem } from "./ShadcnAccordion";
export type {
    ShadcnAccordionProps,
    ShadcnAccordionItemProps,
} from "./ShadcnAccordion";

// ── React lote 2 ────────────────────────────────────────────────────────────

export { ShadcnSelect } from "./ShadcnSelect";
export type { ShadcnSelectProps, SelectOption } from "./ShadcnSelect";

export { ShadcnInputBoolean } from "./ShadcnInputBoolean";
export type { ShadcnInputBooleanProps } from "./ShadcnInputBoolean";

export { ShadcnNumberStepper } from "./ShadcnNumberStepper";
export type { ShadcnNumberStepperProps } from "./ShadcnNumberStepper";

export { ShadcnRadioCardGroup } from "./ShadcnRadioCardGroup";
export type {
    ShadcnRadioCardGroupProps,
    RadioCardOption,
} from "./ShadcnRadioCardGroup";

export { ShadcnSwitchSegmented } from "./ShadcnSwitchSegmented";
export type { ShadcnSwitchSegmentedProps } from "./ShadcnSwitchSegmented";

export { MultiSelectPopover } from "./MultiSelectPopover";
export type {
    MultiSelectPopoverProps,
    MultiSelectTab,
    MultiSelectTriggerContext,
} from "./MultiSelectPopover";

export { ShadcnInputMask } from "./ShadcnInputMask";
export type { ShadcnInputMaskProps } from "./ShadcnInputMask";

export { InputCurrency } from "./InputCurrency";
export type { InputCurrencyProps } from "./InputCurrency";

export { ShadcnDatePicker } from "./ShadcnDatePicker";
export type { ShadcnDatePickerProps } from "./ShadcnDatePicker";

export { ShadcnTable } from "./ShadcnTable";
export type { ShadcnTableProps, ShadcnTableColumn } from "./ShadcnTable";

export { ShadcnSummaryTile } from "./ShadcnSummaryTile";
export type {
    ShadcnSummaryTileProps,
    SummaryTileTone,
} from "./ShadcnSummaryTile";

export { ShadcnSummaryTiles } from "./ShadcnSummaryTiles";
export type { ShadcnSummaryTilesProps } from "./ShadcnSummaryTiles";

export { ShadcnLoadingOverlay } from "./ShadcnLoadingOverlay";
export type { ShadcnLoadingOverlayProps } from "./ShadcnLoadingOverlay";
