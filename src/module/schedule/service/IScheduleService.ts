import { DateAvailabilityTime } from '../../availability/model/AvailabilityTime';
import { ScheduleOverlapRequest } from '../model/ScheduleOverlapRequest';

export const IScheduleServiceToken = Symbol('IScheduleService');

export interface IScheduleService {
  findOverlapSchedule(
    request: ScheduleOverlapRequest
  ): Promise<Array<DateAvailabilityTime>>;
}
