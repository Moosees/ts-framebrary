export interface ModelAttributes<T> {
  set(value: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
}

export interface Sync<T> {
  fetch(id: number): SyncPromise<T>;
  save(data: T): SyncPromise<T>;
}

export interface SyncResponse<T> {
  data: T;
}

export interface SyncPromise<T> extends Promise<SyncResponse<T>> {}

export interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export interface CanHaveId {
  id?: number | undefined;
}

export class Model<T extends CanHaveId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') throw new Error('ID attribute does not exist');

    this.sync.fetch(id).then((res: SyncResponse<T>): void => {
      this.set(res.data);
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll());
  }
}
