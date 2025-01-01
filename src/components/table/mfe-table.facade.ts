import { LitElement } from "lit";

export type SortDirection = "asc" | "desc" | "";

export interface IMfeTable extends LitElement {
  sortKey: string | undefined;
  sortable: boolean | undefined;
  sortDirection: SortDirection;

  onSelectionChange(
    isHeader: boolean | undefined,
    isSelected: boolean,
    selectionKey: string
  ): void;
  onSortChange(sortKey: string, sortDirection: SortDirection): void;

  isSelectable(isHeaderCell?: boolean): boolean;
  isAllSelected(): boolean;
  isAnySelected(): boolean;
  isAllUnselectedDisabled(): boolean;
  isRowSelected(selectionKey: string): boolean;
  isFirstColumnSticky(): boolean;
  isLastColumnSticky(): boolean;
}

export interface IMfeTableRow extends LitElement {
  disabled: boolean | undefined;
  selectionKey: string;
  checked: boolean | undefined;
  stickyFirstColumn: boolean | undefined;
  stickyLastColumn: boolean | undefined;
}

export interface IMfeTableCell extends LitElement {}

export interface IMfeTableHeaderCell extends LitElement {}
