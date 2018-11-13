import {
  IStorageMiddleware,
  LocalStorageMiddlewareConfig,
  IStorage
} from 'store.js';
import _ from 'lodash';

export class LocalStorageMiddleware implements IStorageMiddleware {
  private name: string = 'storage';
  private blacklist: Array<string>;

  constructor(config: LocalStorageMiddlewareConfig) {
    this.name = config.name;
    this.blacklist = config.blacklist;
  }

  onSave(storage: IStorage): void {
    let data = JSON.stringify(storage.getAll());
    localStorage.setItem(this.name, data);
  }

  onLoad(storage: IStorage): void {
    const records = JSON.parse(localStorage.getItem(this.name));
    _.forOwn(records, record => {
      if (this.blacklist.includes(record.key)) {
        return;
      }
      storage.set(record.key, record.value);
    });
  }

  onRemove(storage: IStorage): void {
    this.onSave(storage);
  }

  onClear(): void {
    localStorage.clear();
  }
}
