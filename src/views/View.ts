import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  constructor(protected parent: Element, protected model: T) {
    this.bindModel();
  }

  abstract createTemplate(): string;

  createEventMap(): { [key: string]: () => void } {
    return {};
  }

  createRegionMap(): { [key: string]: (region: Element) => any } {
    return {};
  }

  render(): void {
    this.parent.innerHTML = '';

    const template = document.createElement('template');
    template.innerHTML = this.createTemplate();

    this.bindEvents(template.content);
    this.bindRegions(template.content);

    this.parent.append(template.content);
  }

  private bindModel(): void {
    this.model.on('change', () => this.render());
  }

  private bindEvents(fragment: DocumentFragment): void {
    const events = this.createEventMap();

    for (let key in events) {
      const [eventName, selector] = key.split(':');

      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, events[key]);
      });
    }
  }

  private bindRegions(fragment: DocumentFragment): void {
    const regions = this.createRegionMap();

    for (let selector in regions) {
      const createChild = regions[selector];
      fragment.querySelectorAll(selector).forEach((element) => {
        createChild(element).render();
      });
    }
  }
}
