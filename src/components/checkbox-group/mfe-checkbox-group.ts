import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { FormControlMixin } from "@open-wc/form-control";
import "element-internals-polyfill";
import {
  mfeChangeEventName,
  mfeCheckboxGroupTag,
  mfeCheckboxTag,
} from "./mfe-checkbox-group.constant";
import { MfeCheckboxGroupStyle } from "./mfe-checkbox-group.style";
import MfeCheckbox from "./checkbox/mfe-checkbox";
import { event } from "../../utils/event";
import type { EventDispatcher } from "../../utils/event";

import "./checkbox/mfe-checkbox";

/**
 * @tag mfe-checkbox-group
 * @summary Baklava Button component
 *
 * @cssproperty [--mfe-checkbox-direction=row] Can be used for showing checkbox options as columns instead of rows. Options are `row` or `column`
 */
@customElement(mfeCheckboxGroupTag)
export default class MfeCheckboxGroup extends FormControlMixin(LitElement) {
  static styles = MfeCheckboxGroupStyle;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Sets name of the checkbox group
   */
  @property()
  name!: string;

  /**
   * Sets the checkbox group label
   */
  @property({ type: String })
  label!: string;

  /**
   * Set and gets the actual value of the field
   */
  @property({ type: Array, reflect: true })
  value!: string[] | null;

  /**
   * Sets option as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: "error", reflect: true })
  error?: string;

  get options(): MfeCheckbox[] {
    return [...this.querySelectorAll(mfeCheckboxTag)];
  }

  get checkedOptions(): string[] {
    return this.options.filter((opt) => opt.checked).map((opt) => opt.value);
  }

  get availableOptions(): MfeCheckbox[] {
    return this.options.filter((option) => !option.disabled);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.tabIndex = 0;
    this.addEventListener("focus", this.handleFocus);
    this.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("focus", this.handleFocus);
    this.removeEventListener("keydown", this.handleKeyDown);
  }

  protected firstUpdated() {
    if (!this.value) {
      this.setValue(null);
    }
  }

  protected async updated(
    changedProperties: Map<string, unknown>
  ): Promise<void> {
    if (changedProperties.has("value")) {
      this.setFormValue();
      if (this.value !== null) this.onChange(this.value);
      this.requestUpdate();
    }
  }

  private setFormValue() {
    if (this.value !== null && this.value.length > 0) {
      const formData = new FormData();

      this.value?.forEach((checkbox) =>
        formData.append(this.name, `${checkbox}`)
      );
      this.setValue(formData);
    } else if (this.value?.length === 0) {
      this.setValue(null);
    }
  }

  /**
   * Fires when checkbox group value changed
   */
  @event(mfeChangeEventName) private onChange!: EventDispatcher<string[]>;

  private focusedOptionIndex = 0;

  private handleOptionChecked() {
    this.value = this.checkedOptions;
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Next option
    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      this.focusedOptionIndex++;

      // Previous option
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
      this.focusedOptionIndex--;

      // next or previous option with tab / hold shift & tab
    } else if (event.key === "Tab") {
      event.shiftKey ? this.focusedOptionIndex-- : this.focusedOptionIndex++;

      if (this.focusedOptionIndex === this.availableOptions.length) {
        this.tabIndex = 0;
        this.focusedOptionIndex = 0;
        return;
      }
    } else {
      // Other keys are not our interest here
      return;
    }

    // Don't exceed array indexes
    this.focusedOptionIndex = Math.max(
      0,
      Math.min(this.focusedOptionIndex, this.availableOptions.length - 1)
    );

    this.availableOptions[this.focusedOptionIndex].focus();

    event.preventDefault();
  }

  private handleFocus() {
    this.availableOptions[this.focusedOptionIndex].focus();
  }

  render(): TemplateResult {
    const errorMessage = Boolean(this.error)
      ? html`<p id="errorMessage" aria-live="polite" class="error-message">
          ${this.error}
        </p>`
      : "";

    const classes = {
      error: Boolean(this.error),
    };

    return html`<div class=${classMap(classes)}>
      <fieldset role="group" tabindex=${this.tabIndex}>
        <legend id="label">${this.label}</legend>
        <div class="options" @mfe-checkbox-change=${this.handleOptionChecked}>
          <slot></slot>
        </div>
        <div class="hint">${errorMessage}</div>
      </fieldset>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeCheckboxGroupTag]: MfeCheckboxGroup;
  }
  interface HTMLElementEventMap {
    [mfeChangeEventName]: CustomEvent<string[]>;
  }
}
