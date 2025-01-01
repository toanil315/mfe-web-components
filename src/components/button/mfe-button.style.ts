import { css } from "lit";

export const MfeButtonStyle = css`
  :host {
    display: var(--mfe-button-display, inline-block);
    max-width: 100%;
    position: relative;
  }

  .button {
    --main-color: var(--mfe-color-primary-base);
    --main-hover-color: var(--mfe-color-primary-highlight);
    --text-hover-color: var(--mfe-color-neutral-lightest);
    --content-color: var(--mfe-color-neutral-full);
    --bg-color: var(--main-color);
    --border-color: var(--main-color);
    --padding-vertical: var(--mfe-size-2xs);
    --padding-horizontal: var(--mfe-size-m);
    --margin-icon: var(--padding-vertical);
    --icon-size: var(--mfe-size-m);
    --font: var(--mfe-font-title-3-medium);
    --height: var(--mfe-size-2xl);

    display: flex;
    gap: var(--margin-icon);
    justify-content: var(--mfe-button-justify, center);
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: var(--height);
    border: solid 1px var(--border-color);
    border-radius: var(--mfe-border-radius-m);
    text-decoration: none;
    padding: var(--padding-vertical) var(--padding-horizontal);
    cursor: pointer;
    background-color: var(--bg-color);
    color: var(--content-color);
    font: var(--font);
    font-kerning: none;
    user-select: none;
  }

  :host(:hover) .button {
    --bg-color: var(--main-hover-color);
    --border-color: var(--main-hover-color);
  }

  .label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([size="small"]) .button {
    --font: var(--mfe-font-title-4-medium);
    --padding-vertical: var(--mfe-size-3xs);
    --padding-horizontal: var(--mfe-size-2xs);
    --icon-size: var(--mfe-size-s);
    --height: var(--mfe-size-xl);
  }

  :host([size="large"]) .button {
    --font: var(--mfe-font-title-3-medium);
    --padding-vertical: var(--mfe-size-xs);
    --padding-horizontal: var(--mfe-size-xl);
    --margin-icon: var(--mfe-size-2xs);
    --height: var(--mfe-size-3xl);
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    position: relative;
    outline: none;
  }

  .button:focus-visible::after {
    border: 2px solid var(--mfe-button-focus-border-color, var(--main-color));
    border-radius: var(--mfe-border-radius-l);
    content: "";
    position: absolute;
    inset: -4px;
  }

  :host ::slotted(mfe-icon) {
    font-size: var(--icon-size);
  }

  :host([loading]) ::slotted(mfe-icon) {
    display: none;
  }

  :host .has-icon:not(.has-content) {
    --padding-horizontal: var(--padding-vertical);
    --margin-icon: 0;
  }

  :host([variant="secondary"]) .button {
    --bg-color: transparent;
    --content-color: var(--main-color);
  }

  :host([variant="tertiary"]) .button {
    --content-color: var(--main-color);
    --border-color: transparent;
    --bg-color: transparent;
  }

  :host([kind="neutral"]) .button {
    --main-color: var(--mfe-color-neutral-darker);
    --main-hover-color: var(--mfe-color-neutral-darkest);
  }

  :host([kind="success"]) .button {
    --main-color: var(--mfe-color-success-base);
    --main-hover-color: var(--mfe-color-success-highlight);
  }

  :host([kind="danger"]) .button {
    --main-color: var(--mfe-color-danger-base);
    --main-hover-color: var(--mfe-color-danger-highlight);
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  :host([loading]) {
    cursor: wait;
  }

  :host .button[aria-disabled="true"] {
    --main-color: var(--mfe-color-neutral-lightest);
    --main-hover-color: var(--mfe-color-neutral-lightest);
    --content-color: var(--mfe-color-neutral-lighter);
    --bg-color: var(--main-color);

    pointer-events: none;
    text-decoration: none;
  }

  :host([variant="tertiary"]) .button[aria-disabled="true"] {
    --main-color: transparent;
  }

  :host([variant="secondary"]:hover) .button[aria-disabled="false"] {
    --content-color: var(--mfe-color-neutral-full);
    --bg-color: var(--main-hover-color);
  }

  :host([variant="tertiary"]:hover) .button[aria-disabled="false"] {
    --content-color: var(--main-hover-color);
    --bg-color: var(--text-hover-color);
  }

  :host([dropdown]) .open {
    display: none;
  }

  :host([dropdown]) .active .open {
    display: inline-block;
  }

  :host([dropdown]) .active .close {
    display: none;
  }

  :host .active.button {
    --bg-color: var(--main-hover-color);
    --border-color: var(--main-hover-color);
  }

  :host([variant="secondary"]) .active.button {
    --content-color: var(--mfe-color-neutral-full);
    --bg-color: var(--main-hover-color);
  }

  :host([variant="tertiary"]) .active.button {
    --content-color: var(--main-color);
    --bg-color: var(--mfe-color-neutral-lightest);
    --border-color: transparent;
  }
`;
