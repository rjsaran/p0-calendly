import 'reflect-metadata';

import { container } from './di';
import { IServer, IServerToken } from './http/server/IServer';

const start = async (): Promise<void> => {
  const server = container.get<IServer>(IServerToken);

  await server.start();
};

start();
