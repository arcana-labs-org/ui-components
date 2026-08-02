import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, inject
} from "@angular/core";
import { canNavigateTo, clampStep, formatStepLabel, stepStatus } from "../core/wizard";

export type ArcanaWizardValidate = (step: number) => boolean | string | Promise<boolean | string>;

/** Registro interno de um passo (título/descrição) — ver `register`/`unregister`. */
type WizardStepMeta = { title: string; description?: string };

/**
 * `ArcanaWizardComponent` — Angular port do SFC Vue `ArcanaWizard`. Shell de passos
 * (stepper + corpo + rodapé), pai do `ArcanaWizardStepComponent`. Fonte da verdade da
 * anatomia/classes: `src/vue/components/ArcanaWizard.vue` + `src/styles/parts/wizard.scss`.
 *
 * Attribute selector num `<div>` (`<div arcanaWizard>`): reproduz `.arcana-wizard`,
 * `__stepper`, `__step` (+ `is-active`/`is-completed`/`is-pending`, +`is-clickable`),
 * `__indicator` (número OU `__check` svg quando concluído), `__label` > `__title` +
 * `__description`, `__connector` (+`is-completed`), `__header-actions`, `__body`,
 * `__footer` > `__footer-text` + `__footer-actions` (botões `__btn` +
 * `--primary`/`--default`), idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `@Input() value` + `@Output() valueChange`
 * - `provide('wizardApi', …)` → DI de componente pai: `ArcanaWizardStepComponent` injeta
 *   esta instância via `inject(ArcanaWizardComponent)` (mesma técnica do
 *   `ArcanaAccordionItemComponent`/`ArcanaAccordionComponent`). `register`/`unregister`/
 *   `isActive` viram métodos públicos desta classe.
 * - slot `header-actions` → `<ng-content select="[arcanaWizardHeaderActions]">`
 * - slot `footer` (SCOPED no Vue: `step`/`total`/`isFirst`/`isLast`/`back`/`next`/`finish`/
 *   `cancel`) → **DEVIATION**: `<ng-content>` não suporta slots escopados (não há como
 *   passar dados do componente pra dentro do conteúdo projetado, ao contrário de
 *   `v-slot`/render props). Replicar isso exigiria `*ngTemplateOutlet` com um `TemplateRef`
 *   de `@Input()` (API bem diferente da dos outros ports). Nesta fase o rodapé Angular só
 *   renderiza os botões default (Cancel/Back/Continue/Finish) — sem customização — e
 *   `header-actions` (slot não-escopado) é projetado normalmente via `<ng-content select>`.
 * - `emit('next'|'back'|'cancel'|'finish')` → `@Output() next`/`back`/`cancel`/`finish`.
 *   Os métodos internos usam nomes distintos (`goNext`/`goBack`) porque um `@Output()` não
 *   pode compartilhar nome com um método na mesma classe — mesma solução do port do
 *   QuickSearch (`search()` → `emitSearch()`).
 *
 * Contrato de `validate(step)`: chamado (com `await`) antes de avançar via Continue.
 * Retorno `false` ou uma `string` BLOQUEIA o avanço (sem alerta automático — cabe ao
 * consumidor tratar o retorno). `true`/`undefined` libera o avanço, emite `next` e
 * atualiza `value`. No último passo, o botão vira "Finish" e emite `finish` (sem chamar
 * `validate`).
 *
 * Passos estáticos apenas: `ArcanaWizardStepComponent` se registra no `ngOnInit` (que roda
 * DEPOIS do primeiro `detectChanges` do pai — registro é assíncrono, igual ao `mounted` do
 * Vue) e se desregistra no `ngOnDestroy`. `unregister` NÃO reindexa — só marca a posição
 * como tombstone (`null`), pra que os índices já entregues a passos que continuam montados
 * sigam válidos (`activeSteps` filtra os tombstones). `register`/`unregister` chamam
 * `markForCheck()` porque o componente é `OnPush` e essas mutações não passam por um
 * `@Input()`. Adicionar/remover passos em runtime está fora do escopo (mesma ressalva do
 * Vue).
 */
