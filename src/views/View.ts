import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  constructor(protected parent: Element, protected model: T) {
    this.bindModel();
  }

  abstract getEvents(): { [key: string]: () => void };
  abstract createTemplate(): string;

  bindModel(): void {
    this.model.on('change', () => this.render());
  }

  bindEvents(fragment: DocumentFragment): void {
    const events = this.getEvents();

    for (let key in events) {
      const [eventName, selector] = key.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, events[key]);
      });
    }
  }

  render(): void {
    this.parent.innerHTML = '';

    const template = document.createElement('template');
    template.innerHTML = this.createTemplate();

    this.bindEvents(template.content);

    this.parent.append(template.content);
  }
}
