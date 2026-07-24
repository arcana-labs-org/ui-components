<script setup lang="ts">
/**
 * `<ArcanaDatePicker>` — input de data arcana-styled com um calendário PRÓPRIO,
 * auto-contido e SEM Element Plus.
 *
 * O calendário é desenhado à mão (grid 6×7 Sunday-first) num painel teleportado
 * pro `<body>`, posicionado por `placePanel` e fechado em click-fora / Escape /
 * scroll / resize. Toda a matemática de datas vem de `core/calendar.ts` e a
 * localização (meses/dias/textos) de `core/calendar-locale.ts`.
 *
 * Cinco modos via prop `type`, cada um com um formato de valor canônico:
 * - `date`      (default) → string `'YYYY-MM-DD'`  — 1 painel de dias.
 * - `month`               → string `'YYYY-MM'`     — grid 4×3 de meses.
 * - `year`                → string `'YYYY'`        — grid de 12 anos (década).
 * - `daterange`           → `['YYYY-MM-DD','YYYY-MM-DD']` — 2 painéis + range.
 * - `datetime`            → string `'YYYY-MM-DD HH:mm'` — dias + hora + Confirmar.
 *
 * API:
 * - `modelValue` (v-model) — string ou tuple conforme o modo.
 * - `type`, `disabled`, `placeholder`, `clearable` (default `true`), `ariaLabel`,
 *   `size` (`'sm' | 'md' | 'lg'`), `locale` (BCP-47, default `'pt-BR'`),
 *   `messages` (`Partial<CalendarMessages>`).
 *
 * Emite: `update:modelValue`, `change`.
 */
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import {
  addMonths, decadeGrid, formatDateTime, formatYear, formatYm, formatYmd,
  isBetweenYmd, monthGrid, parseDateTime, parseYear, parseYm, parseYmd, sortRange,
  toDisplayDate, toDisplayDateTime, toDisplayMonth
} from "../../core/calendar";
import type { CalendarDay } from "../../core/calendar";
import {
  calendarMonthLabels, calendarMonthLabelsShort, calendarWeekdayLabels,
  resolveCalendarMessages, type CalendarMessages
} from "../../core/calendar-locale";
import { placePanel } from "../../core/popover";

type PickerType = "date" | "month" | "year" | "daterange" | "datetime";
type PickerValue = string | string[] | null;

const props = withDefaults(defineProps<{
  modelValue?: PickerValue;
  type?: PickerType;
  disabled?: boolean;
  placeholder?: string;
  clearable?: boolean;
  ariaLabel?: string;
  size?: "sm" | "md" | "lg";
  /** Locale BCP-47 dos nomes de meses/dias (via Intl). Default `'pt-BR'`. */
  locale?: string;
  /** Override parcial dos textos do calendário (clear, nav, confirmar, placeholders). */
  messages?: Partial<CalendarMessages>;
}>(), {
  modelValue: null,
  type: "date",
  disabled: false,
  placeholder: undefined,
  clearable: true,
  ariaLabel: undefined,
  size: "md",
  locale: "pt-BR",
  messages: undefined
});

const emit = defineEmits<{
  "update:modelValue": [value: PickerValue];
  change: [value: PickerValue];
}>();

const msg = computed<CalendarMessages>(() => resolveCalendarMessages(props.messages));
const monthLabels = computed(() => calendarMonthLabels(props.locale));
const monthLabelsShort = computed(() => calendarMonthLabelsShort(props.locale));
const weekdayLabels = computed(() => calendarWeekdayLabels(props.locale));

const isRange = computed(() => props.type === "daterange");

const PANEL_ESTIMATE: Record<PickerType, { width: number; height: number }> = {
  date: { width: 252, height: 300 },
  month: { width: 252, height: 210 },
  year: { width: 252, height: 210 },
  daterange: { width: 520, height: 300 },
  datetime: { width: 252, height: 348 }
};

