import { css } from "lit";

export const MfeCalendarStyle = css`
  .calendar {
    display: flex;
    flex-direction: column;
  }

  .calendar-content {
    display: flex;
    padding: var(--mfe-size-m);
    flex-direction: column;
    align-items: center;
    gap: var(--mfe-size-m);
    border-radius: var(--mfe-border-radius-s);
    width: fit-content;
    background: var(--mfe-color-neutral-full);
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding-bottom: var(--mfe-size-s);
  }

  .arrow {
    flex: 1;
  }

  .header-text {
    flex: 3;
  }

  .header-text-hover {
    background: var(--mfe-color-neutral-lightest);
    border-radius: var(--mfe-border-radius-s);
  }

  .days-wrapper {
    display: flex;
    flex-direction: column;
  }

  .day-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .week-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-bottom: var(--mfe-size-2xs);
  }

  .day {
    display: flex;
    align-items: center;
    width: 40px;

    --mfe-button-focus-border-color: #000;
    --mfe-font-title-4-medium: var(--mfe-font-weight-regular)
      var(--mfe-font-size-m);
    --mfe-size-xl: 40px;
    --mfe-border-radius-m: 50%;
    --mfe-border-radius-l: 50%;

    &.today-day {
      --mfe-color-neutral-darker: var(--mfe-color-primary-base);
      --mfe-color-neutral-darkest: var(--mfe-color-primary-base);
    }

    &.other-month-day {
      --mfe-color-neutral-darker: var(--mfe-color-neutral-dark);

      &.selected-day {
        --mfe-color-neutral-darker: var(--mfe-color-neutral-full);
      }
    }

    &.selected-day {
      background: var(--mfe-color-primary-base);
      border-radius: 50%;

      --mfe-button-focus-border-color: var(--mfe-color-primary-base);
      --mfe-color-neutral-darker: var(--mfe-color-neutral-full);
    }
  }

  .range-day {
    background: var(--mfe-color-primary-contrast);

    --mfe-color-neutral-lightest: var(--mfe-color-primary-contrast);
  }

  .range-end-day,
  .range-start-day,
  .selected-day {
    --mfe-color-neutral-lightest: var(--mfe-color-primary-base);
    --mfe-color-neutral-darker: var(--mfe-color-neutral-full);
    --mfe-color-neutral-darkest: var(--mfe-color-neutral-full) !important;
  }

  .range-start-day {
    background: var(--mfe-color-primary-contrast);
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  .range-end-day {
    background: var(--mfe-color-primary-contrast);
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  .weekday-text {
    color: var(--mfe-color-neutral-dark);
    text-align: center;
    padding: var(--mfe-size-2xs) 0;
    width: 40px;
  }

  .grid-content {
    display: grid;
    grid-template-columns: auto auto auto;
    text-align: center;
  }

  .grid-item {
    width: 93.33px;

    --mfe-size-3xs: 15px;
  }

  .grid-item:not(:nth-last-child(-n + 3)) {
    padding-bottom: var(--mfe-size-2xs);
  }

  .calendar-text {
    font: var(--mfe-font-title-3-regular);
  }
`;
