import { css } from "lit";

export const MfeTableHeaderCellStyle = css`
  :host {
    --header-cell-width: var(--mfe-table-header-cell-width, auto);
    --header-cell-min-width: var(--mfe-table-header-cell-min-width, auto);

    display: table-cell;
    border: 1px solid var(--mfe-color-neutral-lighter);
    background-color: var(--mfe-color-neutral-lightest);
    padding: var(--mfe-size-m);
    font: var(--mfe-font-title-3-medium);
    color: var(--mfe-color-neutral-darker);
    box-sizing: border-box;
    vertical-align: middle;
    white-space: normal;
    width: var(--header-cell-width);
    min-width: var(--header-cell-min-width);
    background-clip: padding-box;
  }

  .table-header-cell {
    display: flex;
    align-items: center;
  }

  .table-header-cell.shadow-right::before {
    content: "";
    position: absolute;
    right: -1px;
    top: 0;
    width: 16px;
    height: 100%;
    z-index: -1;
    border-right: 1px solid var(--mfe-color-neutral-lighter);
    box-shadow: 8px 0 16px 0 rgb(39 49 66 / 10%);
  }

  .table-header-cell.shadow-left::before {
    content: "";
    position: absolute;
    left: -1px;
    top: 0;
    width: 16px;
    height: 100%;
    z-index: -1;
    border-left: 1px solid var(--mfe-color-neutral-lighter);
    box-shadow: -8px 0 16px 0 rgb(39 49 66 / 10%);
  }

  mfe-checkbox {
    margin-right: var(--mfe-size-m);
  }

  .sort-icons-wrapper {
    all: unset;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--mfe-size-4xs);
    cursor: pointer;
  }

  .sort-icons-wrapper:focus-visible {
    outline: 2px solid var(--mfe-color-primary-base);
    outline-offset: 2px;
    border-radius: var(--mfe-border-radius-xs);
  }

  .sort-icons-wrapper mfe-icon {
    font-size: var(--mfe-font-size-m);
    color: var(--mfe-color-neutral-darker);
  }
`;
