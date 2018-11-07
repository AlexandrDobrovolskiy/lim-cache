import { IStorageMiddleware, IMiddlewareConfig } from "store.js";

export class LocalStorageMiddleware implements IStorageMiddleware {
  private name: string = "storage";

  constructor(config: IMiddlewareConfig){
    this.name = config.name;
  }

  onSave(store: object): void {
    localStorage.setItem(name, JSON.stringify(store));
  }  

  onLoad(store: object): any {
    Object.assign(store, JSON.parse(localStorage.getItem(this.name)));
  }

}