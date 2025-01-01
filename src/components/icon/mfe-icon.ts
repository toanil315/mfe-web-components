import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { MfeIconStyle } from "./mfe-icon.style";
import {
  ICON_NAMES,
  ICON_RESOLVERS,
  MfeIconName,
} from "../../constants/icon.constant";
import { decodeSvgDataUri } from "../../utils/data-uri-to-svg.util";

@customElement("mfe-icon")
export class MfeIcon extends LitElement {
  static styles = MfeIconStyle;

  private _iconName!: MfeIconName;

  /**
   * Name of the icon to show
   */
  @property({ type: String, reflect: true })
  get name(): MfeIconName {
    return this._iconName;
  }

  set name(value: MfeIconName) {
    if (value !== this._iconName && Object.keys(ICON_NAMES).includes(value)) {
      this._iconName = value;
      this.load();
    }
  }

  @state() private svg!: string;

  async load() {
    const iconText = await ICON_RESOLVERS[this._iconName]();
    this.svg = decodeSvgDataUri(iconText.default);
  }

  render(): TemplateResult {
    return html`<div aria-hidden="true">${unsafeSVG(this.svg)}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mfe-icon": MfeIcon;
  }
}