const isOpen = ref(false);
const panelStyle = ref<Record<string, string>>({});
const view = ref({ year: 2000, month: 1 });
const pendingStart = ref<string | null>(null);
const hoverYmd = ref<string | null>(null);
const todayYmd = ref("");
/** datetime: dia selecionado (ainda não confirmado) + hora/minuto pendentes. */
const dtDay = ref<string | null>(null);
const dtHour = ref(0);
const dtMinute = ref(0);
const triggerRef = ref<HTMLButtonElement | null>(null);
const panelRef = ref<HTMLDivElement | null>(null);

const rangeValue = computed<[string, string]>(() => {
  if (!isRange.value) return ["", ""];
  const pair = Array.isArray(props.modelValue) ? props.modelValue : ["", ""];
  return [String(pair[0] ?? ""), String(pair[1] ?? "")];
});
const singleValue = computed(() => isRange.value ? "" : String(props.modelValue ?? ""));

const hasValue = computed(() => isRange.value
  ? Boolean(rangeValue.value[0] || rangeValue.value[1])
  : singleValue.value !== "");
const canClear = computed(() => props.clearable && !props.disabled && hasValue.value);

const placeholderText = computed(() => {
  if (props.placeholder) return props.placeholder;
  switch (props.type) {
    case "month": return msg.value.monthPlaceholder;
    case "year": return msg.value.yearPlaceholder;
    case "daterange": return msg.value.rangePlaceholder;
    case "datetime": return msg.value.datetimePlaceholder;
    default: return msg.value.datePlaceholder;
  }
});

const displayLabel = computed(() => {
  if (isRange.value) {
    if (!hasValue.value) return placeholderText.value;
    return `${toDisplayDate(rangeValue.value[0]) || "…"} → ${toDisplayDate(rangeValue.value[1]) || "…"}`;
  }
  switch (props.type) {
    case "month": return toDisplayMonth(singleValue.value) || placeholderText.value;
    case "year": {
      const year = parseYear(singleValue.value);
      return year != null ? formatYear(year) : placeholderText.value;
    }
    case "datetime": return toDisplayDateTime(singleValue.value) || placeholderText.value;
    default: return toDisplayDate(singleValue.value) || placeholderText.value;
  }
});

/* ─────────────────────────── placement / lifecycle ─────────────────────── */

const reposition = () => {
  const trigger = triggerRef.value;
  const panel = panelRef.value;
  if (!trigger || !panel) return;
  const rect = trigger.getBoundingClientRect();
  const estimate = PANEL_ESTIMATE[props.type];
  const place = placePanel(rect,
    { width: panel.offsetWidth || estimate.width, height: panel.offsetHeight || estimate.height },
    { width: window.innerWidth, height: window.innerHeight }, {});
  panelStyle.value = { position: "fixed", left: `${place.left}px`, top: `${place.top}px` };
};

const onMouseDown = (event: MouseEvent) => {
  const target = event.target as Node;
  if (triggerRef.value?.contains(target) || panelRef.value?.contains(target)) return;
  close();
};
const onScroll = (event: Event) => {
  if (event.target instanceof Node && panelRef.value?.contains(event.target)) return;
  close();
};
const onResize = () => reposition();
const onDocKeydown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };

const attach = () => {
  document.addEventListener("mousedown", onMouseDown, true);
  window.addEventListener("scroll", onScroll, true);
  window.addEventListener("resize", onResize);
  document.addEventListener("keydown", onDocKeydown);
};
const detach = () => {
  document.removeEventListener("mousedown", onMouseDown, true);
  window.removeEventListener("scroll", onScroll, true);
  window.removeEventListener("resize", onResize);
  document.removeEventListener("keydown", onDocKeydown);
};

