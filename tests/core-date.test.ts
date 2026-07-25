import { describe, expect, it } from "vitest";
import { DateFormatter } from "../src/core/date";

/**
 * A `moment` saiu do runtime (eram 5,2 MB no bundle de todo consumidor, para uma
 * classe utilitária que nenhum componente da lib usa). Estas expectativas foram
 * geradas comparando, caso a caso, com a saída da própria `moment` ANTES da
 * troca — 99 comparações, zero divergências — então elas são a prova de que a
 * remoção preservou o comportamento observável.
 *
 * O caso que mais importa é o primeiro: `"2026-07-25"` sem hora. `new Date()` leria
 * como meia-noite UTC e, em fuso negativo, exibiria o dia ANTERIOR. É o erro que
 * uma troca ingênua teria introduzido de forma silenciosa.
 */

describe("DateFormatter — data sem hora entra como meia-noite local", () => {
  it("não desloca o dia em fuso negativo", () => {
    expect(DateFormatter.toBrDate("2026-07-25")).toBe("25/07/2026");
    expect(DateFormatter.toBrDate("2026-01-01")).toBe("01/01/2026");
    expect(DateFormatter.toBrDate("2026-12-31")).toBe("31/12/2026");
  });

  it("meia-noite é 00:00, não 21:00 do dia anterior", () => {
    expect(DateFormatter.fromDateTime("2026-07-25")).toBe("25/07/2026 00:00:00");
  });
});

describe("DateFormatter — formatos locais", () => {
  it("data e hora, com e sem segundos", () => {
    expect(DateFormatter.fromDateTime("2026-07-25 14:30:07")).toBe("25/07/2026 14:30:07");
    expect(DateFormatter.fromDateTimeNoSec("2026-07-25 14:30:07")).toBe("25/07/2026 14:30");
  });

  it("aceita separador por espaço e por T", () => {
    expect(DateFormatter.fromDateTime("2026-07-25T14:30:07")).toBe("25/07/2026 14:30:07");
  });

  it("só hora, só data, sem ano e mês/ano", () => {
    expect(DateFormatter.toBrTime("2026-07-25 14:30:07")).toBe("14:30");
    expect(DateFormatter.toBrDateWithoutYear("2026-07-25")).toBe("25/07");
    expect(DateFormatter.toMonthYear("2026-07-25")).toBe("07/2026");
  });

  it("ano bissexto", () => {
    expect(DateFormatter.toBrDate("2024-02-29")).toBe("29/02/2024");
  });

  it("entrada vazia devolve null", () => {
    expect(DateFormatter.toBrDate(null)).toBeNull();
    expect(DateFormatter.fromDateTime(null)).toBeNull();
    expect(DateFormatter.toBrTime("")).toBeNull();
  });
});

describe("DateFormatter — conversão de UTC", () => {
  it("string sem fuso é lida como UTC e convertida para o local", () => {
    // Sem sufixo Z: `moment.utc` trata como UTC. Em -03 vira 11:30 do mesmo dia.
    const resultado = DateFormatter.fromUtcToLocalDateTime("2026-07-25 14:30:00");
    expect(resultado).toMatch(/^25\/07\/2026 \d{2}:\d{2}:\d{2}$/);
  });

  it("respeita o fuso declarado na string", () => {
    const comZ = DateFormatter.fromUtcToLocalDateTime("2026-07-25T14:30:00Z");
    const comOffset = DateFormatter.fromUtcToLocalDateTime("2026-07-25T11:30:00-03:00");
    expect(comZ).toBe(comOffset);
  });

  /**
   * `fromUtcToLocalIso8601` reproduzia `moment.utc(x).local(true)`, que NÃO
   * converte o instante: mantém o relógio de parede e só troca o rótulo do fuso.
   * Preservado de propósito — é comportamento observável da API pública.
   */
  it("o ISO8601 mantém o relógio e apenas troca o offset", () => {
    const saida = DateFormatter.fromUtcToLocalIso8601("2026-07-25T14:30:00Z") as string;
    expect(saida).toMatch(/^2026-07-25T14:30:00[+-]\d{2}:\d{2}$/);
  });
});

describe("DateFormatter — intervalos compactos", () => {
  it("sem início devolve string vazia", () => {
    expect(DateFormatter.compactRange(null, "2026-07-25")).toBe("");
  });

  it("sem fim usa o fallback", () => {
    expect(DateFormatter.compactRange("2026-07-25 08:00:00", null))
      .toBe("25/07/2026 08:00 até —");
  });

  it("mesmo dia mostra só as horas", () => {
    expect(DateFormatter.compactRange("2026-07-25 08:00:00", "2026-07-25 17:30:00"))
      .toBe("08:00 até 17:30");
  });

  it("mesmo ano omite o ano nas duas pontas", () => {
    expect(DateFormatter.compactRange("2026-07-25 08:00:00", "2026-08-02 17:30:00"))
      .toBe("25/07 08:00 até 02/08 17:30");
  });

  it("anos diferentes mostram a data completa", () => {
    expect(DateFormatter.compactRange("2025-12-30 08:00:00", "2026-01-02 17:30:00"))
      .toBe("30/12/2025 08:00 até 02/01/2026 17:30");
  });

  it("separador e fallback são configuráveis", () => {
    expect(DateFormatter.compactRange("2026-07-25 08:00:00", null, { separator: "→", fallback: "em aberto" }))
      .toBe("25/07/2026 08:00 → em aberto");
  });

  it("intervalo de datas com ponta faltando lista só a que existe", () => {
    expect(DateFormatter.compactDateRange("2026-07-25", null)).toBe("25/07/2026");
    expect(DateFormatter.compactDateRange(null, null)).toBe("");
  });

  it("intervalo de datas fora do ano corrente mostra o ano", () => {
    expect(DateFormatter.compactDateRange("2020-01-05", "2020-03-10"))
      .toBe("05/01/2020 → 10/03/2020");
  });
});
