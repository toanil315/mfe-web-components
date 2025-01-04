import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "element-internals-polyfill";
import {
  mfeTableHeaderCellTag,
  mfeTableRowTag,
  mfeTableTag,
} from "../mfe-table.constant";
import { MfeTableHeaderCellStyle } from "./mfe-table-header-cell.style";
import type { MfeIconName } from "../../../constants/icon.constant";
import MfeCheckbox from "../../checkbox-group/checkbox/mfe-checkbox";

import "../../icon/mfe-icon";
import { IMfeTableRow, SortDirection } from "../mfe-table.facade";

import "../../checkbox-group/checkbox/mfe-checkbox";

/**
 * @tag mfe-table-header-cell
 * @summary Baklava Table component
 *
 * @cssproperty [--mfe-table-header-cell-width] Set the column width
 * @cssproperty [--mfe-table-header-cell-min-width] Set the column min width
 */
@customElement(mfeTableHeaderCellTag)
export default class MfeTableHeaderCell extends LitElement {
  static styles = MfeTableHeaderCellStyle;

  /**
   * Set key value for column
   */
  @property({ type: String, reflect: true, attribute: "sort-key" })
  sortKey = "";

  private get _table() {
    return this.closest(mfeTableTag);
  }
  private get _tableRow() {
    return this.closest(mfeTableRowTag);
  }
  get selectable() {
    return this.index === 0 && !!this._table?.isSelectable(true);
  }
  get sortable() {
    return !!this._table?.sortable && !!this.sortKey;
  }
  get index() {
    const parent = this.parentNode;

    if (!parent) {
      return -1;
    }
    return [...parent.children].indexOf(this);
  }
  get checked() {
    return !!this._table?.isAllSelected();
  }
  get indeterminate() {
    return !!this._table?.isAnySelected();
  }
  get isAllUnselectedDisabled() {
    return !!this._table?.isAllUnselectedDisabled();
  }
  get sortDirection(): string {
    if (this._table?.sortKey === this.sortKey) {
      return this._table?.sortDirection || "";
    }

    return "";
  }
  get sortIconName(): MfeIconName {
    if (this.sortDirection === "asc") {
      return "sorting_asc";
    } else if (this.sortDirection === "desc") {
      return "sorting_desc";
    }

    return "sorting";
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
        "mfe-table-header-cell is designed to be used inside a mfe-table-row",
        this
      );
    }
  }

  onChange(event: CustomEvent) {
    const selectAllEl = this.shadowRoot?.querySelector(
      ".select-all"
    ) as MfeCheckbox;

    const checked = event.detail;

    // If all available rows are selected, instead of checking, uncheck all options
    if (checked && this.isAllUnselectedDisabled) {
      setTimeout(() => {
        const checkbox = selectAllEl?.shadowRoot?.querySelector("input");

        checkbox?.click();
      }, 0);
      return;
    }
    this._table?.onSelectionChange(true, event.detail, "");
    setTimeout(() => {
      selectAllEl.checked = this.checked;
      selectAllEl.indeterminate = this.indeterminate;
    });
  }

  onSort() {
    let _sortDirection: SortDirection = "asc";

    if (this.sortDirection === "asc") {
      _sortDirection = "desc";
    } else if (this.sortDirection === "desc") {
      _sortDirection = "";
    }

    this._table?.onSortChange(this.sortKey, _sortDirection);
  }

  private _renderCheckbox() {
    return this.selectable
      ? html`<mfe-checkbox
          class="select-all"
          value="all"
          .indeterminate="${this.indeterminate}"
          @mfe-checkbox-change=${this.onChange}
          role="option"
          .checked="${this.checked}"
          aria-selected="${this.checked}"
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

    const template = this.sortable
      ? html` <button
          class="sort-icons-wrapper"
          tabindex="0"
          @click=${this.onSort}
        >
          <slot></slot>
          <mfe-icon name="${this.sortIconName}"></mfe-icon>
        </button>`
      : html` <slot></slot>`;

    return html`<div class="table-header-cell ${className}">
      ${this._renderCheckbox()} ${template}
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeTableHeaderCellTag]: MfeTableHeaderCell;
  }
}
