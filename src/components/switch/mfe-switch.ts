import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { MfeSwitchStyle } from "./mfe-switch.style";
import { event, EventDispatcher } from "../../utils/event";

export const mfeSwitchTag = "mfe-switch";

/**
 * @tag mfe-switch
 * @summary Baklava Switch component
 *
 * @cssproperty [--mfe-switch-color-on=--mfe-color-primary] Set the checked color
 * @cssproperty [--mfe-switch-color-off=--mfe-color-neutral-lighter] Set the unchecked color
 * @cssproperty [--mfe-switch-animation-duration=300ms] Set the animation duration of switch toggle
 */
@customElement(mfeSwitchTag)
export default class MfeSwitch extends LitElement {
  static styles = MfeSwitchStyle;

  /**
   * Sets the checked state for switch
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Sets the disabled state for switch
   */
  @property({ type: Boolean, reflect: true })
  disabled? = false;

  /**
   * Fires whenever user toggles the switch
   */
  @event("mfe-switch-toggle") private onToggle!: EventDispatcher<boolean>;

  toggle() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.onToggle(this.checked);
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Enter" || event.code === "Space") {
      this.toggle();
      event.preventDefault();
    }
  }

  render(): TemplateResult {
    return html`
      <label @click=${this.toggle}>
        <slot class="label"></slot>
        <span
          class="switch"
          role="switch"
          aria-checked=${this.checked}
          aria-readonly=${!!this.disabled}
          @keydown=${this.handleKeyDown}
          tabindex="0"
        >
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeSwitchTag]: MfeSwitch;
  }
}
