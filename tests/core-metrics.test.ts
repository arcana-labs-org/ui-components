import { describe, it, expect } from "vitest";

import {
  DEFAULT_COUNTDOWN_FORMAT,
  countdownTickInterval,
  formatCountdown,
  formatDuration,
  largestUnit,
  parseCountdownTarget,
  remainingMs,
  splitDuration
} from "../src/core/countdown";
import { formatStatisticValue } from "../src/core/statistic";
import { clampProgressValue, formatProgressLabel, progressPercent } from "../src/core/progress";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("core/countdown — parseCountdownTarget", () => {
  it("aceita epoch, Date, string numérica e ISO", () => {
    expect(parseCountdownTarget(1700000000000)).toBe(1700000000000);
    expect(parseCountdownTarget(new Date(1700000000000))).toBe(1700000000000);
    expect(parseCountdownTarget("1700000000000")).toBe(1700000000000);
    expect(parseCountdownTarget("2023-11-14T22:13:20.000Z")).toBe(1700000000000);
  });

  it("devolve null pra vazio/inválido (nada de NaN vazando pro render)", () => {
    expect(parseCountdownTarget(null)).toBeNull();
    expect(parseCountdownTarget(undefined)).toBeNull();
    expect(parseCountdownTarget("")).toBeNull();
    expect(parseCountdownTarget("   ")).toBeNull();
    expect(parseCountdownTarget("amanhã")).toBeNull();
    expect(parseCountdownTarget(Number.NaN)).toBeNull();
    expect(parseCountdownTarget(new Date("nope"))).toBeNull();
  });
});

describe("core/countdown — remainingMs", () => {
  it("clampa em zero quando o alvo já passou", () => {
    expect(remainingMs(1_000, 5_000)).toBe(0);
    expect(remainingMs(5_000, 1_000)).toBe(4_000);
    expect(remainingMs(null, 1_000)).toBe(0);
  });
});

describe("core/countdown — splitDuration", () => {
  it("quebra sem estourar as unidades (dias carregam o resto)", () => {
    const parts = splitDuration(2 * DAY + 3 * HOUR + 4 * MINUTE + 5 * SECOND + 678);
    expect(parts).toMatchObject({
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5,
      milliseconds: 678,
      finished: false
    });
  });

  it("zera negativo/NaN e marca finished", () => {
    expect(splitDuration(-500)).toMatchObject({ total: 0, finished: true });
    expect(splitDuration(Number.NaN)).toMatchObject({ total: 0, finished: true });
  });
});

describe("core/countdown — formatDuration", () => {
  it("usa HH:mm:ss por padrão", () => {
    expect(DEFAULT_COUNTDOWN_FORMAT).toBe("HH:mm:ss");
    expect(formatDuration(3 * HOUR + 25 * MINUTE + 9 * SECOND)).toBe("03:25:09");
  });

  it("a MAIOR unidade do formato absorve o excedente", () => {
    // 50h não cabem em 24: sem `DD` no formato, `HH` acumula.
    expect(formatDuration(50 * HOUR)).toBe("50:00:00");
    expect(formatDuration(50 * HOUR, "DD:HH:mm:ss")).toBe("02:02:00:00");
    expect(formatDuration(90 * MINUTE, "mm:ss")).toBe("90:00");
    expect(formatDuration(90 * SECOND, "ss")).toBe("90");
  });

  it("respeita padding de 1 vs 2 dígitos", () => {
    expect(formatDuration(5 * MINUTE + 7 * SECOND, "m:s")).toBe("5:7");
    expect(formatDuration(5 * MINUTE + 7 * SECOND, "mm:ss")).toBe("05:07");
  });

  it("formata milissegundos em 3, 2 e 1 dígitos", () => {
    expect(formatDuration(1234, "ss.SSS")).toBe("01.234");
    expect(formatDuration(1234, "ss.SS")).toBe("01.23");
    expect(formatDuration(1234, "ss.S")).toBe("01.2");
  });

  it("emite literais entre colchetes verbatim", () => {
    expect(formatDuration(2 * DAY + 3 * HOUR, "DD [dias] HH:mm:ss")).toBe("02 dias 03:00:00");
    // O `D` dentro do literal NÃO é token.
    expect(formatDuration(0, "[DD HH mm]")).toBe("DD HH mm");
  });

  it("trata negativo/NaN como zero", () => {
    expect(formatDuration(-10_000)).toBe("00:00:00");
    expect(formatDuration(Number.NaN)).toBe("00:00:00");
  });

  it("formatCountdown junta relógio + formatação", () => {
    expect(formatCountdown(10_000, 4_000, "mm:ss")).toBe("00:06");
    expect(formatCountdown(1_000, 9_000, "mm:ss")).toBe("00:00");
  });
});

