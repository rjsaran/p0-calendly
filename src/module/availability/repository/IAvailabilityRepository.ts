import { Availability } from '../model/Availability';

export const IAvailabilityRepositoryToken = Symbol('IAvailabilityRepository');

export interface IAvailabilityRepository {
  getAvailabilityById(id: string): Promise<Availability | null>;

  getAvailabilityByUser(userId: string): Promise<Availability | null>;

  createAvailability(availability: Availability): Promise<Availability>;

  updateAvailability(
    id: string,
    availability: Availability
  ): Promise<Availability | null>;
}
