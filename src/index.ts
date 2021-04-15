import { User } from './models/User';

const user = new User({ name: 'Test' });
user.on('change', () => console.log('Something changed'));
user.set({ name: 'Test2' });
