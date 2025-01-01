import { css } from "lit";

export const MfeRadioStyle = css`
  :host {
    cursor: pointer;
    outline: none;
  }

  .wrapper {
    --size: var(--mfe-size-m);

    outline: none;
  }

  #label {
    display: flex;
    font: var(--mfe-font-title-3-regular);
    line-height: normal;
    align-items: var(--mfe-radio-align-items, center);
    margin-block: 0;
    color: var(--mfe-color-neutral-darker);
    gap: var(--mfe-size-2xs);
  }

  #label::before {
    content: "";
    display: inline-block;
    box-sizing: border-box;
    min-width: var(--size);
    min-height: var(--size);
    max-width: var(--size);
    max-height: var(--size);
    background-color: white;
    border-radius: var(--mfe-border-radius-circle);
    border: solid 1px var(--mfe-color-neutral-lighter);
  }

  .selected #label::before {
    border-width: var(--mfe-size-3xs);
    border-color: var(--mfe-color-primary-base);
  }

  :host(:hover) #label,
  .selected #label {
    color: var(--mfe-color-primary-base);
  }

  :host([disabled]) {
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([disabled]) .wrapper {
    --size: calc(var(--mfe-size-m) - 2px);
  }

  :host([disabled]) #label {
    color: var(--mfe-color-neutral-light);
  }

  :host([disabled]) #label::before {
    background-color: var(--mfe-color-neutral-lightest);
    border-width: 0;
    box-shadow: 0 0 0 1px var(--mfe-color-neutral-lighter);
  }

  :host([disabled]) .selected #label::before {
    background-color: var(--mfe-color-neutral-light);
    border-color: var(--mfe-color-neutral-lightest);
    border-width: calc(var(--mfe-size-3xs) - 1px);
  }

  .wrapper:focus-visible #label::before {
    box-shadow:
      0 0 0 1px white,
      0 0 0 3px var(--mfe-color-primary-base);
  }
`;
