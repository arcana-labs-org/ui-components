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