import { Availability } from '../model/Availability';
import { CreateAvailabilityRequest } from '../model/CreateAvailabilityRequest';
import { UpdateAvailabilityRequest } from '../model/UpdateAvailabilityRequest';

export const IAvailabilityControllerToken = Symbol('IAvailabilityController');

export interface IAvailabilityController {
  getAvailability(availabilityId: string): Promise<Availability>;

  createAvailability(
    availability: CreateAvailabilityRequest
  ): Promise<Availability>;

  updateAvailability(
    availabilityId: string,
    availability: UpdateAvailabilityRequest
  ): Promise<Availability>;
}
