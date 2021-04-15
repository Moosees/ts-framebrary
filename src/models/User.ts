import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public attributes: Attributes<UserProps>;
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>('/users');

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }
}
