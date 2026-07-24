import type { ButtonHTMLAttributes, MouseEvent } from "react";

/**
 * `<LabeledButton>` — React port do SFC Vue. Reproduz o mesmo markup/classes do
 * componente base (shadcn `shadcn-btn shadcn-btn--${variant}` OU legado
 * `btn bg-{color} btn-labeled`), incluindo o mapping de `color` legado → variant
 * semântica shadcn.
 *
 * Equivalências Vue → React:
 * - `v-bind="forwardedAttrs"` (attrs não-class) → `...rest` (props HTML nativas)
 * - `emit('click', $event)` → `onClick`
 * - `class` extra do caller → `className`
 */
export interface LabeledButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "color"> {
    icon?: string;
    color?: string;
    disabled?: boolean;
    label: string;
    shadcn?: boolean;
    loading?: boolean;
    centerLabel?: boolean;
    centerContent?: boolean;
    onClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

function shadcnVariantFrom(color: string): string {
    const c = String(color ?? "").toLowerCase();
    const isDanger = c.startsWith("danger") || c.startsWith("error") || c.startsWith("red");
    if (isDanger && c.includes("outline")) return "destructive-outline";
    if (isDanger) return "destructive";
    if (c === "white" || c.startsWith("grey") || c.startsWith("gray") || c.startsWith("slate")) return "ghost";
    if (c.startsWith("teal")) return "teal";
    if (c.startsWith("success") || c.startsWith("green") || c.startsWith("emerald")) return "success";
    if (c.startsWith("blue") || c.startsWith("sky") || c.startsWith("azure")) return "info";
    if (c.startsWith("amber") || c.startsWith("orange") || c.startsWith("yellow")) return "warning";
    if (c.startsWith("indigo") || c.startsWith("violet") || c.startsWith("purple")) return "alert";
    return "primary";
}

export function LabeledButton({
    icon = "",
    color = "info-700",
    disabled = false,
    label,
    shadcn = false,
    loading = false,
    centerLabel = false,
    centerContent = false,
    onClick,
    className,
    ...rest
}: LabeledButtonProps) {
    const list: string[] = [];

    if (shadcn) {
        list.push("shadcn-btn", `shadcn-btn--${shadcnVariantFrom(color)}`);
        if (centerLabel) list.push("shadcn-btn--center-label");
        else if (centerContent) list.push("shadcn-btn--center-content");
    } else {
        list.push("btn", `bg-${color}`, "btn-labeled");
    }

    if (className && typeof className === "string") list.push(className);

    const classes = list.join(" ");

    return (
        <button
            {...rest}
            type="button"
            disabled={Boolean(disabled) || Boolean(loading)}
            className={classes}
            onClick={(ev) => {
                ev.preventDefault();
                onClick?.(ev);
            }}
        >
            {shadcn ? (
                <>
                    {loading ? (
                        <i className="fa-solid fa-spinner fa-spin shadcn-btn__icon" />
                    ) : icon ? (
                        <i className={`${icon} shadcn-btn__icon`} />
                    ) : null}
                    <span>{label}</span>
                </>
            ) : (
                <>
                    <b>
                        <i
                            className={loading ? "fa-solid fa-spinner fa-spin" : icon}
                            style={{ fontSize: "15px" }}
                        />
                    </b>
                    {" "}
                    {label}
                </>
            )}
        </button>
    );
}
