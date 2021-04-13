import axios, { AxiosPromise } from 'axios';
import { UserProps } from './User';

const API_ADDRESS = 'http://localhost:3000';

export class Sync {
  constructor(private apiRoute: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${API_ADDRESS}${this.apiRoute}/${id}`);
  }

  save(data: UserProps): AxiosPromise {
    if (data.id)
      return axios.put(`${API_ADDRESS}${this.apiRoute}/${data.id}`, data);

    return axios.post(`${API_ADDRESS}${this.apiRoute}`, data);
  }
}
