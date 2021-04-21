export class UserForm {
  constructor(private parent: Element) {}

  createTemplate(): string {
    return `<div><input /><button>GO!</button></div>`;
  }

  render(): void {
    const template = document.createElement('template');
    template.innerHTML = this.createTemplate();

    this.parent.append(template.content);
  }
}
