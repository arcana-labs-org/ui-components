import { createContext, type ReactNode } from "react";

/**
 * `<ArcanaAccordion>` — React port. Reproduz `<div class="arcana-accordion">`, idêntico ao SFC.
 * O item vive em `./ArcanaAccordionItem`.
 *
 * Equivalências Vue → React:
 * - `provide`/`inject` do `accordionApi` → React Context (`AccordionContext`)
 * - `modelValue` (v-model) → `value` + `onValueChange` (string | string[] | null)
 * - slot default → `children`
 *
 * Props:
 * - `accordion` — `true` (default): só um item aberto por vez; `false`: múltiplos (array)
 * - `animated` — `false` (default): abre/fecha instantâneo (comportamento histórico).
 *   `true`: transição de altura (0 → altura real medida) + fade, ~200ms. O
 *   `<ArcanaAccordionItem>` também aceita `animated` e, quando informada lá, ela tem
 *   **precedência** sobre a do container. Respeita `prefers-reduced-motion: reduce`.
 */

export interface AccordionApi {
    isOpen: (name: string) => boolean;
    toggle: (name: string) => void;
    /** Default de animação herdado pelos itens que não passam `animated`. */
    animated: boolean;
}

export const AccordionContext = createContext<AccordionApi | null>(null);

export interface ArcanaAccordionProps {
    value?: string | string[] | null;
    /** `true` (default): só um item aberto por vez. `false`: múltiplos (array). */
    accordion?: boolean;
    /** `false` (default): abre/fecha instantâneo. `true`: slide de altura + fade (~200ms). */
    animated?: boolean;
    onValueChange?: (value: string | string[] | null) => void;
    className?: string;
    children?: ReactNode;
}

export function ArcanaAccordion({
    value = null,
    accordion = true,
    animated = false,
    onValueChange,
    className,
    children,
}: ArcanaAccordionProps) {
    const isOpen = (name: string): boolean => {
        if (Array.isArray(value)) return value.includes(name);
        return value === name;
    };

    const toggle = (name: string) => {
        if (accordion) {
            onValueChange?.(value === name ? null : name);
            return;
        }
        const current = Array.isArray(value) ? [...value] : [];
        const idx = current.indexOf(name);
        if (idx >= 0) current.splice(idx, 1);
        else current.push(name);
        onValueChange?.(current);
    };

    const classes = ["arcana-accordion", className ?? ""].filter(Boolean).join(" ");

    return (
        <AccordionContext.Provider value={{ isOpen, toggle, animated }}>
            <div className={classes}>{children}</div>
        </AccordionContext.Provider>
    );
}
