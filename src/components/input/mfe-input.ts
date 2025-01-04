import { html, LitElement, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { FormControlMixin } from "@open-wc/form-control";
import { submit } from "@open-wc/form-helpers";
import "element-internals-polyfill";
import "../button/mfe-button";
import "../icon/mfe-icon";
import type { MfeIconName } from "../../constants/icon.constant";
import { MfeInputStyle } from "./mfe-input.style";
import { event } from "../../utils/event";
import type { EventDispatcher } from "../../utils/event";

export type InputType =
  | "text"
  | "email"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search";

const inputTypeIcons: Partial<Record<InputType, MfeIconName>> = {
  date: "calendar",
  "datetime-local": "calendar",
  month: "calendar",
  week: "calendar",
  time: "clock",
  search: "search",
};

export type InputSize = "small" | "medium" | "large";
/**
 * @tag mfe-input
 * @summary Baklava Input component
 *
 * @cssproperty [--mfe-input-padding-start] Sets the padding start
 * @cssproperty [--mfe-input-padding-end] Sets the padding end
 */
@customElement("mfe-input")
export default class MfeInput extends FormControlMixin(LitElement) {
  static styles = MfeInputStyle;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @query("input")
  validationTarget!: HTMLInputElement;

  /**
   * Sets name of the input
   */
  @property({ reflect: true })
  name?: string;

  /**
   * Type of the input. It's used to set `type` attribute of native input inside.
   */
  @property({ reflect: true })
  type: InputType = "text";

  /**
   * Sets label of the input
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Sets placeholder of the input
   */
  @property({ reflect: true })
  placeholder?: string;

  /**
   * Sets initial value of the input
   */
  @property({ reflect: true })
  value = "";

  /**
   * Makes input a mandatory field
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Sets minimum length of the input
   */
  @property({ type: Number, reflect: true })
  minlength?: number;

  /**
   * Sets maximum length of the input
   */
  @property({ type: Number, reflect: true })
  maxlength?: number;

  /**
   * Sets the minimum acceptable value for the input
   */
  @property({ reflect: true })
  min?: number | string;

  /**
   * Sets the loading value for the input
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Sets the maximum acceptable value for the input
   */
  @property({ reflect: true })
  max?: number | string;

  /**
   * Sets the increase and decrease step to a `number` input
   */
  @property({ type: Number, reflect: true })
  step?: number;

  /**
   * Hints browser to autocomplete this field.
   */
  @property({ type: String, reflect: true })
  autocomplete: HTMLInputElement["autocomplete"] = "on";

  /**
   * Sets the input mode of the field for asking browser to show the desired keyboard.
   */
  @property({ type: String, reflect: true })
  inputmode!: HTMLInputElement["inputMode"];

  /**
   * Sets input to get keyboard focus automatically
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Sets the custom icon name. `mfe-icon` component is used to show an icon
   */
  @property({ type: String, reflect: true })
  icon?: MfeIconName;

  /**
   * Sets input size.
   */
  @property({ type: String, reflect: true })
  size?: InputSize = "medium";

  /**
   * Disables the input
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Makes the input readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: "label-fixed", reflect: true })
  labelFixed = false;

  /**
   * Overrides error message. This message will override default error messages
   */
  @property({ type: String, reflect: true })
  error?: string;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: "help-text", reflect: true })
  helpText?: string;

  /**
   * Fires when an alteration to the element's value is committed by the user. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
   */
  @event("mfe-change") private onChange!: EventDispatcher<string>;

  /**
   * Fires when the value of an input element has been changed.
   */
  @event("mfe-input") private onInput!: EventDispatcher<string>;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", this.onKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.onKeydown);
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === "Enter" && this.form) {
      setTimeout(() => {
        if (!event.defaultPrevented) {
          submit(this.form);
        }
      });
    }
  };

  @state() private passwordVisible = false;

  private textVisibilityToggle() {
    this.passwordVisible = !this.passwordVisible;
  }

  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.validationTarget.showPicker();
    }
  }

  private inputHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onInput(value);
  }

  private changeHandler(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onChange(value);
  }

  firstUpdated() {
    this.setValue(this.value);
    if (!this.icon) this.icon = inputTypeIcons[this.type];
  }

  protected async updated(changedProperties: PropertyValues) {
    if (changedProperties.has("value")) {
      this.setValue(this.value);
    }
  }

  private inputId = Math.random().toString(36).substring(2);

  private get _hasIconSlot() {
    return this.querySelector(':scope > [slot="icon"]') !== null;
  }

  render(): TemplateResult {
    const invalidMessage = this.error
      ? html`<p id="errorMessage" aria-live="polite" class="invalid-text">
          ${this.error}
        </p>`
      : "";

    const helpMessage = this.helpText
      ? html`<p id="helpText" class="help-text">${this.helpText}</p>`
      : "";

    let icon: TemplateResult<1> | null = null;

    if (this.error) {
      icon = html`<mfe-icon class="error-icon" name="alert"></mfe-icon>`;
    } else if (this.loading) {
      icon = html`<mfe-spinner></mfe-spinner>`;
    } else if (this.icon) {
      icon = html`<mfe-icon name="${this.icon}"></mfe-icon>`;
    }

    const iconSlot = html` <slot name="icon"> ${icon} </slot> `;

    const label = this.label
      ? html`<label for=${this.inputId}>${this.label}</label>`
      : "";
    const passwordInput = this.type === "password";

    const revealButton = passwordInput
      ? html`<mfe-button
          size="small"
          kind="neutral"
          variant="tertiary"
          class="${classMap({
            "reveal-button": true,
            "password-visible": this.passwordVisible,
          })}"
          aria-label="Toggle password reveal"
          @mfe-click="${this.textVisibilityToggle}"
        >
          <mfe-icon class="reveal-icon" slot="icon" name="eye_on"></mfe-icon>
          <mfe-icon class="reveal-icon" slot="icon" name="eye_off"></mfe-icon>
        </mfe-button>`
      : "";

    const hasCustomIcon = this.icon || this._hasIconSlot;
    const classes = {
      wrapper: true,
      invalid: Boolean(this.error),
      "has-icon": passwordInput || hasCustomIcon || Boolean(this.error),
      "has-value": this.value !== null && this.value !== "",
    };

    const passwordType = this.passwordVisible ? "text" : "password";
    const inputType = passwordInput ? passwordType : this.type;

    return html`<div class=${classMap(classes)}>
      ${label}
      <fieldset class="input-wrapper">
        <legend><span>${this.label}</span></legend>
        <input
          id=${this.inputId}
          type=${inputType}
          .value=${live(this.value)}
          inputmode="${ifDefined(this.inputmode)}"
          ?autofocus=${this.autofocus}
          .autocomplete="${this.autocomplete}"
          placeholder="${ifDefined(this.placeholder)}"
          minlength="${ifDefined(this.minlength)}"
          maxlength="${ifDefined(this.maxlength)}"
          min="${ifDefined(this.min)}"
          max="${ifDefined(this.max)}"
          step="${ifDefined(this.step)}"
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @change=${this.changeHandler}
          @input=${this.inputHandler}
          aria-invalid=${this.error ? "true" : "false"}
          aria-describedby=${ifDefined(this.helpText ? "helpText" : undefined)}
          aria-errormessage=${ifDefined(
            this.error ? "errorMessage" : undefined
          )}
        />
        <div class="icon">${revealButton} ${iconSlot}</div>
      </fieldset>
      <div class="hint">${invalidMessage} ${helpMessage}</div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mfe-input": MfeInput;
  }
}
