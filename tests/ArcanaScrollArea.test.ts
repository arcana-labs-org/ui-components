import "@angular/compiler";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { render } from "@testing-library/react";
import { mount } from "@vue/test-utils";
import { flushSync, mount as svelteMount, unmount } from "svelte";
import { createElement } from "react";
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";

import ArcanaScrollAreaVue from "../src/vue/components/ArcanaScrollArea.vue";
import { ArcanaScrollArea as ArcanaScrollAreaReact } from "../src/react/ArcanaScrollArea";
import ArcanaScrollAreaSvelte from "../src/svelte/ArcanaScrollArea.svelte";
import { ArcanaScrollAreaComponent } from "../src/angular/arcana-scroll-area.component";

/**
 * `ArcanaScrollArea` nos 4 frameworks: wrapper com os modificadores de eixo/tipo +
 * `.arcana-scroll-area__viewport` (o elemento que ROLA, com a altura aplicada).
 * A rolagem é nativa — o que se testa aqui é justamente que o componente só
 * configura o viewport (classes, custom properties, `tabindex`), sem JS de scroll.
 */
/**
 * Contrato de LAYOUT (CSS): sem `height`/`max-height`, "a altura vem do flex pai".
 *
 * Isso só funciona se a RAIZ for um flex column e o viewport preencher (`flex: 1; min-height: 0`).
 * Como `display: block` + viewport `height: auto`, o viewport crescia com o conteúdo, transbordava
 * a raiz e vazava por cima de irmãos (ex: um rodapé fixo numa sidebar). Estas asserções travam a
 * regra na folha real para a regressão não voltar silenciosa.
 */
describe("ArcanaScrollArea — contrato de layout (CSS)", () => {
    const scss = readFileSync("src/styles/parts/scroll-area.scss", "utf8");

    const rootBlock = scss.slice(
        scss.indexOf(".arcana-scroll-area {"),
        scss.indexOf(".arcana-scroll-area__viewport {"),
    );
    const viewportBlock = scss.slice(scss.indexOf(".arcana-scroll-area__viewport {"));

    it("a raiz é um flex column (para dar altura ao viewport pelo pai)", () => {
        expect(rootBlock).toMatch(/display:\s*flex/);
        expect(rootBlock).toMatch(/flex-direction:\s*column/);
    });

    it("o viewport preenche a raiz (flex: 1 + min-height: 0)", () => {
        expect(viewportBlock.slice(0, 400)).toMatch(/flex:\s*1 1 auto/);
        expect(viewportBlock.slice(0, 400)).toMatch(/min-height:\s*0/);
    });
});

describe("ArcanaScrollArea — Vue", () => {
    it("aplica orientação, tipo, tokens de barra e altura no viewport", () => {
        const wrapper = mount(ArcanaScrollAreaVue, {
            props: { orientation: "both", type: "hover", maxHeight: 240, scrollbarSize: 12, hideDelay: 800 },
            slots: { default: '<p class="linha">conteúdo</p>' },
        });

        const root = wrapper.find(".arcana-scroll-area");
        expect(root.classes()).toContain("arcana-scroll-area--both");
        expect(root.classes()).toContain("arcana-scroll-area--type-hover");
        expect(root.attributes("style")).toContain("--arcana-scroll-area-size: 12px");
        expect(root.attributes("style")).toContain("--arcana-scroll-area-hide-delay: 800ms");

        const viewport = wrapper.find(".arcana-scroll-area__viewport");
        expect(viewport.attributes("style")).toContain("max-height: 240px");
        expect(viewport.attributes("tabindex")).toBe("0");
        expect(viewport.find(".linha").exists()).toBe(true);
    });

    it("defaults: vertical + type auto, e `tabbable: false` tira o tabindex", () => {
        const wrapper = mount(ArcanaScrollAreaVue, { props: { tabbable: false } });
        expect(wrapper.classes()).toContain("arcana-scroll-area--vertical");
        expect(wrapper.classes()).toContain("arcana-scroll-area--type-auto");
        expect(wrapper.find(".arcana-scroll-area__viewport").attributes("tabindex")).toBeUndefined();
    });
});

describe("ArcanaScrollArea — React", () => {
    it("emite as mesmas classes e a mesma altura no viewport", () => {
        const { container } = render(
            createElement(
                ArcanaScrollAreaReact,
                { orientation: "horizontal", type: "always", height: "40vh" },
                createElement("p", { className: "linha" }, "conteúdo"),
            ),
        );

        const root = container.querySelector(".arcana-scroll-area") as HTMLElement;
        expect(root.className).toContain("arcana-scroll-area--horizontal");
        expect(root.className).toContain("arcana-scroll-area--type-always");

        const viewport = container.querySelector(".arcana-scroll-area__viewport") as HTMLElement;
        expect(viewport.style.height).toBe("40vh");
        expect(viewport.getAttribute("tabindex")).toBe("0");
    });
});

describe("ArcanaScrollArea — Svelte", () => {
    it("emite as mesmas classes e a mesma altura no viewport", () => {
        const target = document.createElement("div");
        document.body.appendChild(target);
        const component = svelteMount(ArcanaScrollAreaSvelte, {
            target,
            props: { orientation: "both", type: "hover", maxHeight: 200 },
        });
        flushSync();

        const root = target.querySelector(".arcana-scroll-area") as HTMLElement;
        expect(root.className).toContain("arcana-scroll-area--both");
        expect(root.className).toContain("arcana-scroll-area--type-hover");

        const viewport = target.querySelector(".arcana-scroll-area__viewport") as HTMLElement;
        expect(viewport.style.maxHeight).toBe("200px");

        unmount(component);
        target.remove();
    });
});

describe("ArcanaScrollArea — Angular", () => {
    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
    });

    @Component({
        standalone: true,
        imports: [ArcanaScrollAreaComponent],
        template: `<div arcanaScrollArea orientation="both" type="always" [maxHeight]="180"><p class="linha">conteúdo</p></div>`,
    })
    class Host {}

    it("emite as mesmas classes e a mesma altura no viewport", () => {
        TestBed.configureTestingModule({
            imports: [Host],
            providers: [provideZonelessChangeDetection()],
        });
        const fixture = TestBed.createComponent(Host);
        fixture.detectChanges();

        const root = fixture.nativeElement.querySelector(".arcana-scroll-area") as HTMLElement;
        expect(root.className).toContain("arcana-scroll-area--both");
        expect(root.className).toContain("arcana-scroll-area--type-always");

        const viewport = root.querySelector(".arcana-scroll-area__viewport") as HTMLElement;
        expect(viewport.style.maxHeight).toBe("180px");
        expect(viewport.getAttribute("tabindex")).toBe("0");
        expect(viewport.querySelector(".linha")).not.toBeNull();
    });
});
