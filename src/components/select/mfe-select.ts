import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import {
  customElement,
  property,
  query,
  queryAll,
  state,
} from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormControlMixin } from "@open-wc/form-control";
import "element-internals-polyfill";

import { mfeSelectTag } from "./mfe-select.constant";
import { MfeSelectStyle } from "./mfe-select.style";
import { stringBooleanConverter } from "../../utils/string-to-boolean.util";
import { event } from "../../utils/event";
import type { EventDispatcher } from "../../utils/event";
import MfeSelectOption from "../select/option/mfe-option";

import "../select/option/mfe-option";
import "../button/mfe-button";
import "../checkbox-group/checkbox/mfe-checkbox";
import "../icon/mfe-icon";
import "../popover/mfe-popover";
import MfeCheckbox from "../checkbox-group/checkbox/mfe-checkbox";
import MfePopover from "../popover/mfe-popover";

export interface ISelectOption<T = string> {
  value: T;
  text: string;
  selected: boolean;
}

export type SelectSize = "medium" | "large" | "small";

export type CleanUpFunction = () => void;

/**
 * @tag mfe-select
 * @summary Baklava Select component
 *
 * @cssproperty [--mfe-popover-position=fixed] Sets the positioning strategy of select popover. You can set it as `absolute` if you need to show popover relative to its trigger element.
 */
@customElement(mfeSelectTag)
export default class MfeSelect extends FormControlMixin(LitElement) {
  static styles = MfeSelectStyle;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * Sets name of the select field
   */
  @property()
  name!: string;

  private _value!: string | string[] | null;

  private _initialValue!: string | string[] | null;

  /**
   * Sets the value of the select
   */
  @property()
  get value(): string | string[] | null {
    return this._value;
  }

  set value(val: string | string[] | null) {
    this._value = val;

    if (Array.isArray(val)) {
      const formData = new FormData();

      val.forEach((option) => formData.append(this.name, `${option}`));
      this.setValue(formData);
    } else {
      this.setValue(val);
    }

    this.setOptionsSelected();
  }

  shouldFormValueUpdate(): boolean {
    return this.value !== null && this.value !== "";
  }

  /* Declare reactive properties */
  /**
   * Sets the label value
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Sets the placeholder value. If left blank, the label value (if specified) is set as placeholder.
   */
  @property({ reflect: true })
  placeholder?: string;

  /**
   * Sets the size value. Select component's height value will be changed accordingly
   */
  @property({ type: String, reflect: true })
  size: SelectSize = "medium";

  /**
   * When option is not selected, shows component in error state
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Shows the component in disabled state.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets whether the selected option is clearable
   */
  @property({ type: Boolean, reflect: true })
  clearable = false;

  /**
   * Allows multiple options to be selected
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Sets input to get keyboard focus automatically
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * Makes label as fixed positioned
   */
  @property({ type: Boolean, attribute: "label-fixed", reflect: true })
  labelFixed = false;

  /**
   * Adds help text
   */
  @property({ type: String, attribute: "help-text", reflect: true })
  helpText?: string;

  /**
   * Set custom error message
   */
  @property({ type: String, attribute: "error", reflect: true })
  error?: string;

  /**
   * Views select all option in multiple select
   */
  @property({
    type: Boolean,
    attribute: "view-select-all",
    converter: stringBooleanConverter(),
  })
  viewSelectAll = false;

  /**
   * Sets select all text in multiple select
   */
  @property({ type: String, attribute: "select-all-text" })
  selectAllText?: string;

  /**
   * Enable search functionality for the options within the list
   */
  @property({ type: Boolean, attribute: "search-bar", reflect: true })
  searchBar = false;

  /**
   * Search for text variations such as "search," "searching," "search by country," and so on
   */
  @property({
    type: String,
    attribute: "search-bar-placeholder",
    reflect: true,
  })
  searchBarPlaceholder?: string;

  /**
   * Display a loading icon in place of the search icon.
   */
  @property({
    type: Boolean,
    attribute: "search-bar-loading-state",
    converter: stringBooleanConverter(),
  })
  searchBarLoadingState = false;

