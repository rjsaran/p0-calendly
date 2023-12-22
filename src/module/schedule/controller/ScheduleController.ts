import { inject, injectable } from 'inversify';
import { DateAvailabilityTime } from '../../availability/model/AvailabilityTime';
import { ScheduleOverlapRequest } from '../model/ScheduleOverlapRequest';
import {
  IScheduleService,
  IScheduleServiceToken,
} from '../service/IScheduleService';
import { IScheduleController } from './IScheduleController';

@injectable()
export class ScheduleController implements IScheduleController {
  constructor(
    @inject(IScheduleServiceToken)
    private scheduleService: IScheduleService
  ) {}

  async findOverlapSchedule(
    request: ScheduleOverlapRequest
  ): Promise<Array<DateAvailabilityTime>> {
    return this.scheduleService.findOverlapSchedule(request);
  }
}
