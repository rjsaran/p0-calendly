import { inject, injectable } from 'inversify';
import { IntervalOverlapFinder } from '../../../utils/intervalOverlapFinder.util';

import { DateAvailabilityTime } from '../../availability/model/AvailabilityTime';

import {
  IAvailabilityService,
  IAvailabilityServiceToken,
} from '../../availability/service/IAvailabilityService';
import { ScheduleOverlapRequest } from '../model/ScheduleOverlapRequest';
import { IScheduleService } from './IScheduleService';

@injectable()
export class ScheduleService implements IScheduleService {
  constructor(
    @inject(IAvailabilityServiceToken)
    private availabilityService: IAvailabilityService
  ) {}

  private findOverlapForEachDate(
    dateAvailabilityListA: Array<DateAvailabilityTime>,
    dateAvailabilityListB: Array<DateAvailabilityTime>
  ): Array<DateAvailabilityTime> {
    const dateAvailabilityMapA: Record<string, DateAvailabilityTime> = {};
    const dateAvailabilityMapB: Record<string, DateAvailabilityTime> = {};
    const overlapAvailabilityList: Array<DateAvailabilityTime> = [];

    dateAvailabilityListA.forEach((dateAvailabilityA) => {
      dateAvailabilityMapA[dateAvailabilityA.date] = dateAvailabilityA;
    });

    dateAvailabilityListB.forEach((dateAvailabilityB) => {
      dateAvailabilityMapB[dateAvailabilityB.date] = dateAvailabilityB;
    });

    dateAvailabilityListA.forEach((dateAvailabilityA) => {
      const { date } = dateAvailabilityA;

      const overlapIntervals = IntervalOverlapFinder.findOverlap(
        dateAvailabilityMapA[date].intervals,
        dateAvailabilityMapB[date].intervals
      );

      const overlapAvailability = new DateAvailabilityTime();
      overlapAvailability.date = date;
      overlapAvailability.intervals = overlapIntervals;

      overlapAvailabilityList.push(overlapAvailability);
    });

    return overlapAvailabilityList;
  }

  /**
   * Find Overlap Intervals for each day
   *
   * @param request
   * @returns
   */
  async findOverlapSchedule(
    request: ScheduleOverlapRequest
  ): Promise<Array<DateAvailabilityTime>> {
    // Even though our API supports multiple users, we are right now considering only 2 users
    const [userA, userB] = request.userIds;

    if (request.type === 'monthly') {
      const userAvailabilityByMonthForA =
        await this.availabilityService.getAvailabilityForMonthByUser(userA);

      const userAvailabilityByMonthForB =
        await this.availabilityService.getAvailabilityForMonthByUser(userB);

      return this.findOverlapForEachDate(
        userAvailabilityByMonthForA,
        userAvailabilityByMonthForB
      );
    }

    // Fallback to weekly data if not type is passed
    const userAvailabilityByWeekForA =
      await this.availabilityService.getAvailabilityForWeekByUser(userA);

    const userAvailabilityByWeekForB =
      await this.availabilityService.getAvailabilityForWeekByUser(userB);

    return this.findOverlapForEachDate(
      userAvailabilityByWeekForA,
      userAvailabilityByWeekForB
    );
  }
}