  /**
   * Text to display when no search results are found.
   */
  @property({ type: String, attribute: "search-not-found-text", reflect: true })
  searchNotFoundText?: string;

  /**
   * Text to display on the clear search button.
   */
  @property({
    type: String,
    attribute: "popover-clear-search-text",
    reflect: true,
  })
  popoverClearSearchText?: string;

  /* Declare internal reactive properties */
  @state()
  private _isPopoverOpen = false;

  @state()
  private _additionalSelectedOptionCount = 0;

  @state()
  private _searchText = "";

  @query(".selected-options")
  private selectedOptionsContainer!: HTMLElement;

  @queryAll(".selected-options li")
  private selectedOptionsItems!: NodeListOf<HTMLElement>;

  @query("mfe-popover")
  private _popover!: MfePopover;

  @query(".select-input")
  private _selectInput!: HTMLElement;

  /**
   * Fires when selection changes
   */
  @event("mfe-select") private _onMfeSelect!: EventDispatcher<
    ISelectOption<string>[] | ISelectOption<string>
  >;

  /**
   * Fires when search text changes
   */
  @event("mfe-search") private _onMfeSearch!: EventDispatcher<string>;

  private _connectedOptions: MfeSelectOption[] = [];

  private setOptionsSelected() {
    this._connectedOptions.forEach(
      (option) =>
        (option.selected =
          this.value === option.value ||
          (Array.isArray(this.value) && this.value.includes(option.value)))
    );

    this._selectedOptions = [
      ...this.options.filter((option) => option.selected),
    ];
  }

  get options() {
    return this._connectedOptions;
  }

  get opened() {
    return this._isPopoverOpen;
  }

  get noResultFound() {
    return (
      this._searchText !== "" &&
      this._connectedOptions.every((option) => option.hidden)
    );
  }

  @state()
  private _selectedOptions: MfeSelectOption[] = [];

  get selectedOptions(): MfeSelectOption[] {
    return this._selectedOptions;
  }

  get additionalSelectedOptionCount() {
    return this._additionalSelectedOptionCount;
  }

  resetFormControl(): void {
    this.value = this._initialValue;
  }

  open() {
    if (this.searchBar) {
      setTimeout(() => {
        document.activeElement?.shadowRoot?.querySelector("input")?.focus();
      }, 100);
    }

    this._isPopoverOpen = true;
    this._popover.show();
  }

