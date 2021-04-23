import { User, UserProps } from '../models/User';
import { UserForm } from './UserForm';
import { UserInfo } from './UserInfo';
import { View } from './View';

export class UserEdit extends View<User, UserProps> {
  createRegionMap() {
    return {
      '.user-info': (region: Element) => new UserInfo(region, this.model),
      '.user-form': (region: Element) => new UserForm(region, this.model),
    };
  }

  createTemplate(): string {
    return `
      <div>
        <div class="user-info"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}
