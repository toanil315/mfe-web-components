import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/mfe-icon";
import { MfeSpinnerStyle } from "./mfe-spinner.style";

export const mfeSpinnerTag = "mfe-spinner";
/**
 * @tag mfe-spinner
 * @summary Baklava Spinner component
 *
 */
@customElement(mfeSpinnerTag)
export default class MfeSpinner extends LitElement {
  static styles = MfeSpinnerStyle;

  /**
   * Sets the spinner size
   */
  @property({ type: String, reflect: true })
  size = "var(--mfe-font-size-m)";

  /**
   * Sets the disabled state for spinner
   */
  @property({ type: Boolean, reflect: true })
  disabled? = false;

  /**
   * Sets the overlay state for spinner
   */
  @property({ type: Boolean, reflect: true })
  overlay? = false;

  /**
   * Sets the color of the spinner
   */
  @property({ type: String, reflect: true })
  color: string = "var(--mfe-color-primary-base)";

  render(): TemplateResult {
    return html`<mfe-icon
      class="spinner"
      name="loading"
      style="color: ${this.disabled
        ? "var(--mfe-color-neutral-light)"
        : this.color}; font-size: ${this.size};"
    ></mfe-icon>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeSpinnerTag]: MfeSpinner;
  }
}
