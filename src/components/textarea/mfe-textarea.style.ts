import { css } from "lit";

export const MfeTextareaStyle = css`
  :host {
    display: inline-block;
    width: 200px;
    position: relative;
  }

  .wrapper {
    --row-count: 1;
    --maxrow-count: ;
    --line-height: var(--mfe-font-title-3-line-height);
    --scroll-height: var(--line-height);
    --padding-vertical: var(--mfe-size-2xs);
    --padding-horizontal: var(--mfe-size-xs);
    --label-padding: var(--mfe-size-3xs);
    --border-size: 1px;
    --default-scroll-height: calc(
      (var(--row-count) * var(--line-height)) + var(--padding-vertical)
    );
    --height: max(var(--scroll-height), var(--default-scroll-height));
    --input-font: var(--mfe-font-body-text-2-base);
    --border-radius: var(--mfe-size-3xs);
    --border-color: var(--mfe-color-neutral-lighter);
    --background-color: var(--mfe-color-neutral-full);

    display: flex;
    flex-direction: column;
    position: relative;
    gap: var(--mfe-size-3xs);
  }

  .input-wrapper {
    border: solid var(--border-size) var(--border-color);
    border-radius: var(--border-radius);
    padding: 0
      calc(
        var(--padding-horizontal) - var(--label-padding) - var(--border-size)
      );
    padding-top: var(--padding-vertical);
    display: flex;
    box-sizing: border-box;
    background-color: var(--background-color);
    margin: 0;
    width: 0;
    min-width: 100%;
  }

  textarea {
    --parent-padding: calc(
      var(--padding-horizontal) - var(--label-padding) - var(--border-size)
    );

    width: 100%;
    align-self: stretch;
    outline: none;
    font: var(--input-font);
    padding: 0 calc(var(--padding-horizontal) - var(--border-size));
    padding-bottom: var(--padding-vertical);
    margin: 0 calc(-1 * var(--parent-padding));
    border: none;
    border-radius: var(--border-radius);
    color: var(--mfe-color-neutral-darker);
    resize: vertical;
    background-color: transparent;
    display: block;
  }

  :host([size="large"]) .wrapper {
    --padding-vertical: var(--mfe-size-xs);
    --padding-horizontal: var(--mfe-size-m);
  }

  :host([size="small"]) .wrapper {
    --padding-vertical: var(--mfe-size-3xs);
    --padding-horizontal: var(--mfe-size-xs);
    --input-font: var(--mfe-font-body-text-3-base);
    --line-height: var(--mfe-font-title-4-line-height);
  }

  textarea:disabled {
    background-color: var(--mfe-color-neutral-lightest);
    color: var(--mfe-color-neutral-light);
    cursor: not-allowed;
  }

  :host([disabled]) .wrapper {
    --background-color: var(--mfe-color-neutral-lightest);
  }

  :host([expand]) textarea {
    overflow: hidden;
    resize: none;
    height: var(--height);
  }

  :host([expand][max-rows]) textarea {
    --maxrow-height: calc(
      (var(--maxrow-count) * var(--line-height)) + var(--padding-vertical)
    );

    overflow-y: scroll;
    height: min(var(--height), var(--maxrow-height));
  }

  .wrapper:focus-within {
    --border-color: var(--mfe-color-primary-base);
  }

  .max-len-invalid,
  .error {
    --border-color: var(--mfe-color-danger-base);
  }

  :host([label]) ::placeholder {
    color: transparent;
    transition: color ease-out 0.4s;
  }

  .input-wrapper legend,
  label {
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  label {
    max-width: max-content;
    position: absolute;
    transition: all ease-in 0.1s;
    font: var(--mfe-font-title-3-regular);
    top: var(--padding-vertical);
    left: var(--padding-horizontal);
    right: var(--padding-horizontal);
    pointer-events: none;
    color: var(--mfe-color-neutral-light);
  }

  .input-wrapper legend {
    height: 0;
    visibility: hidden;
    display: none;
  }

  .input-wrapper legend span {
    padding: 0 var(--label-padding);
    display: inline-block;
    opacity: 0;
    visibility: visible;
  }

  :where(.wrapper:focus-within, .wrapper.has-value) label {
    top: 0;
    left: var(--padding-horizontal);
    transform: translateY(-50%);
    font: var(--mfe-font-caption-base);
    color: var(--mfe-color-neutral-dark);
    pointer-events: initial;
    z-index: var(--mfe-index-base);
  }

  :host([label]) :where(.wrapper:focus-within, .wrapper.has-value) legend {
    max-width: 100%;
    font: var(--mfe-font-caption-base);
    display: block;
  }

  :host ::placeholder,
  :host([label-fixed]) ::placeholder {
    color: var(--mfe-color-neutral-light);
  }

  :host([label-fixed]) label {
    position: static;
    transition: none;
    transform: none;
    pointer-events: initial;
    font: var(--mfe-font-caption-base);
    color: var(--mfe-color-neutral-dark);
    background-color: initial;
    padding: 0;
  }

  :host([label-fixed]) legend {
    display: none;
  }

  .hint {
    display: none;
    font: var(--mfe-font-body-text-3-base);
  }

  :host([character-counter]) .hint,
  :host([help-text]) .hint,
  .error .hint {
    display: flex;
    gap: var(--mfe-size-3xs);
  }

  .hint > * {
    margin: 0;
    padding: 0;
  }

  .help-text,
  .error-text {
    flex: 1;
  }

  .counter-text {
    color: var(--mfe-color-neutral-dark);
    margin-left: auto;
  }

  :where(.max-len-invalid, .error) .hint > .counter-text {
    color: var(--mfe-color-danger-base);
  }

  .error label {
    color: var(--mfe-color-danger-base);
  }

  .error-text {
    display: none;
    color: var(--mfe-color-danger-base);
  }

  .help-text {
    color: var(--mfe-color-neutral-dark);
  }

  :where(.error) .hint > .error-text {
    display: inline-block;
  }

  .error .hint > .help-text {
    display: none;
  }
`;
