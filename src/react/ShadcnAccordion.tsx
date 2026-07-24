import { createContext, useContext, type ReactNode } from "react";

/**
 * `<ShadcnAccordion>` / `<ShadcnAccordionItem>` — React port. Reproduz
 * `<div class="shadcn-accordion">` e o item (`shadcn-accordion-item` + `open`/`disabled`,
 * `shadcn-accordion-trigger`, `shadcn-accordion-title`, `shadcn-accordion-chevron`,
 * `shadcn-accordion-content`), idêntico ao SFC.
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

export interface ShadcnAccordionProps {
    value?: string | string[] | null;
    /** `true` (default): só um item aberto por vez. `false`: múltiplos (array). */
    accordion?: boolean;
    onValueChange?: (value: string | string[] | null) => void;
    className?: string;
    children?: ReactNode;
}

export function ShadcnAccordion({
    value = null,
    accordion = true,
    onValueChange,
    className,
    children,
}: ShadcnAccordionProps) {
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

    const classes = ["shadcn-accordion", className ?? ""].filter(Boolean).join(" ");

    return (
        <AccordionContext.Provider value={{ isOpen, toggle }}>
            <div className={classes}>{children}</div>
        </AccordionContext.Provider>
    );
}

export interface ShadcnAccordionItemProps {
    name: string;
    title?: ReactNode;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
}

export function ShadcnAccordionItem({
    name,
    title = "",
    disabled = false,
    className,
    children,
}: ShadcnAccordionItemProps) {
    const api = useContext(AccordionContext);
    if (!api) {
        throw new Error("ShadcnAccordionItem must be used within a ShadcnAccordion");
    }

    const open = api.isOpen(name);

    const rootClasses = [
        "shadcn-accordion-item",
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
                className="shadcn-accordion-trigger"
                disabled={disabled}
                onClick={() => {
                    if (disabled) return;
                    api.toggle(name);
                }}
            >
                <span className="shadcn-accordion-title">{title}</span>
                <i className="fa-solid fa-chevron-down shadcn-accordion-chevron" />
            </button>
            {/* Vue usa `v-show` — o content fica montado e alterna via `display` (preserva estado). */}
            <div
                className="shadcn-accordion-content"
                style={open ? undefined : { display: "none" }}
            >
                {children}
            </div>
        </div>
    );
}
