import { User } from './models/User';

export const API_ADDRESS = 'http://localhost:3000';

const userCollection = User.buildUserCollection();
userCollection.on('change', () => {
  console.log(userCollection);
});
userCollection.fetch();
