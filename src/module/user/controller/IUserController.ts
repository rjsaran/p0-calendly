import { CreateUserRequest } from '../model/CreateUserRequest';
import { User } from '../model/User';

export const IUserControllerToken = Symbol('IUserController');

export interface IUserController {
  getUser(userId: string): Promise<User>;

  getAllUsers(): Promise<Array<User>>;

  createUser(user: CreateUserRequest): Promise<User>;
}
