import { Type } from 'class-transformer';

import { IDGenerator } from '../../../utils/IDGenerator';
import { DateAvailabilityTime, WeekAvailabilityTime } from './AvailabilityTime';
import { CreateAvailabilityRequest } from './CreateAvailabilityRequest';
import { UpdateAvailabilityRequest } from './UpdateAvailabilityRequest';

export class Availability {
  id: string;

  name: string;

  userId: string;

  @Type(() => WeekAvailabilityTime)
  week: Array<WeekAvailabilityTime>;

  @Type(() => DateAvailabilityTime)
  date: Array<DateAvailabilityTime>;

  static fromCreateRequest(
    createAvailabilityRequest: CreateAvailabilityRequest
  ): Availability {
    const availability = new Availability();

    availability.id = IDGenerator.new('avl');
    availability.name = createAvailabilityRequest.name;
    availability.userId = createAvailabilityRequest.userId;
    availability.week = createAvailabilityRequest.week;
    availability.date = createAvailabilityRequest.date;

    return availability;
  }

  static fromUpdateRequest(
    id: string,
    updateAvailabilityRequest: UpdateAvailabilityRequest
  ): Availability {
    const availability = new Availability();

    availability.id = id;
    availability.name = updateAvailabilityRequest.name;
    availability.week = updateAvailabilityRequest.week;
    availability.date = updateAvailabilityRequest.date;

    return availability;
  }
}
