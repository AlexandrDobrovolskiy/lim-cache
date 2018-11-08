import test from 'ava';
import { Storage } from './storage';

const storageTest = {
  string: "some string",
  number: 10,
  obj: {
    hello: "world",
    hi: () => "there"
  }
}

test('Get and Set', async t => {
  const storage = new Storage({limit: 10000});
  storage.set('string', 'some string');
  t.deepEqual(storage.get('string'), storageTest.string);
  storage.set('number', storageTest.number);
  t.deepEqual(storage.get('number'), storageTest.number);
  storage.set('obj', storageTest.obj);
  t.deepEqual(storage.get('obj'), storageTest.obj);
})

test('Limited storage', async t => {
  const limitedStorage = new Storage({limit: 10});
  limitedStorage.set('string', 'data grater then 10B...');
  t.deepEqual(limitedStorage.get('string'), null);
})

// Todo write more tests for limit