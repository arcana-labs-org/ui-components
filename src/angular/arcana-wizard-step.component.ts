import {
  ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject
} from "@angular/core";
import { ArcanaWizardComponent } from "./arcana-wizard.component";

/**
 * `ArcanaWizardStepComponent` — Angular port do SFC Vue `ArcanaWizardStep`. Um passo do
 * `ArcanaWizardComponent`.
 *
 * Attribute selector "solto" (`[arcanaWizardStep]`, sem exigir `div`): o host é o próprio
 * elemento declarado pelo consumidor (ex.: `<div arcanaWizardStep title="…">`), projetado
 * dentro do `<ng-content>` (slot default/`__body`) do `ArcanaWizardComponent` pai. Esse host
 * fica SEMPRE no DOM (a projeção de conteúdo exige que ele exista, independente do passo
 * estar ativo); o `.arcana-wizard-step` interno — equivalente ao `v-if="isActive"` no root
 * do SFC Vue — é quem aparece/some via `@if` no template. Pequena diferença estrutural do
 * Vue (que não deixa nenhum wrapper quando inativo): aqui sobra um host "vazio" no DOM
 * enquanto o passo não está ativo — inevitável com `<ng-content>`, sem impacto visual
 * (sem `display`/tamanho próprio) nem nas classes/markup documentadas.
 *
 * Vue → Angular:
 * - `inject('wizardApi')` (provido pelo `<ArcanaWizard>` pai) → `inject(ArcanaWizardComponent)`
 *   (mesma técnica do `ArcanaAccordionItemComponent`/`ArcanaAccordionComponent`)
 * - `mounted()` → `ngOnInit()`: `register({ title, description })` devolve o índice do passo
 * - `beforeUnmount()` → `ngOnDestroy()`: `unregister(index)`
 * - slot default → `<ng-content>`, só renderizado quando `wizard.isActive(index)`
 *
 * O cabeçalho do stepper (título, indicador, connector) é responsabilidade exclusiva do
 * `ArcanaWizardComponent` pai, que lê `title`/`description` a partir do registro. Ver a doc
 * do pai pra ressalva sobre passos estáticos (sem adicionar/remover passos em runtime).
 *
 * Change detection Default (não OnPush): `wizard.isActive(index)` deriva do `value` do
 * `ArcanaWizardComponent` pai — quando o passo ativo muda, nenhum `@Input()` PRÓPRIO deste
 * componente muda (nem faz sentido chamar `markForCheck` em todos os passos manualmente),
 * então a CD Default garante que este passo seja reavaliado na mesma leva do pai. Mesmo
 * raciocínio do `ArcanaAccordionItemComponent` (`open` também deriva do pai).
 */
@Component({
  selector: "[arcanaWizardStep]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    @if (wizard.isActive(index)) {
      <div class="arcana-wizard-step">
        <ng-content></ng-content>
      </div>
    }
  `
})
export class ArcanaWizardStepComponent implements OnInit, OnDestroy {
  // Não-privado: referenciado direto do template (`wizard.isActive(index)`) — o compilador
  // Angular (`ngc`/`strictTemplates`) rejeita acesso a membro `private` do template.
  readonly wizard = inject(ArcanaWizardComponent);

  @Input({ required: true }) title!: string;
  @Input() description?: string;

  index = -1;

  ngOnInit(): void {
    this.index = this.wizard.register({ title: this.title, description: this.description });
  }

  ngOnDestroy(): void {
    this.wizard.unregister(this.index);
  }
}
