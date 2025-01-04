import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { ReferenceElement } from "@floating-ui/core";
import { MfeSplitButtonStyle } from "./mfe-split-button.style";
import MfePopover from "../popover/mfe-popover";

import "../popover/mfe-popover";
import "../button/mfe-button";

import type {
  ButtonKind,
  ButtonSize,
  ButtonVariant,
  TargetType,
} from "../button/mfe-button";
import { MfeButton } from "../button/mfe-button";
import type { MfeIconName } from "../../constants/icon.constant";
import { event } from "../../utils/event";
import type { EventDispatcher } from "../../utils/event";
import MfeDropdownItem from "../dropdown/item/mfe-dropdown-item";
import { mfeDropdownItemTag } from "../dropdown/mfe-dropdown-tags";

export const mfeSplitButtonTag = "mfe-split-button";

/**
 * @tag mfe-split-button
 * @summary Baklava Split Button component
 */

@customElement(mfeSplitButtonTag)
export default class MfeSplitButton extends LitElement {
  static styles = MfeSplitButtonStyle;

  @query("#split-button-container") private trigger: ReferenceElement;

  @query("mfe-popover")
  private _popover!: MfePopover;

  @query("#split-main-button")
  private mainButton!: MfeButton;

  @query("#dropdown-button")
  private dropdownButton!: MfeButton;

  @state() private _isPopoverOpen = false;

  /**
   * Sets the split button label
   */
  @property({ type: String, reflect: true })
  label!: string;

  /**
   * Sets the split button variant
   */
  @property({ type: String, reflect: true })
  variant: Exclude<ButtonVariant, "tertiary"> = "primary";

  /**
   * Sets the split button kind
   */
  @property({ type: String, reflect: true })
  kind: ButtonKind = "default";

  /**
   * Sets the split button size
   */
  @property({ type: String, reflect: true })
  size: ButtonSize = "medium";

  /**
   * Set link url. If set, split main button will be rendered as anchor tag.
   */
  @property({ type: String, reflect: true })
  href!: string;

  /**
   * Sets main button as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets loading state of button
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Sets the button label for loading status.
   */
  @property({ type: String, attribute: "loading-label" })
  loadingLabel!: string;

  /**
   * Sets dropdown button as disabled
   */
  @property({ attribute: "dropdown-disabled", type: Boolean })
  dropdownDisabled = false;

  /**
   * Sets the icon name. Shows icon with mfe-icon component
   */
  @property({ type: String })
  icon?: MfeIconName;

  /**
   * Sets the anchor target. Used when `href` is set.
   */
  @property({ type: String })
  target?: TargetType = "_self";

  /**
   * Sets the type of the button. Set `submit` to use button as the submitter of parent form.
   */
  @property({ type: String })
  type!: "submit";

  /**
   * Sets button to get keyboard focus automatically
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Sets the associated form of the button. Use when `type` is set to `submit` and button is not inside the target form.
   */
  @property({ type: String })
  form!: HTMLFormElement | string;

  /**
   * Fires when dropdown opened
   */
  @event("mfe-dropdown-open") private onOpen!: EventDispatcher<string>;

  /**
   * Fires when dropdown closed
   */
  @event("mfe-dropdown-close") private onClose!: EventDispatcher<string>;

  /**
   * Fires when main button click
   */
  @event("mfe-click") private onClick!: EventDispatcher<string>;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("keydown", this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("keydown", this.handleKeyDown);
  }

  firstUpdated() {
    // To ensure proper rendering, we set `_popover.target` after the template has been created.
    this._popover.target = this.trigger;
    this.dropdownButton.addEventListener("mfe-click", (e) =>
      e.stopPropagation()
    );
    this.mainButton.addEventListener("mfe-click", (e) => e.stopPropagation());
  }

  get opened() {
    return this._isPopoverOpen;
  }

  private _handleClick() {
    !this._isPopoverOpen && !this.dropdownDisabled ? this.open() : this.close();
  }

  private _handlePrimaryClick() {
    this.onClick("Click event fired!");
  }

  private focusedOptionIndex = -1;

  private handleKeyDown(event: KeyboardEvent) {
    // Next action
    if (
      this._isPopoverOpen &&
      ["ArrowDown", "ArrowRight"].includes(event.key)
    ) {
      this.focusedOptionIndex++;
      // Previous action
    } else if (
      this._isPopoverOpen &&
      ["ArrowUp", "ArrowLeft"].includes(event.key)
    ) {
      this.focusedOptionIndex--;
      // Select action
    } else if (this._isPopoverOpen && event.key === "Escape") {
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
    if (!this._isPopoverOpen) {
      return;
    }

    this._isPopoverOpen = false;
    this._popover.visible && this._popover.hide();
    this.onClose("Dropdown closed!");
  }

  render(): TemplateResult {
    return html` <div
      class="split-button-container"
      id="split-button-container"
    >
      <mfe-button
        id="split-main-button"
        class="split-main-button"
        variant="${this.variant}"
        kind="${this.kind}"
        size="${this.size}"
        loading-label="${ifDefined(this.loadingLabel)}"
        icon="${ifDefined(this.icon)}"
        href="${ifDefined(this.type)}"
        ?disabled="${this.disabled}"
        ?loading="${this.loading}"
        type="${this.type}"
        target="${ifDefined(this.target)}"
        form="${ifDefined(this.form)}"
        ?autofocus="${this.autofocus}"
        @mfe-click="${this._handlePrimaryClick}"
      >
        ${this.label}
      </mfe-button>
      <div class="split-divider"></div>
      <mfe-button
        id="dropdown-button"
        class="dropdown-button"
        .active="${this.opened}"
        icon="${this.opened ? "arrow_up" : "arrow_down"}"
        ?disabled="${this.dropdownDisabled}"
        variant="${this.variant}"
        kind="${this.kind}"
        size="${this.size}"
        ?loading="${this.loading}"
        label="split-dropdown-button"
        @mfe-click="${this._handleClick}"
      >
      </mfe-button>
      <mfe-popover
        fit-size
        placement="bottom-start"
        @mfe-popover-hide="${this.close}"
      >
        <div class="popover-content">
          <slot></slot>
        </div>
      </mfe-popover>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeSplitButtonTag]: MfeSplitButton;
  }
}
