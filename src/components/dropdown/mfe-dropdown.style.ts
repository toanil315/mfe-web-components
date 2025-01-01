import { css } from "lit";

export const MfeDropdownStyle = css`
  :host {
    position: relative;
    display: inline-block;
  }

  :host([kind="neutral"]) mfe-popover {
    --mfe-popover-border-color: var(--mfe-color-neutral-darker);
  }

  :host([kind="success"]) mfe-popover {
    --mfe-popover-border-color: var(--mfe-color-success-base);
  }

  :host([kind="danger"]) mfe-popover {
    --mfe-popover-border-color: var(--mfe-color-danger-base);
  }

  .popover-content {
    display: flex;
    flex-direction: column;
    gap: var(--mfe-size-xs);
  }
`;
