import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { AlertVariant, MfeAlert } from "../../alert/mfe-alert";
import { MfeNotificationCardStyle } from "./mfe-notification-card.style";
import { stringBooleanConverter } from "../../../utils/string-to-boolean.util";
import { MfeIconName } from "../../../constants/icon.constant";
import { event, EventDispatcher } from "../../../utils/event";
import "../../alert/mfe-alert";

export enum CloseSource {
  DurationEnded = "duration-ended",
  CloseButton = "close-button",
}

export type NotificationVariant = "info" | "success" | "warning" | "error";

const NOTIFICATION_VARIANT_ALERT_MAP: Readonly<
  Record<NotificationVariant, AlertVariant>
> = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "danger",
};

/**
 * @tag mfe-notification-card
 * @summary Baklava Notification Card component
 */

@customElement("mfe-notification-card")
export default class MfeNotificationCard extends LitElement {
  static styles = MfeNotificationCardStyle;

  /**
   * Sets notification caption.
   * @attr caption
   * @type {string}
   * @default ""
   */
  @property({ type: String })
  caption = "";

  /**
   * Allows to customize notification icon.
   * True value will display default icon.
   * False value will hide icon.
   * String value will display icon with specified name.
   * @attr icon
   * @type {boolean | BaklavaIcon}
   * @default true
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean | MfeIconName;

  /**
   * Sets notification variant.
   * @attr variant
   * @type {NotificationVariant}
   * @default "info"
   */
  @property({ reflect: true })
  variant: NotificationVariant = "info";

  /**
   * Sets notification display duration in second.
   * Has no effect if permanent is set to true.
   * @attr closed
   * @type {boolean}
   * @default false
   */
  @property({ type: Number })
  duration = 7;

  /**
   * Prevents notification from being closed automatically.
   * @attr closed
   * @type {boolean}
   * @default false
   */
  @property({ type: Boolean })
  permanent = false;

  /**
   * Indicates whether the notification is closed.
   */
  @property({ type: Boolean })
  closed = false;

  /**
   * Dispatches close request event.
   * The notification will not be closed automatically if the event is prevented.
   */
  @event("mfe-notification-card-request-close")
  private onRequestClose!: EventDispatcher<{
    source: "duration-ended" | "close-button";
  }>;

  /**
   * Dispatches close event.
   * The notification will hidden after the event is dispatched and the closed property is set to true.
   */
  @event("mfe-notification-card-close") private onClose!: EventDispatcher<{
    source: "duration-ended" | "close-button";
  }>;

  protected firstUpdated() {
    this.setupDuration();
  }

  /**
   * Sets up duration animation.
   * The notification will dispatch a closed event after the animation ends.
   */
  private async setupDuration() {
    if (this.permanent) {
      return;
    }

    if (this.duration <= 0) {
      this.close(CloseSource.DurationEnded);
      return;
    }

    setTimeout(() => {
      this.shadowRoot?.querySelector(".remaining")?.addEventListener(
        "animationend",
        () => {
          this.close(CloseSource.DurationEnded);
        },
        { once: true }
      );
    }, 0);
  }

  private close(source: CloseSource) {
    const requestCloseEvent = this.onRequestClose(
      { source },
      { cancelable: true }
    );

    if (requestCloseEvent.defaultPrevented) {
      return;
    }

    this.onClose({ source });
    this.closed = true;
  }

  private handleClose(e: CustomEvent<boolean>) {
    const target = e.target as MfeAlert;

    target.closed = false;

    this.close(CloseSource.CloseButton);
  }

  private renderProgress() {
    if (this.permanent) {
      return null;
    }

    return html`
      <div class="duration">
        <div class="remaining" style="--duration: ${this.duration}s;"></div>
      </div>
    `;
  }

  render(): TemplateResult {
    const { icon = true, variant = "info" } = this;

    return html`
      <mfe-alert
        class="notification"
        caption="${ifDefined(this.caption)}"
        icon=${icon}
        variant=${ifDefined(NOTIFICATION_VARIANT_ALERT_MAP[variant])}
        ?closed=${this.closed}
        ?closable=${true}
        @mfe-close=${this.handleClose}
      >
        <slot></slot>
        ${this.renderProgress()}
        <slot name="primary-action" slot="action"></slot>
        <slot name="secondary-action" slot="action-secondary"></slot>
      </mfe-alert>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mfe-notification-card": MfeNotificationCard;
  }
}
