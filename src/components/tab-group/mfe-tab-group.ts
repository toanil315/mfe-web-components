import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { mfeTabGroupTag } from "./mfe-tab-group.constant";
import { MfeTabGroupStyle } from "./mfe-tab-group.style";
import MfeTab from "./tab/mfe-tab";
import MfeTabPanel from "./tab-panel/mfe-tab-panel";

import "./tab/mfe-tab";
import "./tab-panel/mfe-tab-panel";

/**
 * @tag mfe-tab-group
 * @summary Baklava Tab group component
 */
@customElement(mfeTabGroupTag)
export default class MfeTabGroup extends LitElement {
  static styles = MfeTabGroupStyle;

  private _connectedTabs: MfeTab[] = [];
  private _connectedPanels: MfeTabPanel[] = [];
  private _tabFocus = 0;

  get tabs() {
    return this._connectedTabs;
  }

  get panels() {
    return this._connectedPanels;
  }

  /**
   * This method is used by `tab` component to register them self to the tab group.
   * @param tab BlTab reference to be registered
   */
  registerTab(tab: MfeTab) {
    const isFirstAndNotDisabled =
      this._connectedTabs.filter((t) => !t.disabled).length === 0 &&
      !tab.disabled;

    this._connectedTabs.push(tab);

    if ((!tab.disabled && tab.selected) || isFirstAndNotDisabled) {
      this.selectedTabName = tab.name;
      this._tabFocus = this._connectedTabs.length - 1;
    }
  }

  /**
   * This method is used by `tab` component to unregister them self to the tab group.
   * @param tab BlTab reference to be unregistered
   */
  unregisterTab(tab: MfeTab) {
    this._connectedTabs.splice(this._connectedTabs.indexOf(tab), 1);
    if (tab.selected) {
      this._connectedTabs.find((t) => !t.disabled)?.select();
    }
  }

  /**
   * This method is used by `tab-panel` component to register them self to the tab group.
   * @param panel BlTabPanel reference to be registered
   */
  registerTabPanel(panel: MfeTabPanel) {
    panel.hidden = panel.tab !== this.selectedTabName;
    panel.tabIndex = 0;
    this._connectedPanels.push(panel);
  }

  /**
   * This method is used by `tab-panel` component to unregister them self to the tab group.
   * @param panel MfeTabPanel reference to be unregistered
   */
  unregisterTabPanel(panel: MfeTabPanel) {
    this._connectedTabs.splice(this._connectedPanels.indexOf(panel), 1);
  }

  private _selectedTabName!: string;

  get selectedTabName() {
    return this._selectedTabName;
  }

  set selectedTabName(name: string) {
    this._selectedTabName = name;
    this._connectedTabs.forEach((t) => {
      t.selected = name === t.name;
    });
    this._connectedPanels.forEach((p) => {
      p.hidden = p.tab !== this._selectedTabName;
    });
  }

  private _handleTabSelected(e: CustomEvent) {
    this.selectedTabName = e.detail;
    this._tabFocus = this._connectedTabs.findIndex((t) => t.name === e.detail);
  }

  private _handleTabListKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (e.key === "ArrowRight") {
        do {
          this._tabFocus++;
          if (this._tabFocus >= this._connectedTabs.length) {
            this._tabFocus = 0;
          }
        } while (this._connectedTabs[this._tabFocus].disabled);
      } else if (e.key === "ArrowLeft") {
        do {
          this._tabFocus--;
          if (this._tabFocus < 0) {
            this._tabFocus = this._connectedTabs.length - 1;
          }
        } while (this._connectedTabs[this._tabFocus].disabled);
      }

      this._connectedTabs[this._tabFocus].focus();
    }
  }

  render(): TemplateResult {
    return html` <div
      class="container"
      @mfe-tab-selected="${this._handleTabSelected}"
    >
      <div
        role="tablist"
        @keydown=${this._handleTabListKeyDown}
        class="tabs-list"
      >
        <div class="tabs">
          <slot name="tabs"></slot>
        </div>
      </div>
      <div role="tabpanel" class="panels">
        <slot></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeTabGroupTag]: MfeTabGroup;
  }
}
