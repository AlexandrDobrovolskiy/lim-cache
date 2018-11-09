import test from 'ava';
import { Storage } from './storage';

const data = {
  string: "some data grater then 10B",
  anotherString: "hi there",
  array: ['foo', 'bar', 'baz'],
  number: 10,
  obj: {
    hello: "world",
    hi: () => "there"
  }
}

const manyBytes = 1000000;
const fewBytes = 10;

test('Get and Set', async t => {
  const storage = new Storage({limit: manyBytes});

  storage.set('string', data.string);
  storage.set('number', data.number);
  storage.set('obj', data.obj);

  t.deepEqual(storage.get('number'), data.number);
  t.deepEqual(storage.get('string'), data.string);
  t.deepEqual(storage.get('obj'), data.obj);
})

test('Get All', async t => {
  const storage = new Storage({limit: manyBytes});
  let keys = ['string', 'anotherString', 'array'];
  let expected = {};

  keys.forEach(key => {
    expected[key] = ({key, value: data[key]});
  })

  storage.set(keys[0], data.string);
  storage.set(keys[1], data.anotherString);
  storage.set(keys[2], data.array);

  t.deepEqual(storage.getAll(), expected);
})

test('Limited storage', async t => {
  const limitedStorage = new Storage({limit: fewBytes});

  limitedStorage.set('string', data.string);

  t.deepEqual(limitedStorage.get('string'), null);
})

test('Remove item', async t => {
  const storage = new Storage({limit: manyBytes});

  storage.set('string', data.string);

  t.deepEqual(storage.remove('string'), data.string);
  t.deepEqual(storage.get('string'), null);
})

test('Clear all', async t => {
  const storage = new Storage({limit: manyBytes});
  let keys = ['string', 'aString', 'array'];

  storage.set(keys[0], data.string);
  storage.set(keys[1], data.anotherString);
  storage.set(keys[2], data.array);

  storage.clear();

  t.deepEqual(storage.getAll(), {});
})