import { User } from '../model/User';

export const IUserRepositoryToken = Symbol('IUserRepository');

export interface IUserRepository {
  getUser(userId: string): Promise<User | null>;

  createUser(user: User): Promise<User>;
}
