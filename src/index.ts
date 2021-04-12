import { User } from './models/User';

const user = new User({ age: 123 });

user.on('change', () => {});
user.on('change', () => {});
user.on('sleep', () => {});

console.log(user);
