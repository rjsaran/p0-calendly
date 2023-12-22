/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'inversify';

import { NextFunction, Request, Response } from 'express';
import { AppException } from './AppException';
import { InternalServerException } from './InternalServerException';

@injectable()
export class ErrorHandler {
  public respond() {
    return (
      err: Error,
      _req: Request,
      res: Response,
      next: NextFunction
    ): void => {
      if (err instanceof AppException) {
        console.log({
          message: err.message,
        });

        res.status(err.code).json(err);
        return;
      }

      next(err);
    };
  }

  public failSafe() {
    return (
      err: Error,
      _req: Request,
      res: Response,
      _next: NextFunction
    ): void => {
      console.error({
        message: err.message,
        stack: err.stack,
      });

      const failSafeError = new InternalServerException();

      res.status(failSafeError.code).json(failSafeError);
    };
  }
}
