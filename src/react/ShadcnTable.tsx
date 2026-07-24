import type { ReactNode } from "react";

/**
 * `<ShadcnTable>` — React port. Tabela estática (dados locais) shadcn. Reproduz
 * `<div class="shadcn-table-wrap"><table class="shadcn-table">`, o `thead`/`tbody`/`tfoot`,
 * `__th--right`/`__td--right`, `__empty` e `__foot`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slot de célula `#cell-<key>` → `col.render?({ row, value, index })`
 * - slot `#footer` → prop `footer` (ReactNode)
 */
export interface ShadcnTableColumn {
    key: string;
    label: string;
    width?: string;
    align?: "left" | "right";
    valueGetter?: (value: any, row: any, index: number) => any;
    /** Render custom da célula (equivale ao slot `#cell-<key>` do SFC). */
    render?: (args: { row: any; value: any; index: number }) => ReactNode;
}

export interface ShadcnTableProps {
    columns: ShadcnTableColumn[];
    rows?: any[];
    emptyText?: string;
    footer?: ReactNode;
    className?: string;
}

export function ShadcnTable({
    columns,
    rows = [],
    emptyText = "Nenhum registro.",
    footer,
    className,
}: ShadcnTableProps) {
    const formatCell = (row: any, col: ShadcnTableColumn, index: number): any => {
        const value = row?.[col.key];
        if (col.valueGetter) return col.valueGetter(value, row, index);
        return value ?? "—";
    };

    return (
        <div
            className={["shadcn-table-wrap", className ?? ""]
                .filter(Boolean)
                .join(" ")}
        >
            <table className="shadcn-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                style={col.width ? { width: col.width } : undefined}
                                className={
                                    col.align === "right"
                                        ? "shadcn-table__th--right"
                                        : undefined
                                }
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!rows.length ? (
                        <tr>
                            <td colSpan={columns.length} className="shadcn-table__empty">
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        rows.map((row, i) => (
                            <tr key={i}>
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={
                                            col.align === "right"
                                                ? "shadcn-table__td--right"
                                                : undefined
                                        }
                                    >
                                        {col.render
                                            ? col.render({
                                                  row,
                                                  value: row?.[col.key],
                                                  index: i,
                                              })
                                            : formatCell(row, col, i)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
                {footer ? (
                    <tfoot className="shadcn-table__foot">{footer}</tfoot>
                ) : null}
            </table>
        </div>
    );
}
