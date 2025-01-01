import { css } from "lit";

export const MfeDrawerStyle = css`
  .drawer {
    box-sizing: border-box;
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    right: -100%;
    width: var(--mfe-drawer-current-width, 424px);
    padding: var(--mfe-size-xl);
    padding-top: max(env(safe-area-inset-top), var(--mfe-size-xl));
    padding-inline-end: max(env(safe-area-inset-right), var(--mfe-size-xl));
    padding-bottom: max(env(safe-area-inset-bottom), var(--mfe-size-xl));
    background: var(--mfe-color-neutral-full);
    box-shadow: var(--mfe-size-xs) 0 var(--mfe-size-2xl) rgba(0 0 0 / 50%);
    transition: right var(--mfe-drawer-animation-duration, 0.25s) linear;
    z-index: var(--mfe-index-sticky);
    animation: slideInRight var(--mfe-drawer-animation-duration, 0.25s) linear;
  }

  @keyframes slideInRight {
    from {
      right: -100%;
    }
    to {
      right: 0;
    }
  }

  :host([open]) .drawer {
    right: 0%;
  }

  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--mfe-size-xl);
    flex: 1;
    width: 100%;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--mfe-size-2xs);
    background-color: white;
  }

  header .header-buttons {
    display: flex;
    gap: var(--mfe-size-xl);
    margin-inline-start: auto;
  }

  header h2 {
    font: var(--mfe-font-title-1-medium);
    color: var(--mfe-color-neutral-darker);
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .content {
    flex: 1;
    overflow-y: scroll;
  }

  .iframe-content {
    flex: 1;
  }
`;
