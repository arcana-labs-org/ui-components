export class CurrencyFormatter {
    static format(value: any): any {
        return CurrencyFormatter.formatWithDigits(value, 2)
    }

    static formatWithDigits(value: any, minimumFractionDigits: number = 2): any {
        if ((value || value === 0) && !isNaN(value)) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits,
            }).format(parseFloat(value))
        }

        return value
    }
    static formatUSD(value: any, minimumFractionDigits: number = 2): any {
        if ((value || value === 0) && !isNaN(value)) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits,
            }).format(parseFloat(value))
        }

        return value
    }
}
/* ── Máscara de moeda (entrada da direita para a esquerda) ─────────────────
   Estava reimplementada em cada port: React, Angular e Svelte tinham cópias
   próprias, e o Vue delegava à `v-money3`. Quatro implementações do mesmo
   comportamento é onde a paridade entre frameworks se perde sem ninguém notar —
   e, no caso do Vue, custava uma dependência de runtime só para isso.

   O modelo é o do v-money3 no default: os dígitos preenchem a partir dos
   centavos, então digitar "1" mostra "0,01" e "123456" mostra "1.234,56". */

/** Separadores do padrão pt-BR, que é o que a lib usa hoje. */
export const CURRENCY_DECIMAL = ",";
export const CURRENCY_THOUSANDS = ".";

/**
 * Reduz qualquer entrada — número, string crua ou string já mascarada — à
 * sequência de dígitos que representa o valor em centavos.
 */
export function currencyDigitsFromValue(
  value: string | number | undefined | null,
  precision: number
): string {
  if (value == null || value === "") return "";
  if (typeof value === "number") {
    return String(Math.round(Math.abs(value) * Math.pow(10, precision)));
  }
  const text = String(value);
  // Já mascarada (tem o separador decimal): basta ficar com os dígitos.
  if (text.includes(CURRENCY_DECIMAL)) return text.replace(/\D/g, "");
  const parsed = parseFloat(text);
  if (!isFinite(parsed)) return text.replace(/\D/g, "");
  return String(Math.round(Math.abs(parsed) * Math.pow(10, precision)));
}

/** Formata a sequência de dígitos como moeda, com o prefixo opcional. */
export function formatCurrencyDigits(
  digits: string,
  precision: number,
  prefix = ""
): string {
  let d = digits.replace(/\D/g, "");
  if (!d) d = "0";
  if (precision > 0) d = d.padStart(precision + 1, "0");
  const cut = precision > 0 ? d.length - precision : d.length;
  // Zeros à esquerda saem, mas o último dígito fica: "007" vira "7", "0" fica "0".
  let intPart = d.slice(0, cut).replace(/^0+(?=\d)/, "");
  const fracPart = precision > 0 ? d.slice(cut) : "";
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, CURRENCY_THOUSANDS);
  return prefix + intPart + (precision > 0 ? CURRENCY_DECIMAL + fracPart : "");
}

/** Conveniência: da entrada bruta direto ao texto exibido. */
export function maskCurrency(
  value: string | number | undefined | null,
  precision = 2,
  prefix = ""
): string {
  return formatCurrencyDigits(currencyDigitsFromValue(value, precision), precision, prefix);
}
