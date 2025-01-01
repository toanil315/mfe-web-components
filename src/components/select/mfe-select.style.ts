import { css } from "lit";

export const MfeSelectStyle = css`
  :host {
    width: 200px;
    display: inline-block;
  }

  .select-wrapper {
    width: 100%;
    position: relative;
    display: grid;
    gap: var(--mfe-size-3xs);

    --padding-vertical: var(--mfe-size-2xs);
    --padding-horizontal: var(--mfe-size-xs);
    --label-padding: var(--mfe-size-3xs);
    --border-size: 1px;
    --background-color: var(--mfe-color-neutral-full);
    --border-color: var(--mfe-color-neutral-lighter);
    --border-focus-color: var(--mfe-color-primary-highlight);
    --icon-color: var(--mfe-color-neutral-light);
    --text-color: var(--mfe-color-neutral-darker);
    --label-color: var(--mfe-color-neutral-dark);
    --placeholder-color: var(--mfe-color-neutral-light);
    --height: var(--mfe-size-2xl);
    --menu-padding: 0 var(--mfe-size-m);
    --menu-margin-top: var(--mfe-size-2xs);
    --font-size: var(--mfe-font-size-m);
    --disabled-color: var(--mfe-color-neutral-lightest);
    --menu-height: 250px;
    --popover-position: var(--mfe-popover-position, fixed);
  }

  :host([multiple][view-select-all]) .select-wrapper {
    --menu-height: 290px;
  }

  :host([size="large"]) .select-wrapper {
    --height: var(--mfe-size-3xl);
    --padding-vertical: var(--mfe-size-xs);
    --padding-horizontal: var(--mfe-size-m);
  }

  :host([size="small"]) .select-wrapper {
    --height: var(--mfe-size-xl);
    --padding-vertical: var(--mfe-size-3xs);
    --padding-horizontal: var(--mfe-size-xs);
    --font-size: var(--mfe-font-size-s);
  }

  :host([disabled]) .select-wrapper {
    --placeholder-color: var(--mfe-color-neutral-light);
  }

  .dirty.invalid {
    --border-color: var(--mfe-color-danger-base);
    --border-focus-color: var(--mfe-color-danger-highlight);
    --label-color: var(--mfe-color-danger-base);
  }

  .select-input {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 1fr max-content max-content;
    cursor: pointer;
    box-sizing: border-box;
    height: var(--height);
    border: solid 1px var(--border-color);
    font: var(--mfe-font-title-3-regular);
    padding: 0
      calc(
        var(--padding-horizontal) - var(--label-padding) - var(--border-size)
      );
    border-radius: var(--mfe-border-radius-s);
    color: var(--text-color);
    background-color: var(--background-color);
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-user-select: none;
    user-select: none;
    margin: 0;
    width: auto;
    min-width: 100%;
  }

  .label,
  .placeholder {
    color: var(--placeholder-color);
    padding-left: var(--label-padding);
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host(:not([placeholder])) .placeholder,
  .select-wrapper.selected .placeholder,
  :host([label]:not([label-fixed]))
    .select-wrapper:not(.select-open)
    .placeholder {
    display: none;
  }

  :host([label-fixed]) .label,
  :host(:not([label])) .label {
    display: none;
  }

  .remove-all {
    display: none;
  }

  .selected .remove-all {
    display: block;
  }

  :host([disabled]) .remove-all,
  :host([disabled]) .remove-all::after {
    display: none;
  }

  .dropdown-icon {
    font-size: var(--mfe-font-size-m);
  }

  .dropdown-icon.open {
    display: none;
  }

  .select-open .dropdown-icon.open {
    display: inline-block;
  }

  .select-open .dropdown-icon.closed {
    display: none;
  }

  .selected .dropdown-icon {
    --icon-color: var(--mfe-color-neutral-darker);
  }

  :host([disabled]) .dropdown-icon {
    --icon-color: var(--mfe-color-neutral-light);
  }

  .select-open .select-input,
  .select-input:focus-visible {
    border: solid 1px var(--border-focus-color);
    outline: none;
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  :host([disabled]) .select-input {
    pointer-events: none;
    background-color: var(--disabled-color);
  }

  .select-input .selected-options {
    padding: 0;
    padding-left: var(--label-padding);
    margin: 0;
    list-style: none;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  :host([disabled]) .select-input .selected-options {
    color: var(--mfe-color-neutral-light);
  }

  .selected-options li {
    display: inline;
    font-size: var(--font-size);
    color: var(--text-color);
  }

  .selected-options li:not(:last-child)::after {
    content: ", ";
  }

  .select-input:not(.has-overflowed-options) .additional-selection-count {
    display: none;
  }

  :host([disabled]) .additional-selection-count {
    color: var(--mfe-color-neutral-light);
  }

  :host([disabled]) .selected-options li {
    color: var(--mfe-color-neutral-light);
  }

  .select-input .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--mfe-size-4xs);
    margin-left: var(--mfe-size-2xs);
  }

  .popover {
    --left: 0;
    --top: 0;

    position: var(--popover-position);
    border: solid 1px var(--border-color);
    background-color: var(--background-color);
    font: var(--mfe-font-title-3-regular);
    border-radius: var(--mfe-border-radius-s);
    padding: var(--menu-padding);
    outline: none;
    box-sizing: border-box;
    max-height: var(--menu-height);
    overflow-y: auto;
    display: none;
    flex-direction: column;
    z-index: var(--mfe-index-popover);
    width: 100%;
    top: var(--top);
    left: var(--left);
  }

  :host(:empty) .popover {
    display: none;
  }

  .popover-no-result {
    display: flex;
    flex-direction: column;
    gap: var(--mfe-size-2xs);
    align-items: center;
    justify-content: center;
    height: 80px;
  }

  .select-open .popover {
    display: flex;
    border: solid 1px var(--border-focus-color);
  }

  mfe-icon {
    color: var(--icon-color);
  }

  legend,
  label {
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  label {
    position: absolute;
    display: block;
    top: var(--padding-vertical);
    left: var(--padding-horizontal);
    right: calc(var(--mfe-size-2xs) + var(--mfe-size-m) + var(--mfe-size-2xs));
    transition: all ease-in 0.1s;
    pointer-events: none;
    opacity: 0;
    font: var(--mfe-font-title-3-regular);
    font-size: var(--font-size);
    color: var(--placeholder-color);
  }

  legend {
    height: 0;
    visibility: hidden;
    display: none;
  }

  legend span {
    padding: 0 var(--label-padding);
    display: inline-block;
    opacity: 0;
    visibility: visible;
  }

  :host([placeholder]) :where(.select-open, .selected) .label,
  :host(:not([placeholder])) .selected .label {
    display: none;
  }

  :where(.select-open, .selected) label {
    top: 0;
    transform: translateY(-50%);
    font: var(--mfe-font-caption-base);
    color: var(--label-color);
    pointer-events: initial;
    right: var(--padding-horizontal);
    opacity: 1;
  }

  :host([label]) :where(.select-open, .selected) legend {
    max-width: 100%;
    font: var(--mfe-font-caption-base);
    display: block;
  }

  :host([label-fixed]) label {
    position: static;
    padding: 0;
    transition: none;
    transform: none;
    pointer-events: initial;
    font: var(--mfe-font-caption-base);
    color: var(--label-color);
    opacity: 1;
  }

  :host([label-fixed]) legend {
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

  .error-icon,
  .invalid-text {
    display: none;
  }

  .dirty.invalid label,
  .invalid-text,
  .error-icon {
    color: var(--mfe-color-danger-base);
  }

  .help-text {
    color: var(--mfe-color-neutral-dark);
  }

  .select-open .help-text,
  .select-open .invalid-text {
    visibility: hidden;
  }

  :host([help-text]) .hint,
  .dirty.invalid .hint {
    display: block;
  }

  .dirty.invalid .invalid-text {
    display: block;
  }

  .dirty.invalid .help-text {
    display: none;
  }

  .select-all {
    position: sticky;
    top: 0;
    padding: var(--mfe-size-xs) 0;
    background: var(--background-color);
    z-index: 1;
    font: var(--mfe-font-title-3-regular);

    /* Make sure option focus doesn't overflow */
    box-shadow:
      10px 0 0 var(--background-color),
      -10px 0 0 var(--background-color);
  }

  .select-all::after {
    position: absolute;
    content: "";
    width: 100%;
    bottom: 0;
    border-bottom: 1px solid var(--mfe-color-neutral-lighter);
  }

  .search-bar-input {
    font: var(--mfe-font-title-3-regular);
    font-size: var(--font-size);
    color: var(--text-color);
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .search-bar-input::placeholder {
    color: var(--placeholder-color);
  }

  .search-bar-input:focus-visible {
    outline: none;
  }

  .search-spinner {
    padding-inline-end: var(--mfe-font-size-2xs);
  }

  .action-divider {
    display: none;
  }

  .select-wrapper .action-divider {
    display: block;
    height: 1rem;
    width: 1px;
    background-color: var(--mfe-color-neutral-lighter);
  }

  .actions mfe-icon {
    padding: 4px;
  }
`;
