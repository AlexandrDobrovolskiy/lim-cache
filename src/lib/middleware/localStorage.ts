import { IStorageMiddleware, IMiddlewareConfig } from "store.js";

export class LocalStorageMiddleware implements IStorageMiddleware {
  private name: string = "storage";
  private size: number;
  private limit: number;

  constructor(config: IMiddlewareConfig){
    this.limit = config.limit;
    this.name = config.name;
  }

  onSave(state: object): void {
    console.log(state);
  }  

  onLoad(state: object): void {
    console.log(state, this.name, this.limit, this.size);
  }

  
}