import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

export const API_ADDRESS = 'http://localhost:3000';

const userCollection = new Collection<User, UserProps>(
  '/users',
  (userProps: UserProps) => User.buildUser(userProps)
);
userCollection.on('change', () => {
  console.log(userCollection);
});
userCollection.fetch();
