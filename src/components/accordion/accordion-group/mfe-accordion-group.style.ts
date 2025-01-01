import { css } from "lit";

export const MfeAccordionGroupStyle = css`
  .accordion-group {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .accordion-group ::slotted(mfe-accordion:first-child) {
    --mfe-accordion-radius-bottom-right: 0;
    --mfe-accordion-radius-bottom-left: 0;
    --mfe-accordion-border-bottom: 0;
  }

  .accordion-group ::slotted(mfe-accordion:not(:last-child, :first-child)) {
    --mfe-accordion-radius-bottom-right: 0;
    --mfe-accordion-radius-bottom-left: 0;
    --mfe-accordion-radius-top-left: 0;
    --mfe-accordion-radius-top-right: 0;
    --mfe-accordion-border-bottom: 0;
  }

  .accordion-group ::slotted(mfe-accordion:last-child) {
    --mfe-accordion-radius-top-right: 0;
    --mfe-accordion-radius-top-left: 0;
  }
`;
