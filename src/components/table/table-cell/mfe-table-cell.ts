import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "element-internals-polyfill";
import {
  mfeTableCellTag,
  mfeTableRowTag,
  mfeTableTag,
} from "../mfe-table.constant";
import { MfeTableCellStyle } from "./mfe-table-cell.style";
import { IMfeTableRow } from "../mfe-table.facade";

import "../../checkbox-group/checkbox/mfe-checkbox";

/**
 * @tag mfe-table-cell
 * @summary Baklava Table component
 */
@customElement(mfeTableCellTag)
export default class MfeTableCell extends LitElement {
  static styles = MfeTableCellStyle;

  /**
   * Disable selection
   */
  @property({ type: Boolean, reflect: true, attribute: "disabled" })
  disableSelection = false;

  private get _table() {
    return this.closest(mfeTableTag);
  }

  private get _tableRow() {
    return this.closest(mfeTableRowTag);
  }

  get disabled() {
    return this.disableSelection;
  }

  get selectable() {
    return (
      this.index === 0 &&
      !!this._table?.isSelectable(false) &&
      this.selectionKey
    );
  }

  get index() {
    const parent = this.parentNode;

    if (!parent) {
      return -1;
    }
    return [...parent.children].indexOf(this);
  }

  get selectionKey(): string {
    return this._tableRow ? this._tableRow.selectionKey : "";
  }

  get checked() {
    return !!this._tableRow?.checked;
  }

  get shadowRight() {
    return !!this._tableRow?.stickyFirstColumn && this.index === 0;
  }

  get shadowLeft() {
    return (
      !!this._tableRow?.stickyLastColumn && this.nextElementSibling === null
    );
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.closest<IMfeTableRow>(mfeTableRowTag)) {
      console.warn(
        "mfe-table-cell is designed to be used inside a mfe-table-row",
        this
      );
    }
  }

  onChange(event: CustomEvent) {
    this._table?.onSelectionChange(false, event.detail, this.selectionKey);
  }

  private _renderCheckbox() {
    return this.selectable
      ? html`<mfe-checkbox
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          value="row"
          @mfe-checkbox-change=${this.onChange}
        >
        </mfe-checkbox>`
      : null;
  }
  render(): TemplateResult {
    const className = this.shadowRight
      ? "shadow-right"
      : this.shadowLeft
        ? "shadow-left"
        : "";

    return html`<div class="table-cell ${className}">
      ${this._renderCheckbox()}
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeTableCellTag]: MfeTableCell;
  }
}
