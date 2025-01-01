import { css } from "lit";

export const MfeCheckboxGroupStyle = css`
  :host {
    display: flex;
    flex-direction: row;
  }

  fieldset {
    border: none;
    padding: 0;
  }

  legend {
    font: var(--mfe-font-title-3-medium);
    color: var(--mfe-color-neutral-darker);
  }

  .options {
    display: flex;
    flex-flow: var(--mfe-checkbox-direction, column) wrap;
    gap: var(--mfe-size-m);
    margin-block: var(--mfe-size-xs);
  }

  .error .options {
    margin-bottom: var(--mfe-size-3xs);
  }

  .hint {
    display: none;
    font: var(--mfe-font-body-text-3-base);
  }

  .hint p {
    padding: 0;
    margin: 0;
  }

  .error-message {
    display: none;
    color: var(--mfe-color-danger-base);
  }

  .error .hint {
    display: block;
  }

  .error .error-message {
    display: block;
  }
`;
