interface IAppException {
  message: string;
  meta: Record<string, string | number>;
}

export abstract class AppException extends Error implements IAppException {
  public meta: Record<string, string | number>;

  constructor(public code: number, public readonly message: string) {
    super();

    this.meta = {};

    Error.captureStackTrace(this);
  }

  setMeta(meta: Record<string, string | number>): AppException {
    this.meta = meta;

    return this;
  }
}
