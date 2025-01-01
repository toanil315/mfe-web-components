import { css } from "lit";

export const MfeAccordionItemStyle = css`
  :host {
    --border: 1px solid var(--mfe-color-neutral-lighter);
    --default-radius: var(--mfe-size-2xs);

    --radius-top-left: var(
      --mfe-accordion-radius-top-left,
      var(--default-radius)
    );
    --radius-top-right: var(
      --mfe-accordion-radius-top-right,
      var(--default-radius)
    );
    --radius-bottom-right: var(
      --mfe-accordion-radius-bottom-right,
      var(--default-radius)
    );
    --radius-bottom-left: var(
      --mfe-accordion-radius-bottom-left,
      var(--default-radius)
    );

    display: block;
  }

  .accordion {
    width: 100%;
  }

  .summary {
    list-style: none;
    user-select: none;
    cursor: pointer;
    font: var(--mfe-font-title-3-medium);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--mfe-size-2xs);
    padding: var(--mfe-size-m);
    background: var(--mfe-color-neutral-full);
    color: var(--mfe-color-neutral-darker);
    border: var(--border);
    border-bottom: var(--mfe-accordion-border-bottom, var(--border));
    border-radius: var(--radius-top-left) var(--radius-top-right)
      var(--radius-bottom-right) var(--radius-bottom-left);
    transition: background-color 200ms;
  }

  .summary::-webkit-details-marker {
    display: none;
  }

  .summary:hover {
    background: var(--mfe-color-neutral-lightest);
  }

  .summary:focus-visible {
    outline: 2px solid var(--mfe-color-primary-base);
    outline-offset: -1px;
  }

  .indicator {
    transition: transform 200ms;
  }

  .accordion[open] .indicator {
    transform: rotate(180deg);
  }

  .accordion[open] .summary {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .caption {
    flex: 1;
  }

  .accordion-content {
    padding: var(--mfe-size-m);
    background: var(--mfe-color-neutral-full);
    border: var(--border);
    border-top: 0;
    border-bottom: var(--mfe-accordion-border-bottom, var(--border));
    border-bottom-left-radius: var(--radius-bottom-left);
    border-bottom-right-radius: var(--radius-bottom-right);
    font: var(--mfe-font-body-text-2-regular);
  }

  .disabled .summary {
    cursor: not-allowed;
    background: var(--mfe-color-neutral-lightest);
    color: var(--mfe-color-neutral-light);
  }
`;
