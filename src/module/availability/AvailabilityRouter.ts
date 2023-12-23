import { inject, injectable } from 'inversify';
import { classToPlain, plainToClass } from 'class-transformer';

import express, { Router, Request, Response } from 'express';
import {
  IAvailabilityController,
  IAvailabilityControllerToken,
} from './controller/IAvailabilityController';
import { UpdateAvailabilityRequest } from './model/UpdateAvailabilityRequest';
import { CreateAvailabilityRequest } from './model/CreateAvailabilityRequest';

@injectable()
export class AvailabilityRouter {
  constructor(
    @inject(IAvailabilityControllerToken)
    private availabilityController: IAvailabilityController
  ) {}

  register(): Router {
    const router = express.Router();

    router.get('/:id', async (req: Request, res: Response) => {
      const { id: availabilityId } = req.params;

      const response = await this.availabilityController.getAvailability(
        availabilityId
      );

      res.json(classToPlain(response));
    });

    router.get('/user/:userId', async (req: Request, res: Response) => {
      const { userId } = req.params;

      const response = await this.availabilityController.getAvailabilityByUser(
        userId
      );

      res.json(classToPlain(response));
    });

    router.post('/', async (req: Request, res: Response) => {
      const createAvailabilityRequest = plainToClass(
        CreateAvailabilityRequest,
        req.body
      );

      const response = await this.availabilityController.createAvailability(
        createAvailabilityRequest
      );

      res.json(classToPlain(response));
    });

    router.put('/:id', async (req: Request, res: Response) => {
      const { id: availabilityId } = req.params;

      const updateAvailabilityRequest = plainToClass(
        UpdateAvailabilityRequest,
        req.body
      );

      const response = await this.availabilityController.updateAvailability(
        availabilityId,
        updateAvailabilityRequest
      );

      res.json(classToPlain(response));
    });

    return router;
  }
}
