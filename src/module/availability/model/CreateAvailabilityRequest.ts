import { Type } from 'class-transformer';
import { DateAvailabilityTime, WeekAvailabilityTime } from './AvailabilityTime';

export class CreateAvailabilityRequest {
  userId: string;

  name: string;

  @Type(() => DateAvailabilityTime)
  date: Array<DateAvailabilityTime>;

  @Type(() => WeekAvailabilityTime)
  week: Array<WeekAvailabilityTime>;
}
