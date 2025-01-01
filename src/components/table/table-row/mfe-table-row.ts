import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "element-internals-polyfill";
import {
  mfeTableBodyTag,
  mfeTableCellTag,
  mfeTableHeaderCellTag,
  mfeTableHeaderTag,
  mfeTableRowTag,
  mfeTableTag,
} from "../mfe-table.constant";
import { MfeTableRowStyle } from "./mfe-table-row.style";

/**
 * @tag mfe-table-row
 * @summary Baklava Table component
 */
@customElement(mfeTableRowTag)
export default class MfeTableRow extends LitElement {
  static styles = MfeTableRowStyle;

  /**
   * selection key for table row
   */
  @property({ type: String, reflect: true, attribute: "selection-key" })
  selectionKey: string = "";

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.closest(mfeTableHeaderTag) && !this.closest(mfeTableBodyTag)) {
      console.warn(
        "mfe-table-row is designed to be used inside a mfe-table-header or mfe-table-body",
        this
      );
    }
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    this.removeAttribute("checked");
    this.removeAttribute("disabled");
    this.removeAttribute("sticky-first-column");
    this.removeAttribute("sticky-last-column");

    if (this.stickyFirstColumn) {
      this.setAttribute("sticky-first-column", "true");
    }
    if (this.stickyLastColumn) {
      this.setAttribute("sticky-last-column", "true");
    }
    if (this.checked) {
      this.setAttribute("checked", "true");
    } else if (this.disabled) {
      this.setAttribute("disabled", "true");
    }
    if (_changedProperties.has("selectionKey")) {
      this.updateComplete.then(() => {
        Array.from(
          this.querySelectorAll(`${mfeTableHeaderCellTag},${mfeTableCellTag}`)
        ).map((com) => {
          (com as LitElement).requestUpdate?.();
        });

        if (this._table?.multiple && this._table?.selectable) {
          this._table?.querySelector(mfeTableHeaderCellTag)?.requestUpdate?.();
        }
      });
    }
  }

  private get _table() {
    return this.closest(mfeTableTag);
  }

  private get _firstTableCell() {
    return this.querySelector(mfeTableCellTag);
  }

  get disabled() {
    return !!this._firstTableCell?.disabled;
  }

  get checked() {
    return !!this._table?.isRowSelected(this.selectionKey);
  }

  get stickyFirstColumn() {
    return !!this._table?.isFirstColumnSticky();
  }

  get stickyLastColumn() {
    return !!this._table?.isLastColumnSticky();
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeTableRowTag]: MfeTableRow;
  }
}
