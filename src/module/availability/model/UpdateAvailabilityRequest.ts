import { Type } from 'class-transformer';
import { DateAvailabilityTime, WeekAvailabilityTime } from './AvailabilityTime';

export class UpdateAvailabilityRequest {
  name: string;

  @Type(() => DateAvailabilityTime)
  date: Array<DateAvailabilityTime>;

  @Type(() => WeekAvailabilityTime)
  week: Array<WeekAvailabilityTime>;
}
