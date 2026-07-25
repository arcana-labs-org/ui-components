/**
 * Formatação de datas — sem dependência de runtime.
 *
 * Substitui a `moment`, que eram 5,2 MB instalados no bundle de todo consumidor
 * para uma classe utilitária que a própria lib não usa em componente nenhum.
 * Segue o mesmo caminho que `core/calendar-locale.ts` já usava para nomes
 * localizados (`Intl.DateTimeFormat`); o resto é aritmética de data.
 *
 * ── Por que existe um parser próprio ──────────────────────────────────────
 * `new Date(string)` NÃO é equivalente a `moment(string)` no caso mais comum de
 * todos. Uma data sem hora — `"2026-07-25"` — é lida pelo `Date` como meia-noite
 * UTC, enquanto a `moment` lê como meia-noite LOCAL. Em São Paulo (-03) isso
 * desloca o resultado para o dia anterior às 21:00. Como datas só-data vêm de API
 * o tempo todo, trocar direto por `new Date` teria introduzido um erro de um dia,
 * silencioso, em toda a superfície.
 *
 * As regras abaixo reproduzem a `moment`:
 *   "2026-07-25"                → meia-noite LOCAL
 *   "2026-07-25 14:30:00"       → hora LOCAL (separador por espaço)
 *   "2026-07-25T14:30:00"       → hora LOCAL (sem fuso declarado)
 *   "2026-07-25T14:30:00Z"      → instante absoluto
 *   "2026-07-25T14:30:00-03:00" → instante absoluto
 */

/** `YYYY-MM-DD` opcionalmente seguido de hora, sem fuso declarado. */
const SEM_FUSO = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?)?$/;

const pad2 = (n: number): string => String(n).padStart(2, "0");

/** Interpreta como hora LOCAL quando a string não declara fuso — regra da moment. */
function parseLocal(input: string): Date | null {
  const m = SEM_FUSO.exec(input.trim());
  if (m) {
    const [, y, mo, d, h = "0", mi = "0", s = "0"] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s));
  }
  const fallback = new Date(input);
  return isNaN(fallback.getTime()) ? null : fallback;
}

/** Interpreta como UTC quando a string não declara fuso — regra da `moment.utc`. */
function parseUtc(input: string): Date | null {
  const m = SEM_FUSO.exec(input.trim());
  if (m) {
    const [, y, mo, d, h = "0", mi = "0", s = "0"] = m;
    return new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s)));
  }
  const fallback = new Date(input);
  return isNaN(fallback.getTime()) ? null : fallback;
}

/** Partes de data/hora no fuso local. */
function partesLocais(date: Date) {
  return {
    dia: pad2(date.getDate()),
    mes: pad2(date.getMonth() + 1),
    ano: String(date.getFullYear()),
    hora: pad2(date.getHours()),
    minuto: pad2(date.getMinutes()),
    segundo: pad2(date.getSeconds()),
  };
}

/** Deslocamento local no formato `±HH:mm`. */
function offsetLocal(date: Date): string {
  const minutos = -date.getTimezoneOffset();
  const sinal = minutos >= 0 ? "+" : "-";
  const abs = Math.abs(minutos);
  return `${sinal}${pad2(Math.floor(abs / 60))}:${pad2(abs % 60)}`;
}

export class DateFormatter {
  static fromDateTime(date: string | null, showSeconds: boolean = true): string | null {
    if (!date) return null;
    const d = parseLocal(date);
    if (!d) return null;
    const p = partesLocais(d);
    const hora = showSeconds ? `${p.hora}:${p.minuto}:${p.segundo}` : `${p.hora}:${p.minuto}`;
    return `${p.dia}/${p.mes}/${p.ano} ${hora}`;
  }

  static fromDateTimeNoSec(date: string | null): string | null {
    return DateFormatter.fromDateTime(date, false);
  }

  static toBrTime(date: string | null): string | null {
    if (!date) return null;
    const d = parseLocal(date);
    if (!d) return null;
    const p = partesLocais(d);
    return `${p.hora}:${p.minuto}`;
  }

  static fromUtcToLocalDateTime(date: string | null, showSeconds: boolean = true): string | null {
    if (!date) return null;
    const d = parseUtc(date);
    if (!d) return null;
    const p = partesLocais(d);
    const hora = showSeconds ? `${p.hora}:${p.minuto}:${p.segundo}` : `${p.hora}:${p.minuto}`;
    return `${p.dia}/${p.mes}/${p.ano} ${hora}`;
  }

  static fromUtcToLocalDateTimeWithoutSeconds(date: string | null): string | null {
    return DateFormatter.fromUtcToLocalDateTime(date, false);
  }

  static fromUtcToLocalDate(date: string | null): string | null {
    if (!date) return null;
    const d = parseUtc(date);
    if (!d) return null;
    const p = partesLocais(d);
    return `${p.dia}/${p.mes}/${p.ano}`;
  }

  static toBrDate(date: string | null): string | null {
    if (!date) return null;
    const d = parseLocal(date);
    if (!d) return null;
    const p = partesLocais(d);
    return `${p.dia}/${p.mes}/${p.ano}`;
  }

  static toBrDateWithoutYear(date: string | null): string | null {
    if (!date) return null;
    const d = parseLocal(date);
    if (!d) return null;
    const p = partesLocais(d);
    return `${p.dia}/${p.mes}`;
  }

  static toMonthYear(date: string | null): string | null {
    if (!date) return null;
    const d = parseLocal(date);
    if (!d) return null;
    const p = partesLocais(d);
    return `${p.mes}/${p.ano}`;
  }

