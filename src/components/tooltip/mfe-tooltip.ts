import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { ReferenceElement } from "@floating-ui/core";
import MfePopover from "../popover/mfe-popover";
import type { Placement } from "../popover/mfe-popover";

import "../popover/mfe-popover";
import { MfeTooltipStyle } from "./mfe-tooltip.style";
import { event } from "../../utils/event";
import type { EventDispatcher } from "../../utils/event";
import { getTarget } from "../../utils/element";

/**
 * @tag mfe-tooltip
 * @summary Baklava Tooltip component
 * @dependency mfe-popover
 *
 * @cssproperty [--mfe-tooltip-trigger-display=inline-flex] Set the display of the tooltip trigger.
 */
@customElement("mfe-tooltip")
export default class MfeTooltip extends LitElement {
  static styles = MfeTooltipStyle;

  @query(".trigger") private trigger: ReferenceElement;
  @query("mfe-popover") private _popover!: MfePopover;

  /**
   * Sets placement of the tooltip
   */
  @property({ type: String })
  placement: Placement = "top";

  /**
   * Fires when hovering over a trigger
   */
  @event("mfe-tooltip-show") private onShow!: EventDispatcher<string>;

  /**
   * Fires when leaving over from trigger
   */
  @event("mfe-tooltip-hide") private onHide!: EventDispatcher<string>;

  @property() target!: string | Element;

  protected update(changedProperties: PropertyValues) {
    if (changedProperties.has("target")) {
      const prev = changedProperties.get("target");

      if (prev) {
        this._removeEvents(prev);
      }

      this._addEvents();
    }

    super.update(changedProperties);
  }

  private _addEvents() {
    const target = getTarget(this.target);

    if (target) {
      target.addEventListener("focus", this.show, { capture: true });
      target.addEventListener("mouseenter", this.show);
      target.addEventListener("blur", this.hide, { capture: true });
      target.addEventListener("mouseleave", this.hide);
    }
  }

  private _removeEvents(value: string | Element) {
    const target = getTarget(value);

    if (target) {
      target.removeEventListener("focus", this.show, { capture: true });
      target.removeEventListener("mouseenter", this.show);
      target.removeEventListener("blur", this.hide, { capture: true });
      target.removeEventListener("mouseleave", this.hide);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this._addEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._removeEvents(this.target);
  }

  /**
   * Shows tooltip
   */
  show() {
    this._popover.target = this.target ?? this.trigger;
    this._popover.show();
    this.onShow("");
  }

  /**
   * Hides tooltip
   */
  hide() {
    this._popover.hide();
    this.onHide("");
  }

  /**
   * Gives the visibility status of the tooltip
   */
  get visible(): boolean {
    return this._popover.visible;
  }

  private triggerTemplate() {
    return html`<slot
      class="trigger"
      name="tooltip-trigger"
      aria-describedby="tooltip"
      @focus=${{ handleEvent: () => this.show(), capture: true }}
      @blur=${{ handleEvent: () => this.hide(), capture: true }}
      @mouseenter=${() => this.show()}
      @mouseleave=${() => this.hide()}
    >
    </slot>`;
  }

  render(): TemplateResult {
    return html`
      ${this.target ? "" : this.triggerTemplate()}
      <mfe-popover
        .target="${this.target ?? this.trigger}"
        placement="${ifDefined(this.placement)}"
      >
        <slot class="content" id="tooltip" role="tooltip"></slot>
      </mfe-popover>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mfe-tooltip": MfeTooltip;
  }
}
