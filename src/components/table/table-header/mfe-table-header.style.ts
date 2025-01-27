import { css } from "lit";

export const MfeTableHeaderStyle = css`
  :host {
    display: table-header-group;
  }

  :host([sticky]) {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
    transition: top 0.05s ease;
    box-shadow: 0 8px 16px 0 rgb(39 49 66 / 10%);
  }

  :host([sticky])::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--mfe-color-neutral-lighter);
  }
`;
