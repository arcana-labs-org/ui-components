import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from "@angular/core";
import { ShadcnOnboardingPanelComponent } from "./shadcn-onboarding-panel.component";

/**
 * `SparkGridEmptyStateComponent` — Angular port do SFC Vue `SparkGridEmptyState`.
 *
 * Attribute selector num `<div>` (`<div arcanaSparkGridEmptyState>`): mostra o
 * `<ShadcnOnboardingPanel>` só quando a grid terminou de carregar E está genuinamente vazia
 * (sem filtro). Reproduz `.spark-grid-empty-state`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - `watch(loading)` que arma `loaded` no 1º flip `true → false` → `ngOnChanges`.
 * - `computed(showPanel)` → getter; `emit('panel-visible')` → `@Output() panelVisible`
 *   (dispara no mount também, espelhando `{ immediate: true }`).
 * - `emit('action')` / `emit('secondary-action')` → `@Output() action` / `secondaryAction`.
 * - slot default (conteúdo real quando NÃO vazio) → `<ng-content>`.
 */
@Component({
  selector: "div[arcanaSparkGridEmptyState]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShadcnOnboardingPanelComponent],
  host: { "class": "spark-grid-empty-state" },
  template: `
    <div [style.display]="showPanel ? 'none' : null">
      <ng-content></ng-content>
    </div>
    @if (showPanel) {
      <div
        arcanaShadcnOnboardingPanel
        [icon]="icon"
        [title]="title"
        [description]="description"
        [actionLabel]="actionLabel"
        [secondaryActionLabel]="secondaryActionLabel"
        [secondaryActionIcon]="secondaryActionIcon"
        [subHint]="subHint"
        (action)="action.emit()"
        (secondaryAction)="secondaryAction.emit()"
      ></div>
    }
  `
})
export class SparkGridEmptyStateComponent implements OnChanges, OnInit {
  @Input({ required: true }) total!: number;
  @Input({ required: true }) loading!: boolean;
  @Input({ required: true }) filtered!: boolean;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input() description = "";
  @Input({ required: true }) actionLabel!: string;
  @Input() secondaryActionLabel = "";
  @Input() secondaryActionIcon = "";
  @Input() subHint = "";

  @Output() action = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();
  @Output() panelVisible = new EventEmitter<boolean>();

  private loaded = false;
  private lastEmitted: boolean | null = null;

  get showPanel(): boolean {
    return this.loaded && !this.loading && this.total === 0 && !this.filtered;
  }

  ngOnInit(): void {
    this.emitPanelVisible();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const l = changes["loading"];
    if (l && l.previousValue === true && l.currentValue === false) {
      this.loaded = true;
    }
    this.emitPanelVisible();
  }

  private emitPanelVisible(): void {
    const visible = this.showPanel;
    if (this.lastEmitted !== visible) {
      this.lastEmitted = visible;
      // Deferido pra fora do ciclo de CD atual: emitir um Output síncrono durante
      // `ngOnChanges`/`ngOnInit` dispara ExpressionChangedAfterItHasBeenChecked no
      // dev-mode se um handler do pai reagir. `queueMicrotask` desacopla a notificação.
      queueMicrotask(() => this.panelVisible.emit(visible));
    }
  }
}
