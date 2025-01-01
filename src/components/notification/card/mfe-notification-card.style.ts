import { css } from "lit";

export const MfeNotificationCardStyle = css`
  :host {
    display: block;
  }

  .notification {
    position: relative;
    border-radius: var(--mfe-border-radius-m);
    box-shadow: 0 5px 30px 0 rgba(39 49 66 / 25%);
  }

  .duration {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--mfe-size-2xs);
    width: 100%;
  }

  .duration > .remaining {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: var(--mfe-border-radius-s);
    border-top-left-radius: 0;
    animation-name: to-zero;
    animation-duration: var(--duration, 7s);
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }

  .notification:hover .duration > .remaining {
    animation-play-state: paused;
  }

  @keyframes to-zero {
    to {
      width: 0;
    }
  }

  .notification[variant="success"] .duration > .remaining {
    background-color: var(--mfe-color-success-base);
  }

  .notification[variant="warning"] .duration > .remaining {
    background-color: var(--mfe-color-warning-base);
  }

  .notification[variant="danger"] .duration > .remaining {
    background-color: var(--mfe-color-danger-base);
  }

  .notification[variant="info"] .duration > .remaining {
    background-color: var(--mfe-color-info-base);
  }
`;