const open = async () => {
  if (props.disabled || isOpen.value) return;
  const now = new Date();
  todayYmd.value = formatYmd(now.getFullYear(), now.getMonth() + 1, now.getDate());

  // Anchor the initial view on the current value (per mode) or on today.
  let anchor: { year: number; month: number } | null = null;
  if (isRange.value) anchor = parseYmd(rangeValue.value[0]);
  else if (props.type === "month") anchor = parseYm(singleValue.value);
  else if (props.type === "year") { const y = parseYear(singleValue.value); anchor = y != null ? { year: y, month: 1 } : null; }
  else if (props.type === "datetime") { const dt = parseDateTime(singleValue.value); anchor = dt ? { year: dt.year, month: dt.month } : null; }
  else anchor = parseYmd(singleValue.value);
  view.value = anchor ? { year: anchor.year, month: anchor.month } : { year: now.getFullYear(), month: now.getMonth() + 1 };

  pendingStart.value = null;
  hoverYmd.value = null;

  // datetime: seed the pending day + time from the current value, else today/00:00.
  if (props.type === "datetime") {
    const dt = parseDateTime(singleValue.value);
    dtDay.value = dt ? formatYmd(dt.year, dt.month, dt.day) : todayYmd.value;
    dtHour.value = dt ? dt.hour : 0;
    dtMinute.value = dt ? dt.minute : 0;
  }

  const rect = triggerRef.value?.getBoundingClientRect();
  if (rect) {
    const place = placePanel(rect, PANEL_ESTIMATE[props.type], { width: window.innerWidth, height: window.innerHeight }, {});
    panelStyle.value = { position: "fixed", left: `${place.left}px`, top: `${place.top}px` };
  }
  isOpen.value = true;
  await nextTick();
  reposition();
  attach();
  panelRef.value?.focus({ preventScroll: true });
};

const close = () => {
  if (!isOpen.value) return;
  isOpen.value = false;
  pendingStart.value = null;
  hoverYmd.value = null;
  detach();
  triggerRef.value?.focus({ preventScroll: true });
};

const toggle = () => { isOpen.value ? close() : void open(); };

const emitValue = (value: PickerValue) => {
  emit("update:modelValue", value);
  emit("change", value);
};

const clear = () => {
  if (props.disabled) return;
  emitValue(isRange.value ? ["", ""] : "");
};

/* ───────────────────────────── navigation ─────────────────────────────── */

const navMonths = (delta: number) => { view.value = addMonths(view.value.year, view.value.month, delta); };
const navYears = (delta: number) => { view.value = { year: view.value.year + delta, month: view.value.month }; };

const panelMonth = (offset: number) => addMonths(view.value.year, view.value.month, offset);
const panelTitle = (offset: number) => {
  const month = panelMonth(offset);
  return `${monthLabels.value[month.month - 1]} ${month.year}`;
};
const panelCells = (offset: number): CalendarDay[] => {
  const month = panelMonth(offset);
  return monthGrid(month.year, month.month);
};

const decadeCells = computed(() => decadeGrid(view.value.year));
const decadeStart = computed(() => Math.floor(view.value.year / 10) * 10);
const decadeTitle = computed(() => `${decadeStart.value} - ${decadeStart.value + 9}`);

/* ───────────────────────────── selection ──────────────────────────────── */

const pickDay = (ymd: string) => {
  if (props.type === "date") { emitValue(ymd); close(); return; }
  if (props.type === "datetime") { dtDay.value = ymd; return; }
  // daterange
  if (!pendingStart.value) { pendingStart.value = ymd; hoverYmd.value = null; return; }
  emitValue(sortRange(pendingStart.value, ymd));
  close();
};

const pickMonth = (month: number) => { emitValue(formatYm(view.value.year, month)); close(); };
const pickYear = (year: number) => { emitValue(formatYear(year)); close(); };

const clampInt = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, Math.trunc(value))) : min;

const onHourInput = (event: Event) => { dtHour.value = clampInt(Number((event.target as HTMLInputElement).value), 0, 23); };
const onMinuteInput = (event: Event) => { dtMinute.value = clampInt(Number((event.target as HTMLInputElement).value), 0, 59); };

const confirmDateTime = () => {
  const day = parseYmd(dtDay.value ?? todayYmd.value) ?? parseYmd(todayYmd.value);
  if (!day) return;
  emitValue(formatDateTime(day.year, day.month, day.day, dtHour.value, dtMinute.value));
  close();
};

