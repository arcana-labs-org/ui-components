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
