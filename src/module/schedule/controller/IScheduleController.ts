import { DateAvailabilityTime } from '../../availability/model/AvailabilityTime';
import { ScheduleOverlapRequest } from '../model/ScheduleOverlapRequest';

export const IScheduleControllerToken = Symbol('IScheduleController');

export interface IScheduleController {
  findOverlapSchedule(
    request: ScheduleOverlapRequest
  ): Promise<Array<DateAvailabilityTime>>;
}
