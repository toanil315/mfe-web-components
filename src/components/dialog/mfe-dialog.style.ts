import { css } from "lit";

export const MfeDialogStyle = css`
  :host {
    display: contents;
  }

  .container {
    --background-color: var(--mfe-color-neutral-full);

    display: flex;
    flex-direction: column;
    background: var(--background-color);
    width: var(--mfe-dialog-width, auto);
    max-width: calc(100vw - var(--mfe-size-4xl));
    max-height: calc(100vh - var(--mfe-size-4xl));
    min-width: 424px;
    padding: 0;
    border: 0;
    border-radius: var(--mfe-border-radius-l);
  }

  .dialog,
  .dialog-polyfill .container {
    padding: 0;
    border: 0;
    border-radius: var(--mfe-border-radius-l);
  }

  .dialog-polyfill .container {
    position: fixed;
    z-index: var(--mfe-index-dialog);
  }

  .dialog::backdrop {
    background-color: #273142b3;
  }

  .dialog-polyfill {
    display: none;
    position: fixed;
    inset-inline-start: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    z-index: var(--mfe-index-dialog);
    background-color: #273142b3;
  }

  :host([open]) .dialog-polyfill {
    display: flex;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--mfe-size-2xs);
    padding: var(--mfe-size-xl) var(--mfe-size-xl) 0 var(--mfe-size-xl);
  }

  header mfe-button {
    margin-inline-start: auto;
  }

  header h2 {
    font: var(--mfe-font-title-1-medium);
    color: var(--mfe-color-neutral-darker);
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--mfe-dialog-caption-line-clamp, 1);
    margin: 0;
    padding: 0;
  }

  .content {
    padding: var(--mfe-size-xl);
    overflow: auto;
  }

  :host([critical]) .content {
    padding-top: 0;
  }

  .container.has-footer .content {
    padding-bottom: 0;
  }

  footer {
    padding: var(--mfe-size-xl);
    display: flex;
    flex-flow: row-reverse wrap;
    gap: var(--mfe-size-m);
  }

  footer.shadow {
    /* FIXME: Use variables for sizes */
    box-shadow: 0 -4px 15px #27314226;
  }

  @media only screen and (max-width: 471px) {
    .container {
      max-width: calc(100vw - var(--mfe-size-2xl));
      max-height: calc(100vh - var(--mfe-size-2xl));
      min-width: auto;
      min-height: auto;
    }

    footer {
      flex-flow: column wrap;
    }
  }

  ::slotted(mfe-tab-group) {
    display: block;
    transform: translateX(calc(var(--mfe-size-xl) * -1));
    width: calc(100% + calc(var(--mfe-size-xl) * 2));
  }
`;
