import { css } from "lit";

export const MfeTableCellStyle = css`
  :host {
    display: table-cell;
    border: 1px solid var(--mfe-color-neutral-lighter);
    padding: var(--mfe-size-m);
    font: var(--mfe-font-title-3-regular);
    color: var(--mfe-color-neutral-darker);
    box-sizing: border-box;
    vertical-align: middle;
    word-break: break-word;
    background-color: var(--mfe-color-neutral-full);
    background-clip: padding-box;
    border-top: none;
    border-right: none;
  }

  .table-cell {
    display: flex;
    align-items: center;
  }

  .table-cell.shadow-right::before {
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

  .table-cell.shadow-left::before {
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
`;
