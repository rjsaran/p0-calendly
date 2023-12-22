import 'express-async-errors';

import { injectable } from 'inversify';

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { NotFoundException } from '../exception/NotFoundException';
import { ErrorHandler } from '../exception/ErrorHandler';
import { V1Router } from './ExpressV1Router';
import { IServer } from './IServer';

@injectable()
export class ExpressServer implements IServer {
  constructor(private v1Router: V1Router, private errorHandler: ErrorHandler) {}

  async start(): Promise<void> {
    const router = express.Router();

    router.get('/', (_req: Request, res: Response) => {
      return res.json({ message: 'Welcome to Calendly' });
    });

    router.get('/health', (_req: Request, res: Response) => {
      return res.send('OK');
    });

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(router);

    app.use('/v1', this.v1Router.register());

    app.use(() => {
      throw new NotFoundException();
    });

    app.use(this.errorHandler.respond());
    app.use(this.errorHandler.failSafe());

    const port = 3000;

    app.listen(port, () => {
      console.log(`Application started listening on port: ${port}`);
    });
  }
}
