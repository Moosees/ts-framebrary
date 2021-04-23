import { User } from './models/User';
import { UserEdit } from './views/UserEdit';

export const API_ADDRESS = 'http://localhost:3000';

// const userCollection = User.buildUserCollection();
// userCollection.on('change', () => {
//   console.log(userCollection);
// });
// userCollection.fetch();

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

const userEdit = new UserEdit(
  rootElement,
  User.buildUser({ name: 'Form Formsson', age: 1234 })
);
userEdit.render();
