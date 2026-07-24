import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges
} from "@angular/core";
import { mask as maskaMask, tokens as maskaTokens } from "maska";

/**
 * `ShadcnInputMaskComponent` — Angular port do SFC Vue `ShadcnInputMask`.
 *
 * Attribute selector num `<input>` (`<input arcanaShadcnInputMask>`): input mascarado
 * shadcn (`class="shadcn-input"` + `--${size}`/`--disabled`), idêntico ao Vue/React.
 *
 * Decisão sobre a máscara (mesma do React — sem deps novas):
 * - O SFC usa a diretiva Vue `v-maska`, inexistente no Angular. Reusamos as funções CORE
 *   da `maska` (`mask`/`tokens`), agnósticas de framework:
 *   - display formatado   = `mask(raw, maskStr, tokens)`          (masked = true)
 *   - raw sem separadores  = `mask(raw, maskStr, tokens, false)`  (masked = false)
 *   Assim o valor EMITIDO é o mesmo raw do SFC (sem pontos/traços).
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange` (sempre o raw)
 * - `emit('blur'|'focus')` → eventos nativos do próprio `<input>` host
 * - watch(modelValue) → `ngOnChanges` re-aplica a máscara em mudança externa
 */
@Component({
  selector: "input[arcanaShadcnInputMask]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[value]": "tempValue",
    "[attr.placeholder]": "placeholder || null",
    "[disabled]": "disabled",
    "[attr.readonly]": "readonly ? '' : null",
    "[attr.name]": "name ?? null",
    "(input)": "onInput($event)"
  },
  template: ""
})
export class ShadcnInputMaskComponent implements OnChanges {
  @Input() value: string | number | null = "";
  @Input() mask: string | string[] = "";
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() name?: string;
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() className = "";

  @Output() valueChange = new EventEmitter<string>();

  tempValue = "";

  private get maskStr(): string {
    return Array.isArray(this.mask) ? JSON.stringify(this.mask) : this.mask;
  }

  get rootClass(): string {
    return [
      "shadcn-input",
      `shadcn-input--${this.size}`,
      this.disabled ? "shadcn-input--disabled" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"] || changes["mask"]) {
      const incoming = this.value == null ? "" : String(this.value);
      const currentRaw = this.tempValue
        ? maskaMask(this.tempValue, this.maskStr, maskaTokens, false)
        : "";
      if (incoming !== currentRaw) {
        this.tempValue = incoming ? maskaMask(incoming, this.maskStr, maskaTokens) : "";
      }
    }
  }

  onInput(ev: Event): void {
    const typed = (ev.target as HTMLInputElement).value;
    this.tempValue = maskaMask(typed, this.maskStr, maskaTokens);
    const raw = maskaMask(typed, this.maskStr, maskaTokens, false);
    this.valueChange.emit(raw);
  }
}
