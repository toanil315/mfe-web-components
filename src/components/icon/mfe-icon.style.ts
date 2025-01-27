import { css } from "lit";

export const MfeIconStyle = css`
  :host {
    display: inline-block;
  }

  :host div {
    display: flex;
    align-items: stretch;
    width: 1em;
    height: 1em;
    min-width: 1em;
    min-height: 1em;
    overflow: hidden;
    transform: translateZ(0);
  }

  :host svg {
    width: 1em;
    height: 1em;
  }
`;
