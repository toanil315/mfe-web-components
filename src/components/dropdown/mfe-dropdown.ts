import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { MfeDropdownStyle } from "./mfe-dropdown.style";
import MfePopover from "../popover/mfe-popover";
import type {
  ButtonKind,
  ButtonSize,
  ButtonVariant,
} from "../button/mfe-button";
import { MfeButton } from "../button/mfe-button";
import { event } from "../../utils/event";
import type { EventDispatcher } from "../../utils/event";
import MfeDropdownItem from "./item/mfe-dropdown-item";
import { mfeDropdownItemTag, mfeDropdownTag } from "./mfe-dropdown-tags";

import "./group/mfe-dropdown-group";
import "./item/mfe-dropdown-item";
import "../popover/mfe-popover";

/**
 * @tag mfe-dropdown
 * @summary Baklava Dropdown component
 */
@customElement(mfeDropdownTag)
export default class MfeDropdown extends LitElement {
  static styles = MfeDropdownStyle;

  @query("mfe-popover")
  private _popover!: MfePopover;

  @query("mfe-button")
  private _button!: MfeButton;

  @state() private _isPopoverOpen = false;

  /**
   * Sets the dropdown button label
   */
  @property({ type: String, reflect: true })
  label!: string;

  /**
   * Sets the dropdown button variant
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariant = "primary";

  /**
   * Sets the dropdown button kind
   */
  @property({ type: String, reflect: true })
  kind: ButtonKind = "default";

  /**
   * Sets the dropdown button size
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = "medium";

  /**
   * Sets button as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Fires when dropdown opened
   */
  @event("mfe-dropdown-open") private onOpen!: EventDispatcher<string>;

  /**
   * Fires when dropdown closed
   */
  @event("mfe-dropdown-close") private onClose!: EventDispatcher<string>;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.handleKeyDown);
  }

  firstUpdated() {
    // `_button` will be undefined during the initial render.
    // To ensure proper rendering, we set `_popover.target` after the template has been created.
    this._popover.target = this._button;
  }

  get opened() {
    return this._isPopoverOpen;
  }

  private _handleClick() {
    !this._isPopoverOpen && !this.disabled ? this.open() : this.close();
  }

  private focusedOptionIndex = -1;

  private handleKeyDown(event: KeyboardEvent) {
    // Next action
    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      this.focusedOptionIndex++;

      // Previous action
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
      this.focusedOptionIndex--;
      // Select action
    } else if (event.key === "Escape") {
      this.focusedOptionIndex = -1;
      this.close();
      return;
    } else {
      // Other keys are not our interest here
      return;
    }

    // Don't exceed array indexes
    this.focusedOptionIndex = Math.max(
      0,
      Math.min(this.focusedOptionIndex, this.options.length - 1)
    );

    this.options[this.focusedOptionIndex].focus();

    event.preventDefault();
  }

  get options(): MfeDropdownItem[] {
    return [...this.querySelectorAll(mfeDropdownItemTag)];
  }

  open() {
    this._isPopoverOpen = true;
    this._popover.show();
    this.onOpen("Dropdown opened!");
  }

  close() {
    this._isPopoverOpen = false;
    this._popover.visible && this._popover.hide();
    this.onClose("Dropdown closed!");
  }

  render(): TemplateResult {
    return html`<mfe-button
        dropdown
        .active=${this.opened}
        ?disabled=${this.disabled}
        variant="${this.variant}"
        kind="${this.kind}"
        size="${this.size}"
        @mfe-click="${this._handleClick}"
      >
        ${this.label}
      </mfe-button>
      <mfe-popover
        fit-size
        placement="bottom-start"
        @mfe-popover-hide="${this.close}"
      >
        <div class="popover-content">
          <slot></slot></div
      ></mfe-popover> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeDropdownTag]: MfeDropdown;
  }
}