/* ───────────────────────────── highlighting ───────────────────────────── */

// Range: while picking, preview from the anchored start to the hovered day;
// otherwise show the committed value.
const highlightRange = computed<[string, string] | null>(() => {
  if (!isRange.value) return null;
  if (pendingStart.value) return hoverYmd.value ? sortRange(pendingStart.value, hoverYmd.value) : [pendingStart.value, pendingStart.value];
  return parseYmd(rangeValue.value[0]) && parseYmd(rangeValue.value[1]) ? [rangeValue.value[0], rangeValue.value[1]] : null;
});

const dayClasses = (cell: CalendarDay) => {
  const range = highlightRange.value;
  const inHighlight = Boolean(range && cell.inMonth && isBetweenYmd(cell.ymd, range[0], range[1]));
  const isEdge = Boolean(range && cell.inMonth && (cell.ymd === range[0] || cell.ymd === range[1]));
  let isSelected = false;
  if (props.type === "date") isSelected = cell.ymd === singleValue.value;
  else if (props.type === "datetime") isSelected = cell.ymd === dtDay.value;
  else isSelected = isEdge;
  return {
    "arcana-cal__day--adjacent": !cell.inMonth,
    "arcana-cal__day--today": cell.ymd === todayYmd.value,
    "arcana-cal__day--in-range": inHighlight && !isEdge,
    "arcana-cal__day--selected": isSelected,
    "arcana-cal__day--range-start": Boolean(range && cell.ymd === range[0] && cell.inMonth),
    "arcana-cal__day--range-end": Boolean(range && cell.ymd === range[1] && cell.inMonth)
  };
};

const monthClasses = (month: number) => {
  const selected = parseYm(singleValue.value);
  const now = parseYmd(todayYmd.value);
  return {
    "arcana-cal__month--selected": Boolean(selected && selected.year === view.value.year && selected.month === month),
    "arcana-cal__month--today": Boolean(now && now.year === view.value.year && now.month === month)
  };
};

const yearClasses = (year: number) => {
  const selected = parseYear(singleValue.value);
  const now = parseYmd(todayYmd.value);
  return {
    "arcana-cal__year--adjacent": year < decadeStart.value || year > decadeStart.value + 9,
    "arcana-cal__year--selected": selected === year,
    "arcana-cal__year--today": Boolean(now && now.year === year)
  };
};

const onDayHover = (cell: CalendarDay) => {
  if (isRange.value && pendingStart.value) hoverYmd.value = cell.ymd;
};

const onPanelKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" || event.key === "Tab") { event.preventDefault(); close(); }
};

const dayPanels = computed(() => isRange.value ? [0, 1] : (props.type === "date" || props.type === "datetime") ? [0] : []);

onBeforeUnmount(detach);
</script>

