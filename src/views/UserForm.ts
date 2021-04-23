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

  handleSaveClick = (): void => {
    this.model.save();
  };

  getEvents(): { [key: string]: () => void } {
    return {
      'click:.random-age': this.handleAgeClick,
      'click:.change-name': this.handleNameClick,
      'click:.save-user': this.handleSaveClick,
    };
  }

  createTemplate(): string {
    return `
    <div>
      <input class="name-input" placeholder="${this.model.get('name')}"/>
      <button class="change-name">Change name</button>
      <button class="random-age">Randomize age</button>
      <button class="save-user">Save</button>
    </div>`;
  }
}
