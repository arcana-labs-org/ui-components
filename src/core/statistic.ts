/**
 * Pure number formatting backing `<ArcanaStatistic>` in every framework port.
 *
 * Deterministic and side-effect free, so the four ports render byte-identical
 * text and the rules can be unit tested.
 *
 * Rules:
 * - `null` / `undefined` / `""` render as an empty string;
 * - strings pass through UNTOUCHED (the caller already formatted them — this is
 *   the escape hatch for `"1.2 mil"`, `"R$ 10,00"`, …);
 * - numbers are grouped with `groupSeparator` (default `","`) and, when
 *   `precision` is given, fixed to that many decimals with `decimalSeparator`
 *   (default `"."`);
 * - `locale` switches to `Intl.NumberFormat` and, when set, WINS over the
 *   separators (the locale decides them). An invalid locale falls back to the
 *   manual path instead of throwing;
 * - non-finite numbers (`NaN`, `Infinity`) render as-is, never as garbage.
 */

export interface StatisticFormatOptions {
  /** Fixed decimal places. Omitted = keep the number's own decimals. */
  precision?: number;
  /** Thousands separator. `""` disables grouping. Default `","`. */
  groupSeparator?: string;
  /** Decimal mark. Default `"."`. */
  decimalSeparator?: string;
  /** BCP 47 tag (`"pt-BR"`); when set, `Intl.NumberFormat` takes over. */
  locale?: string;
}

function groupInteger(digits: string, separator: string): string {
  if (!separator) return digits;
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function formatStatisticValue(
  value: number | string | null | undefined,
  options: StatisticFormatOptions = {}
): string {
  if (value === null || value === undefined || value === "") return "";
  // Strings are the "already formatted" escape hatch — never re-parsed.
  if (typeof value !== "number") return String(value);
  if (!Number.isFinite(value)) return String(value);

  const { precision, groupSeparator = ",", decimalSeparator = ".", locale } = options;

  if (locale) {
    try {
      return new Intl.NumberFormat(
        locale,
        precision === undefined
          ? {}
          : { minimumFractionDigits: precision, maximumFractionDigits: precision }
      ).format(value);
    } catch {
      // Invalid tag → fall through to the manual path.
    }
  }

  const negative = value < 0 || Object.is(value, -0);
  const magnitude = Math.abs(value);
  const fixed = precision === undefined ? String(magnitude) : magnitude.toFixed(precision);

  // 1e21+ stringifies in exponential notation; grouping it would be nonsense.
  if (fixed.includes("e") || fixed.includes("E")) return String(value);

  const [integerPart, decimalPart] = fixed.split(".");
  const grouped = groupInteger(integerPart, groupSeparator);
  const body = decimalPart === undefined ? grouped : `${grouped}${decimalSeparator}${decimalPart}`;

  return negative ? `-${body}` : body;
}
