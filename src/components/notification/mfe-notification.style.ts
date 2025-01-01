import { css } from "lit";

export const MfeNotificationStyle = css`
  :host {
    --mfe-notification-width: 396px;
    --mfe-notification-gap: var(--mfe-size-2xs);
    --mfe-notification-animation-duration: 0.3s;
  }

  .wrapper {
    --margin: var(--mfe-size-xl);

    display: flex;
    flex-direction: column-reverse;
    position: fixed;
    top: 0;
    right: 0;
    max-width: var(--mfe-notification-width);
    margin: var(--margin);
    width: calc(100% - var(--margin) * 2);
    z-index: var(--mfe-index-notification);
  }

  .fake-wrapper {
    --margin: var(--mfe-size-xl);
    display: flex;
    flex-direction: column-reverse;
    max-width: var(--mfe-notification-width);
    margin: var(--margin);
    width: calc(100% - var(--margin) * 2);
  }

  @media screen and (max-width: 480px) {
    .wrapper {
      flex-direction: column;
      max-width: 100%;
    }
  }

  .notification {
    will-change: transform height margin;
    animation: slide-in-right var(--mfe-notification-animation-duration) ease;
    margin-bottom: var(--mfe-notification-gap);
    touch-action: none;
  }

  .notification[data-slide="top"] {
    animation: slide-in-top var(--mfe-notification-animation-duration) ease;
  }

  .notification[data-pre-calculated-height] {
    height: attr(data-pre-calculated-height);
  }

  :host([no-animation]) .notification {
    animation: none;
  }

  .notification.removing {
    animation:
      slide-out-right var(--mfe-notification-animation-duration) ease forwards,
      size-to-zero var(--mfe-notification-animation-duration) ease
        var(--mfe-notification-animation-duration) forwards;
  }

  .notification[data-slide="top"].removing {
    animation:
      slide-out-top var(--mfe-notification-animation-duration) ease forwards,
      size-to-zero var(--mfe-notification-animation-duration) ease
        var(--mfe-notification-animation-duration) forwards;
  }

  :host([no-animation]) .notification.removing {
    animation: size-to-zero 0;
  }

  @media (prefers-reduced-motion) {
    .notification.removing {
      animation: size-to-zero 0;
    }

    .notification {
      animation: none;
    }
  }

  @keyframes slide-in-right {
    from {
      transform: translateX(var(--travel-distance, 10px));
      height: 0;
      opacity: 0;
      margin: 0;
    }
  }

  @keyframes slide-out-right {
    to {
      transform: translateX(var(--travel-distance, 10px));
      opacity: 0;
    }
  }

  @keyframes slide-in-top {
    from {
      transform: translateY(var(--travel-distance, -10px));
      height: 0;
      opacity: 0;
      margin: 0;
    }
  }

  @keyframes slide-out-top {
    to {
      transform: translateY(var(--travel-distance, -10px));
      opacity: 0;
    }
  }

  @keyframes size-to-zero {
    to {
      height: 0;
      margin: 0;
    }
  }
`;
