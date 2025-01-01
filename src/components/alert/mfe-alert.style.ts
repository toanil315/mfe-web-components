import { css } from "lit";

export const MfeAlertStyle = css`
  :host {
    display: block;
  }

  .alert {
    --padding: var(--mfe-size-m);
    --main-color: var(--mfe-color-info-base);
    --main-bg-color: var(--mfe-color-info-contrast);

    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background-color: var(--main-bg-color);
    color: var(--mfe-color-neutral-darker);
    box-shadow: inset 0 0 0 1px var(--main-color);
    border-radius: var(--mfe-border-radius-l);
    padding: calc(var(--padding) / 2) var(--padding);
    padding-inline-end: calc(var(--padding) / 2);
  }

  .description {
    font: var(--mfe-font-body-text-2-base);
  }

  .wrapper {
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: auto;
  }

  .content {
    display: flex;
    margin-inline-end: var(--mfe-size-2xs);
    flex: 20 1 70%;
    padding: calc(var(--padding) / 2) 0;
  }

  .icon {
    padding: calc(var(--padding) / 2) 0;
    margin-inline-end: var(--mfe-size-2xs);
    color: var(--main-color);
  }

  .text-content {
    display: flex;
    flex-direction: column;
  }

  .caption {
    color: var(--mfe-color-neutral-darker);
    font: var(--mfe-font-title-3-medium);
  }

  .actions {
    display: none;
    flex-wrap: wrap;
    gap: var(--mfe-size-m);
    padding: calc(var(--padding) / 2) 0;
  }

  .close {
    --mfe-color-neutral-lightest: transparent;
  }

  .caption + .description {
    margin-top: var(--mfe-size-2xs);
  }

  :host([closed]) {
    display: none;
  }

  :host([variant="success"]) .alert {
    --main-color: var(--mfe-color-success-base);
    --main-bg-color: var(--mfe-color-success-contrast);
  }

  :host([variant="warning"]) .alert {
    --main-color: var(--mfe-color-warning-base);
    --main-bg-color: var(--mfe-color-warning-contrast);
  }

  :host([variant="danger"]) .alert {
    --main-color: var(--mfe-color-danger-base);
    --main-bg-color: var(--mfe-color-danger-contrast);
  }
`;
