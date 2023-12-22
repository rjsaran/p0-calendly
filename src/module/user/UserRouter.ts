import { inject, injectable } from 'inversify';
import { classToPlain, plainToClass } from 'class-transformer';

import express, { Router, Request, Response } from 'express';
import {
  IUserController,
  IUserControllerToken,
} from './controller/IUserController';
import { CreateUserRequest } from './model/CreateUserRequest';

@injectable()
export class UserRouter {
  constructor(
    @inject(IUserControllerToken)
    private userController: IUserController
  ) {}

  register(): Router {
    const router = express.Router();

    router.get('/', async (_req: Request, res: Response) => {
      const response = await this.userController.getAllUsers();

      res.json({
        paging: {
          count: response.length,
          nextCursor: null,
        }, // For Pagination Support
        data: classToPlain(response),
      });
    });

    router.get('/:id', async (req: Request, res: Response) => {
      const userId = req.params.id;

      const response = await this.userController.getUser(userId);

      res.json(classToPlain(response));
    });

    router.post('/', async (req: Request, res: Response) => {
      // TODO: Add validation using class-validator
      const createUserRequest = plainToClass(CreateUserRequest, req.body);

      const response = await this.userController.createUser(createUserRequest);

      res.json(classToPlain(response));
    });

    return router;
  }
}