  static fromDate(date: string | null): string | null {
    return DateFormatter.toBrDate(date);
  }

  /**
   * Reproduz `moment.utc(x).local(true).format()`.
   *
   * Atenção ao `local(true)`: ele NÃO converte o instante — mantém o relógio de
   * parede lido em UTC e apenas troca o rótulo do fuso. `14:30Z` vira
   * `14:30-03:00`, não `11:30-03:00`. Pode parecer engano de quem escreveu, mas é
   * comportamento observável da API pública e foi preservado de propósito.
   */
  static fromUtcToLocalIso8601(date: string | null): string | null {
    if (!date) return null;
    const d = parseUtc(date);
    if (!d) return null;
    const ano = String(d.getUTCFullYear()).padStart(4, "0");
    const mes = pad2(d.getUTCMonth() + 1);
    const dia = pad2(d.getUTCDate());
    const hora = pad2(d.getUTCHours());
    const minuto = pad2(d.getUTCMinutes());
    const segundo = pad2(d.getUTCSeconds());
    // O offset é o do fuso local NAQUELA data — horário de verão muda ao longo do ano.
    const referencia = new Date(
      Number(ano), Number(mes) - 1, Number(dia), Number(hora), Number(minuto), Number(segundo)
    );
    return `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}${offsetLocal(referencia)}`;
  }

  /**
   * Formata um intervalo de duas datas de forma compacta — economiza pixels quando
   * as duas pontas têm informação redundante.
   *
   * Regras (do mais compacto pro mais completo):
   * - Sem `start`              → string vazia
   * - Sem `end`                → `"DD/MM/YYYY HH:mm <separator> <fallback>"`
   * - Mesmo dia                → `"HH:mm <separator> HH:mm"`               (só horas)
   * - Mesmo ano                → `"DD/MM HH:mm <separator> DD/MM HH:mm"`   (sem ano)
   * - Anos diferentes          → `"DD/MM/YYYY HH:mm <separator> DD/MM/YYYY HH:mm"`
   *
   * Usado em spec sheets de telas com período (Cashier: Abertura/Fechamento,
   * Settlement: Criado/Acerto). Mantenha aqui — evite duplicar a lógica.
   *
   * @param start    Primeira ponta (ISO ou `YYYY-MM-DD [HH:mm[:ss]]`)
   * @param end      Segunda ponta (pode ser `null` quando ainda está em aberto)
   * @param options.separator  Texto entre as duas datas. Default `"até"`.
   * @param options.fallback   Substituto exibido no lugar do `end` quando ele é vazio. Default `"—"`.
   */
  static compactRange(
    start: string | null | undefined,
    end: string | null | undefined,
    options: { separator?: string; fallback?: string } = {},
  ): string {
    if (!start) return '';

    const separator = options.separator ?? 'até';
    const fallback = options.fallback ?? '—';

    const startFull = DateFormatter.fromDateTimeNoSec(start) as string;
    if (!end) return `${startFull} ${separator} ${fallback}`;

    const startDate = DateFormatter.fromDate(start) as string;
    const endDate = DateFormatter.fromDate(end) as string;

    if (startDate === endDate) {
      const startTime = DateFormatter.toBrTime(start) as string;
      const endTime = DateFormatter.toBrTime(end) as string;
      return `${startTime} ${separator} ${endTime}`;
    }

    const startYear = startDate.split('/')[2];
    const endYear = endDate.split('/')[2];

    if (startYear === endYear) {
      const startShort = `${DateFormatter.toBrDateWithoutYear(start)} ${DateFormatter.toBrTime(start)}`;
      const endShort = `${DateFormatter.toBrDateWithoutYear(end)} ${DateFormatter.toBrTime(end)}`;
      return `${startShort} ${separator} ${endShort}`;
    }

    const endFull = DateFormatter.fromDateTimeNoSec(end) as string;
    return `${startFull} ${separator} ${endFull}`;
  }

  /**
   * Formata um intervalo de datas (sem hora) de forma compacta.
   *
   * Quando as DUAS pontas caem no ano corrente, omite o ano
   * (`"DD/MM <separator> DD/MM"`); se qualquer uma for de outro ano, mostra
   * a data completa nas duas pontas (`"DD/MM/YYYY <separator> DD/MM/YYYY"`).
   *
   * Usado no grid de Exportar XML (colunas Data Início/Data Fim mergidas).
   *
   * @param start    Primeira ponta (ISO ou `YYYY-MM-DD [HH:mm[:ss]]`)
   * @param end      Segunda ponta
   * @param separator  Texto entre as duas datas. Default `"→"`.
   */
  static compactDateRange(
    start: string | null | undefined,
    end: string | null | undefined,
    separator: string = '→',
  ): string {
    const startFull = DateFormatter.fromDate(start ?? null);
    const endFull = DateFormatter.fromDate(end ?? null);

    if (!start || !end) {
      return [startFull, endFull].filter(Boolean).join(` ${separator} `);
    }

    const currentYear = new Date().getFullYear();
    const anoDe = (valor: string): number | null => {
      const d = parseLocal(valor);
      return d ? d.getFullYear() : null;
    };
    const bothInCurrentYear = anoDe(start) === currentYear && anoDe(end) === currentYear;

    if (bothInCurrentYear) {
      return `${DateFormatter.toBrDateWithoutYear(start)} ${separator} ${DateFormatter.toBrDateWithoutYear(end)}`;
    }

    return `${startFull} ${separator} ${endFull}`;
  }
}
