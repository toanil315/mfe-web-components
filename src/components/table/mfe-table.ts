import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "element-internals-polyfill";
import {
  mfeRowSelectChangeEventName,
  mfeSortChangeEventName,
  mfeTableBodyTag,
  mfeTableCellTag,
  mfeTableHeaderCellTag,
  mfeTableRowTag,
  mfeTableTag,
} from "./mfe-table.constant";
import { MfeTableStyle } from "./mfe-table.style";
import { event } from "../../utils/event";
import type { EventDispatcher } from "../../utils/event";
import type { IMfeTableRow, SortDirection } from "./mfe-table.facade";

/**
 * @tag mfe-table
 * @summary Baklava Table component
 *
 */
@customElement(mfeTableTag)
export default class MfeTable extends LitElement {
  static styles = MfeTableStyle;

  /**
   * Selected table row selection key list
   */
  @property({ type: Array, reflect: true, attribute: "selected" })
  get selected(): string[] {
    return this._selectedValues;
  }

  set selected(value: string[]) {
    this._selectedValues = value;
    this.updateComplete.then(() => {
      this.querySelectorAll(
        `${mfeTableHeaderCellTag},${mfeTableCellTag},${mfeTableRowTag}`
      ).forEach((com) => {
        (com as LitElement)?.requestUpdate?.();
      });
    });
  }

  /**
   * Sets table row as selectable
   */
  @property({ type: Boolean, reflect: true })
  selectable = false;

  /**
   * Sets table row multiple selection enable
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Sets table as sortable
   */
  @property({ type: Boolean, reflect: true })
  sortable = false;
  /**
   * Sets table first column as sticky
   */
  @property({ type: Boolean, reflect: true, attribute: "sticky-first-column" })
  stickyFirstColumn = false;
  /**
   * Sets table last column as sticky
   */
  @property({ type: Boolean, reflect: true, attribute: "sticky-last-column" })
  stickyLastColumn = false;

  /**
   * Sets table sorted column key
   */
  @property({ type: String, reflect: true, attribute: "sort-key" })
  get sortKey(): string {
    return this._sortKey;
  }

  set sortKey(value: string) {
    this._sortKey = value;
  }

  /**
   * Sets table sorting direction
   */
  @property({ type: String, reflect: true, attribute: "sort-direction" })
  get sortDirection(): SortDirection {
    return this._sortDirection;
  }

  set sortDirection(value: SortDirection) {
    this._sortDirection = value;
  }

  /**
   * Fires when table sort options changed
   */
  @event(mfeSortChangeEventName) private onSort!: EventDispatcher<string[]>;

  /**
   * Fires when selected table rows changed
   */
  @event(mfeRowSelectChangeEventName) private onRowSelect!: EventDispatcher<
    string[]
  >;

  @state() private _selectedValues: string[] = [];

  @state() private _sortKey: string = "";

  @state() private _sortDirection: SortDirection = "";

  protected updated(_changedProperties: PropertyValues) {
    if (
      _changedProperties.has("selectable") ||
      _changedProperties.has("multiple") ||
      _changedProperties.has("stickyFirstColumn") ||
      _changedProperties.has("stickyLastColumn") ||
      _changedProperties.has("sortable")
    ) {
      this.querySelectorAll(
        `${mfeTableHeaderCellTag},${mfeTableCellTag},${mfeTableRowTag}`
      ).forEach((com) => {
        (com as LitElement)?.requestUpdate?.();
      });
    }
  }

  get tableRows() {
    return this.querySelectorAll<IMfeTableRow>(
      `${mfeTableBodyTag} ${mfeTableRowTag}`
    );
  }

  isFirstColumnSticky() {
    return this.stickyFirstColumn;
  }

  isLastColumnSticky() {
    return this.stickyLastColumn;
  }

  isSelectable(isHeaderCell = false) {
    return isHeaderCell ? this.multiple && this.selectable : this.selectable;
  }

