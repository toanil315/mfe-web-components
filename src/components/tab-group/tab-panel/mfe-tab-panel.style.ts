import { css } from "lit";

export const MfeTabPanelStyle = css`
  div {
    padding: var(--mfe-size-xl);
    background-color: var(--mfe-color-neutral-full);
    border-radius: 0 0 var(--mfe-border-radius-m) var(--mfe-border-radius-m);
  }

  div[hidden] {
    display: none;
  }
`;
