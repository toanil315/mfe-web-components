import { css } from "lit";

export const MfeSelectOptionStyle = css`
  :host {
    position: relative;
  }

  .option-container {
    --option-font: var(--mfe-font-title-3-regular);
    --option-spacing: var(--mfe-size-xs) 0;
    --option-selected-color: var(--mfe-color-primary-base);
    --option-hover-color: var(--mfe-color-primary-highlight);
    --option-color: var(--mfe-color-neutral-darker);
    --option-disabled-color: var(--mfe-color-neutral-light);
    --option-separator: 1px solid var(--mfe-color-neutral-lighter);
    --option-gap: var(--mfe-size-2xs);
    --option-transition: color 120ms ease-out;
  }

  .option-container::after {
    position: absolute;
    content: "";
    width: 100%;
    bottom: 0;
    border-bottom: var(--option-separator);
  }

  .no-border-bottom::after {
    border-bottom: none;
  }

  :host(:last-of-type) .option-container::after {
    border-bottom: none;
  }

  .single-option {
    width: 100%;
    display: block;
    cursor: pointer;
    color: var(--option-color);
    padding: var(--option-spacing);
    transition: var(--option-transition);
    font: var(--option-font);
    user-select: none;
    position: relative;
    outline: none;
  }

  .single-option:focus-visible::after {
    content: "";
    position: absolute;
    inset: calc(var(--mfe-size-3xs) * -1);
    border: var(--mfe-size-4xs) solid var(--option-hover-color);
    border-radius: var(--mfe-size-4xs);
  }

  :host(:hover) .single-option {
    color: var(--option-hover-color);
  }

  :host([selected]) .single-option {
    color: var(--option-selected-color);
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  :host([disabled]) .single-option {
    color: var(--option-disabled-color);
    cursor: not-allowed;
    pointer-events: none;
  }

  .checkbox-option {
    width: 100%;
    display: block;
    color: var(--option-color);
    padding: var(--option-spacing);
  }
`;
