import { IStorageMiddleware, IMiddlewareConfig, IStorage } from "store.js";
import _ from "lodash";

export class LocalStorageMiddleware implements IStorageMiddleware {
  private name: string = "storage";

  constructor(config: IMiddlewareConfig){
    this.name = config.name;
  }

  onSave(storage: IStorage): void {
    localStorage.setItem(this.name, JSON.stringify(storage.getAll()));
  }  

  onLoad(storage: IStorage): void {
    const records = JSON.parse(localStorage.getItem(this.name));
    _.forOwn(records, (key, val) => {
      storage.set(key, val);
    })
  }

  onRemove(storage: IStorage): void {
    this.onSave(storage);
  }

  onClear(): void {
    localStorage.clear();
  }

}