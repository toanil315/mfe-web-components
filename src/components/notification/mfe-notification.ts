import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import { MfeIconName } from "../../constants/icon.constant";
import { CloseSource, NotificationVariant } from "./card/mfe-notification-card";
import { MfeNotificationStyle } from "./mfe-notification.style";
import { MfeAlert } from "../alert/mfe-alert";
import "./card/mfe-notification-card";

type Action = {
  label: string;
  onClick: (notification: Notification) => void;
};

export type NotificationProps = {
  caption?: string;
  description: string;
  icon?: boolean | MfeIconName;
  variant?: NotificationVariant;
  primaryAction?: Action;
  secondaryAction?: Action;
  duration?: number;
  permanent?: boolean;
  height?: number;
};

export type Notification = NotificationProps & {
  id: string;
  remove: () => Promise<boolean>;
};

export const SWIPE_UP_THRESHOLD = -50;

/**
 * @tag mfe-notification
 * @summary Baklava Notification component
 */

@customElement("mfe-notification")
export default class MfeNotification extends LitElement {
  static styles = MfeNotificationStyle;

  /**
   * Disable animations.
   * It will not be possible to use animations if the user has disabled them.
   * Animations will respect the user's preferences regardless of this property.
   */
  @property({ type: Boolean, attribute: "no-animation", reflect: true })
  noAnimation = false;

  /**
   * Sets the default duration of notifications in seconds
   */
  @property({ type: Number })
  duration = 7;

  @state()
  private notifications: Notification[] = [];

  public get notificationList() {
    return this.notifications;
  }

  private get isMobile() {
    return window.matchMedia("(max-width: 480px)").matches;
  }

  /**
   * Adds a notification to the list of notifications.
   * @param {NotificationProps} props Notification properties
   * @returns {Notification} A notification object with a remove method.
   */
  public async addNotification(props: NotificationProps) {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = {
      ...props,
      id,
      duration: props.duration || this.duration,
      remove: () => this.removeNotification(id),
    };

    const notificationHeight = await this.preCalculateHeight(notification);

    notification.height = notificationHeight ?? 0;

    this.notifications = [...this.notifications, notification];

    return notification;
  }

  /**
   * Removes a notification from the list of notifications.
   * @param {string} id Notification id
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the notification was removed.
   */
  public async removeNotification(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const notificationEl = this.shadowRoot?.getElementById(id) as MfeAlert;

      if (!notificationEl) {
        resolve(false);
        return;
      }

      notificationEl.style.height = `${notificationEl.clientHeight}px`;
      notificationEl.addEventListener(
        "animationend",
        ({ animationName }: AnimationEvent) => {
          if (animationName !== "size-to-zero") {
            return;
          }

          this.notifications = this.notifications.filter(
            (notification) => notification.id !== id
          );
          resolve(true);
        }
      );

      notificationEl.classList.add("removing");
    });
  }

  private renderActionSlot(
    slotName: "primary-action" | "secondary-action",
    notification: Notification
  ) {
    const action =
      slotName === "primary-action"
        ? notification.primaryAction
        : notification.secondaryAction;

    if (!action || !action.label) {
      return "";
    }

    return html`<mfe-button
      slot="${slotName}"
      @mfe-click=${() => action.onClick(notification)}
    >
      ${action.label}
    </mfe-button>`;
  }

  private get fakeNotificationWrapperContainer() {
    // Get the computed value of --mfe-notification-width
    const hostStyles = getComputedStyle(this);
    const notificationWidth = hostStyles
      .getPropertyValue("--mfe-notification-width")
      .trim();

    // Create a temporary container for measurement
    const tempContainer = document.createElement("div");
    tempContainer.style.visibility = "hidden";
    tempContainer.style.pointerEvents = "none";
    tempContainer.classList.add("fake-wrapper");

    // Attach custom styles directly
    const styleElement = document.createElement("style");
    styleElement.textContent = `
        .fake-wrapper {
          --margin: var(--mfe-size-xl);
          display: flex;
          flex-direction: column-reverse;
          max-width: ${notificationWidth};
          margin: var(--margin);
          width: calc(100% - var(--margin) * 2);
        }

        @media screen and (max-width: 480px) {
            .fake-wrapper {
              flex-direction: column;
              max-width: 100%;
            }
          }
      `;
    tempContainer.appendChild(styleElement);
    return tempContainer;
  }

  private preCalculateHeight(notification: Notification) {
    return new Promise<number>((resolve) => {
      // Create a temporary container for measurement
      const tempContainer = this.fakeNotificationWrapperContainer;

      // Create the notification card
      const tempCard = document.createElement("mfe-alert");
      tempCard.classList.add("notification");
      tempCard.setAttribute("caption", notification.caption || "");
      tempCard.setAttribute("description", notification.description);

      // Add action button if necessary
      if (notification.primaryAction || notification.secondaryAction) {
        tempCard.innerHTML += `<mfe-button slot="action">Action Link</mfe-button>`;
      }

      // Append the container to the document body
      document.body.appendChild(tempContainer);
      tempContainer.appendChild(tempCard);

      // Wait for the card to render and styles to apply
      tempCard.updateComplete.then(() => {
        const height = tempCard.getBoundingClientRect().height;

        tempCard.remove();
        tempContainer.remove();

        resolve(height);
      });
    });
  }
  render(): TemplateResult {
    return html`
      <div class="wrapper">
        ${repeat(
          this.notifications,
          (notification) => notification.id,
          (notification) => {
            const {
              caption,
              description,
              icon = true,
              variant = "info",
              id,
              duration = this.duration,
              permanent,
              height,
            } = notification;

            const actionButton = this.renderActionSlot(
              "primary-action",
              notification
            );
            const secondaryActionButton = this.renderActionSlot(
              "secondary-action",
              notification
            );

            return html`
              <mfe-notification-card
                id="${id}"
                class="notification"
                data-slide=${this.isMobile ? "top" : "right"}
                style="height: ${height ? `${height}px` : "auto"}"
                duration=${duration}
                caption="${ifDefined(caption)}"
                icon=${icon}
                variant=${ifDefined(variant)}
                ?permanent=${permanent}
                @mfe-notification-card-request-close=${(
                  event: CustomEvent<{ source: CloseSource }>
                ) => {
                  // We will run animations on the notification card
                  // so we need to prevent the default close behavior
                  event.preventDefault();
                  this.removeNotification(id);
                }}
              >
                ${description} ${actionButton} ${secondaryActionButton}
              </mfe-notification-card>
            `;
          }
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mfe-notification": MfeNotification;
  }
}
