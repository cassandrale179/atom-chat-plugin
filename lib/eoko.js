'use babel';

//------- IMPORT VIEWS HERE --------
import EokoView from './eoko-view';
import OnlineMembersView from './online-members-view';
import TasksView from './tasks-view';
import AuthView from './auth-view';


//-------- IMPORT EXPRESS, HTTP AND SERVER IO -------
import { CompositeDisposable } from 'atom';
import express from 'express';
const app = express();
const http = require('http').createServer(app);
const serverIO = require('socket.io').listen(http);


//--------------EXPRESS AND SOCKET SERVER -----------
require('socketio-auth')(serverIO, {
  authenticate: function (socket, data, callback) {


    //GET CREDENTIALS FROM THE CLIENT
    var username = data.username;
    var password = data.password;
    console.log(username, password);

    // if(password != user.password){
    //   return callback(new Error("Password mismatch"));
    // }

    // db.findUser('User', {username:username}, function(err, user) {
    //
    //   //inform the callback of auth success/failure
    //   if (err || !user){
    //     return callback(new Error("User not found"));
    //   }
    //
    //   //if wrong password err.message will be "Authentication failure"
    //   return callback(null, user.password == data.password);
    // });
   },
   postAuthenticate: function(socket, data){
    console.log("after auth");
  }
});



//------- DISPLAY SOCKET CONNECTION STATUS -----
serverIO.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    serverIO.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


//--------- EXPRESS AND SOCKET SERVER -------


export default {

  // List of views
  eokoView: null,
  onlineMembersView: null,
  tasksView: null,
  authView: null,

  modalPanel: null,
  subscriptions: null,


  //-------- FUNCTION TO TOGGLE SIDEBAR -----
  activate(state) {

    //Create views
    this.eokoView = new EokoView(state.eokoViewState);
    this.onlineMembersView = new OnlineMembersView(state.onlineMembersView);
    this.tasksView = new TasksView(state.tasksView);
    this.authView = new AuthView(state.authView);

    //Generate the panels from those views
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.eokoView.getElement(),
      visible: false
    });
    this.onlineMembersPanel = atom.workspace.addRightPanel({
      item: this.onlineMembersView.getElement(),
      visible: false
    });
    this.tasksPanel = atom.workspace.addRightPanel({
      item: this.tasksView.getElement(),
      visible: false
    });
    this.authPanel = atom.workspace.addRightPanel({
      item: this.authView.getElement(),
      visible: false
    });




    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'eoko:toggle': () => this.toggle(),
      'eoko:toggleOnlineMembers': () => this.toggleOnlineMembers(),
      'eoko:toggleTasks': () => this.toggleTasks(),
      'eoko:toggleAuth': () => this.toggleAuth(),
    }));
  },


  //----- DEACTIVE STATE -----
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.eokoView.destroy();
  },

  //----- SERALIZE STATE -----
  serialize() {


    return {
      eokoViewState: this.eokoView.serialize()
    };


  },


  //-------- FUNCTION TO TOGGLE SIDEBAR -----
  toggle() {
     this.authPanel.hide();
     this.onlineMembersPanel.hide();
     this.tasksPanel.hide();
     return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  toggleOnlineMembers() {
      this.authPanel.hide();
      this.modalPanel.hide();
      this.tasksPanel.hide();
    return (
      this.onlineMembersPanel.isVisible() ?
      this.onlineMembersPanel.hide() :
      this.onlineMembersPanel.show()
    );

  },

  toggleTasks() {
      this.authPanel.hide();
      this.modalPanel.hide();
      this.onlineMembersPanel.hide();
    return (
      this.tasksPanel.isVisible() ?
      this.tasksPanel.hide() :
      this.tasksPanel.show()
    );
  },

  toggleAuth() {
      this.onlineMembersPanel.hide();
      this.modalPanel.hide();
      this.tasksPanel.hide();
    return (
      this.authPanel.isVisible() ?
      this.authPanel.hide() :
      this.authPanel.show()
    );
  }

};
