import { User } from '../model/User';

export const IUserRepositoryToken = Symbol('IUserRepository');

export interface IUserRepository {
  getUser(userId: string): Promise<User | null>;

  getAllUsers(): Promise<Array<User>>;

  createUser(user: User): Promise<User>;
}
