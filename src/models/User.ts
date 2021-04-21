import { Attributes } from './Attributes';
import { Collection } from './Collection';
import { Eventing } from './Eventing';
import { Model } from './Model';
import { ServerSync } from './ServerSync';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User extends Model<UserProps> {
  static buildUser(attributes: UserProps): User {
    return new User(
      new Attributes<UserProps>(attributes),
      new ServerSync<UserProps>('/users'),
      new Eventing()
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>('/users', this.buildUser);
  }

  setRandomAge = (): void => {
    this.set({ age: Math.floor(Math.random() * 100) });
  };
}
