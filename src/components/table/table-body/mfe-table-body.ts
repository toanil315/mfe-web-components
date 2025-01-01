import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import "element-internals-polyfill";
import { MfeTableBodyStyle } from "./mfe-table-body.style";
import { mfeTableBodyTag, mfeTableTag } from "../mfe-table.constant";
import MfeTable from "../mfe-table";

/**
 * @tag mfe-table-body
 * @summary Baklava Table component
 */
@customElement(mfeTableBodyTag)
export default class MfeTableBody extends LitElement {
  static styles = MfeTableBodyStyle;

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.closest<MfeTable>(mfeTableTag)) {
      console.warn(
        "mfe-table-body is designed to be used inside a mfe-table",
        this
      );
    }
  }

  render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeTableBodyTag]: MfeTableBody;
  }
}
