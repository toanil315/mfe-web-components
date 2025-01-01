import { css } from "lit";

export const MfeTabStyle = css`
  :host {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--mfe-color-neutral-full);
  }

  .container {
    --title-padding-vertical: var(--mfe-size-m);
    --title-padding-horizontal: var(--mfe-size-xl);
    --title-color: var(--mfe-color-neutral-darker);
    --caption-color: var(--mfe-color-neutral-darker);
    --icon-color: var(--mfe-color-neutral-darker);
    --border-bottom-width: var(--mfe-size-4xs);
    --border-left-space: var(--mfe-size-xl);
    --font-title: var(--mfe-font-title-3-medium);
    --font-caption: var(--mfe-font-title-4-regular);
    --tab-right-padding: var(--mfe-size-xl);
    --help-container-width: var(--mfe-size-2xl);
    --tab-height: calc(var(--mfe-size-3xl) + var(--mfe-size-s));

    display: flex;
    border: none;
    cursor: pointer;
    background-color: initial;
    width: max-content;
    height: var(--tab-height);
    padding: 0 var(--tab-right-padding);
    margin-right: 1px;
  }

  .container::after {
    position: absolute;
    content: "";
    right: 0;
    top: var(--mfe-size-m);
    height: calc(100% - var(--mfe-size-2xl));
    border-right: 1px solid var(--mfe-color-neutral-lighter);
  }

  :host(:last-of-type) .container::after {
    border-right: none;
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:focus-visible) .container,
  .container:focus-visible {
    outline: 2px solid var(--mfe-color-primary-base);
    outline-offset: calc(-1 * var(--mfe-size-3xs));
    border-radius: var(--mfe-border-radius-s);
  }

  :host .container::before {
    content: "";
    position: absolute;
    opacity: 0;
    bottom: calc(-1 * var(--mfe-size-4xs));
    left: var(--border-left-space);
    width: calc(100% - var(--mfe-size-4xl));
    border-bottom: var(--border-bottom-width) solid
      var(--mfe-color-primary-base);
  }

  :host([selected]:not([disabled])) .container::before {
    opacity: 1;
  }

  :host(:hover) .container,
  :host([selected]) .container {
    --title-color: var(--mfe-color-primary-base);
    --icon-color: var(--mfe-color-primary-base);
  }

  :host([disabled]) .container {
    cursor: not-allowed;

    --title-color: var(--mfe-color-neutral-lighter);
    --caption-color: var(--mfe-color-neutral-lighter);
    --icon-color: var(--mfe-color-neutral-lighter);
  }

  :host(:hover) :where(.title, .icon) {
    transition: color 120ms ease-out;
  }

  :host([selected]) .border-bottom {
    display: inline-block;
  }

  :host([disabled]) .container:hover {
    cursor: not-allowed;
  }

  :host([help-text]) button {
    padding-right: 0;
  }

  .tab-button {
    width: max-content;
  }

  .help-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--help-container-width);
    height: 100%;
    font-size: var(--mfe-font-size-m);
    pointer-events: visible;
    padding-right: var(--tab-right-padding);
  }

  mfe-tooltip {
    --mfe-tooltip-position: fixed;

    display: flex;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font: var(--font-title);
    color: var(--title-color);
    line-height: var(--mfe-size-m);
    white-space: nowrap;
  }

  .title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: auto;
  }

  .badge-container {
    padding-left: var(--mfe-size-3xs);
    display: flex;
    margin-bottom: 1px;
  }

  .caption {
    font: var(--font-caption);
    line-height: var(--mfe-size-xs);
    color: var(--caption-color);
    text-align: center;
    margin-top: var(--mfe-size-4xs);
  }

  .icon {
    display: flex;
    color: var(--icon-color);
    font-size: var(--mfe-font-size-l);
    margin-right: var(--mfe-size-3xs);
    margin-bottom: 1px;
  }

  :host([notify]) .title::after {
    content: "";
    height: var(--mfe-size-2xs);
    width: var(--mfe-size-2xs);
    border-radius: var(--mfe-size-3xs);
    margin-left: var(--mfe-size-3xs);
    background-color: var(--mfe-color-danger-base);
    margin-bottom: 1px;
  }
`;