  close() {
    this._handleSearchOptions({ target: { value: "" } } as InputEvent & {
      target: HTMLInputElement;
    });

    this._isPopoverOpen = false;
    this._popover.visible && this._popover.hide();
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private inputTemplate() {
    const inputSelectedOptions = html`<ul class="selected-options">
      ${this._selectedOptions.map(
        (item) =>
          html`<li>${item.getAttribute("label") || item.textContent}</li>`
      )}
    </ul>`;

    const isRemoveButtonShown = this.clearable || this.multiple;

    const removeButton = isRemoveButtonShown
      ? html`<mfe-button
          class="remove-all"
          size="small"
          variant="tertiary"
          kind="neutral"
          icon="close"
          @click=${this._onClickRemove}
        ></mfe-button>`
      : "";

    const isSearchBarVisible = this.searchBar && this.opened;
    const hasSelectedOptions = this._selectedOptions.length > 0;

    const isDividerShown =
      isSearchBarVisible || (hasSelectedOptions && isRemoveButtonShown);

    const searchbarPlaceholderText = this.searchBarPlaceholder ?? "Search";

    const searchMagIcon = html`<mfe-icon
      class="search-mag-icon"
      name="search"
      style="color: var(--mfe-color-primary-base);font-size: var(--mfe-font-size-s)"
    ></mfe-icon>`;

    const searchSpinner = html`<mfe-spinner
      class="search-spinner"
    ></mfe-spinner>`;

    const actionDivider = isDividerShown
      ? html`<div class="action-divider"></div>`
      : "";

    const search = html`<fieldset
      class=${classMap({
        "select-input": true,
        "has-overflowed-options": this._additionalSelectedOptionCount > 0,
      })}
      tabindex="${this.disabled ? "-1" : 0}"
      .autofocus=${this.autofocus}
      role="button"
      @click=${this.open}
    >
      <legend><span>${this.label}</span></legend>

      ${this._selectedOptions.length > 0 && !this.opened
        ? inputSelectedOptions
        : html`
            <input
              class="search-bar-input"
              placeholder=${this.opened || this.labelFixed
                ? searchbarPlaceholderText
                : this.label || searchbarPlaceholderText}
              @input=${this._handleSearchOptions}
              @keydown=${(e: KeyboardEvent) => {
                if (e.code === "Space") {
                  e.stopPropagation();
                }
              }}
              .value=${this._searchText}
            />
          `}
      ${!this.opened
        ? html`<span class="additional-selection-count"
            >+${this._additionalSelectedOptionCount}</span
          >`
        : ""}

      <div class="actions">
        ${this.opened
          ? this.searchBarLoadingState
            ? searchSpinner
            : searchMagIcon
          : ""}
        ${!this.opened ? removeButton : ""} ${actionDivider}

        <div @click=${this._togglePopover}>
          <mfe-icon class="dropdown-icon open" name="arrow_up"></mfe-icon>
          <mfe-icon class="dropdown-icon closed" name="arrow_down"></mfe-icon>
        </div>
      </div>
    </fieldset>`;

    return this.searchBar
      ? search
      : html`<fieldset
          class=${classMap({
            "select-input": true,
            "has-overflowed-options": this._additionalSelectedOptionCount > 0,
          })}
          tabindex="${ifDefined(this.disabled ? undefined : 0)}"
          ?autofocus=${this.autofocus}
          @click=${this._togglePopover}
          role="button"
        >
          <legend><span>${this.label}</span></legend>
          <span class="placeholder">${this.placeholder}</span>
          <span class="label">${this.label}</span>
          ${inputSelectedOptions}
          <span class="additional-selection-count"
            >+${this._additionalSelectedOptionCount}</span
          >
          <div class="actions">
            ${removeButton} ${actionDivider}
            <mfe-icon class="dropdown-icon open" name="arrow_up"></mfe-icon>
            <mfe-icon class="dropdown-icon closed" name="arrow_down"></mfe-icon>
          </div>
        </fieldset>`;
  }

  selectAllTemplate() {
    if (!this.multiple || !this.viewSelectAll || this.noResultFound) {
      return null;
    }

    const isAllRenderedOptionsSelected = this._connectedOptions
      .filter((option) => !option.hidden)
      .every((option) => option.selected);

    const isAnySelected =
      this._selectedOptions.filter((option) => !option.hidden).length > 0;
    const selectAllText = this.selectAllText ?? "Select All";

    return html`<mfe-checkbox
      class="select-all"
      .checked="${isAllRenderedOptionsSelected}"
      .indeterminate="${isAnySelected && !isAllRenderedOptionsSelected}"
      role="option"
      aria-selected="${isAllRenderedOptionsSelected}"
      @mfe-checkbox-change="${this._handleSelectAll}"
    >
      ${selectAllText}
    </mfe-checkbox>`;
  }

  render(): TemplateResult {
    const invalidMessage = Boolean(this.error)
      ? html`<p id="errorMessage" aria-live="polite" class="invalid-text">
          ${this.validationMessage}
        </p>`
      : "";

    const helpMessage = this.helpText
      ? html`<p class="help-text">${this.helpText}</p>`
      : "";

    const label = this.label
      ? html`<label id="label">${this.label}</label>`
      : "";

    const noDataText = this.searchNotFoundText ?? "No Data Found";

    const clearSearchText = this.popoverClearSearchText ?? "Clear Search";

    return html`<div
      class=${classMap({
        "select-wrapper": true,
        "select-open": this.opened,
        selected: this._selectedOptions.length > 0,
        error: Boolean(this.error),
      })}
      @keydown=${this.handleKeydown}
    >
      ${label} ${this.inputTemplate()}
      <mfe-popover
        class="popover"
        tabindex="${ifDefined(this._isPopoverOpen ? undefined : "-1")}"
        @mfe-select-option=${this._handleSelectOptionEvent}
        @mfe-popover-hide=${this.close}
        role="listbox"
        placement="bottom"
        fit-size
      >
        ${this.selectAllTemplate()}
        <slot></slot>
        ${this.searchBar && this.noResultFound
          ? html`<div
              name="popover-clear-search-text"
              class="popover-no-result"
            >
              <span>${noDataText}</span>
              <mfe-button
                variant="tertiary"
                @click=${() => {
                  this._handleSearchOptions({
                    target: { value: "" },
                  } as InputEvent & {
                    target: HTMLInputElement;
                  });
                }}
                >${clearSearchText}</mfe-button
              >
            </div>`
          : ""}
      </mfe-popover>
      <div class="hint">${invalidMessage} ${helpMessage}</div>
    </div> `;
  }

  private focusedOptionIndex = -1;
  private lastKeyPressedTime = 0;
  private typedCharacters = "";
  private keyPressThreshold = 500;

  private handleFocusOptionByKey(key: string) {
    const currentTime = Date.now();
    const elapsedTimeSinceLastKeyPress = currentTime - this.lastKeyPressedTime;

    if (elapsedTimeSinceLastKeyPress > this.keyPressThreshold) {
      this.typedCharacters = "";
    }

    this.lastKeyPressedTime = currentTime;
    this.typedCharacters += key.toLowerCase();

    const matchingOptionIndex = this.options.findIndex((option) => {
      if (option.disabled) {
        return false;
      }
      const optionText = option.innerText.trim().toLowerCase();

      return optionText.startsWith(this.typedCharacters);
    });

    if (matchingOptionIndex !== -1) {
      this.focusedOptionIndex = matchingOptionIndex;
      this.options[matchingOptionIndex].focus();
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (
      this.focusedOptionIndex === -1 &&
      ["Enter", "Space"].includes(event.code)
    ) {
      this._togglePopover();
      event.preventDefault();
    } else if (
      this._isPopoverOpen === false &&
      ["ArrowDown", "ArrowUp"].includes(event.code)
    ) {
      this.open();
      event.preventDefault();
    } else if (event.code === "Escape") {
      this.close();
      event.preventDefault();
    } else if (
      this._isPopoverOpen &&
      ["ArrowDown", "ArrowUp"].includes(event.code)
    ) {
      const activeOptions = this.options.filter((option) => !option.disabled);

      event.code === "ArrowDown" && this.focusedOptionIndex++;
      event.code === "ArrowUp" && this.focusedOptionIndex--;

      // Don't exceed array indexes
      this.focusedOptionIndex = Math.max(
        0,
        Math.min(this.focusedOptionIndex, activeOptions.length - 1)
      );

      activeOptions[this.focusedOptionIndex].focus();

      event.preventDefault();
    } else if (this._isPopoverOpen && !this.searchBar) {
      this.handleFocusOptionByKey(event.key);
    }
  }

  private _togglePopover() {
    this._isPopoverOpen ? this.close() : this.open();
  }

  private _handleSelectEvent() {
    const options = this._selectedOptions.map(
      (option) =>
        ({
          value: option.value,
          selected: option.selected,
          text: option.textContent,
        } as ISelectOption<string>)
    );

    if (!this.multiple) this._onMfeSelect(options[0]);
    else this._onMfeSelect(options);
  }

  private _handleSearchEvent() {
    this._onMfeSearch(this._searchText);
  }

  private _handleSearchOptions(e: InputEvent): void {
    if (!this.searchBar) return;

    this._searchText = (e.target as HTMLInputElement).value;

    this._handleSearchEvent();

    this._connectedOptions.forEach((option) => {
      const isVisible = option.textContent
        ?.toLowerCase()
        .includes(this._searchText.toLowerCase());
      option.hidden = !isVisible;
    });

    this._selectedOptions = this.options.filter((option) => option.selected);

    this._handleLastVisibleSearchedOption();

    this.requestUpdate();
  }

  private _handleLastVisibleSearchedOption() {
    const lastVisibleOption = [...this.options]
      .reverse()
      .find((option) => !option.hidden);

    if (lastVisibleOption) {
      lastVisibleOption?.shadowRoot
        ?.querySelector("div")
        ?.classList.add("no-border-bottom");
    }

    this.options.map((option) => {
      if (!option.hidden && option !== lastVisibleOption) {
        option.shadowRoot
          ?.querySelector("div")
          ?.classList.remove("no-border-bottom");
      }
    });
  }

  private _handleSingleSelect(optionItem: MfeSelectOption) {
    this.value = optionItem.value;

    this._searchText = "";
    this._handleSelectEvent();
    this.close();
  }

  private _handleMultipleSelect() {
    this.value = this._connectedOptions
      .filter((option) => option.selected)
      .map((option) => option.value);

    this._handleSelectEvent();
  }

  private _handleSelectOptionEvent(e: CustomEvent) {
    const optionItem = e.target as MfeSelectOption;

    if (this.multiple) {
      this._handleMultipleSelect();
    } else {
      this._handleSingleSelect(optionItem);
    }
  }

  private _handleSelectAll(e: CustomEvent) {
    const selectAllEl = this.shadowRoot?.querySelector(
      ".select-all"
    ) as MfeCheckbox;

    const checked = e.detail;
    const unselectedOptions = this._connectedOptions.filter(
      (option) => !option.selected && !option.hidden
    );
    const isAllUnselectedDisabled = unselectedOptions.every(
      (option) => option.disabled
    );

    // If all available options are selected, instead of checking, uncheck all options
    if (checked && isAllUnselectedDisabled) {
      setTimeout(() => {
        const checkbox = selectAllEl?.shadowRoot?.querySelector("input");

        checkbox?.click();
      }, 0);
      return;
    }

    this._connectedOptions.forEach((option) => {
      if (option.disabled || option.hidden) {
        return;
      }

      option.selected = checked;
    });

    this._handleMultipleSelect();
  }

  private _onClickRemove(e: MouseEvent) {
    e.stopPropagation();

    this._searchText = "";

    this._connectedOptions.forEach((option) => {
      option.selected = false;
    });

    this.value = null;
    this._handleSelectEvent();
  }

  private _checkAdditionalItemCount() {
    if (
      !this.multiple ||
      !this.selectedOptionsItems ||
      this.selectedOptionsItems.length < 2
    ) {
      this._additionalSelectedOptionCount = 0;
      return;
    }

    const firstNonVisibleItemIndex = [...this.selectedOptionsItems].findIndex(
      (item) => item.offsetLeft > this.selectedOptionsContainer.offsetWidth
    );

    if (firstNonVisibleItemIndex > -1) {
      this._additionalSelectedOptionCount =
        this.selectedOptionsItems.length - firstNonVisibleItemIndex;
    } else {
      this._additionalSelectedOptionCount = 0;
    }
  }

  protected firstUpdated(): void {
    if (this.value === undefined) {
      if (this.multiple) {
        this.value = [];
      } else {
        this.value = null;
      }
    }

    this._initialValue = this._value;

    // `_selectInput` will be undefined during the initial render.
    // To ensure proper rendering, we set `_popover.target` after the template has been created.
    this._popover.target = this._selectInput;
  }

  protected updated(_changedProperties: PropertyValues) {
    if (
      _changedProperties.has("multiple") &&
      typeof _changedProperties.get("multiple") === "boolean"
    ) {
      this.value = null;
    }

    if (_changedProperties.has("_selectedOptions")) {
      this._checkAdditionalItemCount();
    }
  }

  /**
   * This method is used by `mfe-select-option` component to register itself to mfe-select.
   * @param option BlSelectOption reference to be registered
   */
  registerOption(option: MfeSelectOption) {
    this._connectedOptions.push(option);

    if (option.selected) {
      if (this.multiple) {
        if (!Array.isArray(this.value)) {
          this.value = [];
        }
        this.value = [...this.value, option.value];
      } else {
        this.value = option.value;
      }
    }

    this.setOptionsSelected();
    this.requestUpdate();
  }

  /**
   * This method is used by `mfe-select-option` component to unregister itself from mfe-select.
   * @param option BlSelectOption reference to be unregistered
   */
  unregisterOption(option: MfeSelectOption) {
    this._connectedOptions.splice(this._connectedOptions.indexOf(option), 1);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [mfeSelectTag]: MfeSelect;
  }
}
