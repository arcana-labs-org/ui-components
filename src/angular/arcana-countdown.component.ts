import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgZone,
  OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject
} from "@angular/core";

import {
  DEFAULT_COUNTDOWN_FORMAT,
  countdownTickInterval,
  formatDuration,
  remainingMs
} from "../core/countdown";

/**
 * `ArcanaCountdownComponent` — Angular port do SFC Vue `ArcanaCountdown`.
 *
 * Attribute selector num `<div>` (`<div arcanaCountdown>`): contagem regressiva até um
 * instante alvo. Reproduz `.arcana-countdown` (+ `--{size}`/`--{tone}`/`is-finished`/
 * `is-paused`), o `__title` e o `__content` com `__prefix`/`__value`/`__suffix`, idêntico ao
 * Vue/React/Svelte. Preserva o inline `--arcana-countdown-value-color`.
 *
 * Vue → Angular:
 * - `emit('change', ms)` → `@Output() change`; `emit('finish')` → `@Output() finish`
 * - métodos `pause()/resume()/restart()` → métodos públicos (via template ref / `ViewChild`)
 * - slots `#title`/`#prefix`/`#suffix` → conteúdo projetado `[countdownTitle]`/
 *   `[countdownPrefix]`/`[countdownSuffix]` (o wrapper só sai quando a prop correspondente
 *   tem valor)
 *
 * Timers: um único `setInterval`, criado FORA do Angular (`NgZone.runOutsideAngular`) pra não
 * disparar change detection global a cada tick; o componente é `OnPush` e chama
 * `markForCheck()` por tick, o que funciona também em app zoneless. O intervalo é sempre
 * limpo antes de recriar (troca de `value`/`format`/`interval`/pausa) e no `ngOnDestroy` —
 * nada acumula. Cada tick recalcula o restante a partir do relógio (sem drift).
 */
export type CountdownTone = "neutral" | "success" | "danger" | "warning" | "info";
export type CountdownSize = "sm" | "md" | "lg" | "xl";

@Component({
  selector: "div[arcanaCountdown]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "[style.--arcana-countdown-value-color]": "valueColor || null",
    "role": "timer"
  },
  template: `
    @if (title) {
      <div class="arcana-countdown__title">
        <ng-content select="[countdownTitle]">{{ title }}</ng-content>
      </div>
    }

    <div class="arcana-countdown__content">
      @if (prefix) {
        <span class="arcana-countdown__prefix">
          <ng-content select="[countdownPrefix]">{{ prefix }}</ng-content>
        </span>
      }

      <span class="arcana-countdown__value">{{ displayValue }}</span>

      @if (suffix) {
        <span class="arcana-countdown__suffix">
          <ng-content select="[countdownSuffix]">{{ suffix }}</ng-content>
        </span>
      }
    </div>
  `
})
export class ArcanaCountdownComponent implements OnInit, OnChanges, OnDestroy {
  /** Instante ALVO: epoch em ms, `Date` ou string ISO. Inválido/vazio zera o contador. */
  @Input() value: number | string | Date | null = null;
  /**
   * Tokens `DD`,`D`,`HH`,`H`,`mm`,`m`,`ss`,`s`,`SSS`,`SS`,`S` + literais entre colchetes.
   * A maior unidade presente absorve o excedente (50h → `50:00:00` em `HH:mm:ss`).
   */
  @Input() format = DEFAULT_COUNTDOWN_FORMAT;
  @Input() prefix = "";
  @Input() suffix = "";
  @Input() title = "";
  @Input() tone: CountdownTone = "neutral";
  @Input() valueColor = "";
  @Input() size: CountdownSize = "md";
  /** Pausa a contagem (o valor congela). Voltar pra `false` retoma. */
  @Input() paused = false;
  /** Período do tick em ms. Default: 50ms com milissegundos no `format`, senão 1000ms. */
  @Input() interval?: number;
  @Input() className = "";

  @Output() change = new EventEmitter<number>();
  @Output() finish = new EventEmitter<void>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);

  private timer: ReturnType<typeof setInterval> | null = null;
  private hasFinished = false;

  remaining = 0;

  get displayValue(): string {
    return formatDuration(this.remaining, this.format);
  }

  get tickInterval(): number {
    return this.interval && this.interval > 0 ? this.interval : countdownTickInterval(this.format);
  }

  get rootClass(): string {
    return [
      "arcana-countdown",
      `arcana-countdown--${this.size}`,
      `arcana-countdown--${this.tone}`,
      this.remaining <= 0 ? "is-finished" : "",
      this.paused ? "is-paused" : "",
      this.className
    ].filter(Boolean).join(" ");
  }

  ngOnInit(): void {
    this.sync();
    if (!this.paused) this.start();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"] && !changes["value"].firstChange) {
      this.restart();
      return;
    }
    if (changes["paused"] && !changes["paused"].firstChange) {
      if (this.paused) this.stop();
      else this.start();
      return;
    }
    const retimed = changes["format"] || changes["interval"];
    if (retimed && !retimed.firstChange && !this.paused) this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  pause(): void {
    this.paused = true;
    this.stop();
    this.cdr.markForCheck();
  }

  resume(): void {
    this.paused = false;
    this.start();
    this.cdr.markForCheck();
  }

  /** Zera a trava do `finish` e recomeça a partir do `value` atual. */
  restart(): void {
    this.hasFinished = false;
    this.sync();
    if (!this.paused) this.start();
    this.cdr.markForCheck();
  }

  /** Recalcula o restante a partir do relógio. */
  private sync(): number {
    this.remaining = remainingMs(this.value, Date.now());
    return this.remaining;
  }

  /** (Re)cria o intervalo. Sempre limpa o anterior — nunca acumula. */
  private start(): void {
    this.stop();
    if (this.hasFinished) return;
    if (this.sync() <= 0) {
      this.hasFinished = true;
      this.finish.emit();
      return;
    }
    // Fora da zona: o tick não deve disparar CD global — o `markForCheck` abaixo
    // acorda só este componente (e funciona igual em app zoneless).
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => this.tick(), this.tickInterval);
    });
  }

  private tick(): void {
    const rest = this.sync();
    this.cdr.markForCheck();
    this.zone.run(() => {
      this.change.emit(rest);
      if (rest <= 0 && !this.hasFinished) {
        this.hasFinished = true;
        this.stop();
        this.finish.emit();
      }
    });
  }

  private stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
