import { Storage } from './lib/storage/storage';
import { LocalStorageMiddleware } from './lib/middleware/localStorage';
import { IStorageMiddleware, IStorageConfig, IMiddlewareConfig } from "store.js";

export const createStorage = (config: IStorageConfig, ...middleware: IStorageMiddleware[]) => {
  return new Storage(config, ...middleware);
}

export const withLocalStorage = (config: IMiddlewareConfig) => {
  return new LocalStorageMiddleware(config);
}