import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserInfo extends View<User, UserProps> {
  createTemplate(): string {
    return `
      <div>
        <h1>User Info</h1>
        <div>Name: ${this.model.get('name')}</div>
        <div>Age: ${this.model.get('age')}</div>
      </div>
    `;
  }
}
