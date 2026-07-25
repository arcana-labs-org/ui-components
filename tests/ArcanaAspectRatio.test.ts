import "@angular/compiler";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { render } from "@testing-library/react";
import { mount } from "@vue/test-utils";
import { flushSync, mount as svelteMount, unmount } from "svelte";
import { createElement } from "react";
import { beforeAll, describe, expect, it } from "vitest";

import ArcanaAspectRatioVue from "../src/vue/components/ArcanaAspectRatio.vue";
import { ArcanaAspectRatio as ArcanaAspectRatioReact } from "../src/react/ArcanaAspectRatio";
import ArcanaAspectRatioSvelte from "../src/svelte/ArcanaAspectRatio.svelte";
import { ArcanaAspectRatioComponent } from "../src/angular/arcana-aspect-ratio.component";

/**
 * `ArcanaAspectRatio` nos 4 frameworks: mesma marcação (`.arcana-aspect-ratio` +
 * `__content`) e a razão sempre no custom property inline `--arcana-aspect-ratio`
 * — é ele que alimenta o `aspect-ratio` do CSS (o componente não faz JS nenhum).
 */
describe("ArcanaAspectRatio — Vue", () => {
    it("põe a razão no custom property e envolve o slot em __content", () => {
        const wrapper = mount(ArcanaAspectRatioVue, {
            props: { ratio: 4 / 3 },
            slots: { default: '<img class="capa" src="/capa.jpg" alt="" />' },
        });

        const root = wrapper.find(".arcana-aspect-ratio");
        expect(root.exists()).toBe(true);
        expect(root.attributes("style")).toContain(`--arcana-aspect-ratio: ${4 / 3}`);
        expect(wrapper.find(".arcana-aspect-ratio__content .capa").exists()).toBe(true);
    });

    it("razão inválida (0, negativa, NaN) cai no default 16/9", () => {
        for (const ratio of [0, -2, Number.NaN]) {
            const wrapper = mount(ArcanaAspectRatioVue, { props: { ratio } });
            expect(wrapper.attributes("style")).toContain(`--arcana-aspect-ratio: ${16 / 9}`);
        }
    });
});

describe("ArcanaAspectRatio — React", () => {
    it("emite a mesma marcação e o mesmo custom property", () => {
        const { container } = render(
            createElement(
                ArcanaAspectRatioReact,
                { ratio: 1 },
                createElement("span", { className: "filho" }, "quadrado"),
            ),
        );

        const root = container.querySelector(".arcana-aspect-ratio") as HTMLElement;
        expect(root).not.toBeNull();
        expect(root.style.getPropertyValue("--arcana-aspect-ratio")).toBe("1");
        expect(container.querySelector(".arcana-aspect-ratio__content .filho")).not.toBeNull();
    });
});

describe("ArcanaAspectRatio — Svelte", () => {
    it("emite a mesma marcação e o mesmo custom property", () => {
        const target = document.createElement("div");
        document.body.appendChild(target);
        const component = svelteMount(ArcanaAspectRatioSvelte, { target, props: { ratio: 2 } });
        flushSync();

        const root = target.querySelector(".arcana-aspect-ratio") as HTMLElement;
        expect(root).not.toBeNull();
        expect(root.style.getPropertyValue("--arcana-aspect-ratio")).toBe("2");
        expect(target.querySelector(".arcana-aspect-ratio__content")).not.toBeNull();

        unmount(component);
        target.remove();
    });
});

describe("ArcanaAspectRatio — Angular", () => {
    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
    });

    @Component({
        standalone: true,
        imports: [ArcanaAspectRatioComponent],
        template: `<div arcanaAspectRatio [ratio]="3 / 4"><span class="filho">retrato</span></div>`,
    })
    class Host {}

    it("emite a mesma marcação e o mesmo custom property", () => {
        TestBed.configureTestingModule({
            imports: [Host],
            providers: [provideZonelessChangeDetection()],
        });
        const fixture = TestBed.createComponent(Host);
        fixture.detectChanges();

        const root = fixture.nativeElement.querySelector(".arcana-aspect-ratio") as HTMLElement;
        expect(root).not.toBeNull();
        expect(root.style.getPropertyValue("--arcana-aspect-ratio")).toBe(String(3 / 4));
        expect(root.querySelector(".arcana-aspect-ratio__content .filho")).not.toBeNull();
    });
});
