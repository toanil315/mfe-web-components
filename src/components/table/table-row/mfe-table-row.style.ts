import { css } from "lit";

export const MfeTableRowStyle = css`
  :host {
    display: table-row;
  }

  :host([checked]),
  :host([checked]) ::slotted(mfe-table-cell) {
    background-color: var(--mfe-color-primary-contrast);
  }

  :host([disabled]),
  :host([disabled]) ::slotted(mfe-table-cell) {
    background-color: var(--mfe-color-neutral-lightest);
    color: var(--mfe-color-neutral-light);
  }

  :host(:not([checked], [disabled]):hover),
  :host(:not([checked], [disabled]):hover) ::slotted(mfe-table-cell) {
    background-color: var(--mfe-color-info-contrast);
  }

  :host ::slotted(*:first-child) {
    border-left: none;
  }

  :host ::slotted(*:last-child) {
    border-right: none;
  }

  :host(:first-child) ::slotted(mfe-table-header-cell) {
    border-top: none;
    border-right: none;
  }

  :host(:first-child) ::slotted(mfe-table-header-cell:first-child) {
    border-top-left-radius: var(--mfe-size-3xs);
    border-left: 1px;
  }

  :host(:first-child) ::slotted(mfe-table-header-cell:last-child) {
    border-top-right-radius: var(--mfe-size-3xs);
    border-right: 1px;
  }

  :host(:last-child) ::slotted(mfe-table-cell) {
    border-bottom: none;
  }

  :host(:first-child) ::slotted(mfe-table-cell) {
    border-top: none;
  }

  :host(:last-child) ::slotted(mfe-table-cell:first-child) {
    border-bottom-left-radius: var(--mfe-size-3xs);
  }

  :host(:last-child) ::slotted(mfe-table-cell:last-child) {
    border-bottom-right-radius: var(--mfe-size-3xs);
  }

  :host([sticky-first-column]) ::slotted(mfe-table-header-cell:first-child),
  :host([sticky-first-column]) ::slotted(mfe-table-cell:first-child) {
    position: sticky;
    z-index: 2;
    left: 0;
  }

  :host([sticky-last-column]) ::slotted(mfe-table-header-cell:last-child),
  :host([sticky-last-column]) ::slotted(mfe-table-cell:last-child) {
    position: sticky;
    z-index: 2;
    right: 0;
  }
`;
