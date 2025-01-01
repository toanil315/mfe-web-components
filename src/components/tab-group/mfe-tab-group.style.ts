import { css } from "lit";

export const MfeTabGroupStyle = css`
  .tabs {
    background-color: var(--mfe-color-neutral-full);
    border-bottom: var(--mfe-size-4xs) solid var(--mfe-color-neutral-lightest);
    display: flex;
    flex-direction: row;
  }

  .tabs-list {
    overflow-x: auto;
    border-radius: var(--mfe-border-radius-m) var(--mfe-border-radius-m) 0 0;
  }

  .panels {
    border-radius: 0 0 var(--mfe-border-radius-m) var(--mfe-border-radius-m);
  }
`;
