import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "element-internals-polyfill";
import { mfeTableHeaderTag, mfeTableTag } from "../mfe-table.constant";
import { MfeTableHeaderStyle } from "./mfe-table-header.style";
import { IMfeTable } from "../mfe-table.facade";

/**
 * @tag mfe-table-header
 * @summary Baklava Table component
 */
@customElement(mfeTableHeaderTag)
export default class MfeTableHeader extends LitElement {
  static styles = MfeTableHeaderStyle;

  /**
   * Set table header as sticky
   */
  @property({ type: Boolean, reflect: true })
  sticky = false;

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.closest<IMfeTable>(mfeTableTag)) {
      console.warn(
        "mfe-table-header is designed to be used inside a mfe-table",
        this
      );
    }
  }

  render(): TemplateResult {
    return html`<slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeTableHeaderTag]: MfeTableHeader;
  }
}
