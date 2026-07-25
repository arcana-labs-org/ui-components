/**
 * Pure countdown helpers backing `<ArcanaCountdown>` in every framework port.
 *
 * Everything here is deterministic (no `Date.now()` without an explicit
 * argument), so parsing/formatting can be unit tested; the components own the
 * timer and feed "now" in. No date library is used — the whole thing is integer
 * arithmetic over a millisecond duration.
 *
 * Format tokens (dayjs-flavoured, but the semantics are ours and documented):
 *
 *   DD / D    days           (`DD` zero padded to 2)
 *   HH / H    hours          (`HH` zero padded to 2)
 *   mm / m    minutes        (`mm` zero padded to 2)
 *   ss / s    seconds        (`ss` zero padded to 2)
 *   SSS       milliseconds   (zero padded to 3)
 *   SS / S    milliseconds truncated to 2 / 1 digits (hundredths / tenths)
 *   [text]    literal — anything between brackets is emitted verbatim
 *
 * Overflow rule (the important one): the LARGEST unit present in the format
 * absorbs everything above it, the others wrap normally. So 50h renders as
 * `50:00:00` with `HH:mm:ss` and as `02:02:00:00` with `DD:HH:mm:ss`. That way
 * a format never silently drops time.
 */

/** Non-overflowing breakdown of a duration (days carry everything above). */
export interface CountdownParts {
  /** Remaining milliseconds, already clamped to `>= 0`. */
  total: number;
  days: number;
  /** 0–23 */
  hours: number;
  /** 0–59 */
  minutes: number;
  /** 0–59 */
  seconds: number;
  /** 0–999 */
  milliseconds: number;
  finished: boolean;
}

export type CountdownUnit = "D" | "H" | "m" | "s" | "S";

export const DEFAULT_COUNTDOWN_FORMAT = "HH:mm:ss";

const UNIT_MS: Record<CountdownUnit, number> = { D: 86400000, H: 3600000, m: 60000, s: 1000, S: 1 };
/** How far each unit wraps when it is NOT the largest one in the format. */
const UNIT_WRAP: Record<CountdownUnit, number> = { D: Number.POSITIVE_INFINITY, H: 24, m: 60, s: 60, S: 1000 };
const UNIT_RANK: Record<CountdownUnit, number> = { D: 0, H: 1, m: 2, s: 3, S: 4 };

// `SSS` before `SS` before `S` (and `DD` before `D`, …): the regex alternation is
// tried left to right, so the longest token has to come first.
const TOKEN_PATTERN = /\[([^\]]*)\]|DD|D|HH|H|mm|m|ss|s|SSS|SS|S/g;

const pad = (value: number, size: number): string => String(value).padStart(size, "0");

const unitOf = (token: string): CountdownUnit => token[0] as CountdownUnit;

/**
 * Normalises whatever the `value` prop carries into an epoch timestamp in ms.
 *
 * Accepts a `Date`, an epoch number, a numeric string (`"1700000000000"`) or
 * anything `Date.parse` understands (ISO 8601 in practice). Returns `null` for
 * empty/invalid input so the components can render a zeroed countdown instead
 * of `NaN`.
 */
export function parseCountdownTarget(value: number | string | Date | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (value instanceof Date) {
    const time = value.getTime();
    return Number.isFinite(time) ? time : null;
  }
  if (typeof value === "number") return Number.isFinite(value) ? value : null;

  const raw = String(value).trim();
  if (raw === "") return null;
  if (/^-?\d+$/.test(raw)) return Number(raw);

  const parsed = Date.parse(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

/** Milliseconds left until `target`, never negative. `null` target yields 0. */
export function remainingMs(target: number | string | Date | null | undefined, now: number): number {
  const timestamp = parseCountdownTarget(target);
  if (timestamp === null) return 0;
  return Math.max(0, timestamp - now);
}

/** Cascading breakdown (`hours` is 0–23, `days` carries the rest). */
export function splitDuration(ms: number): CountdownParts {
  const total = Math.max(0, Math.floor(Number.isFinite(ms) ? ms : 0));
  return {
    total,
    days: Math.floor(total / UNIT_MS.D),
    hours: Math.floor(total / UNIT_MS.H) % 24,
    minutes: Math.floor(total / UNIT_MS.m) % 60,
    seconds: Math.floor(total / UNIT_MS.s) % 60,
    milliseconds: total % 1000,
    finished: total <= 0
  };
}

/** Largest (coarsest) unit referenced by the format, or `null` when it has no tokens. */
export function largestUnit(format: string): CountdownUnit | null {
  let largest: CountdownUnit | null = null;
  const pattern = new RegExp(TOKEN_PATTERN.source, "g");
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(format)) !== null) {
    if (match[1] !== undefined) continue; // escaped literal
    const unit = unitOf(match[0]);
    if (largest === null || UNIT_RANK[unit] < UNIT_RANK[largest]) largest = unit;
  }
  return largest;
}

function renderToken(token: string, total: number, largest: CountdownUnit | null): string {
  const unit = unitOf(token);
  const isLargest = unit === largest;

  if (unit === "S") {
    // When `S*` is the coarsest token the whole duration lives in it; otherwise
    // it is just the sub-second remainder.
    const part = isLargest ? total : total % 1000;
    if (token === "SSS") return pad(part, 3);
    if (token === "SS") return pad(Math.floor(part / 10), 2);
    return String(Math.floor(part / 100));
  }

  const raw = Math.floor(total / UNIT_MS[unit]);
  const value = isLargest ? raw : raw % UNIT_WRAP[unit];
  return token.length === 2 ? pad(value, 2) : String(value);
}

/**
 * Renders a duration (ms) with the given format. Negative/NaN input is treated
 * as zero, so a finished countdown always shows `00:00:00` rather than garbage.
 */
export function formatDuration(ms: number, format: string = DEFAULT_COUNTDOWN_FORMAT): string {
  const total = Math.max(0, Math.floor(Number.isFinite(ms) ? ms : 0));
  const pattern = format ?? DEFAULT_COUNTDOWN_FORMAT;
  const largest = largestUnit(pattern);

  return pattern.replace(TOKEN_PATTERN, (match, literal?: string) =>
    literal !== undefined ? literal : renderToken(match, total, largest)
  );
}

/** Convenience: `remainingMs` + `formatDuration` in one call. */
export function formatCountdown(
  target: number | string | Date | null | undefined,
  now: number,
  format: string = DEFAULT_COUNTDOWN_FORMAT
): string {
  return formatDuration(remainingMs(target, now), format);
}

/** True when the format asks for sub-second precision (`S`, `SS` or `SSS`). */
export function hasMillisecondToken(format: string): boolean {
  const pattern = new RegExp(TOKEN_PATTERN.source, "g");
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(format ?? "")) !== null) {
    if (match[1] === undefined && unitOf(match[0]) === "S") return true;
  }
  return false;
}

/**
 * Tick period the components should use for a given format: 50ms when the
 * format shows milliseconds, 1s otherwise. Each tick recomputes the remaining
 * time from the clock, so the interval only controls refresh rate — it never
 * accumulates drift.
 */
export function countdownTickInterval(format: string = DEFAULT_COUNTDOWN_FORMAT): number {
  return hasMillisecondToken(format) ? 50 : 1000;
}
