export default class StorageRecord {
  key: string;
  value: any;
  prev: StorageRecord;
  next: StorageRecord;
  
  constructor(key: string, value: any){
    this.key = key;
    this.value = value;
  }
}