<template>
  <div class="arcana-cal" :class="[`arcana-cal--${size}`, { 'arcana-cal--disabled': disabled }]">
    <button
      ref="triggerRef"
      type="button"
      class="arcana-cal__input"
      :class="{ 'arcana-cal__input--open': isOpen, 'arcana-cal__input--has-clear': canClear }"
      :disabled="disabled"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      :aria-label="ariaLabel"
      @click="toggle"
    >
      <svg class="arcana-cal__input-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      <span class="arcana-cal__input-label" :class="{ 'arcana-cal__input-label--placeholder': !hasValue }">{{ displayLabel }}</span>
      <span v-if="canClear" class="arcana-cal__clear" role="button" tabindex="-1" :aria-label="msg.clear" @click.stop="clear">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </span>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="panelRef"
        class="arcana-cal__panel"
        :class="{ 'arcana-cal__panel--range': isRange }"
        :style="panelStyle"
        role="dialog"
        :aria-label="ariaLabel"
        tabindex="-1"
        @keydown="onPanelKeydown"
      >
        <div class="arcana-cal__panels">
          <!-- MONTH: 4×3 grid, navega por ano -->
          <template v-if="type === 'month'">
            <div class="arcana-cal__month-panel">
              <div class="arcana-cal__header">
                <button type="button" class="arcana-cal__nav" :aria-label="msg.prevYear" @click="navYears(-1)">«</button>
                <span class="arcana-cal__title">{{ view.year }}</span>
                <button type="button" class="arcana-cal__nav" :aria-label="msg.nextYear" @click="navYears(1)">»</button>
              </div>
              <div class="arcana-cal__months">
                <button
                  v-for="(label, index) in monthLabelsShort"
                  :key="label"
                  type="button"
                  class="arcana-cal__month"
                  :class="monthClasses(index + 1)"
                  @click="pickMonth(index + 1)"
                >{{ label }}</button>
              </div>
            </div>
          </template>

          <!-- YEAR: grid de 12 anos (década), navega por década -->
          <template v-else-if="type === 'year'">
            <div class="arcana-cal__month-panel">
              <div class="arcana-cal__header">
                <button type="button" class="arcana-cal__nav" :aria-label="msg.prevDecade" @click="navYears(-10)">«</button>
                <span class="arcana-cal__title">{{ decadeTitle }}</span>
                <button type="button" class="arcana-cal__nav" :aria-label="msg.nextDecade" @click="navYears(10)">»</button>
              </div>
              <div class="arcana-cal__years">
                <button
                  v-for="year in decadeCells"
                  :key="year"
                  type="button"
                  class="arcana-cal__year"
                  :class="yearClasses(year)"
                  @click="pickYear(year)"
                >{{ year }}</button>
              </div>
            </div>
          </template>

          <!-- DATE / DATERANGE / DATETIME: painel(is) de dias -->
          <template v-else>
            <div v-for="offset in dayPanels" :key="offset" class="arcana-cal__month-panel">
              <div class="arcana-cal__header">
                <template v-if="!isRange || offset === 0">
                  <button type="button" class="arcana-cal__nav" :aria-label="msg.prevYear" @click="navMonths(-12)">«</button>
                  <button type="button" class="arcana-cal__nav" :aria-label="msg.prevMonth" @click="navMonths(-1)">‹</button>
                </template>
                <span v-else class="arcana-cal__nav-spacer" />
                <span class="arcana-cal__title">{{ panelTitle(offset) }}</span>
                <template v-if="!isRange || offset === 1">
                  <button type="button" class="arcana-cal__nav" :aria-label="msg.nextMonth" @click="navMonths(1)">›</button>
                  <button type="button" class="arcana-cal__nav" :aria-label="msg.nextYear" @click="navMonths(12)">»</button>
                </template>
                <span v-else class="arcana-cal__nav-spacer" />
              </div>
              <div class="arcana-cal__weekdays">
                <span v-for="(label, index) in weekdayLabels" :key="index" class="arcana-cal__weekday">{{ label }}</span>
              </div>
              <div class="arcana-cal__grid">
                <button
                  v-for="cell in panelCells(offset)"
                  :key="cell.ymd"
                  type="button"
                  class="arcana-cal__day"
                  :class="dayClasses(cell)"
                  :aria-label="toDisplayDate(cell.ymd)"
                  @mouseenter="onDayHover(cell)"
                  @click="pickDay(cell.ymd)"
                >{{ cell.day }}</button>
              </div>

              <!-- DATETIME: linha de tempo + Confirmar -->
              <div v-if="type === 'datetime'" class="arcana-cal__time">
                <span class="arcana-cal__time-label">{{ msg.time }}</span>
                <input
                  type="number"
                  class="arcana-cal__time-input"
                  min="0" max="23"
                  :value="dtHour"
                  aria-label="HH"
                  @input="onHourInput"
                />
                <span class="arcana-cal__time-sep">:</span>
                <input
                  type="number"
                  class="arcana-cal__time-input"
                  min="0" max="59"
                  :value="dtMinute"
                  aria-label="mm"
                  @input="onMinuteInput"
                />
                <button type="button" class="arcana-cal__confirm" @click="confirmDateTime">{{ msg.confirm }}</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </Teleport>
  </div>
</template>
