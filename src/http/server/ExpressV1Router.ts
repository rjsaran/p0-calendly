import { injectable } from 'inversify';

import express, { Router } from 'express';
import { UserRouter } from '../../module/user/UserRouter';
import { AvailabilityRouter } from '../../module/availability/AvailabilityRouter';
import { ScheduleRouter } from '../../module/schedule/ScheduleRouter';

@injectable()
export class V1Router {
  constructor(
    private userRouter: UserRouter,
    private availabilityRouter: AvailabilityRouter,
    private scheduleRouter: ScheduleRouter
  ) {}

  register(): Router {
    const router = express.Router();

    router.use('/user', this.userRouter.register());
    router.use('/availability', this.availabilityRouter.register());
    router.use('/schedule', this.scheduleRouter.register());

    return router;
  }
}
