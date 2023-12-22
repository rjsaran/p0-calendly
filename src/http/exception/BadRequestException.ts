import { AppException } from './AppException';

export class BadRequestException extends AppException {
  constructor(message?: string) {
    super(400, message || 'Bad Request');
  }
}
