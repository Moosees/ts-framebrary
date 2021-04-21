import { User } from '../models/User';

export class UserForm {
  constructor(private parent: Element, private user: User) {
    this.user.on('change', () => this.render());
  }

  getEvents(): { [key: string]: () => void } {
    return { 'click:.random-age': this.user.setRandomAge };
  }

  createTemplate(): string {
    return `
    <div>
      <div>Hello ${this.user.get('name')}</div>
      <div>Age: ${this.user.get('age')}</div>
      <input />
      <button>GO!</button>
      <button class="random-age">Randomize age</button>
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
    this.parent.innerHTML = '';

    const template = document.createElement('template');
    template.innerHTML = this.createTemplate();

    this.bindEvents(template.content);

    this.parent.append(template.content);
  }
}
