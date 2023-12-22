import { inject, injectable } from 'inversify';

import { NotFoundException } from '../../../http/exception/NotFoundException';
import { CreateUserRequest } from '../model/CreateUserRequest';
import { User } from '../model/User';
import { IUserService, IUserServiceToken } from '../service/IUserService';
import { IUserController } from './IUserController';

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject(IUserServiceToken)
    private userService: IUserService
  ) {}

  async getUser(userId: string): Promise<User> {
    const user = await this.userService.getUser(userId);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async getAllUsers(): Promise<Array<User>> {
    const users = await this.userService.getAllUsers();

    return users;
  }

  async createUser(user: CreateUserRequest): Promise<User> {
    const newUser = await this.userService.createUser(user);

    return newUser;
  }
}
