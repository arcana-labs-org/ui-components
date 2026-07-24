import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef,
  EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef, inject
} from "@angular/core";
import {
  addMonths, decadeGrid, formatDateTime, formatYear, formatYm, formatYmd,
  isBetweenYmd, monthGrid, parseDateTime, parseYear, parseYm, parseYmd, sortRange,
  toDisplayDate, toDisplayDateTime, toDisplayMonth, type CalendarDay
} from "../core/calendar";
import {
  calendarMonthLabels, calendarMonthLabelsShort, calendarWeekdayLabels,
  resolveCalendarMessages, type CalendarMessages
} from "../core/calendar-locale";
import { placePanel } from "../core/popover";

/**
 * `ArcanaDatePickerComponent` — Angular port do SFC Vue `ArcanaDatePicker`.
 *
 * Attribute selector num `<div>` (`<div arcanaDatePicker>`): input de data com um
 * calendário PRÓPRIO, auto-contido e SEM Element Plus. O calendário é desenhado à
 * mão (grid 6×7 Sunday-first) num painel TELEPORTADO pro `<body>` (via
 * `EmbeddedViewRef`, mesma ideia do `ArcanaSelect`), posicionado por `placePanel` e
 * fechado em click-fora / Escape / scroll / resize. Toda a matemática de datas vem
 * de `core/calendar.ts` e a localização (meses/dias/textos) de `core/calendar-locale.ts`.
 * Emite o MESMO markup e as MESMAS classes `arcana-cal__*` do equivalente Vue/React.
 *
 * Cinco modos via input `type`, cada um com um formato de valor canônico:
 * - `date`      (default) → string `'YYYY-MM-DD'`  — 1 painel de dias.
 * - `month`               → string `'YYYY-MM'`     — grid 4×3 de meses.
 * - `year`                → string `'YYYY'`        — grid de 12 anos (década).
 * - `daterange`           → `['YYYY-MM-DD','YYYY-MM-DD']` — 2 painéis + range.
 * - `datetime`            → string `'YYYY-MM-DD HH:mm'` — dias + hora + Confirmar.
 *
 * Vue → Angular:
 * - `modelValue` (v-model) → `value` + `@Output() valueChange` (suporta `[(value)]`);
 * - `emit('change')` → `@Output() change`.
 */
type PickerType = "date" | "month" | "year" | "daterange" | "datetime";
type PickerValue = string | string[] | null;

const PANEL_ESTIMATE: Record<PickerType, { width: number; height: number }> = {
  date: { width: 252, height: 300 },
  month: { width: 252, height: 210 },
  year: { width: 252, height: 210 },
  daterange: { width: 520, height: 300 },
  datetime: { width: 252, height: 348 }
};

