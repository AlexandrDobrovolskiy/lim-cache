import { IStorage, IStorageMiddleware, IStorageConfig } from 'store.js';
import StorageRecord from './StorageRecord';
import sizeof from "sizeof";

export class Storage implements IStorage {
  private middleware: IStorageMiddleware[];
  private head: StorageRecord;
  private tail: StorageRecord;
  private store: object;
  private size: number;
  private limit: number;

  constructor(config: IStorageConfig, ...middleware: IStorageMiddleware[]) {
    this.limit = config.limit;
    this.limit = config.limit;
    this.middleware = middleware;
    this.store = {};
    this.head = null;
    this.tail = null;

    for(let m of this.middleware){
      m.onLoad(this.store);
    }

  }

  public register(middleware: IStorageMiddleware): void {
    this.middleware.push(middleware);
  }

  setHead(node: StorageRecord){
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
  };

  public get(key: string):any{
    return this.store[key].value;
  };

  public set(key: string, value: any): void {
    const node = new StorageRecord(key, value);

    if (this.store[node.key]) {
      this.store[node.key].value = value;
      this.remove(node.key);
    }

    while (this.isFull()) {
      delete this.store[this.tail.key];
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.setHead(node);

    for(let m of this.middleware){
      m.onSave(this.store);
    }
  };

  public remove(key: string){
    const node = this.store[key];
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
  };

  private isFull(){
    return sizeof(this.store) >= this.limit; 
  };
}
