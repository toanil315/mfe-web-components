import { css } from "lit";

export const MfeCheckboxStyle = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  :host * {
    outline: none;
  }

  label {
    display: flex;
    gap: var(--mfe-size-2xs);
    color: var(--mfe-color-neutral-darker);
    font: var(--mfe-font-title-3-base);
    cursor: pointer;
    user-select: none;
  }

  .label {
    overflow-wrap: anywhere;
  }

  .error label {
    margin-bottom: var(--mfe-size-3xs);
  }

  .checkbox-container {
    position: relative;
  }

  input[type="checkbox"] {
    appearance: none;
    outline: none;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid var(--mfe-color-neutral-lighter);
    border-radius: var(--mfe-border-radius-xs);
    width: var(--mfe-size-m);
    height: var(--mfe-size-m);
    min-width: var(--mfe-size-m);
    min-height: var(--mfe-size-m);
    max-width: var(--mfe-size-m);
    max-height: var(--mfe-size-m);
  }

  .check-mark {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--mfe-size-m);
    height: var(--mfe-size-m);
    min-width: var(--mfe-size-m);
    min-height: var(--mfe-size-m);
    max-width: var(--mfe-size-m);
    max-height: var(--mfe-size-m);
    border: 1px solid var(--mfe-color-neutral-lighter);
    border-radius: var(--mfe-border-radius-xs);
    color: var(--mfe-color-neutral-full);
    font-size: var(--mfe-font-size-2xs);
    background-color: var(--mfe-color-neutral-full);
  }

  .error .check-mark {
    border-color: var(--mfe-color-danger-base);
  }

  :host([checked]) .label,
  :host(:hover) .label {
    color: var(--mfe-color-primary-base);
  }

  :host(:is([checked], [indeterminate])) .check-mark {
    background-color: var(--mfe-color-primary-base);
    border: none;
  }

  :host([disabled]) {
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([disabled]) .check-mark,
  :host([disabled]) .label {
    color: var(--mfe-color-neutral-light);
    border: 1px solid var(--mfe-color-neutral-lighter);
  }

  :host([disabled]) .check-mark {
    background-color: var(--mfe-color-neutral-lightest);
  }

  :host(:not([disabled])) input:focus-visible + .check-mark {
    box-shadow:
      0 0 0 1px white,
      0 0 0 3px var(--mfe-color-primary-base);
  }
`;
