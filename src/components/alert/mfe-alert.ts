import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MfeAlertStyle } from "./mfe-alert.style";
import { ButtonKind, ButtonSize, ButtonVariant } from "../button/mfe-button";
import { stringBooleanConverter } from "../../utils/string-to-boolean.util";
import { EventDispatcher, event } from "../../utils/event";
import { MfeIconName } from "../../constants/icon.constant";
import { ifDefined } from "lit/directives/if-defined.js";
import "../icon/mfe-icon";

export type AlertVariant = "info" | "warning" | "success" | "danger";

@customElement("mfe-alert")
export class MfeAlert extends LitElement {
  static styles = MfeAlertStyle;

  /**
   * Sets alert variant
   */
  @property({ reflect: true })
  variant: AlertVariant = "info";

  /**
   * Sets alert description
   */
  @property()
  description?: string;

  /**
   * Allows to customize alert icon
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean | MfeIconName;

  /**
   * Displays a close button.
   */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /**
   * Sets alert caption.
   */
  @property()
  caption?: string;

  /**
   * Sets alert components display state.
   */
  @property({ type: Boolean, reflect: true })
  closed = false;

  /**
   * Opens alert component.
   */
  public open() {
    this.closed = false;
  }

  /**
   * Closes alert component.
   */
  public close() {
    this.closed = true;
  }

  /**
   * Fires when close button clicked.
   */
  @event("mfe-close") private onClose!: EventDispatcher<boolean>;

  private get _hasAlertCaptionSlot() {
    return this.querySelector(':scope > [slot="caption"]') !== null;
  }

  private _closeHandler() {
    this.closed = true;
    this.onClose(true);
  }

  private _predefinedIcons() {
    switch (this.variant) {
      case "success":
        return "check_fill";
      case "danger":
        return "close_fill";
      default:
        return this.variant;
    }
  }

  private _getIcon(): MfeIconName | undefined {
    if (!this.icon) return;
    if (this.icon === true) return this._predefinedIcons();
    return this.icon;
  }

  private _initAlertActionSlot(event: Event) {
    const slotElement = event.target as HTMLSlotElement;
    const slotElements = slotElement.assignedElements({ flatten: true });

    slotElements.forEach((element) => {
      if (element.tagName !== "MFE-BUTTON") {
        element.parentNode?.removeChild(element);
        return;
      }

      (
        this.shadowRoot?.querySelector(".actions") as HTMLElement
      ).style.display = "flex";

      const variant =
        slotElement.name === "action-secondary" ? "secondary" : "primary";

      const buttonTypes: Record<AlertVariant, string> = {
        info: "neutral",
        warning: "neutral",
        success: "success",
        danger: "danger",
      };

      element.setAttribute("variant", variant as ButtonVariant);
      element.setAttribute("kind", buttonTypes[this.variant] as ButtonKind);
      element.setAttribute("size", "medium" as ButtonSize);
      element.removeAttribute("icon");
    });
  }

  render(): TemplateResult {
    const caption =
      this.caption || this._hasAlertCaptionSlot
        ? html`<span class="caption">
            <slot name="caption"> ${this.caption} </slot>
          </span>`
        : null;

    const icon = this._getIcon()
      ? html`<mfe-icon
          class="icon"
          name=${ifDefined(this._getIcon())}
        ></mfe-icon>`
      : null;

    const closable = this.closable
      ? html`<mfe-button
          class="close"
          label="close"
          kind="neutral"
          icon="close"
          variant="tertiary"
          @click=${this._closeHandler}
        ></mfe-button>`
      : null;

    const description = html`<span class="description">
      <slot> ${this.description} </slot>
    </span>`;

    return html`
      <div class="alert">
        ${icon}
        <div class="wrapper">
          <div class="content">
            <div class="text-content">${caption} ${description}</div>
          </div>
          <div class="actions">
            <slot
              class="action"
              name="action"
              @slotchange=${this._initAlertActionSlot}
            ></slot>
            <slot
              class="action-secondary"
              name="action-secondary"
              @slotchange=${this._initAlertActionSlot}
            ></slot>
          </div>
        </div>
        ${closable}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mfe-alert": MfeAlert;
  }
}
