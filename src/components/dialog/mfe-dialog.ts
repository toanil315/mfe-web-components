import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "../button/mfe-button";
import { MfeDialogStyle } from "./mfe-dialog.style";
import { event } from "../../utils/event";
import type { EventDispatcher } from "../../utils/event";

/**
 * @tag mfe-dialog
 * @summary Baklava Dialog component
 *
 * @cssproperty [--mfe-dialog-width=auto] Sets the width of the dialog content
 * @cssproperty [--mfe-dialog-caption-line-clamp=1] Sets the line clamp of the caption
 */
@customElement("mfe-dialog")
export default class MfeDialog extends LitElement {
  static styles = MfeDialogStyle;

  /**
   * Sets dialog open-close status
   */
  @property({
    type: Boolean,
    reflect: true,
    hasChanged(newVal: boolean, oldVal: boolean | undefined) {
      if (newVal === false && oldVal === undefined) {
        // Assume that the initial value is false
        return false;
      }
      return newVal !== oldVal;
    },
  })
  open = false;

  /**
   * Sets the dialog title
   */
  @property({ type: String })
  caption?: string;

  /**
   * Determines if the dialog is critical, which disables closing through keyboard, backdrop, and close button interactions.
   */
  @property({ type: Boolean, reflect: true })
  critical = false;

  @query("footer")
  private footer!: HTMLElement;

  @query(".container")
  private container!: HTMLElement;

  @query(".content")
  private content!: HTMLElement;

  /**
   * Fires when the dialog is opened
   */
  @event("mfe-dialog-open") private onOpen!: EventDispatcher<object>;

  /**
   * Fires before the dialog is closed with internal actions like clicking close button,
   * pressing Escape key or clicking backdrop. Can be prevented by calling `event.preventDefault()`
   */
  @event("mfe-dialog-request-close") private onRequestClose!: EventDispatcher<{
    source: "close-button" | "keyboard" | "backdrop";
  }>;

  /**
   * Fires when the dialog is closed
   */
  @event("mfe-dialog-close") private onClose!: EventDispatcher<object>;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("open")) {
      this.toggleDialogHandler();
    }
  }

  private get _hasFooter() {
    return [...this.childNodes].some((node) => node.nodeName === "MFE-BUTTON");
  }

  private toggleDialogHandler() {
    if (this.open) {
      this.onOpen({ isOpen: true });
      document.body.style.overflow = "hidden";
      this.toggleFooterShadow();
      window?.addEventListener("keydown", (event) => this.onKeydown(event));
      window?.addEventListener("resize", this.toggleFooterShadow);
      this.content?.addEventListener("scroll", this.toggleFooterShadow);
    } else {
      this.onClose({ isOpen: false }, { bubbles: false });
      document.body.style.overflow = "auto";
      window?.removeEventListener("keydown", this.onKeydown);
      window?.removeEventListener("resize", this.toggleFooterShadow);
      this.content?.removeEventListener("scroll", this.toggleFooterShadow);
    }
  }

  private closeDialog(source: "close-button" | "keyboard" | "backdrop") {
    const requestCloseEvent = this.onRequestClose(
      { source },
      { cancelable: true }
    );

    if (requestCloseEvent.defaultPrevented) {
      return;
    }

    this.open = false;
  }

  private clickOutsideHandler = (event: MouseEvent) => {
    if (this.critical) return;

    const eventPath = event.composedPath() as HTMLElement[];

    if (!eventPath.includes(this.container)) {
      this.closeDialog("backdrop");
    }
  };

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.code === "Escape" && this.open && !this.critical) {
      event.preventDefault();
      this.closeDialog("keyboard");
    }
  };

  private toggleFooterShadow = () => {
    const scrollTop = this.content?.scrollTop;
    const scrollHeight = this.content?.scrollHeight;
    const clientHeight = this.content?.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.footer?.classList?.remove("shadow");
    } else {
      this.footer?.classList?.add("shadow");
    }
  };

  private renderFooter() {
    return this._hasFooter
      ? html`<footer>
          <slot name="primary-action"></slot>
          <slot name="secondary-action"></slot>
          <slot name="tertiary-action"></slot>
        </footer>`
      : "";
  }

  private renderContainer() {
    const title = this.caption
      ? html`<h2 id="dialog-caption">${this.caption}</h2>`
      : "";
    const closeButton = !this.critical
      ? html`<mfe-button
          @click="${() => this.closeDialog("close-button")}"
          icon="close"
          label="close"
          variant="tertiary"
          kind="neutral"
          size="small"
        ></mfe-button>`
      : null;

    const classes = {
      container: true,
      "has-footer": this._hasFooter,
    };

    return html` <div class="${classMap(classes)}">
      <header>${title} ${closeButton}</header>
      <section class="content"><slot></slot></section>
      ${this.renderFooter()}
    </div>`;
  }

  render(): TemplateResult {
    return html`<div
      class="dialog-polyfill"
      role="dialog"
      aria-labelledby="dialog-caption"
      @click=${this.clickOutsideHandler}
    >
      ${this.renderContainer()}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mfe-dialog": MfeDialog;
  }
}
