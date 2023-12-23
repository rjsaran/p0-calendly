import 'express-async-errors';

import { injectable } from 'inversify';
import path from 'path';

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { NotFoundException } from '../exception/NotFoundException';
import { ErrorHandler } from '../exception/ErrorHandler';
import { V1Router } from './ExpressV1Router';
import { IServer } from './IServer';

@injectable()
export class ExpressServer implements IServer {
  constructor(private v1Router: V1Router, private errorHandler: ErrorHandler) {}

  async start(): Promise<void> {
    const router = express.Router();

    router.get('/', async (_req, res) => {
      res.sendFile(path.join(__dirname, '../../../', 'public', 'index.html'));
    });

    router.get('/health', (_req: Request, res: Response) => {
      return res.send('OK');
    });

    const app = express();

    const corsOptions = {
      origin: '*',
      credentials: true,
      optionSuccessStatus: 200,
    };

    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(router);

    app.use('/v1', this.v1Router.register());

    app.use(() => {
      throw new NotFoundException();
    });

    app.use(this.errorHandler.respond());
    app.use(this.errorHandler.failSafe());

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Application started listening on port: ${port}`);
    });
  }
}
