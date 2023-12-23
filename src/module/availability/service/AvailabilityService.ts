import { inject, injectable } from 'inversify';
import moment, { Moment } from 'moment';

import { Availability } from '../model/Availability';
import {
  IAvailabilityRepository,
  IAvailabilityRepositoryToken,
} from '../repository/IAvailabilityRepository';
import { IAvailabilityService } from './IAvailabilityService';
import { UpdateAvailabilityRequest } from '../model/UpdateAvailabilityRequest';
import { CreateAvailabilityRequest } from '../model/CreateAvailabilityRequest';
import { DateAvailabilityTime } from '../model/AvailabilityTime';

@injectable()
export class AvailabilityService implements IAvailabilityService {
  constructor(
    @inject(IAvailabilityRepositoryToken)
    private availabilityRepository: IAvailabilityRepository
  ) {}

  async getAvailability(availabilityId: string): Promise<Availability | null> {
    return this.availabilityRepository.getAvailabilityById(availabilityId);
  }

  async getAvailabilityByUser(userId: string): Promise<Availability | null> {
    return this.availabilityRepository.getAvailabilityByUser(userId);
  }

  async createAvailability(
    createAvailabilityRequest: CreateAvailabilityRequest
  ): Promise<Availability> {
    const newAvailability = Availability.fromCreateRequest(
      createAvailabilityRequest
    );

    return this.availabilityRepository.createAvailability(newAvailability);
  }

  async updateAvailability(
    id: string,
    updateAvailabilityRequest: UpdateAvailabilityRequest
  ): Promise<Availability | null> {
    const currentAvailability =
      await this.availabilityRepository.getAvailabilityById(id);

    if (!currentAvailability) return null;

    if (updateAvailabilityRequest.name)
      currentAvailability.name = updateAvailabilityRequest.name;

    currentAvailability.week = updateAvailabilityRequest.week;
    currentAvailability.date = updateAvailabilityRequest.date;

    return this.availabilityRepository.updateAvailability(
      id,
      currentAvailability
    );
  }

  /**
   * Return all available intervals for a user in current week
   *
   * @param userId
   * @returns
   */
  async getAvailabilityForWeekByUser(
    userId: string
  ): Promise<Array<DateAvailabilityTime>> {
    const userAvailability =
      await this.availabilityRepository.getAvailabilityByUser(userId);

    const resultAvailabilityList = new Array<DateAvailabilityTime>(0);

    const startOfWeek = moment().startOf('isoWeek');
    const endOfWeek = moment().endOf('isoWeek');

    let day = startOfWeek;

    while (day <= endOfWeek) {
      resultAvailabilityList.push(
        this.getAvailabilityForADay(day, userAvailability)
      );

      day = day.clone().add(1, 'd');
    }

    return resultAvailabilityList;
  }

  async getAvailabilityForMonthByUser(
    userId: string
  ): Promise<Array<DateAvailabilityTime>> {
    const availability =
      await this.availabilityRepository.getAvailabilityByUser(userId);

    const resultAvailabilityList = new Array<DateAvailabilityTime>(0);

    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    let day = startOfMonth;

    while (day <= endOfMonth) {
      resultAvailabilityList.push(
        this.getAvailabilityForADay(day, availability)
      );

      day = day.clone().add(1, 'd');
    }

    return resultAvailabilityList;
  }

  /**
   * Given a day and availability, Return intervals
   *
   * @param day
   * @param availability
   * @returns
   */
  private getAvailabilityForADay(
    day: Moment,
    availability: Availability | null
  ): DateAvailabilityTime {
    const weekDay = day.isoWeekday();
    const date = day.format('YYYY-MM-DD');

    const resultAvailability = new DateAvailabilityTime();
    resultAvailability.date = date;

    // If availability is null, return with empty intervals
    if (!availability) return resultAvailability;

    const weekAvailability = availability.week.find(
      (weekSpecificSetting) => weekSpecificSetting.weekDay === weekDay
    );

    const dateAvailability = availability.date.find(
      (dateSpecificSetting) => dateSpecificSetting.date === date
    );

    if (weekAvailability && weekAvailability.intervals.length) {
      resultAvailability.intervals = weekAvailability.intervals;
    }

    // If date specific intervals available, override with it
    if (dateAvailability && dateAvailability.intervals.length) {
      resultAvailability.intervals = dateAvailability.intervals;
    }

    return resultAvailability;
  }
}
