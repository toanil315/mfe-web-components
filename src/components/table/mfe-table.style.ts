import { css } from "lit";

export const MfeTableStyle = css`
  :host {
    display: block;
    height: 100%;
  }

  .table-wrapper {
    overflow: auto;
    border: 1px solid var(--mfe-color-neutral-lighter);
    border-radius: var(--mfe-size-3xs);
    position: relative;
    max-height: 100%;
  }

  .table {
    width: 100%;
    display: table;
    border-spacing: 0;
  }
`;
