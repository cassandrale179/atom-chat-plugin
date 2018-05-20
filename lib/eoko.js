'use babel';

//import views here
import EokoView from './eoko-view';
import OnlineMembersView from './online-members-view';
import TasksView from './tasks-view';

import { CompositeDisposable } from 'atom';

export default {
  //Views
  eokoView: null,
  onlineMembersView: null,
  tasksView: null,

  modalPanel: null,
  subscriptions: null,


  activate(state) {
    //Create views
    this.eokoView = new EokoView(state.eokoViewState);
    this.onlineMembersView = new OnlineMembersView(state.onlineMembersView);
    this.tasksView = new TasksView(state.tasksView);

    //Generate the panels from those views
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.eokoView.getElement(),
      visible: false
    });

    this.onlineMembersPanel = atom.workspace.addRightPanel({
      item: this.onlineMembersView.getElement(),
      visible: false
    })

    this.tasksPanel = atom.workspace.addRightPanel({
      item: this.tasksView.getElement(),
      visible: false
    })






    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'eoko:toggle': () => this.toggle(),
      'eoko:toggleOnlineMembers': () => this.toggleOnlineMembers(),
      'eoko:toggleTasks': () => this.toggleTasks(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.eokoView.destroy();
  },

  serialize() {
    return {
      eokoViewState: this.eokoView.serialize()
    };
  },

  toggle() {
    //TODO: renders only one view at a time
    // console.log('Eoko was toggled!');
    // this.onlineMembersPanel.isVisible() ?
    // this.onlineMembersPanel.hide() :
    // this.onlineMembersPanel.show()
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  toggleOnlineMembers() {
    return (
      this.onlineMembersPanel.isVisible() ?
      this.onlineMembersPanel.hide() :
      this.onlineMembersPanel.show()
    );

  },

  toggleTasks() {
    return (
      this.tasksPanel.isVisible() ?
      this.tasksPanel.hide() :
      this.tasksPanel.show()
    );
  }

};
