import type { ReactNode } from "react";

/**
 * `<ArcanaWizardStep>` — React port. Um passo do `<ArcanaWizard>`.
 *
 * Equivalências Vue → React:
 * - `inject('wizardApi')` + `mounted`/`beforeUnmount` (registro dinâmico) → nada: o
 *   `<ArcanaWizard>` pai lê `title`/`description` direto de `props` via
 *   `React.Children` (ver header de `ArcanaWizard.tsx`) — sem registro/timing.
 * - `v-if="isActive"` no root → o próprio `<ArcanaWizard>` só renderiza o filho
 *   ativo (`childrenArray[value]`); este componente vira um holder puro de
 *   metadados (`title`/`description`) + conteúdo (`children`), sempre montado com
 *   `isActive === true` quando está de pé — não precisa checar contexto.
 * - slot default → `children`
 *
 * Props: `title` (obrigatório), `description` (opcional) — usados só como
 * metadados pelo `<ArcanaWizard>` pai pro cabeçalho do stepper. `children` é o
 * corpo do passo, renderizado em `.arcana-wizard-step`.
 */
export interface ArcanaWizardStepProps {
    title: string;
    description?: string;
    children?: ReactNode;
}

export function ArcanaWizardStep({ children }: ArcanaWizardStepProps) {
    return <div className="arcana-wizard-step">{children}</div>;
}
