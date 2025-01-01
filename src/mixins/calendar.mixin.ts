import { LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { CALENDAR_TYPES } from "../components/calendar/mfe-calendar.constant";
import { DayValues } from "../components/calendar/mfe-calendar.type";
import { stringToDateArrayConverter } from "../utils/string-to-date.util";

export default class DatepickerCalendarMixin extends LitElement {
  /**
   * Defines the calendar types, available types are single, multiple and range
   */
  @property()
  type!: CALENDAR_TYPES;
  /**
   * Defines the start day of the calendar (1 defines monday)
   */
  @property({ type: Number, attribute: "start-of-week", reflect: true })
  startOfWeek: DayValues = 0;

  @state()
  _selectedDates: Date[] = [];

  @property()
  locale: string = document.documentElement.lang || "en-EN";

  /**
   * Defines the unselectable dates for calendar
   */
  _disabledDates: Date[] = [];

  @property({ attribute: "disabled-dates", reflect: true })
  get disabledDates(): Date[] {
    return this._disabledDates;
  }

  set disabledDates(disabledDates: Date[] | string) {
    if (typeof disabledDates === "string") {
      this._disabledDates = stringToDateArrayConverter(disabledDates);
    } else if (Array.isArray(disabledDates)) {
      disabledDates.forEach((disabledDate) => {
        if (!isNaN(disabledDate.getTime()))
          this._disabledDates.push(disabledDate);
      });
    }
  }

  /**
   * Defines the maximum date value for the calendar
   */
  _maxDate!: Date;

  @property({ type: Date, attribute: "max-date", reflect: true })
  get maxDate() {
    return this._maxDate;
  }

  set maxDate(maxDate: Date) {
    if (this._minDate && this._minDate >= maxDate) {
      console.warn("maxDate cannot be smaller than minDate.");
    } else {
      this._maxDate = maxDate;
    }
  }

  /**
   * Defines the minimum date value for the calendar
   */
  _minDate!: Date;

  @property({ type: Date, attribute: "min-date", reflect: true })
  get minDate() {
    return this._minDate;
  }

  set minDate(minDate: Date) {
    if (this._maxDate && this._maxDate <= minDate) {
      console.warn("minDate cannot be greater than maxDate.");
    } else {
      this._minDate = minDate;
    }
  }

  /**
   * Target elements state
   */

  @state() _value!: Date | Date[] | string;

  @property()
  get value(): string | Date | Date[] {
    return this._value;
  }

  set value(value: string | Date | Date[]) {
    if (value) {
      let tempVal: Date[] = [];

      if (typeof value === "string") {
        tempVal = stringToDateArrayConverter(value);
      } else if (value instanceof Date) {
        tempVal.push(value);
      } else if (Array.isArray(value)) {
        tempVal = value;
      }
      if (tempVal.length > 0) {
        if (this.type === CALENDAR_TYPES.SINGLE && tempVal.length > 1) {
          console.warn(
            "'value' must be a single Date for single type selection."
          );
        } else if (
          this.type === CALENDAR_TYPES.RANGE &&
          Array.isArray(tempVal) &&
          tempVal.length != 2
        ) {
          console.warn(
            "'value' must be an array of two Date objects when the type selection mode is set to range."
          );
        } else {
          this._value = value;
          this._selectedDates = [...tempVal];
        }
      }
    }
  }
}
