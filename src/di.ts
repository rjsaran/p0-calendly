import { Container } from 'inversify';

import 'reflect-metadata';
import { ErrorHandler } from './http/exception/ErrorHandler';
import { V1Router } from './http/server/ExpressV1Router';

import { ExpressServer } from './http/server/ExpressServer';
import { AvailabilityRouter } from './module/availability/AvailabilityRouter';
import { AvailabilityController } from './module/availability/controller/AvailabilityController';
import {
  IAvailabilityController,
  IAvailabilityControllerToken,
} from './module/availability/controller/IAvailabilityController';
import { AvailabilityRepository } from './module/availability/repository/AvailabilityRepository';
import {
  IAvailabilityRepository,
  IAvailabilityRepositoryToken,
} from './module/availability/repository/IAvailabilityRepository';
import { AvailabilityService } from './module/availability/service/AvailabilityService';
import {
  IAvailabilityService,
  IAvailabilityServiceToken,
} from './module/availability/service/IAvailabilityService';
import {
  IScheduleController,
  IScheduleControllerToken,
} from './module/schedule/controller/IScheduleController';
import { ScheduleController } from './module/schedule/controller/ScheduleController';
import { ScheduleRouter } from './module/schedule/ScheduleRouter';
import {
  IScheduleService,
  IScheduleServiceToken,
} from './module/schedule/service/IScheduleService';
import { ScheduleService } from './module/schedule/service/ScheduleService';
import {
  IUserController,
  IUserControllerToken,
} from './module/user/controller/IUserController';
import { UserController } from './module/user/controller/UserController';
import {
  IUserRepository,
  IUserRepositoryToken,
} from './module/user/repository/IUserRepository';
import { UserRepository } from './module/user/repository/UserRepository';
import {
  IUserService,
  IUserServiceToken,
} from './module/user/service/IUserService';
import { UserService } from './module/user/service/UserService';
import { UserRouter } from './module/user/UserRouter';
import { IServer, IServerToken } from './http/server/IServer';

const container = new Container();

container.bind<IServer>(IServerToken).to(ExpressServer).inSingletonScope();

container.bind(V1Router).to(V1Router).inSingletonScope();
container.bind(ErrorHandler).to(ErrorHandler).inSingletonScope();

container.bind(UserRouter).to(UserRouter).inSingletonScope();
container.bind(AvailabilityRouter).to(AvailabilityRouter).inSingletonScope();
container.bind(ScheduleRouter).to(ScheduleRouter).inSingletonScope();

container.bind<IUserController>(IUserControllerToken).to(UserController);
container.bind<IUserService>(IUserServiceToken).to(UserService);
container
  .bind<IUserRepository>(IUserRepositoryToken)
  .to(UserRepository)
  .inSingletonScope();

container
  .bind<IAvailabilityController>(IAvailabilityControllerToken)
  .to(AvailabilityController);
container
  .bind<IAvailabilityService>(IAvailabilityServiceToken)
  .to(AvailabilityService);
container
  .bind<IAvailabilityRepository>(IAvailabilityRepositoryToken)
  .to(AvailabilityRepository)
  .inSingletonScope();

container
  .bind<IScheduleController>(IScheduleControllerToken)
  .to(ScheduleController);
container.bind<IScheduleService>(IScheduleServiceToken).to(ScheduleService);

export { container };
