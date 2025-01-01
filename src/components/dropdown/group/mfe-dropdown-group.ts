import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MfeDropdownGroupStyle } from "./mfe-dropdown-group.style";
import { mfeDropdownGroupTag } from "../mfe-dropdown-tags";

/**
 * @tag mfe-dropdown-group
 * @summary Baklava Dropdown Group component
 */
@customElement(mfeDropdownGroupTag)
export default class MfeDropdownGroup extends LitElement {
  static styles = MfeDropdownGroupStyle;

  /**
   * Sets the caption.
   */
  @property({ type: String })
  caption?: string;

  render(): TemplateResult {
    const caption = this.caption
      ? html`<span id="label" class="caption">${this.caption}</span>`
      : "";

    return html`<div
      class="dropdown-group"
      role="group"
      aria-labelledby="label"
    >
      ${caption}
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeDropdownGroupTag]: MfeDropdownGroup;
  }
}