  isRowSelected(selectionKey: string) {
    return this.selected.includes(selectionKey);
  }

  isAllSelected() {
    return Array.from(this.tableRows).every((tr) =>
      this.selected.includes(tr.selectionKey)
    );
  }

  isAnySelected() {
    return (
      !this.isAllSelected() &&
      Array.from(this.tableRows).some(
        (tr) => !tr.disabled && this.selected.includes(tr.selectionKey)
      )
    );
  }

  isAllUnselectedDisabled() {
    return Array.from(this.tableRows)
      .filter((tr) => !this.selected.includes(tr.selectionKey))
      .every((tr) => tr.disabled);
  }

  /**
   * Handles selection changes for both header and row selections.
   * @param isHeader - Indicates if the selection change is for the header.
   * @param isSelected - The selection state.
   * @param selectionKey - The key identifying the selected row. It must be there if it is not the header.
   */
  onSelectionChange(
    isHeader: boolean = false,
    isSelected: boolean,
    selectionKey: string
  ) {
    if (isHeader) {
      this.handleHeaderSelection(isSelected);
    } else {
      this.handleRowSelection(isSelected, selectionKey);
    }

    this.notifyRowSelectionChange();
  }

  /**
   * Updates selected values based on header selection for currently rendered rows.
   * @param isSelected - The selection state.
   */
  private handleHeaderSelection(isSelected: boolean) {
    const rowKeys = this.getSelectionKeyFromRows();

    if (isSelected) {
      this.selected = [...new Set([...this.selected, ...rowKeys])];
    } else {
      this.selected = [];
    }
  }

  /**
   * Updates selected values based on row selection.
   * @param isSelected - The selection state.
   * @param selectionKey - The key identifying the selected row.
   */
  private handleRowSelection(isSelected: boolean, selectionKey: string) {
    if (isSelected) {
      this.addSelection(selectionKey);
    } else {
      this.removeSelection(selectionKey);
    }
  }

  /**
   * Notifies about the row selection change.
   */
  private notifyRowSelectionChange() {
    this.onRowSelect(this.selected);
  }

  /**
   * Adds a selection key to the selected values.
   * @param selectionKey - The key to add.
   */
  private addSelection(selectionKey: string) {
    if (!this.selected.includes(selectionKey)) {
      this.selected = [...this.selected, selectionKey];
    }
  }

  /**
   * Removes a selection key from the selected values.
   * @param selectionKey - The key to remove.
   */
  private removeSelection(selectionKey: string) {
    this.selected = this.selected.filter((value) => value !== selectionKey);
  }

  /**
   * Gets the selection keys from all selectable table rows.
   * @returns An array of selection keys.
   */
  private getSelectionKeyFromRows(): string[] {
    return Array.from(this.tableRows)
      .filter((tableRow) => !tableRow.disabled)
      .map((tableRow) => tableRow.selectionKey);
  }

  resetScrollPosition(): void {
    const tableWrapper = this.shadowRoot?.querySelector(".table-wrapper");

    if (tableWrapper) {
      tableWrapper.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  }

  onSortChange(sortKey: string, sortDirection: SortDirection) {
    this._sortKey = sortKey;
    this._sortDirection = sortDirection;
    this.onSort([this.sortKey, this.sortDirection]);
    this.updateComplete.then(() => {
      this.querySelectorAll(mfeTableHeaderCellTag).forEach((com) => {
        (com as LitElement).requestUpdate();
      });
    });
    this.resetScrollPosition();
  }

  render(): TemplateResult {
    return html` <div class="table-wrapper">
      <div class="table">
        <table>
          <slot></slot>
        </table>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeTableTag]: MfeTable;
  }

  interface HTMLElementEventMap {
    [mfeSortChangeEventName]: CustomEvent<string[]>;
    [mfeRowSelectChangeEventName]: CustomEvent<string[]>;
  }
}
