import { css } from "lit";

export const MfeSwitchStyle = css`
  :host {
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
  }

  span {
    display: inline-block;
  }

  .switch {
    --track-height: var(--mfe-size-xl);
    --track-width: var(--mfe-size-4xl);
    --thumb-offset: var(--mfe-size-4xs);
    --thumb-height: calc(var(--track-height) - calc(2 * var(--thumb-offset)));
    --thumb-width: var(--thumb-height);

    /* TODO: use predefined animation duration once it is ready */
    --animation-duration: var(--mfe-switch-animation-duration, 300ms);
    --switch-color: var(
      --mfe-switch-color-off,
      var(--mfe-color-neutral-lighter)
    );

    background-color: var(--switch-color);
    border-radius: var(--mfe-border-radius-pill);
    height: var(--track-height);
    transition-property: background-color;
    transition-duration: var(--animation-duration);
    width: var(--track-width);
  }

  .switch::before {
    content: "";
    display: inline-block;
    background-color: white;
    border-radius: var(--mfe-border-radius-circle);
    height: var(--thumb-height);
    inset-inline-start: var(--thumb-offset);
    position: relative;
    top: var(--thumb-offset);
    transition: transform;
    transition-duration: var(--animation-duration);
    width: var(--thumb-width);
  }

  label {
    display: flex;
    gap: var(--mfe-size-2xs);
    color: var(--mfe-color-neutral-darker);
    font: var(--mfe-font-title-3-base);
    cursor: pointer;
    user-select: none;
    line-height: normal;
    align-items: center;
    margin-block: 0;
  }

  .label {
    overflow-wrap: anywhere;
  }

  :host([disabled]) .label {
    color: var(--mfe-color-neutral-light);
    border: 1px solid var(--mfe-color-neutral-lighter);
  }

  :host([checked]) .switch {
    --switch-color: var(
      --mfe-switch-color-on,
      var(--mfe-switch-color, var(--mfe-color-primary-base))
    );
  }

  :host([checked]) .switch::before {
    transform: translateX(
      calc(
        var(--track-width) - var(--thumb-width) - calc(2 * var(--thumb-offset))
      )
    );
  }

  :host([checked][dir="rtl"]) .switch::before {
    transform: translateX(
      calc(
        calc(2 * var(--thumb-offset)) - var(--track-width) + var(--thumb-width)
      )
    );
  }

  :host([disabled]) .switch {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  .switch:focus-visible {
    position: relative;
    outline: none;
  }

  .switch:focus-visible::after {
    border: 2px solid var(--switch-color);
    border-radius: var(--mfe-border-radius-pill);
    content: "";
    position: absolute;
    inset: -3px;
  }
`;
