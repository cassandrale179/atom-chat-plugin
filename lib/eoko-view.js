'use babel';

function displayText(event){
    var userMessage = event.target.children[0].value;


}

export default class EokoView {
  constructor(serializedState) {
    console.log('Constructor is called');

    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('eoko');

    // Create message element
    const title = document.createElement('div');
    title.textContent = 'EOKO PLUGIN';
    title.classList.add('title');
    this.element.appendChild(title);

    // Create chat div
    const chatdiv = document.createElement('div');
    chatdiv.classList.add('chat-div');
    this.element.appendChild(chatdiv);

    // Create a form
    const form = document.createElement('form');


    // Create input class
    const input = document.createElement('input');
    input.classList.add('native-key-bindings');
    input.classList.add('chat-input');
    input.placeholder = 'Type message here...';

    form.appendChild(input);
    console.log("Input value", input.value)
    form.addEventListener("submit", displayText);
    this.element.appendChild(form);
  }



  // When package is activated
  serialize() {
      console.log('Seralize is called');

  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
