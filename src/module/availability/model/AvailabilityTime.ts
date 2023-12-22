/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';

import { TimeInterval } from './TimeInterval';

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export class AvailabilityTime {
  @Type(() => TimeInterval)
  intervals: Array<TimeInterval> = [];
}

export class WeekAvailabilityTime extends AvailabilityTime {
  weekDay: WeekDay;
}

export class DateAvailabilityTime extends AvailabilityTime {
  date: string;
}
