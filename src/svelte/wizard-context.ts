/**
 * Contexto compartilhado entre `<ArcanaWizard>` e `<ArcanaWizardStep>`.
 *
 * Fica num módulo à parte (e não no `<script module>` do pai, como no
 * `ArcanaAccordion`) porque o pai pode vir a importar o filho (mesma razão do
 * `ArcanaContextMenu`/`context-menu-context.ts`) — evita import circular pai ↔ filho.
 */

/** Registro interno de um passo (título/descrição) — ver `register`/`unregister`. */
export interface WizardStepMeta {
  title: string;
  description?: string;
}

export interface WizardContextValue {
  /** Registra um passo (chamado pelo `<ArcanaWizardStep>` no mount) — devolve seu índice. */
  register: (step: WizardStepMeta) => number;
  /** Desregistra o passo `index` (chamado no unmount). Tombstone: não reindexa os demais. */
  unregister: (index: number) => void;
  /** O passo `index` é o ativo agora? */
  isActive: (index: number) => boolean;
  /** Índice do passo ativo (= `value` do `<ArcanaWizard>`). */
  current: () => number;
}

export const WIZARD_CONTEXT = Symbol("arcana-wizard");