@Component({
  selector: "div[arcanaDatePicker]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "rootClass" },
  template: `
    <button
      #trigger
      type="button"
      class="arcana-cal__input"
      [class.arcana-cal__input--open]="isOpen"
      [class.arcana-cal__input--has-clear]="canClear()"
      [disabled]="disabled"
      aria-haspopup="dialog"
      [attr.aria-expanded]="isOpen"
      [attr.aria-label]="ariaLabel"
      (click)="isOpen ? close() : open()"
    >
      <svg class="arcana-cal__input-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      <span class="arcana-cal__input-label" [class.arcana-cal__input-label--placeholder]="!hasValue()">{{ displayLabel() }}</span>
      @if (canClear()) {
        <span class="arcana-cal__clear" role="button" tabindex="-1" [attr.aria-label]="msg().clear" (click)="clear($event)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </span>
      }
    </button>

    <ng-template #panelTpl>
      <div
        #panel
        class="arcana-cal__panel"
        [class.arcana-cal__panel--range]="isRange"
        [style]="panelStyle"
        role="dialog"
        [attr.aria-label]="ariaLabel"
        tabindex="-1"
        (keydown)="onPanelKeydown($event)"
      >
        <div class="arcana-cal__panels">
          @if (type === "month") {
            <!-- MONTH: 4×3 grid, navega por ano -->
            <div class="arcana-cal__month-panel">
              <div class="arcana-cal__header">
                <button type="button" class="arcana-cal__nav" [attr.aria-label]="msg().prevYear" (click)="navYears(-1)">«</button>
                <span class="arcana-cal__title">{{ view.year }}</span>
                <button type="button" class="arcana-cal__nav" [attr.aria-label]="msg().nextYear" (click)="navYears(1)">»</button>
              </div>
              <div class="arcana-cal__months">
                @for (label of monthLabelsShort(); track label) {
                  <button type="button" [class]="monthClasses($index + 1)" (click)="pickMonth($index + 1)">{{ label }}</button>
                }
              </div>
            </div>
          } @else if (type === "year") {
            <!-- YEAR: grid de 12 anos (década), navega por década -->
            <div class="arcana-cal__month-panel">
              <div class="arcana-cal__header">
                <button type="button" class="arcana-cal__nav" [attr.aria-label]="msg().prevDecade" (click)="navYears(-10)">«</button>
                <span class="arcana-cal__title">{{ decadeTitle() }}</span>
                <button type="button" class="arcana-cal__nav" [attr.aria-label]="msg().nextDecade" (click)="navYears(10)">»</button>
              </div>
              <div class="arcana-cal__years">
                @for (year of decadeCells(); track year) {
                  <button type="button" [class]="yearClasses(year)" (click)="pickYear(year)">{{ year }}</button>
                }
              </div>
            </div>
          } @else {
            <!-- DATE / DATERANGE / DATETIME: painel(is) de dias -->
            @for (offset of dayPanels(); track offset) {
              <div class="arcana-cal__month-panel">
                <div class="arcana-cal__header">
                  @if (!isRange || offset === 0) {
                    <button type="button" class="arcana-cal__nav" [attr.aria-label]="msg().prevYear" (click)="navMonths(-12)">«</button>
                    <button type="button" class="arcana-cal__nav" [attr.aria-label]="msg().prevMonth" (click)="navMonths(-1)">‹</button>
                  } @else {
                    <span class="arcana-cal__nav-spacer"></span>
                  }
                  <span class="arcana-cal__title">{{ panelTitle(offset) }}</span>
                  @if (!isRange || offset === 1) {
                    <button type="button" class="arcana-cal__nav" [attr.aria-label]="msg().nextMonth" (click)="navMonths(1)">›</button>
                    <button type="button" class="arcana-cal__nav" [attr.aria-label]="msg().nextYear" (click)="navMonths(12)">»</button>
                  } @else {
                    <span class="arcana-cal__nav-spacer"></span>
                  }
                </div>
                <div class="arcana-cal__weekdays">
                  @for (label of weekdayLabels(); track $index) {
                    <span class="arcana-cal__weekday">{{ label }}</span>
                  }
                </div>
                <div class="arcana-cal__grid">
                  @for (cell of panelCells(offset); track cell.ymd) {
                    <button
                      type="button"
                      [class]="dayClasses(cell)"
                      [attr.aria-label]="dayLabel(cell)"
                      (mouseenter)="onDayHover(cell)"
                      (click)="pickDay(cell.ymd)"
                    >{{ cell.day }}</button>
                  }
                </div>

                @if (type === "datetime") {
                  <!-- DATETIME: linha de tempo + Confirmar -->
                  <div class="arcana-cal__time">
                    <span class="arcana-cal__time-label">{{ msg().time }}</span>
                    <input type="number" class="arcana-cal__time-input" min="0" max="23" [value]="dtHour" aria-label="HH" (input)="onHourInput($event)" />
                    <span class="arcana-cal__time-sep">:</span>
                    <input type="number" class="arcana-cal__time-input" min="0" max="59" [value]="dtMinute" aria-label="mm" (input)="onMinuteInput($event)" />
                    <button type="button" class="arcana-cal__confirm" (click)="confirmDateTime()">{{ msg().confirm }}</button>
                  </div>
                }
              </div>
            }
          }
        </div>
      </div>
    </ng-template>
  `
})
export class ArcanaDatePickerComponent implements OnDestroy {
  @Input() type: PickerType = "date";
  @Input() value: PickerValue = null;
  @Input() disabled = false;
  @Input() placeholder?: string;
  @Input() clearable = true;
  @Input() ariaLabel?: string;
  @Input() size: "sm" | "md" | "lg" = "md";
  /** Locale BCP-47 dos nomes de meses/dias (via Intl). Default `'pt-BR'`. */
  @Input() locale = "pt-BR";
  /** Override parcial dos textos do calendário (clear, nav, confirmar, placeholders). */
  @Input() messages?: Partial<CalendarMessages>;

