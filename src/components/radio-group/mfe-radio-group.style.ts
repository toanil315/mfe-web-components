import { css } from "lit";

export const MfeRadioGroupStyle = css`
  :host {
    display: block;
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
    flex-flow: var(--mfe-radio-direction, column) wrap;
    align-items: var(--mfe-radio-group-cross-axis-item-alignment, normal);
    align-content: var(--mfe-radio-group-cross-axis-content-alignment, normal);
    justify-content: var(--mfe-radio-group-main-axis-content-alignment, normal);
    gap: var(--mfe-size-m);
    margin-block: var(--mfe-size-xs);
  }
`;
