import { css } from "lit";

export const MfeInputStyle = css`
  :host {
    display: inline-block;
    width: 200px;
    position: relative;
  }

  .wrapper {
    --border-color: var(--mfe-color-neutral-lighter);
    --icon-color: var(--mfe-color-neutral-light);
    --text-color: var(--mfe-color-neutral-darker);
    --height: var(--mfe-size-2xl);
    --input-font: var(--mfe-font-body-text-2-base);
    --line-height: var(--mfe-font-body-text-2-line-height);
    --icon-size: var(--line-height);
    --icon-gap: var(--mfe-size-xs);
    --padding-vertical: calc((var(--height) - var(--line-height)) / 2);
    --padding-horizontal: var(--mfe-size-xs);
    --autofill-bg-color: var(--mfe-color-primary-contrast);
    --label-padding: var(--mfe-size-3xs);
    --background-color: var(--mfe-color-neutral-full);

    display: grid;
    position: relative;
    gap: var(--mfe-size-3xs);
  }

  .wrapper:focus-within {
    --border-color: var(--mfe-color-primary-base);
    --icon-color: var(--mfe-color-primary-base);
  }

  .wrapper.invalid {
    --border-color: var(--mfe-color-danger-base);
    --icon-color: var(--mfe-color-danger-base);
  }

  :host([size="large"]) .wrapper {
    --height: var(--mfe-size-3xl);
    --padding-vertical: var(--mfe-size-xs);
    --padding-horizontal: var(--mfe-size-m);
    --icon-gap: var(--mfe-size-m);
  }

  :host([size="small"]) .wrapper {
    --height: var(--mfe-size-xl);
    --input-font: var(--mfe-font-body-text-3-base);
    --padding-vertical: var(--mfe-size-3xs);
    --icon-size: var(--mfe-font-body-text-3-line-height);
    --icon-gap: var(--mfe-size-2xs);
  }

  .input-wrapper {
    --border-size: 1px;

    outline: none;
    display: flex;
    box-sizing: border-box;
    gap: var(--padding-vertical);
    height: var(--height);
    border: solid var(--border-size) var(--border-color);
    padding: 0
      calc(
        var(--mfe-input-padding-end, var(--padding-horizontal)) - var(
            --label-padding
          ) - var(--border-size)
      )
      0
      calc(
        var(--mfe-input-padding-start, var(--padding-horizontal)) - var(
            --label-padding
          ) - var(--border-size)
      );
    background-color: var(--background-color);
    border-radius: var(--mfe-size-3xs);
    margin: 0;
    width: 0;
    min-width: 100%;
  }

  :host([disabled]) .wrapper {
    cursor: not-allowed;

    --background-color: var(--mfe-color-neutral-lightest);
    --text-color: var(--mfe-color-neutral-light);
  }

  .wrapper:has(input:autofill) {
    --background-color: var(--autofill-bg-color);
  }

  .wrapper:has(input:-webkit-autofill) {
    --background-color: var(--autofill-bg-color);
  }

  .input-wrapper legend,
  label {
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  label {
    position: absolute;
    max-width: max-content;
    transition: all ease-in 0.1s;
    font: var(--input-font);
    top: var(--padding-vertical);
    inset-inline-start: var(
      --mfe-input-padding-start,
      var(--padding-horizontal)
    );
    inset-inline-end: var(--mfe-input-padding-end, var(--padding-horizontal));
    pointer-events: none;
    color: var(--mfe-color-neutral-light);
  }

  .has-icon label {
    inset-inline-end: calc(
      var(--mfe-input-padding-end, var(--padding-horizontal)) +
        var(--icon-size) + var(--padding-vertical)
    );
  }

  .input-wrapper legend {
    height: 0;
    display: none;
  }

  .input-wrapper legend span {
    padding: 0 var(--label-padding);
    display: inline-block;
    opacity: 0;
    visibility: visible;
  }

  input {
    width: 100%;
    align-self: stretch;
    outline: 0;
    border: 0;
    padding: 0 0 0 var(--label-padding);
    font: var(--input-font);
    color: var(--text-color);
    -webkit-text-fill-color: var(--text-color);
    background-color: transparent;
  }

  input::-webkit-credentials-auto-fill-button {
    color: red;
  }

  :where(.wrapper:focus-within, .wrapper.has-value) input {
    padding-inline-start: var(--label-padding);
  }

  input:disabled {
    cursor: not-allowed;
  }

  input::-webkit-calendar-picker-indicator {
    display: none;
  }

  input::-moz-calendar-picker-indicator {
    display: none;
  }

  input:autofill {
    background-color: var(--autofill-bg-color);

    /**
   * Some browsers doesn't allow setting background-color
   * https://developer.mozilla.org/en-US/docs/Web/CSS/:autofill
   */
    box-shadow: 0 0 0 40rem var(--autofill-bg-color) inset;
  }

  input:-webkit-autofill {
    background-color: var(--autofill-bg-color);

    /**
   * Some browsers doesn't allow setting background-color
   * https://developer.mozilla.org/en-US/docs/Web/CSS/:autofill
   */
    box-shadow: 0 0 0 40rem var(--autofill-bg-color) inset;
  }

  .icon {
    display: flex;
    align-items: center;
    gap: var(--icon-gap);
    flex-basis: var(--icon-size);
    align-self: center;
    height: var(--icon-size);
    margin-inline-end: var(--label-padding);
  }

  mfe-icon:not(.reveal-icon),
  ::slotted(mfe-icon) {
    font-size: var(--icon-size);
    color: var(--icon-color);
    height: var(--icon-size);
  }

  .reveal-button mfe-icon {
    display: none;
  }

  mfe-icon[name="eye_on"] {
    display: inline-block;
  }

  .password-visible mfe-icon[name="eye_on"] {
    display: none;
  }

  .password-visible mfe-icon[name="eye_off"] {
    display: inline-block;
  }

  .wrapper:not(.has-icon) .icon {
    display: none;
  }

  .hint {
    display: none;
    font: var(--mfe-font-body-text-3-base);
  }

  .hint p {
    padding: 0;
    margin: 0;
  }

  ::placeholder {
    color: var(--mfe-color-neutral-light);
    -webkit-text-fill-color: var(--mfe-color-neutral-light);
  }

  :host([label]) ::placeholder {
    color: transparent;
    -webkit-text-fill-color: transparent;
    transition: color ease-out 0.4s;
  }

  :host([label-fixed]) ::placeholder,
  :host :focus-within ::placeholder {
    color: var(--mfe-color-neutral-light);
    -webkit-text-fill-color: var(--mfe-color-neutral-light);
  }

  :host([label-fixed]) label {
    position: static;
    transition: none;
    transform: none;
    pointer-events: initial;
    font: var(--mfe-font-caption-base);
    color: var(--mfe-color-neutral-dark);
    padding: 0;
  }

  :host([label-fixed]) legend {
    display: none;
  }

  :host(:not([label-fixed])) :focus-within label,
  :host(:not([label-fixed])) .has-value label {
    top: 0;
    inset-inline-start: calc(
      var(--mfe-input-padding-start, var(--padding-horizontal)) - var(
          --label-padding
        )
    );
    inset-inline-end: calc(
      var(--mfe-input-padding-end, var(--padding-horizontal)) - var(
          --label-padding
        )
    );
    transform: translateY(-50%);
    font: var(--mfe-font-caption-base);
    color: var(--mfe-color-neutral-dark);
    padding: 0 var(--label-padding);
    pointer-events: initial;
    z-index: var(--mfe-index-base);
  }

  :host([label]:not([label-fixed])) :where(:focus-within, .has-value) legend {
    max-width: 100%;
    font: var(--mfe-font-caption-base);
    display: block;
  }

  .error-icon,
  .invalid-text {
    display: none;
  }

  .invalid label,
  .invalid-text,
  .error-icon {
    color: var(--mfe-color-danger-base);
  }

  .help-text {
    color: var(--mfe-color-neutral-dark);
  }

  :host([help-text]) .hint,
  .invalid .hint {
    display: block;
  }

  .invalid .invalid-text {
    display: block;
  }

  .invalid .help-text {
    display: none;
  }

  .invalid .error-icon {
    display: inline-block;
  }
`;
