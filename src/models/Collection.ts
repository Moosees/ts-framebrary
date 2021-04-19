import axios, { AxiosResponse } from 'axios';
import { API_ADDRESS } from '..';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(private apiRoute: string, private deserialize: (item: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(`${API_ADDRESS}${this.apiRoute}`).then((res: AxiosResponse) => {
      res.data.forEach((item: K): void => {
        this.models.push(this.deserialize(item));
      });
      this.trigger('change');
    });
  }
}
