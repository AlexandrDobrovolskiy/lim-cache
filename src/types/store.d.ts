declare module 'store.js' {
  export interface IStorage {
    set(key: string, value: any): void;
    get(key: string): any;
  }

  export interface IStorageMiddleware {
    onSave(item: any): void;
    onLoad(state: object): void;
  }

  class IMiddlewareConfig {
    name: string;
    limit: number;
  }  

  export class IStorageConfig {
    limit: number;
  }
}
