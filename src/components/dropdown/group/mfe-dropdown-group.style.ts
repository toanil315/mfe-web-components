import { css } from "lit";

export const MfeDropdownGroupStyle = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
  }

  .dropdown-group {
    display: flex;
    flex-direction: column;
    gap: var(--mfe-size-xs);
  }

  .caption {
    font: var(--mfe-font-caption-base);
    font-size: var(--mfe-font-size-xs);
    font-weight: var(--mfe-font-weight-medium);
    line-height: var(--mfe-font-size-s);
    color: var(--mfe-color-neutral-dark);
  }

  :host(:not(:first-child)) .dropdown-group {
    border-top: 1px solid var(--mfe-color-neutral-lighter);
    padding-top: var(--mfe-size-xs);
  }

  :host(:not(:last-child)) .dropdown-group {
    border-bottom: 1px solid var(--mfe-color-neutral-lighter);
    padding-bottom: var(--mfe-size-xs);
  }
`;