@Component({
  selector: "div[arcanaWizard]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "class": "arcana-wizard"
  },
  template: `
    <div class="arcana-wizard__stepper">
      @for (s of activeSteps; track s.originalIndex; let idx = $index) {
        <div
          [class]="stepClass(s.originalIndex)"
          (click)="goToStepIfAllowed(s.originalIndex)"
        >
          <div class="arcana-wizard__indicator">
            @if (isCompleted(s.originalIndex)) {
              <svg
                class="arcana-wizard__check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            } @else {
              {{ s.originalIndex + 1 }}
            }
          </div>
          <div class="arcana-wizard__label">
            <div class="arcana-wizard__title">{{ s.title }}</div>
            @if (s.description) {
              <div class="arcana-wizard__description">{{ s.description }}</div>
            }
          </div>
        </div>
        @if (idx < activeSteps.length - 1) {
          <div class="arcana-wizard__connector" [class.is-completed]="s.originalIndex < value"></div>
        }
      }
      <div class="arcana-wizard__header-actions">
        <ng-content select="[arcanaWizardHeaderActions]"></ng-content>
      </div>
    </div>

    <div class="arcana-wizard__body">
      <ng-content></ng-content>
    </div>

    <div class="arcana-wizard__footer">
      <div class="arcana-wizard__footer-text">{{ footerText }}</div>
      <div class="arcana-wizard__footer-actions">
        @if (cancellable) {
          <button
            type="button"
            class="arcana-wizard__btn arcana-wizard__btn--default"
            (click)="emitCancel()"
          >{{ cancelLabel }}</button>
        }
        @if (value > 0) {
          <button
            type="button"
            class="arcana-wizard__btn arcana-wizard__btn--default"
            (click)="goBack()"
          >{{ backLabel }}</button>
        }
        @if (!isLast) {
          <button
            type="button"
            class="arcana-wizard__btn arcana-wizard__btn--primary"
            (click)="goNext()"
          >{{ continueLabel }}</button>
        } @else {
          <button
            type="button"
            class="arcana-wizard__btn arcana-wizard__btn--primary"
            [disabled]="finalDisabled"
            (click)="emitFinish()"
          >{{ finalLabel }}</button>
        }
      </div>
    </div>
  `
})
export class ArcanaWizardComponent {
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() value = 0;
  @Input() validate?: ArcanaWizardValidate;
  @Input() linear = true;
  @Input() cancellable = false;
  @Input() continueLabel = "Continue";
  @Input() backLabel = "Back";
  @Input() cancelLabel = "Cancel";
  @Input() finalLabel = "Finish";
  @Input() finalDisabled = false;
  @Input() stepLabel = "Step {current} of {total}";

  @Output() valueChange = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();
  @Output() back = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();
  @Output() finish = new EventEmitter<void>();

  // Tombstone-on-unregister (ver doc da classe): posições desregistradas viram `null`
  // em vez de removidas, pra não deslocar os índices já entregues aos passos montados.
  private steps: Array<WizardStepMeta | null> = [];

  get activeSteps(): Array<WizardStepMeta & { originalIndex: number }> {
    const out: Array<WizardStepMeta & { originalIndex: number }> = [];
    this.steps.forEach((step, originalIndex) => {
      if (step) out.push({ ...step, originalIndex });
    });
    return out;
  }

  get totalSteps(): number {
    return this.activeSteps.length;
  }

  get isLast(): boolean {
    // `totalSteps === 0` acontece por um instante entre o primeiro render do shell e o
    // `ngOnInit` dos passos (registro é assíncrono). Sem essa guarda, `0 >= -1` faria o
    // rodapé mostrar "Finish" antes do primeiro passo existir.
    return this.totalSteps > 0 && this.value >= this.totalSteps - 1;
  }

  get footerText(): string {
    return formatStepLabel(this.stepLabel, this.value, this.totalSteps);
  }

  isActive(index: number): boolean {
    return index === this.value;
  }

  isCompleted(i: number): boolean {
    return stepStatus(i, this.value) === "completed";
  }

  stepClass(i: number): string {
    return [
      "arcana-wizard__step",
      `is-${stepStatus(i, this.value)}`,
      canNavigateTo(i, this.value, this.linear) ? "is-clickable" : ""
    ].filter(Boolean).join(" ");
  }

  register(step: WizardStepMeta): number {
    this.steps.push(step);
    this.cdr.markForCheck();
    return this.steps.length - 1;
  }

  unregister(index: number): void {
    if (index >= 0 && index < this.steps.length) this.steps[index] = null;
    this.cdr.markForCheck();
  }

  goToStep(step: number): void {
    const s = clampStep(step, this.totalSteps);
    this.valueChange.emit(s);
  }

  goToStepIfAllowed(i: number): void {
    if (canNavigateTo(i, this.value, this.linear)) this.goToStep(i);
  }

  goBack(): void {
    this.back.emit(this.value);
    this.goToStep(this.value - 1);
  }

  async goNext(): Promise<void> {
    if (this.validate) {
      const result = await this.validate(this.value);
      if (result === false || typeof result === "string") return;
    }
    this.next.emit(this.value);
    this.goToStep(this.value + 1);
  }

  emitFinish(): void {
    this.finish.emit();
  }

  emitCancel(): void {
    this.cancel.emit();
  }
}
