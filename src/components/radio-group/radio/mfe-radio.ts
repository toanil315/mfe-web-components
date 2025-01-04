import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { MfeRadioStyle } from "./mfe-radio.style";
import { mfeRadioGroupTag, mfeRadioTag } from "../mfe-radio-group-tags";
import { event } from "../../../utils/event";
import type { EventDispatcher } from "../../../utils/event";
import MfeRadioGroup from "../mfe-radio-group";

export const mfeCheckedEventName = "mfe-checked";

/**
 * @tag mfe-radio
 * @summary Baklava Radio Option component
 *
 * @cssprop [--mfe-radio-align-items=center] Align items of radio option
 */
@customElement(mfeRadioTag)
export default class MfeRadio extends LitElement {
  static styles = MfeRadioStyle;

  @property()
  name!: string;

  @property()
  value!: string;

  /**
   * Sets option as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state() private selected = false;

  /**
   * Fires when radio is checked
   */
  @event("mfe-checked") private onChecked!: EventDispatcher<string>;

  /**
   * Fires when radio is blurred
   */
  @event("mfe-focus") private onFocus!: EventDispatcher<string>;

  /**
   * Fires when radio is blurred
   */
  @event("mfe-blur") private onBlur!: EventDispatcher<string>;

  /**
   * Sets this option selected
   */
  select() {
    this.selected = true;
    this.onChecked(this.value);
  }

  /**
   * Readonly property to determine if option is currently checked
   */
  get checked() {
    return this.selected;
  }

  @query("[role=radio]") private radioElement!: HTMLElement;

  /**
   * Focuses this option
   */
  focus() {
    this.radioElement.tabIndex = 0;
    this.radioElement.focus();
    this.onFocus(this.value);
  }

  /**
   * Blurs from this option
   */
  blur() {
    this.radioElement.tabIndex = -1;
    this.onBlur(this.value);
  }

  private handleFieldValueChange = (event: CustomEvent<string>) => {
    const newValue = event.detail;
    this.selected = newValue === this.value;
  };

  private field!: MfeRadioGroup | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.field = this.closest<MfeRadioGroup>(mfeRadioGroupTag);

    if (!this.field) {
      console.warn(
        "mfe-radio is designed to be used inside a mfe-radio-group",
        this
      );
    }

    this.field?.addEventListener(
      mfeCheckedEventName,
      this.handleFieldValueChange
    );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.field?.removeEventListener(
      mfeCheckedEventName,
      this.handleFieldValueChange
    );
  }

  render(): TemplateResult {
    const classes = classMap({
      wrapper: true,
      selected: this.selected,
    });

    return html`<div
      class=${classes}
      role="radio"
      aria-labelledby="label"
      aria-disabled=${this.disabled}
      aria-readonly=${this.disabled}
      @blur=${this.blur}
      @click=${this.select}
    >
      <p id="label"><slot></slot></p>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeRadioTag]: MfeRadio;
  }
  interface HTMLElementEventMap {
    [mfeCheckedEventName]: CustomEvent<string>;
  }
}
