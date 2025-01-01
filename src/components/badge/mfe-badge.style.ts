import { css } from "lit";

export const MfeBadgeStyle = css`
  :host {
    display: inline-block;
    max-width: 100%;
  }

  .badge {
    --bg-color: var(--mfe-badge-bg-color, var(--mfe-color-primary-contrast));
    --color: var(--mfe-badge-color, var(--mfe-color-primary-base));
    --font: var(--mfe-font-title-4-medium);
    --padding-vertical: var(--mfe-size-4xs);
    --padding-horizontal: var(--mfe-size-3xs);
    --margin-icon: var(--mfe-size-3xs);
    --icon-size: var(--mfe-size-s);
    --height: var(--mfe-size-xl);

    display: flex;
    gap: var(--margin-icon);
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-radius: var(--mfe-size-4xs);
    margin: 0;
    padding: var(--padding-vertical) var(--padding-horizontal);
    background-color: var(--bg-color);
    color: var(--color, white);
    font: var(--font);
    font-kerning: none;
    height: var(--height);
  }

  :host([size="small"]) .badge {
    --font: var(--mfe-font-caption-base);
    --height: var(--mfe-size-m);
  }

  :host([size="large"]) .badge {
    --font: var(--mfe-font-title-3-medium);
    --padding-vertical: var(--mfe-size-2xs);
    --padding-horizontal: var(--mfe-size-2xs);
    --height: var(--mfe-size-2xl);
    --icon-size: var(--mfe-size-m);
  }

  :host ::slotted(mfe-icon) {
    font-size: var(--icon-size);
  }

  :host([size="small"]) mfe-icon {
    display: none;
  }
`;
