import { AppException } from './AppException';

export class InternalServerException extends AppException {
  constructor() {
    super(500, 'Internal Server Exception');
  }
}
