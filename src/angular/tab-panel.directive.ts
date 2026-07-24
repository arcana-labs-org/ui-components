import { Directive, Input, TemplateRef, inject } from "@angular/core";

/**
 * `ArcanaTabPanelDirective` — declara o conteúdo de um painel de `ArcanaTabs`, equivalente
 * a um slot nomeado do Vue (um por `tab.name`).
 *
 * Uso:
 *
 *     <div arcanaTabs [tabs]="tabs" [(value)]="active">
 *       <ng-container *arcanaTabPanel="'home'">…conteúdo…</ng-container>
 *       <ng-container *arcanaTabPanel="'orders'">…</ng-container>
 *     </div>
 *
 * O `ArcanaTabsComponent` consulta estes via `@ContentChildren` e renderiza o `TemplateRef`
 * da tab ativa (ou de todas as ativadas quando `keepAlive`).
 */
@Directive({
  selector: "[arcanaTabPanel]",
  standalone: true
})
export class ArcanaTabPanelDirective {
  @Input("arcanaTabPanel") name!: string | number;
  readonly templateRef = inject(TemplateRef);
}
