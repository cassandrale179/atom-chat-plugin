'use babel';

export default class EokoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('eoko');

    // Create message element
    const title = document.createElement('div');
    title.textContent = 'EOKO PLUGIN';
    title.classList.add('title');
    this.element.appendChild(title);


    // Create input class
    const input = document.createElement('input');
    input.classList.add('native-key-bindings');
    this.element.appendChild(input);

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
