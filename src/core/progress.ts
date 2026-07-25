/**
 * Pure math backing `<ArcanaProgress>` in every framework port.
 *
 * The indeterminate state is modelled as `null`: `progressPercent` returns
 * `null` whenever there is no usable value, and the ports use exactly that to
 * decide between `is-indeterminate` (no `aria-valuenow`) and a filled bar.
 */

/** Value clamped into `[0, max]`; `null` when there is nothing to show. */
export function clampProgressValue(
  value: number | null | undefined,
  max: number = 100
): number | null {
  if (value === null || value === undefined || typeof value !== "number") return null;
  if (!Number.isFinite(value)) return null;
  const ceiling = normalizeMax(max);
  return Math.min(Math.max(value, 0), ceiling);
}

/** Fill ratio in percent (0–100); `null` = indeterminate. */
export function progressPercent(
  value: number | null | undefined,
  max: number = 100
): number | null {
  const clamped = clampProgressValue(value, max);
  if (clamped === null) return null;
  return (clamped / normalizeMax(max)) * 100;
}

/** Rounded percent label (`"42%"`); empty string when indeterminate. */
export function formatProgressLabel(
  value: number | null | undefined,
  max: number = 100
): string {
  const percent = progressPercent(value, max);
  return percent === null ? "" : `${Math.round(percent)}%`;
}

/** A non-positive/NaN `max` would produce Infinity — fall back to the default. */
function normalizeMax(max: number): number {
  return Number.isFinite(max) && max > 0 ? max : 100;
}
