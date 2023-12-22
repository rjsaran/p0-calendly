import { IDGenerator } from '../../../utils/IDGenerator';
import { CreateUserRequest } from './CreateUserRequest';

export class User {
  id: string;

  name: string;

  email: string;

  static fromCreateRequest(userRequest: CreateUserRequest): User {
    const user = new User();
    user.id = IDGenerator.new('usr');
    user.name = userRequest.name;
    user.email = userRequest.email;

    return user;
  }
}
