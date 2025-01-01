import { html, LitElement, TemplateResult } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { MfeAccordionGroupStyle } from "./mfe-accordion-group.style";
import MfeAccordion from "../accordion-item/mfe-accordion-item";

@customElement("mfe-accordion-group")
export default class MfeAccordionGroup extends LitElement {
  /**
   * Allow multiple accordions to be open at once
   */
  @property({ reflect: true, type: Boolean })
  multiple = false;

  @queryAssignedElements({ selector: "mfe-accordion" })
  accordions!: MfeAccordion[];

  static styles = MfeAccordionGroupStyle;

  handleToggleAccordions(e: CustomEvent<boolean>) {
    const target = e.target as MfeAccordion;

    if (!this.multiple && e.detail) {
      this.accordions.forEach((a) => {
        if (target !== a) {
          a.collapse();
        }
      });
    }
  }

  render(): TemplateResult {
    return html`<div
      class="accordion-group"
      @mfe-toggle=${this.handleToggleAccordions}
    >
      <slot></slot>
    </div>`;
  }
}
