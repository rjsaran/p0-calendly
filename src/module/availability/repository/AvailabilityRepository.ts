import { plainToClass } from 'class-transformer';
import { injectable } from 'inversify';

import { Availability } from '../model/Availability';
import { IAvailabilityRepository } from './IAvailabilityRepository';

@injectable()
export class AvailabilityRepository implements IAvailabilityRepository {
  private userAvailabilityList: Array<Availability> = [];

  async getAvailabilityById(id: string): Promise<Availability | null> {
    const availability = this.userAvailabilityList.find(
      (avail) => avail.id === id
    );

    if (!availability) return null;

    return plainToClass(Availability, availability);
  }

  async getAvailabilityByUser(userId: string): Promise<Availability | null> {
    const availabilityList = this.userAvailabilityList.filter(
      (avail) => avail.userId === userId
    );

    if (!availabilityList || !availabilityList.length) return null;

    // There might be multiple availability settings for a user,
    // always referring to first here
    const userAvailability = availabilityList[0];

    return plainToClass(Availability, userAvailability);
  }

  async createAvailability(
    newAvailability: Availability
  ): Promise<Availability> {
    this.userAvailabilityList.push(newAvailability);

    return newAvailability;
  }

  async updateAvailability(
    id: string,
    newAvailability: Availability
  ): Promise<Availability | null> {
    const index = this.userAvailabilityList.findIndex(
      (avail) => avail.id === id
    );

    if (!index) return null;

    this.userAvailabilityList[index] = newAvailability;

    return newAvailability;
  }
}
