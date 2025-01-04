import { html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { mfeSelectOptionTag, mfeSelectTag } from "../mfe-select.constant";
import { MfeSelectOptionStyle } from "./mfe-option.style";
import { event } from "../../../utils/event";
import type { EventDispatcher } from "../../../utils/event";

import "../../checkbox-group/checkbox/mfe-checkbox";
import MfeSelect from "../mfe-select";

@customElement(mfeSelectOptionTag)
export default class MfeSelectOption extends LitElement {
  static styles = MfeSelectOptionStyle;

  private _value!: string;

  /* Declare reactive properties */
  /**
   * Sets the value for the option
   */
  @property({})
  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
  }

  /**
   * Sets the label for mfe-select, and mfe-select renders this value instead of the option's textContent
   */
  @property({ type: String, reflect: true, attribute: "label" })
  label = "";

  /**
   * Sets option as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets option as selected state
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  @state()
  multiple = false;

  /**
   * Fires when clicked on the option
   */
  @event("mfe-select-option") private _onSelect!: EventDispatcher<string>;

  /**
   * Fires when checkbox is focused
   */
  @event("mfe-focus") private onFocus!: EventDispatcher<string>;

  /**
   * Fires when checkbox is blurred
   */
  @event("mfe-blur") private onBlur!: EventDispatcher<string>;

  @query(".focus-target") private focusTarget!: HTMLElement;

  /**
   * Focuses this option
   */
  focus() {
    if (!this.multiple) {
      this.focusTarget.tabIndex = 0;
    }
    this.focusTarget.focus();
    this.onFocus(this.value);
  }

  /**
   * Blurs from this option
   */
  blur() {
    this.onBlur(this.value);
    this.focusTarget.tabIndex = -1;
  }

  private mfeSelect!: MfeSelect | null;

  private singleOptionTemplate() {
    return html`<div
      class="single-option focus-target"
      @blur=${this.blur}
      @keydown=${this.handleKeydown}
      @click="${this._onClickOption}"
      role="option"
    >
      <slot></slot>
    </div>`;
  }

  private checkboxOptionTemplate() {
    return html`<mfe-checkbox
      class="checkbox-option focus-target"
      .checked="${this.selected}"
      .disabled="${this.disabled}"
      @mfe-checkbox-change="${this._onCheckboxChange}"
      role="option"
    >
      <slot></slot>
    </mfe-checkbox>`;
  }

  render() {
    return html`<div class="option-container">
      ${this.multiple
        ? this.checkboxOptionTemplate()
        : this.singleOptionTemplate()}
    </div>`;
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.code === "Enter" || event.code === "Space") {
      this._onClickOption();
      event.preventDefault();
    }
  }

  private _onClickOption() {
    this.selected = !this.selected;
    this._onSelect(this.value);
  }

  private _onCheckboxChange(event: CustomEvent) {
    this.selected = event.detail;
    this._onSelect(this.value);
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.mfeSelect = this.closest<MfeSelect>(mfeSelectTag);

      this.multiple = this.mfeSelect?.multiple || false;
      this.mfeSelect?.registerOption(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.mfeSelect?.unregisterOption(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeSelectOptionTag]: MfeSelectOption;
  }
}
