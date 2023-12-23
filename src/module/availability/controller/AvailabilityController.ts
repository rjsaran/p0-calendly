import { inject, injectable } from 'inversify';

import { NotFoundException } from '../../../http/exception/NotFoundException';
import { Availability } from '../model/Availability';
import { CreateAvailabilityRequest } from '../model/CreateAvailabilityRequest';
import { UpdateAvailabilityRequest } from '../model/UpdateAvailabilityRequest';
import {
  IAvailabilityService,
  IAvailabilityServiceToken,
} from '../service/IAvailabilityService';
import { IAvailabilityController } from './IAvailabilityController';

@injectable()
export class AvailabilityController implements IAvailabilityController {
  constructor(
    @inject(IAvailabilityServiceToken)
    private availabilityService: IAvailabilityService
  ) {}

  async getAvailability(availabilityId: string): Promise<Availability> {
    const availability = await this.availabilityService.getAvailability(
      availabilityId
    );

    if (!availability) throw new NotFoundException('Availability not found');

    return availability;
  }

  async getAvailabilityByUser(userId: string): Promise<Availability> {
    const availability = await this.availabilityService.getAvailabilityByUser(
      userId
    );

    if (!availability) throw new NotFoundException('Availability not found');

    return availability;
  }

  async createAvailability(
    createAvailabilityRequest: CreateAvailabilityRequest
  ): Promise<Availability> {
    const newAvailability = await this.availabilityService.createAvailability(
      createAvailabilityRequest
    );

    return newAvailability;
  }

  async updateAvailability(
    id: string,
    updateAvailabilityRequest: UpdateAvailabilityRequest
  ): Promise<Availability> {
    const updatedAvailability =
      await this.availabilityService.updateAvailability(
        id,
        updateAvailabilityRequest
      );

    if (!updatedAvailability)
      throw new NotFoundException('Availability not found');

    return updatedAvailability;
  }
}
