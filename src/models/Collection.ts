import axios, { AxiosResponse } from 'axios';
import { API_ADDRESS } from '..';
import { Eventing } from './Eventing';
import { User, UserProps } from './User';

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(private apiRoute: string) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(`${API_ADDRESS}${this.apiRoute}`).then((res: AxiosResponse) => {
      res.data.forEach((item: UserProps): void => {
        const user = User.buildUser(item);
        this.models.push(user);
      });
      this.trigger('change');
    });
  }
}
