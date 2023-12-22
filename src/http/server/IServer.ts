export const IServerToken = Symbol('IServer');

export interface IServer {
  start(): Promise<void>;
}
