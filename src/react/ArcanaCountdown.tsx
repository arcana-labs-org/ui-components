import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

import {
    DEFAULT_COUNTDOWN_FORMAT,
    countdownTickInterval,
    formatDuration,
    remainingMs,
} from "../core/countdown";

/**
 * `<ArcanaCountdown>` — React port. Contagem regressiva até um instante alvo. Reproduz
 * `<div class="arcana-countdown arcana-countdown--{size} arcana-countdown--{tone}">`
 * (+ `is-finished`/`is-paused`), o `__title` e o `__content` com
 * `__prefix`/`__value`/`__suffix`, idêntico ao SFC.
 *
 * Equivalências Vue → React:
 * - slots `#title`/`#prefix`/`#suffix` → props `titleSlot`/`prefixSlot`/`suffixSlot`
 * - `emit('change', ms)` / `emit('finish')` → `onChange(ms)` / `onFinish()`
 * - métodos `pause()/resume()/restart()` → handle via `ref` (`ArcanaCountdownHandle`)
 *
 * Timers: um único `setInterval` por efeito, com `clearInterval` no cleanup (troca de
 * `value`/`format`/`interval`/pausa e unmount) — nada acumula. Os callbacks vivem numa ref,
 * então re-render do pai NÃO reinicia o intervalo. Cada tick recalcula o restante a partir
 * do relógio (sem drift acumulado).
 *
 * A formatação vive em `core/countdown.ts` (framework-agnóstica e testada).
 */
export type CountdownTone = "neutral" | "success" | "danger" | "warning" | "info";
export type CountdownSize = "sm" | "md" | "lg" | "xl";

export interface ArcanaCountdownHandle {
    pause: () => void;
    resume: () => void;
    /** Zera a trava do `finish` e recomeça a partir do `value` atual. */
    restart: () => void;
}

export interface ArcanaCountdownProps {
    /** Instante ALVO: epoch em ms, `Date` ou string ISO. Inválido/vazio zera o contador. */
    value?: number | string | Date | null;
    /**
     * Tokens `DD`,`D`,`HH`,`H`,`mm`,`m`,`ss`,`s`,`SSS`,`SS`,`S` + literais entre colchetes.
     * A maior unidade presente absorve o excedente (50h → `50:00:00` em `HH:mm:ss`).
     */
    format?: string;
    prefix?: string;
    suffix?: string;
    title?: string;
    tone?: CountdownTone;
    valueColor?: string;
    size?: CountdownSize;
    /** Pausa a contagem (o valor congela). Voltar pra `false` retoma. */
    paused?: boolean;
    /** Período do tick em ms. Default: 50ms com milissegundos no `format`, senão 1000ms. */
    interval?: number;
    onChange?: (remaining: number) => void;
    onFinish?: () => void;
    titleSlot?: ReactNode;
    prefixSlot?: ReactNode;
    suffixSlot?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export const ArcanaCountdown = forwardRef<ArcanaCountdownHandle, ArcanaCountdownProps>(
    function ArcanaCountdown(
        {
            value = null,
            format = DEFAULT_COUNTDOWN_FORMAT,
            prefix = "",
            suffix = "",
            title = "",
            tone = "neutral",
            valueColor = "",
            size = "md",
            paused = false,
            interval,
            onChange,
            onFinish,
            titleSlot,
            prefixSlot,
            suffixSlot,
            className,
            style,
        },
        ref
    ) {
        // Alvo memoizado: `new Date(...)` inline no pai muda de identidade a cada render,
        // mas o timestamp não — é ele que entra nas deps do efeito.
        const targetKey = useMemo(
            () => (value instanceof Date ? value.getTime() : (value ?? null)),
            [value]
        );

        const [remaining, setRemaining] = useState(() => remainingMs(value, Date.now()));
        const [isPaused, setIsPaused] = useState(paused);
        // `restart()` força o efeito a rodar de novo sem depender de `value`.
        const [runId, setRunId] = useState(0);

        // Callbacks em ref: mudam de identidade a cada render do pai e não podem
        // reiniciar o intervalo.
        const callbacks = useRef({ onChange, onFinish });
        callbacks.current = { onChange, onFinish };

        const finishedRef = useRef(false);

        useEffect(() => {
            setIsPaused(paused);
        }, [paused]);

        // Alvo novo → nova corrida (a trava do `finish` é liberada).
        useEffect(() => {
            finishedRef.current = false;
            setRemaining(remainingMs(value, Date.now()));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [targetKey, runId]);

        const tickMs = interval && interval > 0 ? interval : countdownTickInterval(format);

        useEffect(() => {
            if (isPaused) return;

            const settle = (rest: number) => {
                setRemaining(rest);
                if (rest <= 0 && !finishedRef.current) {
                    finishedRef.current = true;
                    callbacks.current.onFinish?.();
                    return true;
                }
                return false;
            };

            const initial = remainingMs(value, Date.now());
            if (finishedRef.current || settle(initial)) return;

            const timer = setInterval(() => {
                const rest = remainingMs(value, Date.now());
                callbacks.current.onChange?.(rest);
                if (settle(rest)) clearInterval(timer);
            }, tickMs);

            return () => clearInterval(timer);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [targetKey, tickMs, isPaused, runId]);

        const restart = useCallback(() => {
            finishedRef.current = false;
            setRunId((id) => id + 1);
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                pause: () => setIsPaused(true),
                resume: () => setIsPaused(false),
                restart,
            }),
            [restart]
        );

        const displayValue = formatDuration(remaining, format);
        const hasTitle = Boolean(titleSlot || title);
        const hasPrefix = Boolean(prefixSlot || prefix);
        const hasSuffix = Boolean(suffixSlot || suffix);

        const rootClasses = [
            "arcana-countdown",
            `arcana-countdown--${size}`,
            `arcana-countdown--${tone}`,
            remaining <= 0 ? "is-finished" : "",
            isPaused ? "is-paused" : "",
            className ?? "",
        ]
            .filter(Boolean)
            .join(" ");

        const rootStyle = valueColor
            ? ({ ...(style ?? {}), "--arcana-countdown-value-color": valueColor } as CSSProperties)
            : style;

        return (
            <div className={rootClasses} style={rootStyle} role="timer">
                {hasTitle ? (
                    <div className="arcana-countdown__title">{titleSlot ?? title}</div>
                ) : null}

                <div className="arcana-countdown__content">
                    {hasPrefix ? (
                        <span className="arcana-countdown__prefix">{prefixSlot ?? prefix}</span>
                    ) : null}

                    <span className="arcana-countdown__value">{displayValue}</span>

                    {hasSuffix ? (
                        <span className="arcana-countdown__suffix">{suffixSlot ?? suffix}</span>
                    ) : null}
                </div>
            </div>
        );
    }
);
