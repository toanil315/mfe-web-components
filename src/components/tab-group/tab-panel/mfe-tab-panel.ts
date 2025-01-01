import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { mfeTabGroupTag, mfeTabPanelTag } from "../mfe-tab-group.constant";
import { MfeTabPanelStyle } from "./mfe-tab-panel.style";
import MfeTabGroup from "../mfe-tab-group";

/**
 * @tag mfe-tab-panel
 * @summary Baklava Tab panel component
 */
@customElement(mfeTabPanelTag)
export default class MfeTabPanel extends LitElement {
  static styles = MfeTabPanelStyle;

  private tabGroup!: MfeTabGroup | null;

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.tabGroup = this.closest(mfeTabGroupTag);
      // FIXME: We need to warn if parent is not tab-group
      this.tabGroup?.registerTabPanel(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.tabGroup?.unregisterTabPanel(this);
  }

  /**
   * This attribute set by `tab-group` to make panel visible or hidden.
   */
  @state()
  hidden = true;

  /**
   * Name of the linked tab.
   */
  @property({ type: String, reflect: true })
  tab!: string;

  render(): TemplateResult {
    return html`<div ?hidden=${this.hidden}><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    mfeTabPanelTag: MfeTabPanel;
  }
}
