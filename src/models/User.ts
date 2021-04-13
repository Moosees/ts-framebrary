import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const API_ADDRESS = 'http://localhost:3000';

export class User {
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    this.data = { ...this.data, ...update };
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
