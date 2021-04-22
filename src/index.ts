import { User } from './models/User';
import { UserForm } from './views/UserForm';

export const API_ADDRESS = 'http://localhost:3000';

// const userCollection = User.buildUserCollection();
// userCollection.on('change', () => {
//   console.log(userCollection);
// });
// userCollection.fetch();

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

const userForm = new UserForm(
  rootElement,
  User.buildUser({ name: 'Form Formsson', age: 1234 })
);
userForm.render();
