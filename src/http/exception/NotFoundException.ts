import { AppException } from './AppException';

export class NotFoundException extends AppException {
  constructor(message?: string) {
    super(404, message || 'Not Found');
  }
}
