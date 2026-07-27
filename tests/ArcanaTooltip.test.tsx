import "@angular/compiler";
import { describe, it, expect, afterEach, beforeAll } from "vitest";
import { mount as mountVue } from "@vue/test-utils";
import { render as renderReact, fireEvent, cleanup as cleanupReact } from "@testing-library/react";
import { render as renderSvelte, cleanup as cleanupSvelte } from "@testing-library/svelte";
import { createElement } from "react";
import { createRawSnippet, flushSync, tick } from "svelte";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

import VueTooltip from "../src/vue/components/ArcanaTooltip.vue";
import { ArcanaTooltip as ReactTooltip } from "../src/react";
import SvelteTooltip from "../src/svelte/ArcanaTooltip.svelte";
import { ArcanaTooltipComponent } from "../src/angular";

/**
 * Paridade do ArcanaTooltip entre os 4 ports. O balão é teleportado pro <body>, então
 * as asserções procuram `[role="tooltip"]` no document (não no container do teste).
 * `openDelay: 0` abre na hora.
 */

const nextFrame = () => new Promise((r) => setTimeout(r, 0));
const tip = () => document.body.querySelector('[role="tooltip"]');

afterEach(() => {
  cleanupReact();
  cleanupSvelte();
  // Limpa balões teleportados que tenham escapado do cleanup de algum port.
  document.body.querySelectorAll('[role="tooltip"]').forEach((n) => n.remove());
});

describe("ArcanaTooltip — Vue", () => {
  it("abre no mouseenter com o label e a seta; fecha no mouseleave", async () => {
    const w = mountVue(VueTooltip, {
      props: { label: "Oi", openDelay: 0, side: "top" },
      slots: { trigger: "<button>t</button>" },
      attachTo: document.body,
    });
    expect(tip()).toBeNull();
    await w.find(".arcana-tooltip__trigger").trigger("mouseenter");
    await nextFrame();
    await w.vm.$nextTick();
    const panel = tip()!;
    expect(panel).toBeTruthy();
    expect(panel.textContent).toContain("Oi");
    expect(panel.className).toMatch(/arcana-tooltip__panel--(top|right|bottom|left)/);
    expect(panel.querySelector(".arcana-tooltip__arrow")).toBeTruthy();
    await w.find(".arcana-tooltip__trigger").trigger("mouseleave");
    await w.vm.$nextTick();
    expect(tip()).toBeNull();
    w.unmount();
  });

  it("disabled não abre; arrow=false esconde a seta", async () => {
    const off = mountVue(VueTooltip, {
      props: { label: "x", openDelay: 0, disabled: true },
      slots: { trigger: "<button>t</button>" },
    });
    await off.find(".arcana-tooltip__trigger").trigger("mouseenter");
    await nextFrame();
    expect(tip()).toBeNull();
    off.unmount();

    const noArrow = mountVue(VueTooltip, {
      props: { label: "x", openDelay: 0, arrow: false },
      slots: { trigger: "<button>t</button>" },
      attachTo: document.body,
    });
    await noArrow.find(".arcana-tooltip__trigger").trigger("mouseenter");
    await nextFrame();
    await noArrow.vm.$nextTick();
    expect(tip()!.querySelector(".arcana-tooltip__arrow")).toBeNull();
    noArrow.unmount();
  });
});

describe("ArcanaTooltip — React", () => {
  it("abre no mouseEnter com o label; fecha no mouseLeave", async () => {
    const { container } = renderReact(
      createElement(ReactTooltip, {
        label: "Oi",
        openDelay: 0,
        side: "right",
        trigger: createElement("button", null, "t"),
      })
    );
    const trigger = container.querySelector(".arcana-tooltip__trigger")!;
    expect(tip()).toBeNull();
    fireEvent.mouseEnter(trigger);
    await nextFrame();
    const panel = tip()!;
    expect(panel).toBeTruthy();
    expect(panel.textContent).toContain("Oi");
    expect(panel.className).toMatch(/arcana-tooltip__panel--(top|right|bottom|left)/);
    fireEvent.mouseLeave(trigger);
    await nextFrame();
    expect(tip()).toBeNull();
  });

  it("disabled não abre", async () => {
    const { container } = renderReact(
      createElement(ReactTooltip, {
        label: "x",
        openDelay: 0,
        disabled: true,
        trigger: createElement("button", null, "t"),
      })
    );
    fireEvent.mouseEnter(container.querySelector(".arcana-tooltip__trigger")!);
    await nextFrame();
    expect(tip()).toBeNull();
  });
});

const rawTrigger = (html: string) => createRawSnippet(() => ({ render: () => html }));

describe("ArcanaTooltip — Svelte", () => {
  it("abre no mouseenter com o label; fecha no mouseleave", async () => {
    const { container } = renderSvelte(SvelteTooltip, {
      props: { label: "Oi", openDelay: 0, side: "bottom", trigger: rawTrigger("<button>t</button>") },
    });
    const trigger = container.querySelector(".arcana-tooltip__trigger")!;
    expect(tip()).toBeNull();
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    flushSync();
    await tick();
    await nextFrame();
    const panel = tip()!;
    expect(panel).toBeTruthy();
    expect(panel.textContent).toContain("Oi");
    expect(panel.className).toMatch(/arcana-tooltip__panel--(top|right|bottom|left)/);
    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    flushSync();
    await tick();
    expect(tip()).toBeNull();
  });
});

@Component({
  standalone: true,
  imports: [ArcanaTooltipComponent],
  template: `
    <span arcanaTooltip [label]="label" [openDelay]="0" [disabled]="disabled" side="left">
      <button arcanaTooltipTrigger>t</button>
    </span>
  `,
})
class AngularTooltipHost {
  label = "Oi";
  disabled = false;
}

describe("ArcanaTooltip — Angular", () => {
  beforeAll(() => {
    try {
      TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
    } catch {
      // já inicializado por outro arquivo de teste
    }
  });

  it("abre no mouseenter com o label; fecha no mouseleave", async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AngularTooltipHost],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(AngularTooltipHost);
    fixture.detectChanges();
    const trigger = (fixture.nativeElement as HTMLElement).querySelector(".arcana-tooltip__trigger")!;
    expect(tip()).toBeNull();
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    fixture.detectChanges();
    await nextFrame();
    const panel = tip()!;
    expect(panel).toBeTruthy();
    expect(panel.textContent).toContain("Oi");
    expect(panel.className).toMatch(/arcana-tooltip__panel--(top|right|bottom|left)/);
    trigger.dispatchEvent(new MouseEvent("mouseleave"));
    fixture.detectChanges();
    await nextFrame();
    expect(tip()).toBeNull();
    fixture.destroy();
  });

  it("disabled não abre", async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AngularTooltipHost],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(AngularTooltipHost);
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const trigger = (fixture.nativeElement as HTMLElement).querySelector(".arcana-tooltip__trigger")!;
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    fixture.detectChanges();
    await nextFrame();
    expect(tip()).toBeNull();
    fixture.destroy();
  });
});
