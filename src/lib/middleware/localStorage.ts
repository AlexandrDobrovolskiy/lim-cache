import { IStorageMiddleware, LocalStorageMiddlewareConfig, IStorage } from "store.js";
import _ from "lodash";

export class LocalStorageMiddleware implements IStorageMiddleware {
  private name: string = "storage";
  private blacklist: Array<string>;

  constructor(config: LocalStorageMiddlewareConfig){
    this.name = config.name;
    this.blacklist = config.blacklist;
  }

  onSave(storage: IStorage): void {
    localStorage.setItem(this.name, JSON.stringify(storage.getAll()));
  }  

  onLoad(storage: IStorage): void {
    const records = JSON.parse(localStorage.getItem(this.name));

    _.forOwn(records, ({key}, val) => {
      if(!this.blacklist.includes(key)){
        storage.set(key, val);
      }
    })
  }

  onRemove(storage: IStorage): void {
    this.onSave(storage);
  }

  onClear(): void {
    localStorage.clear();
  }
}