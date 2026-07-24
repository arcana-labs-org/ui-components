// @arcanalabs/ui-components — Angular barrel (lote 1).
//
// Ports Angular (standalone, attribute selectors `arcana*`) dos SFCs Vue de mesmo nome.
// Cada componente é o PRÓPRIO elemento semântico (host = `<button>`/`<span>`/`<div>`/…) e
// emite o MESMO markup e as MESMAS classes shadcn do equivalente Vue/React, reusando o CSS
// compartilhado (`@arcanalabs/ui-components/styles.css`).
//
// v-model → `@Input() value` + `@Output() valueChange` (suporta `[(value)]`);
// `emit('x')` → `@Output() x`; slots → `<ng-content>` / `@Input` (string) / diretiva de template.

export { ShadcnButtonComponent } from "./shadcn-button.component";
export type { ShadcnButtonVariant } from "./shadcn-button.component";

export { LabeledButtonComponent } from "./labeled-button.component";

export { ShadcnBadgeComponent } from "./shadcn-badge.component";
export type { ShadcnBadgeVariant } from "./shadcn-badge.component";

export { ShadcnInputComponent } from "./shadcn-input.component";

export { ShadcnCheckboxComponent } from "./shadcn-checkbox.component";

export { ShadcnSwitchComponent } from "./shadcn-switch.component";

export { ShadcnSwitchRowComponent } from "./shadcn-switch-row.component";

export { ShadcnSwitchCardComponent } from "./shadcn-switch-card.component";

export { ShadcnSegmentedOptionsComponent } from "./shadcn-segmented-options.component";
export type { SegmentedOption } from "./shadcn-segmented-options.component";

export { ShadcnSkeletonComponent } from "./shadcn-skeleton.component";
export type { SkeletonRounded } from "./shadcn-skeleton.component";

export { ShadcnNoticeComponent } from "./shadcn-notice.component";
export type { NoticeVariant } from "./shadcn-notice.component";

export { ShadcnTabsComponent } from "./shadcn-tabs.component";
export type { ShadcnTabItem, ShadcnTabsVariant } from "./shadcn-tabs.component";
export { ArcanaTabPanelDirective } from "./tab-panel.directive";

export { ShadcnAccordionComponent } from "./shadcn-accordion.component";
export { ShadcnAccordionItemComponent } from "./shadcn-accordion-item.component";
