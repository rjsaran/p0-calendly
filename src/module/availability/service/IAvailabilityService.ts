import { Availability } from '../model/Availability';
import { DateAvailabilityTime } from '../model/AvailabilityTime';
import { CreateAvailabilityRequest } from '../model/CreateAvailabilityRequest';
import { UpdateAvailabilityRequest } from '../model/UpdateAvailabilityRequest';

export const IAvailabilityServiceToken = Symbol('IAvailabilityService');

export interface IAvailabilityService {
  getAvailability(availabilityId: string): Promise<Availability | null>;

  getAvailabilityByUser(userId: string): Promise<Availability | null>;

  createAvailability(
    availability: CreateAvailabilityRequest
  ): Promise<Availability>;

  updateAvailability(
    availabilityId: string,
    availability: UpdateAvailabilityRequest
  ): Promise<Availability | null>;

  getAvailabilityForMonthByUser(
    userId: string
  ): Promise<Array<DateAvailabilityTime>>;

  getAvailabilityForWeekByUser(
    userId: string
  ): Promise<Array<DateAvailabilityTime>>;
}
