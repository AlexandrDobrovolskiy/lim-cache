declare module 'store.js' {
  export interface IStorage {
    set(key: string, value: any): void;
    get(key: string): any;
    getAll(): object;
  }

  export interface IStorageMiddleware {
    onSave(store: object): void;
    onLoad(state: object): void;
    onRemove(state: object): void;
    onClear(): void;
  }

  class LocalStorageMiddlewareConfig {
    name: string;
    blacklist: Array<string>;
  }  

  export class IStorageConfig {
    limit: number;
  }
}
