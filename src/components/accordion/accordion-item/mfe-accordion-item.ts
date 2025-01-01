import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { MfeAccordionItemStyle } from "./mfe-accordion-item.style";
import { stringBooleanConverter } from "../../../utils/string-to-boolean.util";
import { event, EventDispatcher } from "../../../utils/event";

import "../../icon/mfe-icon";

enum AnimationStatus {
  EXPANDING,
  COLLAPSING,
}

@customElement("mfe-accordion")
export default class MfeAccordion extends LitElement {
  /**
   * Whether the accordion is expanded
   */
  @property({ reflect: true, type: Boolean })
  open = false;

  /**
   * Sets accordion caption.
   */
  @property({ reflect: true })
  caption?: string;

  /**
   * Add icon to beginning of the title
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean;

  /**
   * Whether the accordion is disabled
   */
  @property({ reflect: true, type: Boolean })
  disabled = false;

  /**
   * Fires when accordion open state change.
   */
  @event("mfe-toggle") private _onToggle!: EventDispatcher<boolean>;

  @property({ type: Number })
  animationDuration = 250;

  private _animation: Animation | null = null;
  private _animationStatus: AnimationStatus | null = null;

  @query("details")
  detailsEl!: HTMLDetailsElement;

  @query("summary")
  summaryEl!: HTMLElement;

  @query(".accordion-content")
  contentEl!: HTMLElement;

  static styles = MfeAccordionItemStyle;

  _animate(isExpanding: boolean) {
    this._animationStatus = isExpanding
      ? AnimationStatus.EXPANDING
      : AnimationStatus.COLLAPSING;

    const startHeight = `${this.detailsEl.offsetHeight}px`;
    const endHeight = isExpanding
      ? `${this.summaryEl.offsetHeight + this.contentEl.offsetHeight}px`
      : `${this.summaryEl.offsetHeight}px`;

    if (this._animation) {
      this._animation.cancel();
    }

    this.detailsEl.style.overflow = "hidden";
    this._animation = this.detailsEl.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: this.animationDuration,
        easing: "ease-out",
      }
    );

    this._animation.onfinish = () => this._onAnimationFinish(isExpanding);
    this._animation.oncancel = () => {};
  }

  private _onAnimationFinish(open: boolean) {
    this.open = open;
    this._animation = null;
    this._animationStatus = null;
    this.detailsEl.style.height = this.detailsEl.style.overflow = "";
  }

  expand() {
    this.open = true;
    this._animate(true);
  }

  collapse() {
    this._animate(false);
  }

  private _clickHandler(e: Event) {
    e.preventDefault();

    if (this.disabled) return;

    if (this._animationStatus === AnimationStatus.COLLAPSING || !this.open) {
      this.expand();
    } else if (
      this._animationStatus === AnimationStatus.EXPANDING ||
      this.open
    ) {
      this.collapse();
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has("open")) {
      if (this.disabled && this.open) {
        this._onAnimationFinish(false);
        return;
      }

      this._onToggle(this.open);
    }
  }

  render(): TemplateResult {
    const icon = this.icon
      ? html`<mfe-icon
          class="icon"
          name=${this.icon === true ? "info" : this.icon}
        ></mfe-icon>`
      : null;

    return html`<details
      ?open=${this.open}
      class=${classMap({
        accordion: true,
        disabled: this.disabled,
      })}
    >
      <summary
        class="summary"
        @click="${this._clickHandler}"
        aria-expanded=${this.open ? "true" : "false"}
        aria-controls="content"
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
      >
        ${icon}
        <slot name="caption">
          <span class="caption"> ${this.caption} </span>
        </slot>
        <mfe-icon name="arrow_down" class="indicator"></mfe-icon>
      </summary>

      <div
        class="accordion-content"
        role="region"
        aria-labelledby="header"
        id="content"
      >
        <slot></slot>
      </div>
    </details>`;
  }
}
