import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { render as renderReact, fireEvent } from "@testing-library/react";
import { render as renderSvelte } from "@testing-library/svelte";
import { createElement } from "react";
import { flushSync } from "svelte";
import { readFileSync } from "node:fs";

import VueCurrency from "../src/vue/components/ArcanaInputCurrency.vue";
import { ArcanaInputCurrency as ReactCurrency } from "../src/react";
import SvelteCurrency from "../src/svelte/ArcanaInputCurrency.svelte";
import { maskCurrency, formatCurrencyDigits, currencyDigitsFromValue } from "../src/core/currency";

/**
 * A máscara de moeda vivia em quatro implementações: React, Angular e Svelte
 * tinham cópias próprias e o Vue delegava à `v-money3` — uma dependência de
 * runtime que só o Vue usava. Agora os quatro consomem `core/currency`.
 *
 * Estes casos são a definição de paridade. Foram conferidos contra a saída da
 * `v-money3` ANTES da troca, então também servem de prova de que a remoção da
 * dependência preservou o comportamento.
 */
const CASOS: Array<[string, string]> = [
  ["1", "0,01"],
  ["12", "0,12"],
  ["123", "1,23"],
  ["1234", "12,34"],
  ["123456", "1.234,56"],
  ["0", "0,00"],
  ["100", "1,00"],
  ["abc9", "0,09"]
];

describe("core/currency — máscara compartilhada", () => {
  it.each(CASOS)("digitar %s exibe %s", (entrada, esperado) => {
    expect(formatCurrencyDigits(entrada.replace(/\D/g, ""), 2, "")).toBe(esperado);
  });

  it("aceita número, string crua e string já mascarada", () => {
    expect(maskCurrency(1234.56, 2)).toBe("1.234,56");
    expect(maskCurrency("1234.56", 2)).toBe("1.234,56");
    expect(maskCurrency("1.234,56", 2)).toBe("1.234,56");
  });

  it("precisão zero não emite parte decimal", () => {
    expect(formatCurrencyDigits("1234", 0, "")).toBe("1.234");
  });

  it("prefixo entra antes do valor", () => {
    expect(formatCurrencyDigits("123456", 2, "R$ ")).toBe("R$ 1.234,56");
  });

  it("valor vazio não vira dígito algum", () => {
    expect(currencyDigitsFromValue("", 2)).toBe("");
    expect(currencyDigitsFromValue(null, 2)).toBe("");
  });
});

describe("ArcanaInputCurrency — paridade entre frameworks", () => {
  it.each(CASOS)("Vue, React e Svelte exibem %s como %s", (entrada, esperado) => {
    const vw = mount(VueCurrency, { props: { modelValue: "" } });
    const vueInput = vw.find("input").element as HTMLInputElement;
    vueInput.value = entrada;
    vw.find("input").trigger("input");

    const { container } = renderReact(createElement(ReactCurrency, { value: "" }));
    const reactInput = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(reactInput, { target: { value: entrada } });

    const svelte = renderSvelte(SvelteCurrency, { props: { value: "" } });
    const svelteInput = svelte.container.querySelector("input") as HTMLInputElement;
    svelteInput.value = entrada;
    svelteInput.dispatchEvent(new Event("input", { bubbles: true }));
    // Svelte 5 agrupa atualizações: sem o flush o DOM ainda não refletiu a mudança.
    flushSync();

    expect(vueInput.value).toBe(esperado);
    expect(reactInput.value).toBe(esperado);
    expect(svelteInput.value).toBe(esperado);
  });

  it("nenhum port importa v-money3, e ela saiu do runtime", () => {
    const arquivos = [
      "src/vue/components/ArcanaInputCurrency.vue",
      "src/react/ArcanaInputCurrency.tsx",
      "src/angular/arcana-input-currency.component.ts",
      "src/svelte/ArcanaInputCurrency.svelte"
    ];
    // Caminhos a partir de `process.cwd()`: sob o vitest o `import.meta.url` não é
    // uma URL `file:`, e sim a do servidor de dev, então `new URL` não serve aqui.
    for (const arquivo of arquivos) {
      const fonte = readFileSync(arquivo, "utf8");
      expect(fonte, arquivo).not.toMatch(/^\s*import .*v-money3/m);
    }
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    expect(pkg.dependencies).not.toHaveProperty("v-money3");
  });
});
