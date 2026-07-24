/**
 * Localization helpers for `ArcanaDatePicker` — framework-agnostic so every
 * adapter (Vue/React/Angular/Svelte) localizes identically.
 *
 * - Month/weekday display names come from `Intl.DateTimeFormat`, keyed by a plain
 *   BCP-47 locale string (e.g. "pt-BR", "en", "es"). No hard dependency on any
 *   locale message table.
 * - UI copy (placeholders, clear, nav aria-labels, confirm) defaults to
 *   Portuguese and is overridable per-instance via a `messages` prop.
 */

import { MONTH_LABELS, MONTH_LABELS_SHORT, WEEKDAY_LABELS } from "./calendar";

const capitalize = (value: string): string =>
  value ? value.charAt(0).toLocaleUpperCase() + value.slice(1) : value;

const monthCache = new Map<string, readonly string[]>();
const monthShortCache = new Map<string, readonly string[]>();
const weekdayCache = new Map<string, readonly string[]>();

/** True for the historical hand-written pt-BR labels shipped in calendar.ts. */
const isPtBr = (locale: string): boolean => /^pt(-br)?$/i.test(locale);

function intlMonths(locale: string, style: "long" | "short"): readonly string[] {
  try {
    const format = new Intl.DateTimeFormat(locale, { month: style, timeZone: "UTC" });
    return Array.from({ length: 12 }, (_, index) => {
      const label = format.format(new Date(Date.UTC(2023, index, 1)));
      // Compact panels: drop a trailing dot ("Jan." → "Jan") and capitalize.
      return capitalize(style === "short" ? label.replace(/\.$/, "") : label);
    });
  } catch {
    return style === "short" ? MONTH_LABELS_SHORT : MONTH_LABELS;
  }
}

/** Localized full month names (January-first). */
export function calendarMonthLabels(locale: string): readonly string[] {
  if (isPtBr(locale)) return MONTH_LABELS;
  let labels = monthCache.get(locale);
  if (!labels) { labels = intlMonths(locale, "long"); monthCache.set(locale, labels); }
  return labels;
}

/** Localized short month names for the month picker (4×3 panel). */
export function calendarMonthLabelsShort(locale: string): readonly string[] {
  if (isPtBr(locale)) return MONTH_LABELS_SHORT;
  let labels = monthShortCache.get(locale);
  if (!labels) { labels = intlMonths(locale, "short"); monthShortCache.set(locale, labels); }
  return labels;
}

/** Localized narrow weekday initials, Sunday-first (the calendar's week start). */
export function calendarWeekdayLabels(locale: string): readonly string[] {
  if (isPtBr(locale)) return WEEKDAY_LABELS;
  let labels = weekdayCache.get(locale);
  if (!labels) {
    try {
      const format = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" });
      // 2023-01-01 was a Sunday.
      labels = Array.from({ length: 7 }, (_, index) => capitalize(format.format(new Date(Date.UTC(2023, 0, 1 + index)))));
    } catch {
      labels = WEEKDAY_LABELS;
    }
    weekdayCache.set(locale, labels);
  }
  return labels;
}

/** UI copy for the calendar chrome (not the month/weekday names). */
export interface CalendarMessages {
  clear: string;
  confirm: string;
  prevYear: string;
  nextYear: string;
  prevMonth: string;
  nextMonth: string;
  prevDecade: string;
  nextDecade: string;
  time: string;
  datePlaceholder: string;
  monthPlaceholder: string;
  yearPlaceholder: string;
  rangePlaceholder: string;
  datetimePlaceholder: string;
}

/** Portuguese defaults; override per-instance with the `messages` prop. */
export const DEFAULT_CALENDAR_MESSAGES: CalendarMessages = {
  clear: "Limpar",
  confirm: "Confirmar",
  prevYear: "Ano anterior",
  nextYear: "Próximo ano",
  prevMonth: "Mês anterior",
  nextMonth: "Próximo mês",
  prevDecade: "Década anterior",
  nextDecade: "Próxima década",
  time: "Hora",
  datePlaceholder: "Selecione a data",
  monthPlaceholder: "Selecione o mês",
  yearPlaceholder: "Selecione o ano",
  rangePlaceholder: "Selecione o período",
  datetimePlaceholder: "Selecione data e hora"
};

/** Merges a partial override onto the defaults. */
export function resolveCalendarMessages(override?: Partial<CalendarMessages>): CalendarMessages {
  return override ? { ...DEFAULT_CALENDAR_MESSAGES, ...override } : DEFAULT_CALENDAR_MESSAGES;
}
