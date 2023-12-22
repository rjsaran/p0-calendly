import { inject, injectable } from 'inversify';

import { CreateUserRequest } from '../model/CreateUserRequest';
import { User } from '../model/User';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../repository/IUserRepository';
import { IUserService } from './IUserService';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(IUserRepositoryToken)
    private userRepository: IUserRepository
  ) {}

  async getUser(userId: string): Promise<User | null> {
    return this.userRepository.getUser(userId);
  }

  async createUser(userRequest: CreateUserRequest): Promise<User> {
    const newUser = User.fromCreateRequest(userRequest);

    return this.userRepository.createUser(newUser);
  }
}
