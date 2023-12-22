import { plainToClass } from 'class-transformer';
import { injectable } from 'inversify';

import { User } from '../model/User';
import { IUserRepository } from './IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  private userMap: Map<string, User> = new Map<string, User>();

  async getUser(userId: string): Promise<User | null> {
    const user = this.userMap.get(userId);

    if (!user) return null;

    return plainToClass(User, user);
  }

  async getAllUsers(): Promise<Array<User>> {
    const userIds = Array.from(this.userMap.keys());

    return userIds.map((userId) => {
      return plainToClass(User, this.userMap.get(userId));
    });
  }

  async createUser(user: User): Promise<User> {
    this.userMap.set(user.id, user);

    return user;
  }
}
