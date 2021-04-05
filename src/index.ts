import { User } from './models/User';

const user = new User({ age: 123 });

user.set({ name: 'Resu' });

console.log(user.get('name'), user.get('age'));
