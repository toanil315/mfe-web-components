import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { MfeDropdownItemStyle } from "./mfe-dropdown-item.style";
import { EventDispatcher, event } from "../../../utils/event";
import { MfeIconName } from "../../../constants/icon.constant";
import { MfeButton } from "../../button/mfe-button";
import "../../button/mfe-button";
import MfeDropdownGroup from "../group/mfe-dropdown-group";
import MfeDropdown from "../mfe-dropdown";
import {
  mfeDropdownGroupTag,
  mfeDropdownItemTag,
  mfeDropdownTag,
} from "../mfe-dropdown-tags";
import MfeSplitButton, {
  mfeSplitButtonTag,
} from "../../split-button/mfe-split-button";

/**
 * @tag mfe-dropdown-item
 * @summary Baklava Dropdown Item component
 */
@customElement(mfeDropdownItemTag)
export default class MfeDropdownItem extends LitElement {
  static styles = MfeDropdownItemStyle;

  /**
   * Sets the icon name. Shows icon with mfe-icon component
   */

  @property({ type: String })
  icon?: MfeIconName;

  @property({ type: String, reflect: true })
  value?: string;

  @event("mfe-dropdown-item-click") private onClick!: EventDispatcher<string>;

  private _handleClick() {
    this.MfeDropdownField?.close();
    this.MfeSplitButtonField?.close();
    this.onClick(this.value || "");
  }

  @query("[role=menuitem]") private menuElement!: MfeButton;

  /**
   * Focuses this action
   */
  focus() {
    this.menuElement.focus();
  }

  private MfeDropdownGroupField!: MfeDropdownGroup | null;
  private MfeDropdownField!: MfeDropdown | null;
  private MfeSplitButtonField!: MfeSplitButton | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.MfeDropdownGroupField =
      this.closest<MfeDropdownGroup>(mfeDropdownGroupTag);
    this.MfeDropdownField = this.closest<MfeDropdown>(mfeDropdownTag);
    this.MfeSplitButtonField = this.closest<MfeSplitButton>(mfeSplitButtonTag);

    if (
      !this.MfeDropdownField &&
      !this.MfeDropdownGroupField &&
      !this.MfeSplitButtonField
    ) {
      console.warn(
        `mfe-dropdown-item is designed to be used inside a ${mfeDropdownGroupTag}, ${mfeDropdownTag}`,
        this
      );
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  render(): TemplateResult {
    return html`<mfe-button
      variant="tertiary"
      kind="neutral"
      icon="${ifDefined(this.icon)}"
      role="menuitem"
      @mfe-click="${this._handleClick}"
      ><slot></slot>
    </mfe-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeDropdownItemTag]: MfeDropdownItem;
  }
}
