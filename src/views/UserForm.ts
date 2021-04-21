import { User } from '../models/User';

export class UserForm {
  constructor(private parent: Element, private user: User) {}

  onClick(): void {
    console.log('test');
  }

  getEvents(): { [key: string]: () => void } {
    return { 'click:button': this.onClick };
  }

  createTemplate(): string {
    console.log(this.user);
    return `
    <div>
      <div>Hello ${this.user.get('name')}</div>
      <input />
      <button>GO!</button>
    </div>`;
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
    const template = document.createElement('template');
    template.innerHTML = this.createTemplate();
    this.bindEvents(template.content);

    this.parent.append(template.content);
  }
}
