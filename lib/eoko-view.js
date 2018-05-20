'use babel';


//--------------EXPRESS AND SOCKET CLIENT
import io from 'socket.io-client';
const client_socket = io('http://localhost:3000');

var globals = {
    nick: 'sciencefreak500',
    color: '#6494ed'
};

var onBottom = true;
var Authenticated = false;

client_socket.on('connect', function(){
  client_socket.emit('authentication', {username: "sciencefreak500", password: "secret"});
  client_socket.on('authenticated', function() {
    console.log("now we good");
    Authenticated = true;
  });
});


function displayText(event){
  //if(Authenticated){
    var userMessage = event.target.children[0].value;
    var token = userMessage.split(' ');
    if(token[0] == '/nick'){   //if the person is changing nicks
      var name = '';
      var prevName = globals.nick;
      for(var i in token){
        if(token[i] != '/nick'){
          name += token[i] +' ';
        }
      }
      globals.nick = name;
      client_socket.emit('chat message', {
        text: prevName + ' changed nick to ' + name,
        nick: globals.nick,
        color: globals.color,
        serverMsg: true
      });
      event.target.children[0].value = '';
    }
    else if(token[0] =='/color'){
      var regexPass  = /^#[0-9A-F]{6}$/i.test(token[1]);
      if(regexPass){
        globals.color = token[1];
        var innie = document.getElementById('inputID');
        innie.style.color = globals.color;
        event.target.children[0].value = '';
      }
      else{
        console.log("not a color");
      }
    }
    else{
      client_socket.emit('chat message', {
        text: userMessage,
        nick: globals.nick,
        color: globals.color,
        serverMsg: false
      });
      event.target.children[0].value = '';
    }
    return false;
  // }
  // else{
  //   console.log("not authenticated");
  //   event.target.children[0].value = '';
  // }
}


//------- FUNCTION TO CREATE AND STYLE CHAT MESSAGE ---------
client_socket.on('chat message', function(msg){
  //if(Authenticated){
    var messageP = document.createElement('p');
    if(!(msg.serverMsg)){         //if not a message from the server (nick change)
      messageP.innerHTML = msg.nick + ' : ' + msg.text;
      messageP.style.color = msg.color;
    }
    else{
      messageP.innerHTML = msg.text;
      messageP.classList.add('serverMessage');
    }
    var chatdiv = document.getElementById("theChatDiv");
    chatdiv.appendChild(messageP);

    if(onBottom){  //shove message area all the way to the bottom
      //console.log("push down");
      chatdiv.scrollTop = chatdiv.scrollHeight - chatdiv.clientHeight;
    }
  // }
  // else{
  //   console.log("not authenticated socket");
  // }
});


//--------- FUNCTION TO HANDLE SCROLL EVENT -----------
function scrollHandle(event){  //if user scroll up, dont push the scroll to the bottom.
  //console.log("event",event);
  if(event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
    console.log('end reached');
    onBottom = true;
  }else{
    onBottom = false;
  }
}


//--------- CREATE THE VIEW OF THE PLUGIN HERE -----------
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

    // Create input box for password
    const passwordbox = document.createElement('div');
    passwordbox.classList.add('native-key-bindings');
    passwordbox.classList.add('password-box');
    this.element.appendChild(passwordbox); 

    // Create chat div
    const chatdiv = document.createElement('div');
    chatdiv.id = 'theChatDiv';
    chatdiv.classList.add('chat-div');
    this.element.appendChild(chatdiv);
    chatdiv.addEventListener("scroll", scrollHandle);

    // const iframe = document.createElement('iframe');
    // iframe.classList.add('actualChat');
    // iframe.src = 'localhost:3000';
    // chatdiv.appendChild(iframe);

    // Create a form
    const form = document.createElement('form');


    // Create input box for chat
    const input = document.createElement('input');
    input.classList.add('native-key-bindings');
    input.classList.add('chat-input');
    input.id = 'inputID';
    input.style.color = globals.color;
    input.placeholder = 'Type message here...';

    form.appendChild(input);
    form.addEventListener("submit", displayText);
    this.element.appendChild(form);
  }


  //--------  WHEN PACKAGE IS RUNNING ------
  serialize() {
      console.log('Seralize is called');

  }

  // ------ TEAR DOWN ANY STATE AND DETACH -------
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
