import type { CSSProperties, ReactNode } from "react";

/**
 * Família `<ShadcnSpecSheet*>` — React port dos SFCs Vue. Display read-only de dados em
 * formato editorial/spec sheet. Markup/classes `shadcn-spec-sheet*` idênticos aos SFCs.
 *
 * Uso combinado (espelha os SFCs):
 *
 *     <ShadcnSpecSheet docNum="Cadastro Nº 042" title="Popgás Distribuidora" metaLabel="Status"
 *         meta={<span className="shadcn-spec-sheet-badge shadcn-spec-sheet-badge--active">Ativo</span>}
 *         footer={<button className="btn">Alterar Dados</button>}
 *     >
 *         <ShadcnSpecSheetSection title="Dados Cadastrais" sectionNum="§ 01">
 *             <ShadcnSpecSheetField label="Razão Social" value={form.tradingName} />
 *             <ShadcnSpecSheetField label="CNPJ" value={form.documentNumber} />
 *         </ShadcnSpecSheetSection>
 *     </ShadcnSpecSheet>
 *
 * Equivalências Vue → React:
 * - slots `#header` / `#title` / `#meta` / `#footer` / `#actions` → props ReactNode
 * - slot default → `children`
 * - slot default de `<ShadcnSpecSheetField>` (substitui o valor) → `children`
 */

type SpecSheetAccentColor =
    | "blue"
    | "emerald"
    | "amber"
    | "rose"
    | "violet"
    | "indigo"
    | "teal"
    | "slate";

// ── ShadcnSpecSheet ─────────────────────────────────────────────────────────
export interface ShadcnSpecSheetProps {
    docNum?: string;
    title?: ReactNode;
    metaLabel?: string;
    flat?: boolean;
    /** Substitui o header inteiro (slot `#header`). */
    header?: ReactNode;
    /** Conteúdo do bloco meta (slot `#meta`). */
    meta?: ReactNode;
    /** Rodapé de ações (slot `#footer`). */
    footer?: ReactNode;
    children?: ReactNode;
}

export function ShadcnSpecSheet({
    docNum = "",
    title = "",
    metaLabel = "",
    flat = false,
    header,
    meta,
    footer,
    children,
}: ShadcnSpecSheetProps) {
    const hasMeta = Boolean(metaLabel || meta);
    const hasHeader = Boolean(docNum || title || metaLabel || header || meta);

    const classes = ["shadcn-spec-sheet"];
    if (flat) classes.push("shadcn-spec-sheet--flat");

    return (
        <article className={classes.join(" ")}>
            {hasHeader && (
                <header className="shadcn-spec-sheet__header">
                    {header ?? (
                        <>
                            <div>
                                {docNum && (
                                    <div className="shadcn-spec-sheet__doc-num">{docNum}</div>
                                )}
                                {title && (
                                    <h2 className="shadcn-spec-sheet__doc-title">{title}</h2>
                                )}
                            </div>
                            {hasMeta && (
                                <div className="shadcn-spec-sheet__meta">
                                    {metaLabel && (
                                        <div className="shadcn-spec-sheet__meta-label">
                                            {metaLabel}
                                        </div>
                                    )}
                                    {meta}
                                </div>
                            )}
                        </>
                    )}
                </header>
            )}

            {children}

            {footer != null && footer !== false && (
                <footer className="shadcn-spec-sheet__footer">{footer}</footer>
            )}
        </article>
    );
}

// ── ShadcnSpecSheetSection ──────────────────────────────────────────────────
export interface ShadcnSpecSheetSectionProps {
    title?: ReactNode;
    sectionNum?: string;
    icon?: string;
    iconColor?: SpecSheetAccentColor;
    columns?: 1 | 2 | 3 | 4 | 5 | 6;
    noRowDividers?: boolean;
    compact?: boolean;
    /** Ações no canto direito do header (slot `#actions`). */
    actions?: ReactNode;
    children?: ReactNode;
}

export function ShadcnSpecSheetSection({
    title = "",
    sectionNum = "",
    icon = "",
    iconColor = "slate",
    columns = 2,
    noRowDividers = false,
    compact = false,
    actions,
    children,
}: ShadcnSpecSheetSectionProps) {
    const sectionClasses = ["shadcn-spec-sheet__section"];
    if (compact) sectionClasses.push("shadcn-spec-sheet__section--compact");

    const gridClasses = [
        "shadcn-spec-sheet__grid",
        `shadcn-spec-sheet__grid--cols-${columns}`,
    ];
    if (noRowDividers) gridClasses.push("shadcn-spec-sheet__grid--no-row-dividers");

    const hasHeader = Boolean(title || sectionNum || icon || actions);

    return (
        <section className={sectionClasses.join(" ")}>
            {hasHeader && (
                <header className="shadcn-spec-sheet__section-head">
                    <div className="shadcn-spec-sheet__section-head-left">
                        {icon && (
                            <span
                                className={`shadcn-spec-sheet__section-icon shadcn-spec-sheet__section-icon--${iconColor}`}
                                aria-hidden="true"
                            >
                                <i className={icon} />
                            </span>
                        )}
                        <h3 className="shadcn-spec-sheet__section-title">{title}</h3>
                    </div>
                    <div className="shadcn-spec-sheet__section-head-right">
                        {sectionNum && (
                            <span className="shadcn-spec-sheet__section-num">{sectionNum}</span>
                        )}
                        {actions}
                    </div>
                </header>
            )}

            <div className={gridClasses.join(" ")}>{children}</div>
        </section>
    );
}

// ── ShadcnSpecSheetField ────────────────────────────────────────────────────
export interface ShadcnSpecSheetFieldProps {
    label: string;
    value?: string | number | null;
    emptyText?: string;
    span?: number | string;
    /** Substitui o valor renderizado (slot default). */
    children?: ReactNode;
}

export function ShadcnSpecSheetField({
    label,
    value = "",
    emptyText = "Não informado",
    span = 1,
    children,
}: ShadcnSpecSheetFieldProps) {
    // Slot (children) sobrepõe o valor — se há children, NUNCA mostra como vazio.
    const hasChildren = children != null && children !== false;
    const isEmpty =
        !hasChildren && (value === null || value === undefined || value === "");
    const displayValue = isEmpty ? emptyText : String(value);

    const valueClasses = ["shadcn-spec-sheet__value"];
    if (isEmpty) valueClasses.push("shadcn-spec-sheet__value--empty");

    const style: CSSProperties | undefined =
        Number(span) > 1 ? { gridColumn: `span ${span}` } : undefined;

    return (
        <div className="shadcn-spec-sheet__field" style={style}>
            <div className="shadcn-spec-sheet__label">{label}</div>
            <div className={valueClasses.join(" ")}>
                {hasChildren ? children : displayValue}
            </div>
        </div>
    );
}
