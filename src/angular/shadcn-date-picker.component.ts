import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output,
  SimpleChanges, ViewChild
} from "@angular/core";
import { mask as maskaMask, tokens as maskaTokens } from "maska";
import { DateFormatter } from "../core/date";

/**
 * `ShadcnDatePickerComponent` — Angular port do SFC Vue `ShadcnDatePicker`.
 *
 * Attribute selector num `<div>` (`<div arcanaShadcnDatePicker>`): input de data shadcn
 * com máscara `DD/MM/AAAA`.
 *
 * Decisão sobre o calendário (mesma do React — sem deps novas):
 * - O SFC usa `<el-date-picker>` (Element Plus) só como popover do calendário. No Angular
 *   NÃO temos Element Plus. O calendário é provido pelo date picker NATIVO do browser: um
 *   `<input type="date">` escondido no `__picker-anchor`, aberto pelo botão via `showPicker()`
 *   (fallback focus+click). Digitação mascarada + emissão de `YYYY-MM-DD` IDÊNTICAS ao SFC;
 *   só o visual do calendário difere (nativo).
 * - `type="date"` (default) usa esse composite. Outros types caem num `<input>` nativo do
 *   tipo aproximado (ranges nativos não existem → usa `date`).
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange`; `emit('change')` → `@Output() change`
 * - watch(modelValue) → `ngOnChanges`
 */
const DATE_MASK = "##/##/####";

@Component({
  selector: "div[arcanaShadcnDatePicker]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "rootClass" },
  template: `
    @if (isComposite) {
      <div class="shadcn-date-picker__box">
        <div class="shadcn-date-picker__picker-anchor" aria-hidden="true">
          <input
            #native
            type="date"
            [value]="stringValue"
            [disabled]="disabled"
            tabindex="-1"
            (change)="onNativeChange($event)"
          />
        </div>

        <input
          class="shadcn-date-picker__text"
          inputmode="numeric"
          [value]="displayText"
          placeholder="__/__/____"
          [disabled]="disabled"
          (input)="onTextInput($event)"
          (blur)="onTextBlur($event)"
          (focus)="focus.emit($event)"
        />

        <button
          type="button"
          class="shadcn-date-picker__icon-btn"
          [disabled]="disabled"
          aria-label="Abrir calendário"
          (click)="openPicker()"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </div>
    } @else {
      <input
        class="shadcn-date-picker__text"
        [type]="nativeType"
        [value]="stringValue"
        [placeholder]="placeholder"
        [disabled]="disabled"
        (change)="onNativeChange($event)"
        (blur)="blur.emit($event)"
        (focus)="focus.emit($event)"
      />
    }
  `
})
export class ShadcnDatePickerComponent implements OnChanges {
  @ViewChild("native") nativeRef?: ElementRef<HTMLInputElement>;

  @Input() value: string | string[] | null = null;
  @Input() type = "date";
  @Input() disabled = false;
  @Input() clearable = true;
  @Input() editable = true;
  @Input() placeholder = "";
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() className = "";

  @Output() valueChange = new EventEmitter<string | null>();
  @Output() change = new EventEmitter<string | null>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() focus = new EventEmitter<FocusEvent>();

  displayText = "";
  private lastEmitted: string | null = null;

  get isComposite(): boolean {
    return this.type === "date";
  }

  get stringValue(): string {
    return typeof this.value === "string" ? this.value : "";
  }

  get nativeType(): string {
    if (this.type === "month" || this.type === "monthrange") return "month";
    if (this.type === "year" || this.type === "yearrange") return "number";
    return "date";
  }

  get rootClass(): string {
    return [
      "shadcn-date-picker",
      this.disabled ? "is-disabled" : "",
      `shadcn-date-picker--${this.size}`,
      this.className
    ].filter(Boolean).join(" ");
  }

  private toDisplay(ymd: string): string {
    return DateFormatter.fromDate(ymd) ?? "";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"] && this.isComposite) {
      const v = typeof this.value === "string" ? this.value : null;
      if (v !== this.lastEmitted) {
        this.lastEmitted = v;
        this.displayText = v ? this.toDisplay(v) : "";
      }
    }
  }

  private rawToYmd(raw: string): string | undefined {
    if (raw.length !== 8) return undefined;
    const d = raw.slice(0, 2), m = raw.slice(2, 4), y = raw.slice(4, 8);
    const dd = Number(d), mm = Number(m), yyyy = Number(y);
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31 || yyyy < 1900) return undefined;
    const dt = new Date(yyyy, mm - 1, dd);
    if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) return undefined;
    return `${y}-${m}-${d}`;
  }

  private emitValue(ymd: string | null): void {
    this.lastEmitted = ymd;
    this.valueChange.emit(ymd);
    this.change.emit(ymd);
  }

  onTextInput(e: Event): void {
    const typed = (e.target as HTMLInputElement).value;
    this.displayText = maskaMask(typed, DATE_MASK, maskaTokens);
    const raw = maskaMask(typed, DATE_MASK, maskaTokens, false);
    if (raw.length === 0) {
      this.emitValue(null);
      return;
    }
    if (raw.length === 8) {
      const ymd = this.rawToYmd(raw);
      if (ymd) this.emitValue(ymd);
    }
  }

  onTextBlur(event: FocusEvent): void {
    this.blur.emit(event);
    const raw = (this.displayText ?? "").replace(/\D/g, "");
    if (raw.length !== 8 || !this.rawToYmd(raw)) {
      this.displayText = typeof this.value === "string" && this.value ? this.toDisplay(this.value) : "";
    }
  }

  onNativeChange(e: Event): void {
    this.emitValue((e.target as HTMLInputElement).value || null);
  }

  openPicker(): void {
    if (this.disabled) return;
    const el = this.nativeRef?.nativeElement;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch {
        /* alguns browsers exigem interação; cai no fallback */
      }
    }
    el.focus();
    el.click();
  }
}
