import axios, { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;

const API_ADDRESS = 'http://localhost:3000';

export class User {
  private events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    this.data = { ...this.data, ...update };
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || !handlers.length) return;

    handlers.forEach((callback) => callback());
  }

  fetch(): void {
    axios
      .get(`${API_ADDRESS}/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        this.set(res.data);
      });
  }

  save(): void {
    const id = this.get('id');

    if (id) {
      axios.put(`${API_ADDRESS}/users/${id}`, this.data);
      return;
    }

    axios.post(`${API_ADDRESS}/users`, this.data);
  }
}
