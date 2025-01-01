import { css } from "lit";

export const MfeSplitButtonStyle = css`
  :host {
    position: relative;
    display: inline-block;
  }

  :host([kind="neutral"]) mfe-popover {
    --mfe-popover-border-color: var(--mfe-color-neutral-darker);
  }

  :host([kind="success"]) mfe-popover {
    --mfe-popover-border-color: var(--mfe-color-success-base);
  }

  :host([kind="danger"]) mfe-popover {
    --mfe-popover-border-color: var(--mfe-color-danger-base);
  }

  .split-button-container {
    display: flex;
  }

  .split-main-button {
    width: 100%;

    --mfe-border-radius-m: calc(var(--mfe-size-xs) / 2) 0 0
      calc(var(--mfe-size-xs) / 2);
  }

  .split-main-button:focus {
    --mfe-border-radius-l: calc(var(--mfe-size-m) / 2) 0 0
      calc(var(--mfe-size-m) / 2);
  }

  .dropdown-button {
    --mfe-border-radius-m: 0 calc(var(--mfe-size-xs) / 2)
      calc(var(--mfe-size-xs) / 2) 0;
  }

  .dropdown-button:focus {
    --mfe-border-radius-l: 0 calc(var(--mfe-size-m) / 2)
      calc(var(--mfe-size-m) / 2) 0;
  }

  :host([variant="secondary"]) .dropdown-button {
    left: -1px;
  }

  :host([dropdown-disabled][variant="secondary"]) .dropdown-button {
    left: 0;
  }

  .split-divider {
    display: block;
    height: var(--mfe-size-2xl);
    width: 1px;
    background-color: var(--mfe-color-neutral-full);
  }

  :host([variant="secondary"]) .split-divider {
    display: none;
  }

  :host([size="small"]) .split-divider {
    height: var(--mfe-size-xl);
  }

  :host([size="large"]) .split-divider {
    height: var(--mfe-size-3xl);
  }

  :host([dropdown-disabled][disabled]) .split-divider {
    display: block;
    background-color: var(--mfe-color-neutral-lighter);
  }
`;
