/**
 * Smokes dos 3 componentes novos (Statistic / Countdown / Progress) nos 4 frameworks:
 * garantem que cada port emite as MESMAS classes `arcana-*`, o mesmo texto formatado e os
 * mesmos atributos de acessibilidade — e que o countdown não deixa `setInterval` vazando.
 *
 * Os timers são falsos (`vi.useFakeTimers`, que também congela `Date.now`), então a
 * contagem regressiva é determinística.
 */
import "@angular/compiler";
import { Component, provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";
import { act, render as renderReact } from "@testing-library/react";
import { mount as mountVue } from "@vue/test-utils";
import { flushSync, mount as mountSvelte, unmount as unmountSvelte } from "svelte";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

import {
  ArcanaCountdownComponent,
  ArcanaProgressComponent,
  ArcanaStatisticComponent
} from "../src/angular";
import {
  ArcanaCountdown as ArcanaCountdownReact,
  ArcanaProgress as ArcanaProgressReact,
  ArcanaStatistic as ArcanaStatisticReact
} from "../src/react";
import {
  ArcanaCountdown as ArcanaCountdownSvelte,
  ArcanaProgress as ArcanaProgressSvelte,
  ArcanaStatistic as ArcanaStatisticSvelte
} from "../src/svelte";
import ArcanaCountdownVue from "../src/vue/components/ArcanaCountdown.vue";
import ArcanaProgressVue from "../src/vue/components/ArcanaProgress.vue";
import ArcanaStatisticVue from "../src/vue/components/ArcanaStatistic.vue";

beforeAll(() => {
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

let svelteCleanups: Array<() => void> = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSvelte(Component: any, props: Record<string, unknown>) {
  const target = document.createElement("div");
  document.body.appendChild(target);
  const component = mountSvelte(Component, { target, props });
  flushSync();
  svelteCleanups.push(() => {
    unmountSvelte(component);
    target.remove();
  });
  return target;
}

afterEach(() => {
  svelteCleanups.forEach((cleanup) => cleanup());
  svelteCleanups = [];
  TestBed.resetTestingModule();
  vi.useRealTimers();
});

/* ── ArcanaStatistic ──────────────────────────────────────────────────────── */

describe("ArcanaStatistic", () => {
  const props = {
    value: 1234567.891,
    precision: 2,
    title: "Faturamento",
    prefix: "R$",
    suffix: "/mês",
    tone: "success" as const,
    size: "lg" as const
  };

  it("Vue formata o valor e aplica título/afixos/tom", async () => {
    const wrapper = mountVue(ArcanaStatisticVue, { props });
    await nextTick();

    expect(wrapper.classes()).toContain("arcana-statistic");
    expect(wrapper.classes()).toContain("arcana-statistic--lg");
    expect(wrapper.classes()).toContain("arcana-statistic--success");
    expect(wrapper.find(".arcana-statistic__title").text()).toBe("Faturamento");
    expect(wrapper.find(".arcana-statistic__value").text()).toBe("1,234,567.89");
    expect(wrapper.find(".arcana-statistic__prefix").text()).toBe("R$");
    expect(wrapper.find(".arcana-statistic__suffix").text()).toBe("/mês");
  });

  it("React emite o mesmo markup", () => {
    const { container } = renderReact(<ArcanaStatisticReact {...props} />);
    const root = container.querySelector(".arcana-statistic")!;

    expect(root.className).toContain("arcana-statistic--success");
    expect(root.querySelector(".arcana-statistic__value")!.textContent).toBe("1,234,567.89");
    expect(root.querySelector(".arcana-statistic__title")!.textContent).toBe("Faturamento");
  });

  it("Svelte emite o mesmo markup", () => {
    const target = renderSvelte(ArcanaStatisticSvelte, props);
    const root = target.querySelector(".arcana-statistic")!;

    expect(root.className).toContain("arcana-statistic--lg");
    expect(root.querySelector(".arcana-statistic__value")!.textContent).toBe("1,234,567.89");
  });

  it("Angular emite o mesmo markup", () => {
    @Component({
      standalone: true,
      imports: [ArcanaStatisticComponent],
      template: `<div
        arcanaStatistic
        [value]="1234567.891"
        [precision]="2"
        title="Faturamento"
        prefix="R$"
        suffix="/mês"
        tone="success"
        size="lg"
      ></div>`
    })
    class Host {}

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();

    const root = fixture.nativeElement.querySelector(".arcana-statistic")!;
    expect(root.className).toContain("arcana-statistic--success");
    expect(root.querySelector(".arcana-statistic__value").textContent).toBe("1,234,567.89");
    expect(root.querySelector(".arcana-statistic__title").textContent.trim()).toBe("Faturamento");
  });
});

/* ── ArcanaCountdown ──────────────────────────────────────────────────────── */

describe("ArcanaCountdown", () => {
  it("Vue conta, emite change/finish e limpa o timer no unmount", async () => {
    vi.useFakeTimers();
    const wrapper = mountVue(ArcanaCountdownVue, {
      props: { value: Date.now() + 5000, format: "mm:ss" }
    });
    await nextTick();

    expect(wrapper.classes()).toContain("arcana-countdown");
    expect(wrapper.find(".arcana-countdown__value").text()).toBe("00:05");

    vi.advanceTimersByTime(2000);
    await nextTick();
    expect(wrapper.find(".arcana-countdown__value").text()).toBe("00:03");
    expect(wrapper.emitted("change")).toHaveLength(2);

    vi.advanceTimersByTime(3000);
    await nextTick();
    expect(wrapper.find(".arcana-countdown__value").text()).toBe("00:00");
    expect(wrapper.classes()).toContain("is-finished");
    expect(wrapper.emitted("finish")).toHaveLength(1);
    // Zerou → o próprio componente para o intervalo (nada de tick eterno).
    expect(vi.getTimerCount()).toBe(0);

    // E um contador ainda rodando some junto com o componente.
    const running = mountVue(ArcanaCountdownVue, { props: { value: Date.now() + 60_000 } });
    await nextTick();
    expect(vi.getTimerCount()).toBe(1);
    running.unmount();
    expect(vi.getTimerCount()).toBe(0);

    wrapper.unmount();
  });

  it("Vue pausa e retoma pela prop", async () => {
    vi.useFakeTimers();
    const wrapper = mountVue(ArcanaCountdownVue, {
      props: { value: Date.now() + 10_000, format: "mm:ss", paused: true }
    });
    await nextTick();

    expect(wrapper.classes()).toContain("is-paused");
    expect(vi.getTimerCount()).toBe(0);

    vi.advanceTimersByTime(3000);
    await nextTick();
    // Congelado no valor de partida (o relógio andou, o display não).
    expect(wrapper.find(".arcana-countdown__value").text()).toBe("00:10");

    await wrapper.setProps({ paused: false });
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(1000);
    await nextTick();
    expect(wrapper.find(".arcana-countdown__value").text()).toBe("00:06");

    wrapper.unmount();
  });

  it("React conta e limpa o intervalo no unmount", () => {
    vi.useFakeTimers();
    const onFinish = vi.fn();
    const { container, unmount } = renderReact(
      <ArcanaCountdownReact value={Date.now() + 3000} format="mm:ss" onFinish={onFinish} />
    );
    const value = () => container.querySelector(".arcana-countdown__value")!.textContent;

    expect(value()).toBe("00:03");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(value()).toBe("00:02");

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(value()).toBe("00:00");
    expect(onFinish).toHaveBeenCalledTimes(1);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("Svelte conta e limpa o intervalo no unmount", () => {
    vi.useFakeTimers();
    const target = renderSvelte(ArcanaCountdownSvelte, {
      value: Date.now() + 3000,
      format: "mm:ss"
    });
    const value = () => target.querySelector(".arcana-countdown__value")!.textContent;

    expect(value()).toBe("00:03");

    vi.advanceTimersByTime(1000);
    flushSync();
    expect(value()).toBe("00:02");

    svelteCleanups.pop()!();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("Angular conta e limpa o intervalo no destroy", () => {
    vi.useFakeTimers();

    @Component({
      standalone: true,
      imports: [ArcanaCountdownComponent],
      template: `<div arcanaCountdown [value]="target" format="mm:ss"></div>`
    })
    class Host {
      target = Date.now() + 3000;
    }

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();

    const value = () => fixture.nativeElement.querySelector(".arcana-countdown__value").textContent;
    expect(value()).toBe("00:03");

    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    expect(value()).toBe("00:02");

    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });
});

/* ── ArcanaProgress ───────────────────────────────────────────────────────── */

describe("ArcanaProgress", () => {
  it("Vue: determinado tem aria-valuenow e largura; indeterminado não", async () => {
    const wrapper = mountVue(ArcanaProgressVue, {
      props: { value: 42, showValue: true, tone: "success", variant: "soft" }
    });
    await nextTick();

    const track = wrapper.find(".arcana-progress__track");
    expect(wrapper.classes()).toContain("arcana-progress--success");
    expect(wrapper.classes()).toContain("arcana-progress--soft");
    expect(wrapper.classes()).not.toContain("is-indeterminate");
    expect(track.attributes("role")).toBe("progressbar");
    expect(track.attributes("aria-valuenow")).toBe("42");
    expect(track.attributes("aria-valuemax")).toBe("100");
    expect(track.attributes("aria-valuetext")).toBe("42%");
    expect(wrapper.find(".arcana-progress__indicator").attributes("style")).toContain("width: 42%");
    expect(wrapper.find(".arcana-progress__value").text()).toBe("42%");

    await wrapper.setProps({ value: null });
    expect(wrapper.classes()).toContain("is-indeterminate");
    expect(wrapper.find(".arcana-progress__track").attributes("aria-valuenow")).toBeUndefined();
    expect(wrapper.find(".arcana-progress__indicator").attributes("style")).toBeUndefined();
  });

  it("Vue clampa acima do max e escala pelo max custom", async () => {
    const wrapper = mountVue(ArcanaProgressVue, { props: { value: 5, max: 20, showValue: true } });
    await nextTick();
    expect(wrapper.find(".arcana-progress__value").text()).toBe("25%");
    expect(wrapper.find(".arcana-progress__track").attributes("aria-valuemax")).toBe("20");

    await wrapper.setProps({ value: 999 });
    expect(wrapper.find(".arcana-progress__value").text()).toBe("100%");
    expect(wrapper.find(".arcana-progress__track").attributes("aria-valuenow")).toBe("20");
  });

  it("React emite os mesmos atributos", () => {
    const { container, rerender } = renderReact(<ArcanaProgressReact value={42} showValue />);
    const track = () => container.querySelector(".arcana-progress__track")!;

    expect(track().getAttribute("aria-valuenow")).toBe("42");
    expect(container.querySelector(".arcana-progress__value")!.textContent).toBe("42%");

    rerender(<ArcanaProgressReact value={null} showValue />);
    expect(container.querySelector(".arcana-progress")!.className).toContain("is-indeterminate");
    expect(track().hasAttribute("aria-valuenow")).toBe(false);
  });

  it("Svelte emite os mesmos atributos", () => {
    const target = renderSvelte(ArcanaProgressSvelte, { value: 42, showValue: true });
    const track = target.querySelector(".arcana-progress__track")!;

    expect(track.getAttribute("role")).toBe("progressbar");
    expect(track.getAttribute("aria-valuenow")).toBe("42");
    expect(target.querySelector(".arcana-progress__value")!.textContent).toBe("42%");
  });

  it("Svelte omite aria-valuenow no indeterminado", () => {
    const target = renderSvelte(ArcanaProgressSvelte, { value: null });
    expect(target.querySelector(".arcana-progress")!.className).toContain("is-indeterminate");
    expect(
      target.querySelector(".arcana-progress__track")!.hasAttribute("aria-valuenow")
    ).toBe(false);
  });

  it("Angular emite os mesmos atributos", () => {
    @Component({
      standalone: true,
      imports: [ArcanaProgressComponent],
      template: `<div arcanaProgress [value]="42" [showValue]="true"></div>`
    })
    class Host {}

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();

    const track = fixture.nativeElement.querySelector(".arcana-progress__track");
    expect(track.getAttribute("role")).toBe("progressbar");
    expect(track.getAttribute("aria-valuenow")).toBe("42");
    expect(
      fixture.nativeElement.querySelector(".arcana-progress__value").textContent.trim()
    ).toBe("42%");
  });

  it("Angular omite aria-valuenow no indeterminado", () => {
    @Component({
      standalone: true,
      imports: [ArcanaProgressComponent],
      template: `<div arcanaProgress [value]="null"></div>`
    })
    class Host {}

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector(".arcana-progress").className).toContain(
      "is-indeterminate"
    );
    expect(
      fixture.nativeElement
        .querySelector(".arcana-progress__track")
        .hasAttribute("aria-valuenow")
    ).toBe(false);
  });
});
