import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MfeBadgeStyle } from "./mfe-badge.style";
import { MfeIconName } from "../../constants/icon.constant";
import "../icon/mfe-icon";

@customElement("mfe-badge")
export class MfeBadge extends LitElement {
  static styles = MfeBadgeStyle;

  @property({ type: String, reflect: true })
  size: "small" | "large" = "small";

  @property({ type: String, reflect: true })
  icon!: MfeIconName;

  render(): TemplateResult {
    const icon = this.icon ? html`<mfe-icon name=${this.icon}></mfe-icon>` : "";

    return html`<span class="badge">
      <slot name="icon">${icon}</slot>
      <slot></slot>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mfe-badge": MfeBadge;
  }
}
