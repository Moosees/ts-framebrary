import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  handleNameClick = (): void => {
    const input: HTMLInputElement | null = this.parent.querySelector(
      '.name-input'
    );
    input && this.model.set({ name: input.value });
  };

  handleAgeClick = (): void => {
    this.model.set({ age: Math.floor(Math.random() * 100) });
  };

  getEvents(): { [key: string]: () => void } {
    return {
      'click:.random-age': this.handleAgeClick,
      'click:.change-name': this.handleNameClick,
    };
  }

  createTemplate(): string {
    return `
    <div>
      <div>Hello ${this.model.get('name')}</div>
      <div>Age: ${this.model.get('age')}</div>
      <input class="name-input" />
      <button class="change-name">Change name</button>
      <button class="random-age">Randomize age</button>
    </div>`;
  }
}
