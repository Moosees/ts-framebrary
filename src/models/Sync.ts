import axios, { AxiosPromise } from 'axios';

const API_ADDRESS = 'http://localhost:3000';

export interface CanHaveId {
  id?: number | undefined;
}

export class Sync<T extends CanHaveId> {
  constructor(private apiRoute: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${API_ADDRESS}${this.apiRoute}/${id}`);
  }

  save(data: T): AxiosPromise {
    if (data.id)
      return axios.put(`${API_ADDRESS}${this.apiRoute}/${data.id}`, data);

    return axios.post(`${API_ADDRESS}${this.apiRoute}`, data);
  }
}
