import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from "@angular/core";

/**
 * `ArcanaNoticeComponent` — Angular port do SFC Vue `ArcanaNotice`.
 *
 * Attribute selector num `<div>` (`<div arcanaNotice>`): banner com variants
 * semânticas. Reproduz `.arcana-notice` + `--${variant}` com `__icon`/`__content`/
 * `__title`/`__body` e o botão `__close` opcional, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot default → `<ng-content>`; slot `#icon` → `<ng-content select="[arcanaNoticeIcon]">`
 *   (fallback = ícone default da variant); slot `#title` → `@Input() title` (string) nesta fase.
 * - `emit('dismiss')` → `@Output() dismiss`.
 */
export type NoticeVariant = "info" | "blue" | "success" | "warning" | "pending" | "destructive";

const VARIANT_DEFAULT_ICONS: Record<NoticeVariant, string> = {
  info: "fa-solid fa-circle-info",
  blue: "fa-solid fa-circle-info",
  success: "fa-solid fa-circle-check",
  warning: "fa-solid fa-triangle-exclamation",
  pending: "fa-solid fa-clock",
  destructive: "fa-solid fa-circle-exclamation"
};

@Component({
  selector: "div[arcanaNotice]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "role": "status"
  },
  template: `
    @if (showIcon) {
      <span class="arcana-notice__icon" aria-hidden="true">
        <ng-content select="[arcanaNoticeIcon]"><i [class]="resolvedIcon"></i></ng-content>
      </span>
    }

    <div class="arcana-notice__content">
      @if (title) {
        <strong class="arcana-notice__title">{{ title }}</strong>
      }
      <div class="arcana-notice__body">
        <ng-content></ng-content>
      </div>
    </div>

    @if (dismissible) {
      <button
        type="button"
        class="arcana-notice__close"
        aria-label="Fechar"
        (click)="dismiss.emit()"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    }
  `
})
export class ArcanaNoticeComponent {
  @Input() variant: NoticeVariant = "info";
  @Input() title = "";
  @Input() icon = "";
  @Input() showIcon = true;
  @Input() dismissible = false;

  @Output() dismiss = new EventEmitter<void>();

  get rootClass(): string {
    return `arcana-notice arcana-notice--${this.variant}`;
  }

  get resolvedIcon(): string {
    return this.icon || VARIANT_DEFAULT_ICONS[this.variant];
  }
}
