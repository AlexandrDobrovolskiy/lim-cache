import { IStorage, IStorageMiddleware, IStorageConfig } from 'store.js';
import StorageRecord from './StorageRecord';
import _ from 'lodash';

export class Storage implements IStorage {
  private sizeof: any;
  private middleware: IStorageMiddleware[];
  private head: StorageRecord;
  private tail: StorageRecord;
  private store: object;
  private limit: number;

  constructor(config: IStorageConfig, ...middleware: IStorageMiddleware[]) {
    this.sizeof = require('sizeof').sizeof;
    this.middleware = middleware;
    this.limit = config.limit;
    this.store = {};
    this.head = null;
    this.tail = null;

    for (let m of this.middleware) {
      m.onLoad(this);
    }
  }
  public setLimit(limit: number) {
    this.limit = limit;
  }

  public register(middleware: IStorageMiddleware): void {
    this.middleware.push(middleware);
  }

  public getAll(): object {
    return _.mapValues(this.store, (record: StorageRecord) => ({
      key: record.key,
      value: record.value
    }));
  }

  public get(key: string): any {
    if (!this.store[key]) {
      return null;
    }

    return this.store[key].value;
  }

  public set(key: string, value: any): void {
    const node = new StorageRecord(key, value);
    const size = this.sizeof(node);

    if(this.limit < size){
      return;
    } 

    if (this.store[node.key]) {
      this.store[node.key].value = value;
      this.remove(node.key);
    }

    while (this.freeSpace() < size) {
      this.remove(this.tail.key);
    }

    this.setHead(node);

    for (let m of this.middleware) {
      m.onSave(this);
    }
  }

  public remove(key: string): any {
    const node = this.store[key];

    if (!node) {
      return null;
    }

    let value = node.value;

    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    delete this.store[key];

    for (let m of this.middleware) {
      m.onRemove(this);
    }

    return value;
  }

  public clear() {
    this.store = {};
    this.head = null;
    this.tail = null;

    for (let m of this.middleware) {
      m.onClear();
    }
  }

  public freeSpace() {
    return this.limit - this.sizeof(this.store);
  }

  private setHead(node: StorageRecord) {
    node.next = this.head;
    node.prev = null;

    if (this.head !== null) {
      this.head.prev = node;
    }
    this.head = node;

    if (this.tail === null) {
      this.tail = node;
    }

    this.store[node.key] = node;
  }

  public isFull() {
    return this.sizeof(this.store) >= this.limit;
  }
}
