# lim-cache

Limited Persistent Storage Cache

### Installation
`yarn add lim-cache`


### Usage
```
import { createStorage } from "lim-cache";

const config = {
  limit: 10000
}

const storage = createStorage(config);
```
### Storage object
* `set(key: string, value: any): void` Saves value with specific key to cache.
* `get(key: string): any` Get value by key.
* `remove(key: string): void` Removes value with specific key from cache, returns value.
* `clear(): void` Removes all values from cache.

### LocalStorage middleware
Local storage middleware allows you to save your cache into browser localStorage.
```
import { withLocalStorage } from "lim-cache";

const localStorageConfig = {
  name: "myStorage",
  blacklist: ["DoNotPersist"]
}

const storage = createStorage(config, withLocalStorage(localStorageConfig))
```
Configuring: 
* name: with this name data will be saved into localStorage (usefull if you have more then one storage).
* blacklist: list of key that will not be saved to localStorage, but will still be saved to RAM. 