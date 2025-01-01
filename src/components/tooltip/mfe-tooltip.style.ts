import { css } from "lit";

export const MfeTooltipStyle = css`
  :host {
    display: contents;
  }

  .trigger {
    display: var(--mfe-tooltip-trigger-display, inline-flex);
    cursor: pointer;
  }

  mfe-popover {
    --mfe-popover-background-color: var(--mfe-color-info-base);
    --mfe-popover-arrow-display: block;
    --mfe-popover-border-size: 0px;
    --mfe-popover-max-width: 424px;
  }

  .content {
    color: var(--mfe-color-neutral-full);
  }
`;
