import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { FormControlMixin } from "@open-wc/form-control";
import "element-internals-polyfill";
import {
  mfeChangeEventName,
  mfeCheckboxGroupTag,
  mfeCheckboxTag,
} from "../mfe-checkbox-group.constant";
import { MfeCheckboxStyle } from "./mfe-checkbox.style";
import { event } from "../../../utils/event";
import type { EventDispatcher } from "../../../utils/event";

import "../../icon/mfe-icon";
import MfeCheckboxGroup from "../mfe-checkbox-group";

/**
 * @tag mfe-checkbox
 * @summary Baklava Checkbox component
 */
@customElement(mfeCheckboxTag)
export default class MfeCheckbox extends FormControlMixin(LitElement) {
  static styles = MfeCheckboxStyle;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: false,
  };

  @query("input")
  validationTarget!: HTMLInputElement;

  /**
   * Sets the checked state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Sets the checkbox value
   */
  @property()
  value!: string;

  /**
   * Sets the disabled state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: "error", reflect: true })
  error?: string;

  /**
   * Sets the indeterminate state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Fires whenever user change the value of the checkbox.
   */
  @event("mfe-checkbox-change") private onChange!: EventDispatcher<boolean>;

  /**
   * Fires when checkbox is focused
   */
  @event("mfe-focus") private onFocus!: EventDispatcher<string>;

  /**
   * Fires when checkbox is blurred
   */
  @event("mfe-blur") private onBlur!: EventDispatcher<string>;

  @query("[type=checkbox]") checkboxElement!: HTMLElement;

  protected field!: MfeCheckboxGroup | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.field = this.closest<MfeCheckboxGroup>(mfeCheckboxGroupTag);
    this.field?.addEventListener(
      mfeChangeEventName,
      this.handleFieldValueChange
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.field?.removeEventListener(
      mfeChangeEventName,
      this.handleFieldValueChange
    );
  }

  update(changedProperties: Map<string, unknown>) {
    super.update(changedProperties);
    if (this.indeterminate && this.checked) {
      this.checked = false;
      this.requestUpdate("checked", true);
    }
  }

  /**
   * Focuses this option
   */
  focus() {
    this.checkboxElement.tabIndex = 0;
    this.checkboxElement.focus();
    this.onFocus(this.value);
  }

  /**
   * Blurs from this option
   */
  blur() {
    this.onBlur(this.value);
    if (!this.field) return;
    this.checkboxElement.tabIndex = -1;
  }

  private async handleChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;

    this.checked = target.checked;
    this.onChange(target.checked);
    this.indeterminate = false;
  }

  private handleFieldValueChange = (event: CustomEvent<Array<string>>) => {
    this.checked = event.detail.includes(this.value);
  };

  render(): TemplateResult {
    let icon = "";

    if (this.checked) icon = "check";
    if (this.indeterminate) icon = "minus";

    const classes = {
      "checkbox-container": true,
      error: Boolean(this.error),
    };

    return html`<div class=${classMap(classes)}>
      <label>
        <input
          type="checkbox"
          .checked=${live(this.checked)}
          ?disabled=${this.disabled}
          aria-readonly=${this.disabled}
          .indeterminate=${this.indeterminate}
          @change=${this.handleChange}
          value=${ifDefined(this.value)}
          @blur=${this.blur}
        />
        <div class="check-mark">
          ${icon ? html`<mfe-icon name="${icon}"></mfe-icon>` : null}
        </div>
        <slot class="label"></slot>
      </label>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeCheckboxTag]: MfeCheckbox;
  }
}
