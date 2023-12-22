import { inject, injectable } from 'inversify';
import { classToPlain, plainToClass } from 'class-transformer';

import express, { Router, Request, Response } from 'express';
import {
  IScheduleController,
  IScheduleControllerToken,
} from './controller/IScheduleController';
import { ScheduleOverlapRequest } from './model/ScheduleOverlapRequest';

@injectable()
export class ScheduleRouter {
  constructor(
    @inject(IScheduleControllerToken)
    private scheudlController: IScheduleController
  ) {}

  register(): Router {
    const router = express.Router();

    router.get('/findOverlap', async (req: Request, res: Response) => {
      const findOverlapScheduleRequest = plainToClass(
        ScheduleOverlapRequest,
        req.body
      );

      const response = await this.scheudlController.findOverlapSchedule(
        findOverlapScheduleRequest
      );

      res.json(classToPlain(response));
    });

    return router;
  }
}
