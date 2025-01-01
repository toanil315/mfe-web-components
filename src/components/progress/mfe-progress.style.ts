import { css } from "lit";

export const MfeProgressStyle = css`
  .progress-indicator {
    --max: 100;
    --value: 0;
    --value-color: var(--mfe-color-success-base);
    --height: var(--mfe-size-2xs);
    --radius: var(--mfe-border-radius-s);

    position: relative;
    background-color: var(--mfe-color-neutral-lightest);
    height: var(--height);
    border-radius: var(--radius);
    width: 100%;
    transform: scaleX(var(--mfe-text-x-direction));
  }

  .progress-indicator::before {
    content: "";
    position: absolute;
    height: 100%;
    width: calc(100% / var(--max) * var(--value));
    background-color: var(--value-color);
    border-radius: var(--radius);
    transition: width ease
      var(--mfe-progress-indicator-transition-duration, 0.2s);
  }

  :host([size="small"]) .progress-indicator {
    --height: var(--mfe-size-3xs);
    --radius: var(--mfe-border-radius-xs);
  }

  :host([size="large"]) .progress-indicator {
    --height: var(--mfe-size-xs);
    --radius: var(--mfe-border-radius-m);
  }

  :host([failed]) .progress-indicator {
    --value-color: var(--mfe-color-danger-base);
  }
`;
