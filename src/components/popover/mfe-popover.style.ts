import { css } from "lit";

export const MfePopoverStyle = css`
  :host {
    display: contents;
  }

  .popover {
    --arrow-display: var(--mfe-popover-arrow-display, none);
    --background-color: var(
      --mfe-popover-background-color,
      var(--mfe-color-neutral-full)
    );
    --border-color: var(
      --mfe-popover-border-color,
      var(--mfe-color-primary-highlight)
    );
    --border-size: var(--mfe-popover-border-size, 1px);
    --padding: var(--mfe-popover-padding, var(--mfe-size-m));
    --border-radius: var(--mfe-popover-border-radius, var(--mfe-size-3xs));
    --position: var(--mfe-popover-position, fixed);
    --max-width: var(--mfe-popover-max-width, 100vw);
    --max-viewport: calc(100vw - var(--mfe-size-s));

    position: var(--position);
    box-sizing: border-box;
    border: var(--border-size) solid var(--border-color);
    padding: var(--padding);
    border-radius: var(--border-radius);
    z-index: var(--mfe-index-popover);
    max-width: min(var(--max-viewport), var(--max-width));
    width: max-content;
    hyphens: auto;
    background-color: var(--background-color);
    font: var(--mfe-font-title-3-regular);
    color: var(--mfe-color-neutral-darker);
  }

  .popover:not(.visible) {
    visibility: hidden;
  }

  .arrow {
    --arrow-rotation: 45deg;
    --size: var(--mfe-size-2xs);
    --arrow-position: calc((var(--size) / -2) - var(--border-size));

    box-sizing: border-box;
    display: var(--arrow-display);
    position: absolute;
    background-color: var(--background-color);
    width: var(--size);
    height: var(--size);
    transform: rotate(var(--arrow-rotation));
    border: var(--border-size) solid var(--border-color);
    border-bottom: none;
    border-right: none;
  }

  .popover[data-placement*="bottom"] .arrow {
    top: var(--arrow-position);
  }

  .popover[data-placement*="top"] .arrow {
    --arrow-rotation: 225deg;

    bottom: var(--arrow-position);
  }

  .popover[data-placement*="left"] .arrow {
    --arrow-rotation: 135deg;

    right: var(--arrow-position);
  }

  .popover[data-placement*="right"] .arrow {
    --arrow-rotation: 315deg;

    left: var(--arrow-position);
  }
`;
