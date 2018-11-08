import { Storage } from './lib/storage/storage';
import { IStorageMiddleware, IStorageConfig } from "store.js";

export const createStorage = (config: IStorageConfig, ...middleware: IStorageMiddleware[]) => {
  return new Storage(config, ...middleware);
}
