/**
 * Helpers puros por trás de `<ArcanaWizard>`/`<ArcanaWizardStep>` em todos os ports.
 * Sem DOM, determinístico — a lógica de navegação vive aqui e é testada isolada;
 * os componentes só renderizam e disparam eventos.
 */
export type WizardStepStatus = "completed" | "active" | "pending";

/** Status de um passo `index` em relação ao passo atual `current` (0-based). */
export function stepStatus(index: number, current: number): WizardStepStatus {
  if (index < current) return "completed";
  if (index === current) return "active";
  return "pending";
}

/** Restringe `step` a `[0, total-1]` (e nunca negativo quando `total` é 0). */
export function clampStep(step: number, total: number): number {
  const max = Math.max(0, total - 1);
  if (step < 0) return 0;
  if (step > max) return max;
  return step;
}

/** Pode navegar direto pro passo `target`? Em modo linear só passos já alcançados. */
export function canNavigateTo(target: number, current: number, linear: boolean): boolean {
  if (!linear) return true;
  return target <= current;
}

/** Preenche `{current}` (1-based) e `{total}` no template do rodapé. */
export function formatStepLabel(tpl: string, current: number, total: number): string {
  return tpl.replace("{current}", String(current + 1)).replace("{total}", String(total));
}
