import {
  ChangeDetectionStrategy, Component, Input
} from "@angular/core";

/**
 * `ShadcnSettingsListComponent` — Angular port do SFC Vue `ShadcnSettingsList`.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnSettingsList>`): container de lista de
 * configurações estilo iOS Settings (`.shadcn-settings-list`). Slot default → `<ng-content>`.
 */
@Component({
  selector: "div[arcanaShadcnSettingsList]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "class": "shadcn-settings-list" },
  template: `<ng-content></ng-content>`
})
export class ShadcnSettingsListComponent {}

/**
 * `ShadcnSettingsEditButtonComponent` — helper reutilizável (aditivo, replicado do port
 * React `ShadcnSettingsEditButton`). Botão "Alterar" (`.shadcn-settings-list__edit-btn`) com
 * ícone de lápis, pra usar no slot de ação de um `ShadcnSettingsListItem`.
 *
 * Attribute selector num `<button>` (`<button arcanaShadcnSettingsEditButton>`): o host É o
 * próprio `<button>` — o clique DOM nativo é a API de clique.
 */
@Component({
  selector: "button[arcanaShadcnSettingsEditButton]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "type": "button",
    "class": "shadcn-settings-list__edit-btn",
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
export class ShadcnSettingsEditButtonComponent {
  @Input() disabled = false;
  @Input() label = "Alterar";
  // O host É o próprio `<button>`: para reagir ao clique, use o `(click)` DOM nativo.
}
