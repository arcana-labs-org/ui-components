import { createContext, useContext, type ReactNode } from "react";

/**
 * `<ArcanaAccordion>` / `<ArcanaAccordionItem>` — React port. Reproduz
 * `<div class="arcana-accordion">` e o item (`arcana-accordion-item` + `open`/`disabled`,
 * `arcana-accordion-trigger`, `arcana-accordion-title`, `arcana-accordion-chevron`,
 * `arcana-accordion-content`), idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - `provide`/`inject` do `accordionApi` → React Context (`AccordionContext`)
 * - `modelValue` (v-model) → `value` + `onValueChange` (string | string[] | null)
 * - slots default/`#title` → `children` / prop `title`
 */

interface AccordionApi {
    isOpen: (name: string) => boolean;
    toggle: (name: string) => void;
}

const AccordionContext = createContext<AccordionApi | null>(null);

export interface ArcanaAccordionProps {
    value?: string | string[] | null;
    /** `true` (default): só um item aberto por vez. `false`: múltiplos (array). */
    accordion?: boolean;
    onValueChange?: (value: string | string[] | null) => void;
    className?: string;
    children?: ReactNode;
}

export function ArcanaAccordion({
    value = null,
    accordion = true,
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
        <AccordionContext.Provider value={{ isOpen, toggle }}>
            <div className={classes}>{children}</div>
        </AccordionContext.Provider>
    );
}

export interface ArcanaAccordionItemProps {
    name: string;
    title?: ReactNode;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
}

export function ArcanaAccordionItem({
    name,
    title = "",
    disabled = false,
    className,
    children,
}: ArcanaAccordionItemProps) {
    const api = useContext(AccordionContext);
    if (!api) {
        throw new Error("ArcanaAccordionItem must be used within a ArcanaAccordion");
    }

    const open = api.isOpen(name);

    const rootClasses = [
        "arcana-accordion-item",
        open ? "open" : "",
        disabled ? "disabled" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={rootClasses}>
            <button
                type="button"
                className="arcana-accordion-trigger"
                disabled={disabled}
                onClick={() => {
                    if (disabled) return;
                    api.toggle(name);
                }}
            >
                <span className="arcana-accordion-title">{title}</span>
                <i className="fa-solid fa-chevron-down arcana-accordion-chevron" />
            </button>
            {/* Vue usa `v-show` — o content fica montado e alterna via `display` (preserva estado). */}
            <div
                className="arcana-accordion-content"
                style={open ? undefined : { display: "none" }}
            >
                {children}
            </div>
        </div>
    );
}
