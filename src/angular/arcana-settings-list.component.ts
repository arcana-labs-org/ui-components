import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ArcanaSettingsListComponent` — Angular port do SFC Vue `ArcanaSettingsList`.
 *
 * Attribute selector num `<div>` (`<div arcanaSettingsList>`): container de lista de
 * configurações estilo iOS Settings (`.arcana-settings-list`). Slot default → `<ng-content>`.
 */
@Component({
  selector: "div[arcanaSettingsList]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "class": "arcana-settings-list" },
  template: `<ng-content></ng-content>`
})
export class ArcanaSettingsListComponent {}

/**
 * `ArcanaSettingsEditButtonComponent` — helper reutilizável (aditivo, replicado do port
 * React `ArcanaSettingsEditButton`). Botão "Alterar" (`.arcana-settings-list__edit-btn`) com
 * ícone de lápis, pra usar no slot de ação de um `ArcanaSettingsListItem`.
 *
 * Attribute selector num `<button>` (`<button arcanaSettingsEditButton>`): o host É o
 * próprio `<button>` — o clique DOM nativo é a API de clique.
 */
@Component({
  selector: "button[arcanaSettingsEditButton]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "type": "button",
    "class": "arcana-settings-list__edit-btn",
    "[disabled]": "disabled"
  },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
    {{ label }}
  `
})
export class ArcanaSettingsEditButtonComponent {
  @Input() disabled = false;
  @Input() label = "Alterar";
  // O host É o próprio `<button>`: para reagir ao clique, use o `(click)` DOM nativo.
}