  @Output() valueChange = new EventEmitter<PickerValue>();
  @Output() change = new EventEmitter<PickerValue>();

  @ViewChild("trigger") triggerRef?: ElementRef<HTMLButtonElement>;
  @ViewChild("panelTpl") panelTpl?: TemplateRef<unknown>;

  isOpen = false;
  panelStyle = "";
  view = { year: 2000, month: 1 };
  pendingStart: string | null = null;
  hoverYmd: string | null = null;
  todayYmd = "";
  /** datetime: dia selecionado (ainda não confirmado) + hora/minuto pendentes. */
  dtDay: string | null = null;
  dtHour = 0;
  dtMinute = 0;

  private readonly vcr = inject(ViewContainerRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private embeddedView?: EmbeddedViewRef<unknown>;
  private panelEl?: HTMLElement;
  private removeListeners: (() => void) | null = null;

  get isRange(): boolean {
    return this.type === "daterange";
  }

  get rootClass(): string {
    return ["arcana-cal", `arcana-cal--${this.size}`, this.disabled ? "arcana-cal--disabled" : ""].filter(Boolean).join(" ");
  }

  msg(): CalendarMessages {
    return resolveCalendarMessages(this.messages);
  }

  monthLabels(): readonly string[] {
    return calendarMonthLabels(this.locale);
  }

  monthLabelsShort(): readonly string[] {
    return calendarMonthLabelsShort(this.locale);
  }

  weekdayLabels(): readonly string[] {
    return calendarWeekdayLabels(this.locale);
  }

  rangeValue(): [string, string] {
    if (!this.isRange) return ["", ""];
    const pair = Array.isArray(this.value) ? this.value : ["", ""];
    return [String(pair[0] ?? ""), String(pair[1] ?? "")];
  }

  singleValue(): string {
    return this.isRange ? "" : String(this.value ?? "");
  }

  hasValue(): boolean {
    const range = this.rangeValue();
    return this.isRange ? Boolean(range[0] || range[1]) : this.singleValue() !== "";
  }

  canClear(): boolean {
    return this.clearable && !this.disabled && this.hasValue();
  }

  placeholderText(): string {
    if (this.placeholder) return this.placeholder;
    switch (this.type) {
      case "month": return this.msg().monthPlaceholder;
      case "year": return this.msg().yearPlaceholder;
      case "daterange": return this.msg().rangePlaceholder;
      case "datetime": return this.msg().datetimePlaceholder;
      default: return this.msg().datePlaceholder;
    }
  }

  displayLabel(): string {
    if (this.isRange) {
      const range = this.rangeValue();
      if (!this.hasValue()) return this.placeholderText();
      return `${toDisplayDate(range[0]) || "…"} → ${toDisplayDate(range[1]) || "…"}`;
    }
    switch (this.type) {
      case "month": return toDisplayMonth(this.singleValue()) || this.placeholderText();
      case "year": {
        const year = parseYear(this.singleValue());
        return year != null ? formatYear(year) : this.placeholderText();
      }
      case "datetime": return toDisplayDateTime(this.singleValue()) || this.placeholderText();
      default: return toDisplayDate(this.singleValue()) || this.placeholderText();
    }
  }

  /* ─────────────────────────── placement / lifecycle ─────────────────────── */

  private reposition(): void {
    const trigger = this.triggerRef?.nativeElement;
    const panel = this.panelEl;
    if (!trigger || !panel) return;
    const rect = trigger.getBoundingClientRect();
    const estimate = PANEL_ESTIMATE[this.type];
    const place = placePanel(rect,
      { width: panel.offsetWidth || estimate.width, height: panel.offsetHeight || estimate.height },
      { width: window.innerWidth, height: window.innerHeight }, {});
    this.panelStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px`;
    this.embeddedView?.detectChanges();
  }

  open(): void {
    if (this.disabled || this.isOpen || !this.panelTpl) return;
    const now = new Date();
    this.todayYmd = formatYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());

    // Anchor the initial view on the current value (per mode) or on today.
    let anchor: { year: number; month: number } | null = null;
    if (this.isRange) anchor = parseYmd(this.rangeValue()[0]);
    else if (this.type === "month") anchor = parseYm(this.singleValue());
    else if (this.type === "year") { const y = parseYear(this.singleValue()); anchor = y != null ? { year: y, month: 1 } : null; }
    else if (this.type === "datetime") { const dt = parseDateTime(this.singleValue()); anchor = dt ? { year: dt.year, month: dt.month } : null; }
    else anchor = parseYmd(this.singleValue());
    this.view = anchor ? { year: anchor.year, month: anchor.month } : { year: now.getFullYear(), month: now.getMonth() + 1 };

    this.pendingStart = null;
    this.hoverYmd = null;

    // datetime: seed the pending day + time from the current value, else today/00:00.
    if (this.type === "datetime") {
      const dt = parseDateTime(this.singleValue());
      this.dtDay = dt ? formatYmd(dt.year, dt.month, dt.day) : this.todayYmd;
      this.dtHour = dt ? dt.hour : 0;
      this.dtMinute = dt ? dt.minute : 0;
    }

    const rect = this.triggerRef?.nativeElement?.getBoundingClientRect();
    if (rect) {
      const place = placePanel(rect, PANEL_ESTIMATE[this.type], { width: window.innerWidth, height: window.innerHeight }, {});
      this.panelStyle = `position: fixed; left: ${place.left}px; top: ${place.top}px`;
    }

    this.isOpen = true;
    this.embeddedView = this.vcr.createEmbeddedView(this.panelTpl);
    this.embeddedView.detectChanges();
    this.panelEl = this.embeddedView.rootNodes[0] as HTMLElement;
    document.body.appendChild(this.panelEl);
    this.attachListeners();

    requestAnimationFrame(() => {
      this.reposition();
      this.panelEl?.focus({ preventScroll: true });
      this.cdr.markForCheck();
    });
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.pendingStart = null;
    this.hoverYmd = null;
    this.detachListeners();
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
    this.panelEl = undefined;
    this.triggerRef?.nativeElement.focus({ preventScroll: true });
    this.cdr.markForCheck();
  }

  private attachListeners(): void {
    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (this.triggerRef?.nativeElement.contains(target) || this.panelEl?.contains(target)) return;
      this.close();
    };
    const onScroll = (event: Event) => {
      if (event.target instanceof Node && this.panelEl?.contains(event.target)) return;
      this.close();
    };
    const onResize = () => { this.reposition(); };
    const onDocKeydown = (event: KeyboardEvent) => { if (event.key === "Escape") this.close(); };
    document.addEventListener("mousedown", onMouseDown, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onDocKeydown);
    this.removeListeners = () => {
      document.removeEventListener("mousedown", onMouseDown, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onDocKeydown);
    };
  }

  private detachListeners(): void {
    this.removeListeners?.();
    this.removeListeners = null;
  }

  ngOnDestroy(): void {
    this.detachListeners();
    this.embeddedView?.destroy();
  }

  private emitValue(value: PickerValue): void {
    this.valueChange.emit(value);
    this.change.emit(value);
  }

  clear(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disabled) return;
    this.emitValue(this.isRange ? ["", ""] : "");
  }

  /* ───────────────────────────── navigation ─────────────────────────────── */

  navMonths(delta: number): void {
    this.view = addMonths(this.view.year, this.view.month, delta);
  }

  navYears(delta: number): void {
    this.view = { year: this.view.year + delta, month: this.view.month };
  }

  dayPanels(): number[] {
    return this.isRange ? [0, 1] : (this.type === "date" || this.type === "datetime") ? [0] : [];
  }

  panelTitle(offset: number): string {
    const month = addMonths(this.view.year, this.view.month, offset);
    return `${this.monthLabels()[month.month - 1]} ${month.year}`;
  }

  panelCells(offset: number): CalendarDay[] {
    const month = addMonths(this.view.year, this.view.month, offset);
    return monthGrid(month.year, month.month);
  }

  dayLabel(cell: CalendarDay): string {
    return toDisplayDate(cell.ymd);
  }

  private decadeStart(): number {
    return Math.floor(this.view.year / 10) * 10;
  }

  decadeCells(): number[] {
    return decadeGrid(this.view.year);
  }

  decadeTitle(): string {
    const start = this.decadeStart();
    return `${start} - ${start + 9}`;
  }

  /* ───────────────────────────── selection ──────────────────────────────── */

  pickDay(ymd: string): void {
    if (this.type === "date") { this.emitValue(ymd); this.close(); return; }
    if (this.type === "datetime") { this.dtDay = ymd; return; }
    // daterange
    if (!this.pendingStart) { this.pendingStart = ymd; this.hoverYmd = null; return; }
    this.emitValue(sortRange(this.pendingStart, ymd));
    this.close();
  }

  pickMonth(month: number): void {
    this.emitValue(formatYm(this.view.year, month));
    this.close();
  }

  pickYear(year: number): void {
    this.emitValue(formatYear(year));
    this.close();
  }

  private clampInt(value: number, min: number, max: number): number {
    return Number.isFinite(value) ? Math.min(max, Math.max(min, Math.trunc(value))) : min;
  }

  onHourInput(event: Event): void {
    this.dtHour = this.clampInt(Number((event.target as HTMLInputElement).value), 0, 23);
  }

  onMinuteInput(event: Event): void {
    this.dtMinute = this.clampInt(Number((event.target as HTMLInputElement).value), 0, 59);
  }

  confirmDateTime(): void {
    const day = parseYmd(this.dtDay ?? this.todayYmd) ?? parseYmd(this.todayYmd);
    if (!day) return;
    this.emitValue(formatDateTime(day.year, day.month, day.day, this.dtHour, this.dtMinute));
    this.close();
  }

  /* ───────────────────────────── highlighting ───────────────────────────── */

  // Range: while picking, preview from the anchored start to the hovered day;
  // otherwise show the committed value.
  private highlightRange(): [string, string] | null {
    if (!this.isRange) return null;
    if (this.pendingStart) return this.hoverYmd ? sortRange(this.pendingStart, this.hoverYmd) : [this.pendingStart, this.pendingStart];
    const range = this.rangeValue();
    return parseYmd(range[0]) && parseYmd(range[1]) ? [range[0], range[1]] : null;
  }

  dayClasses(cell: CalendarDay): string {
    const range = this.highlightRange();
    const inHighlight = Boolean(range && cell.inMonth && isBetweenYmd(cell.ymd, range[0], range[1]));
    const isEdge = Boolean(range && cell.inMonth && (cell.ymd === range[0] || cell.ymd === range[1]));
    let isSelected = false;
    if (this.type === "date") isSelected = cell.ymd === this.singleValue();
    else if (this.type === "datetime") isSelected = cell.ymd === this.dtDay;
    else isSelected = isEdge;
    const classes = ["arcana-cal__day"];
    if (!cell.inMonth) classes.push("arcana-cal__day--adjacent");
    if (cell.ymd === this.todayYmd) classes.push("arcana-cal__day--today");
    if (inHighlight && !isEdge) classes.push("arcana-cal__day--in-range");
    if (isSelected) classes.push("arcana-cal__day--selected");
    if (range && cell.ymd === range[0] && cell.inMonth) classes.push("arcana-cal__day--range-start");
    if (range && cell.ymd === range[1] && cell.inMonth) classes.push("arcana-cal__day--range-end");
    return classes.join(" ");
  }

  monthClasses(month: number): string {
    const selected = parseYm(this.singleValue());
    const now = parseYmd(this.todayYmd);
    const classes = ["arcana-cal__month"];
    if (selected && selected.year === this.view.year && selected.month === month) classes.push("arcana-cal__month--selected");
    if (now && now.year === this.view.year && now.month === month) classes.push("arcana-cal__month--today");
    return classes.join(" ");
  }

  yearClasses(year: number): string {
    const selected = parseYear(this.singleValue());
    const now = parseYmd(this.todayYmd);
    const start = this.decadeStart();
    const classes = ["arcana-cal__year"];
    if (year < start || year > start + 9) classes.push("arcana-cal__year--adjacent");
    if (selected === year) classes.push("arcana-cal__year--selected");
    if (now && now.year === year) classes.push("arcana-cal__year--today");
    return classes.join(" ");
  }

  onDayHover(cell: CalendarDay): void {
    if (this.isRange && this.pendingStart) {
      this.hoverYmd = cell.ymd;
      this.embeddedView?.detectChanges();
    }
  }

  onPanelKeydown(event: KeyboardEvent): void {
    if (event.key === "Escape" || event.key === "Tab") { event.preventDefault(); this.close(); }
  }
}
