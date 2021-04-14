import { User } from './models/User';

const user = new User({ name: 'Test' });
console.log(user.attributes.get('name'));
console.log(user.attributes.get('age'));