describe("core/countdown — introspecção do formato", () => {
  it("largestUnit acha a unidade mais grossa", () => {
    expect(largestUnit("HH:mm:ss")).toBe("H");
    expect(largestUnit("DD:HH")).toBe("D");
    expect(largestUnit("ss.SSS")).toBe("s");
    expect(largestUnit("[nada]")).toBeNull();
  });

  it("countdownTickInterval acelera só quando há milissegundos", () => {
    expect(countdownTickInterval("HH:mm:ss")).toBe(1000);
    expect(countdownTickInterval("mm:ss.SSS")).toBe(50);
    // `S` dentro de literal não conta.
    expect(countdownTickInterval("mm:ss [S]")).toBe(1000);
  });
});

describe("core/statistic — formatStatisticValue", () => {
  it("agrupa milhares e fixa a precisão", () => {
    expect(formatStatisticValue(1234567)).toBe("1,234,567");
    expect(formatStatisticValue(1234.5678, { precision: 2 })).toBe("1,234.57");
    expect(formatStatisticValue(1234.5, { precision: 0 })).toBe("1,235");
  });

  it("respeita separadores custom e desliga o agrupamento com ''", () => {
    expect(
      formatStatisticValue(1234567.89, {
        precision: 2,
        groupSeparator: ".",
        decimalSeparator: ","
      })
    ).toBe("1.234.567,89");
    expect(formatStatisticValue(1234567, { groupSeparator: "" })).toBe("1234567");
  });

  it("preserva o sinal negativo", () => {
    expect(formatStatisticValue(-9876.5, { precision: 1 })).toBe("-9,876.5");
  });

  it("string passa intacta e vazio vira ''", () => {
    expect(formatStatisticValue("1,2 mil")).toBe("1,2 mil");
    expect(formatStatisticValue(null)).toBe("");
    expect(formatStatisticValue(undefined)).toBe("");
    expect(formatStatisticValue("")).toBe("");
  });

  it("locale liga o Intl e vence os separadores manuais", () => {
    expect(
      formatStatisticValue(1234.5, { precision: 2, locale: "pt-BR", groupSeparator: "_" })
    ).toBe("1.234,50");
  });

  it("locale inválido cai no caminho manual em vez de lançar", () => {
    expect(formatStatisticValue(1234, { locale: "não-é-locale" })).toBe("1,234");
  });

  it("não maquia não-finitos", () => {
    expect(formatStatisticValue(Number.NaN)).toBe("NaN");
    expect(formatStatisticValue(Number.POSITIVE_INFINITY)).toBe("Infinity");
  });
});

describe("core/progress", () => {
  it("converte valor em percentual e clampa nas pontas", () => {
    expect(progressPercent(50)).toBe(50);
    expect(progressPercent(25, 50)).toBe(50);
    expect(progressPercent(-10)).toBe(0);
    expect(progressPercent(140)).toBe(100);
  });

  it("null/undefined/não-finito = indeterminado", () => {
    expect(progressPercent(null)).toBeNull();
    expect(progressPercent(undefined)).toBeNull();
    expect(progressPercent(Number.NaN)).toBeNull();
    expect(clampProgressValue(null)).toBeNull();
  });

  it("max inválido cai no default 100", () => {
    expect(progressPercent(50, 0)).toBe(50);
    expect(progressPercent(50, -5)).toBe(50);
    expect(clampProgressValue(150, 0)).toBe(100);
  });

  it("rótulo arredondado; vazio no indeterminado", () => {
    expect(formatProgressLabel(33.333)).toBe("33%");
    expect(formatProgressLabel(2, 3)).toBe("67%");
    expect(formatProgressLabel(null)).toBe("");
  });
});
