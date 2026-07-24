import {
  ChangeDetectionStrategy, Component, Input, TemplateRef
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";

/**
 * `ArcanaTableComponent` — Angular port do SFC Vue `ArcanaTable`. Tabela estática
 * (dados locais) shadcn.
 *
 * Attribute selector num `<div>` (`<div arcanaTable>`): reproduz
 * `.arcana-table-wrap > table.arcana-table`, o `thead`/`tbody`/`tfoot`,
 * `__th--right`/`__td--right`, `__empty` e `__foot`, idêntico ao Vue/React.
 *
 * Vue → Angular:
 * - slot de célula `#cell-<key>` → `@Input() cellTemplates` (mapa key→TemplateRef;
 *   contexto `{ $implicit: value, row, value, index }`) OU `col.valueGetter`
 * - slot `#footer` → `@Input() footerTemplate` (TemplateRef)
 */
export interface ArcanaTableColumn {
  key: string;
  label: string;
  width?: string;
  align?: "left" | "right";
  valueGetter?: (value: unknown, row: Record<string, unknown>, index: number) => unknown;
}

@Component({
  selector: "div[arcanaTable]",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { "[class]": "rootClass" },
  template: `
    <table class="arcana-table">
      <thead>
        <tr>
          @for (col of columns; track col.key) {
            <th
              [style.width]="col.width || null"
              [class.arcana-table__th--right]="col.align === 'right'"
            >{{ col.label }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @if (!rows.length) {
          <tr>
            <td [attr.colspan]="columns.length" class="arcana-table__empty">{{ emptyText }}</td>
          </tr>
        } @else {
          @for (row of rows; track $index) {
            <tr>
              @for (col of columns; track col.key) {
                <td [class.arcana-table__td--right]="col.align === 'right'">
                  @if (cellTemplates[col.key]; as tpl) {
                    <ng-container
                      [ngTemplateOutlet]="tpl"
                      [ngTemplateOutletContext]="cellContext(row, col, $index)"
                    ></ng-container>
                  } @else {
                    {{ formatCell(row, col, $index) }}
                  }
                </td>
              }
            </tr>
          }
        }
      </tbody>
      @if (footerTemplate) {
        <tfoot class="arcana-table__foot">
          <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
        </tfoot>
      }
    </table>
  `
})
export class ArcanaTableComponent {
  @Input() columns: ArcanaTableColumn[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input() emptyText = "Nenhum registro.";
  @Input() cellTemplates: Record<string, TemplateRef<unknown>> = {};
  @Input() footerTemplate?: TemplateRef<unknown>;
  @Input() className = "";

  get rootClass(): string {
    return ["arcana-table-wrap", this.className].filter(Boolean).join(" ");
  }

  formatCell(row: Record<string, unknown>, col: ArcanaTableColumn, index: number): unknown {
    const value = row?.[col.key];
    if (col.valueGetter) return col.valueGetter(value, row, index);
    return value ?? "—";
  }

  cellContext(row: Record<string, unknown>, col: ArcanaTableColumn, index: number) {
    const value = row?.[col.key];
    return { $implicit: value, row, value, index };
  }
}
