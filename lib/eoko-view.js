'use babel';

export default class EokoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('eoko');

    // Create message element
    // const message = document.createElement('div');
    // message.textContent = 'Eoko message changed';
    // message.classList.add('message');
    // this.element.appendChild(message);


    // Create input class
    const input = document.createElement('input');
    input.classList.add('native-key-bindings');
    input.classList.add('chat-input');
    this.element.appendChild(input);
    input.placeholder = 'Type message here...'; 




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
