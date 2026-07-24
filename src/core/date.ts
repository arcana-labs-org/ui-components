import moment from "moment"

export class DateFormatter {
    static fromDateTime(date: string | null, showSeconds: boolean = true): string | null {
        const format = showSeconds ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm"
        return date ? moment(date).format(format) : null
    }

    static fromDateTimeNoSec(date: string | null): string | null {
        return DateFormatter.fromDateTime(date, false)
    }

    static toBrTime(date: string | null): string | null {
        return date ? moment(date).format("HH:mm") : null
    }

    static fromUtcToLocalDateTime(date: string | null, showSeconds: boolean = true): string | null {
        const format = showSeconds ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm"
        return date ? moment.utc(date).local().format(format) : null
    }

    static fromUtcToLocalDateTimeWithoutSeconds(date: string | null): string | null {
        return DateFormatter.fromUtcToLocalDateTime(date, false)
    }

    static fromUtcToLocalDate(date: string | null): string | null {
        return date ? moment.utc(date).local().format("DD/MM/YYYY") : null
    }

    static toBrDate(date: string | null): string | null {
        return date ? moment(date).format("DD/MM/YYYY") : null
    }

    static toBrDateWithoutYear(date: string | null): string | null {
        return date ? moment(date).format("DD/MM") : null
    }

    static toMonthYear(date: string | null): string | null {
        return date ? moment(date).format("MM/YYYY") : null
    }

    static fromDate(date: string | null): string | null {
        return date ? moment(date).format("DD/MM/YYYY") : null
    }

    static fromUtcToLocalIso8601(date: string | null): string | null {
        return date ? moment.utc(date).local(true).format() : null
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
     * @param start    Primeira ponta (ISO ou compatível com `moment`)
     * @param end      Segunda ponta (pode ser `null` quando ainda está em aberto)
     * @param options.separator  Texto entre as duas datas. Default `"até"`.
     * @param options.fallback   Substituto exibido no lugar do `end` quando ele é vazio. Default `"—"`.
     */
    static compactRange(
        start: string | null | undefined,
        end: string | null | undefined,
        options: { separator?: string; fallback?: string } = {},
    ): string {
        if (!start) return ''

        const separator = options.separator ?? 'até'
        const fallback = options.fallback ?? '—'

        const startFull = DateFormatter.fromDateTimeNoSec(start) as string
        if (!end) return `${startFull} ${separator} ${fallback}`

        const startDate = DateFormatter.fromDate(start) as string
        const endDate = DateFormatter.fromDate(end) as string

        if (startDate === endDate) {
            const startTime = DateFormatter.toBrTime(start) as string
            const endTime = DateFormatter.toBrTime(end) as string
            return `${startTime} ${separator} ${endTime}`
        }

        const startYear = startDate.split('/')[2]
        const endYear = endDate.split('/')[2]

        if (startYear === endYear) {
            const startShort = `${DateFormatter.toBrDateWithoutYear(start)} ${DateFormatter.toBrTime(start)}`
            const endShort = `${DateFormatter.toBrDateWithoutYear(end)} ${DateFormatter.toBrTime(end)}`
            return `${startShort} ${separator} ${endShort}`
        }

        const endFull = DateFormatter.fromDateTimeNoSec(end) as string
        return `${startFull} ${separator} ${endFull}`
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
     * @param start    Primeira ponta (ISO ou compatível com `moment`)
     * @param end      Segunda ponta (ISO ou compatível com `moment`)
     * @param separator  Texto entre as duas datas. Default `"→"`.
     */
    static compactDateRange(
        start: string | null | undefined,
        end: string | null | undefined,
        separator: string = '→',
    ): string {
        const startFull = DateFormatter.fromDate(start ?? null)
        const endFull = DateFormatter.fromDate(end ?? null)

        if (!start || !end) {
            return [startFull, endFull].filter(Boolean).join(` ${separator} `)
        }

        const currentYear = moment().year()
        const bothInCurrentYear =
            moment(start).year() === currentYear && moment(end).year() === currentYear

        if (bothInCurrentYear) {
            return `${DateFormatter.toBrDateWithoutYear(start)} ${separator} ${DateFormatter.toBrDateWithoutYear(end)}`
        }

        return `${startFull} ${separator} ${endFull}`
    }
}