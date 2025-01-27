import { CALENDAR_TYPES, CALENDAR_VIEWS } from "./mfe-calendar.constant";

export type DayValues = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarView = CALENDAR_VIEWS;

export type CalendarType = CALENDAR_TYPES;
export type CalendarDay = { value: number; name: string };

export type RangePickerDates = {
  startDate?: Date;
  endDate?: Date;
};

export type Calendar = Map<string, Date[]>;
