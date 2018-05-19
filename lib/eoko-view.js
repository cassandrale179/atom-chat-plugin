'use babel';

export default class EokoView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('eoko');

    // Create message element
<<<<<<< HEAD
    const title = document.createElement('div');
    title.textContent = 'EOKO PLUGIN';
    title.classList.add('title');
    this.element.appendChild(title);
=======
    // const message = document.createElement('div');
    // message.textContent = 'Eoko message changed';
    // message.classList.add('message');
    // this.element.appendChild(message);
>>>>>>> d2bebe05860ca071ab135dfb1bb7dd6e40e7d58b


    // Create input class
    const input = document.createElement('input');
    input.classList.add('native-key-bindings');
<<<<<<< HEAD
    this.element.appendChild(input);
=======
    input.classList.add('chat-input');
    this.element.appendChild(input);
    input.placeholder = 'Type message here...'; 



>>>>>>> d2bebe05860ca071ab135dfb1bb7dd6e40e7d58b

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
