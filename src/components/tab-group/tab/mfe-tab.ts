import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { mfeTabGroupTag, mfeTabTag } from "../mfe-tab-group.constant";
import { MfeTabStyle } from "./mfe-tab.style";
import { MfeIconName } from "../../../constants/icon.constant";
import { event, EventDispatcher } from "../../../utils/event";

import "../../icon/mfe-icon";
import "../../badge/mfe-badge";
import "../../tooltip/mfe-tooltip";
import "../../button/mfe-button";
import MfeTabGroup from "../mfe-tab-group";

/**
 * @tag mfe-tab
 * @summary Baklava Tab component
 */
@customElement(mfeTabTag)
export default class MfeTab extends LitElement {
  static styles = MfeTabStyle;

  private tabGroup!: MfeTabGroup | null;

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.tabGroup = this.closest<MfeTabGroup>(mfeTabGroupTag);
      // FIXME: We need to warn if parent is not tab-group
      this.tabGroup?.registerTab(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.tabGroup?.unregisterTab(this);
  }

  /**
   * Sets the caption of tab
   */
  @property({ type: String })
  caption!: string;

  /**
   * Name of the tab that should match `tab-panel`'s `tab` attribute
   */
  @property({ type: String, reflect: true })
  name!: string;

  /**
   * Set tooltip text. Should be set to display information icon.
   */
  @property({ type: String, attribute: "help-text", reflect: true })
  helpText!: string;

  /**
   * Name of the icon which display on the left side of the tab.
   */
  @property({ type: String })
  icon?: MfeIconName;

  /**
   * Shows notification dot.
   */
  @property({ type: Boolean, reflect: true })
  notify = false;

  /**
   * Sets the content of the badge.
   */
  @property({ type: String })
  badge = "";

  /**
   * Set `tab` as selected.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * Set `tab` as disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Fires when tab is selected.
   */
  @event("mfe-tab-selected") private _onSelect!: EventDispatcher<string>;

  @query(".container")
  private tab!: HTMLButtonElement;

  /**
   * Set tab selected.
   */
  select() {
    this.selected = true;
  }

  focus() {
    this.tab.focus();
  }

  updated(changedProperties: PropertyValues<this>) {
    this.tabIndex = this.selected ? 0 : -1;
    if (changedProperties.has("selected") && this.selected) {
      this._onSelect(this.name);
    }
  }

  render(): TemplateResult {
    const title = html` <slot></slot>`;

    const helpTooltip = this.helpText
      ? html` <div class="help-container">
          <mfe-tooltip>
            <mfe-button
              slot="tooltip-trigger"
              icon="info"
              variant="tertiary"
              kind="neutral"
              label="${this.helpText}"
            ></mfe-button>
            ${this.helpText}
          </mfe-tooltip>
        </div>`
      : null;

    const icon = this.icon
      ? html` <div class="icon">
          <mfe-icon name="${this.icon}"></mfe-icon>
        </div>`
      : null;

    const badge = this.badge
      ? html` <div class="badge-container">
          <mfe-badge size="small">${this.badge}</mfe-badge>
        </div>`
      : null;

    const caption = this.caption
      ? html` <div class="caption">${this.caption}</div>`
      : null;

    return html`
      <button
        ?disabled="${this.disabled}"
        role="tab"
        class="container"
        @click="${() => this.select()}"
      >
        <div class="title-container">
          <div class="title">${icon} ${title} ${badge}</div>
          ${caption}
        </div>
        ${helpTooltip}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeTabTag]: MfeTab;
  }
}
