import {
    useState,
    type MouseEvent as ReactMouseEvent,
    type ReactNode,
} from "react";

/**
 * Família `<ArcanaSettingsList*>` — React port dos SFCs Vue. Lista de configurações
 * estilo iOS Settings. Markup/classes `arcana-settings-list*` idênticos aos SFCs.
 *
 * Uso combinado (espelha os SFCs):
 *
 *     <ArcanaSettingsList>
 *         <ArcanaSettingsListGroup title="Pedidos" icon="fa-solid fa-cart-shopping" iconColor="indigo">
 *             <ArcanaSettingsListItem label="Plano" caption="...">
 *                 <span className="arcana-settings-list__current-value">Profissional</span>
 *                 <button className="arcana-settings-list__edit-btn">Alterar</button>
 *             </ArcanaSettingsListItem>
 *             <ArcanaSettingsListItem label="PopGás" caption="...">
 *                 <ArcanaSwitch value={form.isPopgas} onValueChange={...} />
 *             </ArcanaSettingsListItem>
 *         </ArcanaSettingsListGroup>
 *     </ArcanaSettingsList>
 *
 * Equivalências Vue → React:
 * - slot default → `children`
 * - slots `#label` / `#caption` / `#title` / `#meta` → props ReactNode (`labelSlot`,
 *   `captionSlot`, `title`, `meta` aceitam ReactNode) — fallback pras props string
 * - `data.isCollapsed` (Group) → `useState`
 */

// ── ArcanaSettingsList ──────────────────────────────────────────────────────
export interface ArcanaSettingsListProps {
    children?: ReactNode;
}

export function ArcanaSettingsList({ children }: ArcanaSettingsListProps) {
    return <div className="arcana-settings-list">{children}</div>;
}

// ── ArcanaSettingsListGroup ─────────────────────────────────────────────────
export type SettingsGroupIconColor =
    | "blue"
    | "emerald"
    | "amber"
    | "rose"
    | "violet"
    | "indigo"
    | "teal"
    | "slate";

export interface ArcanaSettingsListGroupProps {
    title?: ReactNode;
    sectionNum?: string;
    meta?: ReactNode;
    icon?: string;
    iconColor?: SettingsGroupIconColor;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    compact?: boolean;
    children?: ReactNode;
}

export function ArcanaSettingsListGroup({
    title = "",
    sectionNum = "",
    meta,
    icon = "",
    iconColor = "slate",
    collapsible = false,
    defaultCollapsed = false,
    compact = false,
    children,
}: ArcanaSettingsListGroupProps) {
    const [isCollapsed, setIsCollapsed] = useState(collapsible && defaultCollapsed);

    const sectionClasses = ["arcana-settings-list__group"];
    if (compact) sectionClasses.push("arcana-settings-list__group--compact");
    if (collapsible) sectionClasses.push("arcana-settings-list__group--collapsible");
    if (collapsible && isCollapsed) sectionClasses.push("arcana-settings-list__group--collapsed");

    const hasTitle = Boolean(title);
    const hasMeta = Boolean(meta);

    const headProps = {
        className: "arcana-settings-list__group-head",
        onClick: collapsible ? () => setIsCollapsed((v) => !v) : undefined,
    };

    const headInner = (
        <>
            <div className="arcana-settings-list__group-head-left">
                {icon && (
                    <span
                        className={`arcana-settings-list__group-icon arcana-settings-list__group-icon--${iconColor}`}
                        aria-hidden="true"
                    >
                        <i className={icon} />
                    </span>
                )}
                <div>
                    {sectionNum && (
                        <div className="arcana-settings-list__group-num">{sectionNum}</div>
                    )}
                    <div className="arcana-settings-list__group-title">{title}</div>
                </div>
            </div>

            <div className="arcana-settings-list__group-head-right">
                {hasMeta && (
                    <div className="arcana-settings-list__group-meta">{meta}</div>
                )}
                {collapsible && (
                    <svg
                        className="arcana-settings-list__group-chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                )}
            </div>
        </>
    );

    return (
        <section className={sectionClasses.join(" ")}>
            {(hasTitle || hasMeta || icon || sectionNum) &&
                (collapsible ? (
                    <button
                        type="button"
                        aria-expanded={!isCollapsed}
                        {...headProps}
                    >
                        {headInner}
                    </button>
                ) : (
                    <header {...headProps}>{headInner}</header>
                ))}

            {(!collapsible || !isCollapsed) && <div>{children}</div>}
        </section>
    );
}

// ── ArcanaSettingsListItem ──────────────────────────────────────────────────
export interface ArcanaSettingsListItemProps {
    label?: ReactNode;
    caption?: ReactNode;
    disabled?: boolean;
    nested?: boolean;
    children?: ReactNode;
}

export function ArcanaSettingsListItem({
    label = "",
    caption = "",
    disabled = false,
    nested = false,
    children,
}: ArcanaSettingsListItemProps) {
    const classes = ["arcana-settings-list__item"];
    if (disabled) classes.push("arcana-settings-list__item--disabled");
    if (nested) classes.push("arcana-settings-list__item--nested");

    const hasCaption = Boolean(caption);

    return (
        <div className={classes.join(" ")}>
            <div className="arcana-settings-list__text">
                <div className="arcana-settings-list__label">{label}</div>
                {hasCaption && (
                    <div className="arcana-settings-list__caption">{caption}</div>
                )}
            </div>
            <div className="arcana-settings-list__action">{children}</div>
        </div>
    );
}

// ── Edit button (usado no slot de ação; helper interno reutilizável) ─────────
export interface ArcanaSettingsEditButtonProps {
    disabled?: boolean;
    label?: string;
    onClick?: (e: ReactMouseEvent<HTMLButtonElement>) => void;
}

export function ArcanaSettingsEditButton({
    disabled = false,
    label = "Alterar",
    onClick,
}: ArcanaSettingsEditButtonProps) {
    return (
        <button
            className="arcana-settings-list__edit-btn"
            type="button"
            disabled={disabled}
            onClick={onClick}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
            {label}
        </button>
    );
}
