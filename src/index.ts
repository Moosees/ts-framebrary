import { User } from './models/User';

const user = new User({ age: 123 });

user.on('change', () => {
  console.log('change');
});
user.on('change', () => {
  console.log('change more');
});
user.on('sleep', () => {
  console.log('sleep');
});

user.trigger('change');
user.trigger('sleep');
user.trigger('nope');
