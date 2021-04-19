import { Collection } from './models/Collection';

export const API_ADDRESS = 'http://localhost:3000';

const collection = new Collection('/users');
collection.on('change', () => {
  console.log(collection);
});
collection.fetch();
