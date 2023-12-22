import { CreateUserRequest } from '../model/CreateUserRequest';
import { User } from '../model/User';

export const IUserServiceToken = Symbol('IUserService');

export interface IUserService {
  getUser(userId: string): Promise<User | null>;

  createUser(user: CreateUserRequest): Promise<User>;
}
