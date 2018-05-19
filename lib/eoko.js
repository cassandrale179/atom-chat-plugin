'use babel';

import EokoView from './eoko-view';
import { CompositeDisposable } from 'atom';

export default {

  eokoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.eokoView = new EokoView(state.eokoViewState);
    this.modalPanel = atom.workspace.addRightPanel({
      item: this.eokoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'eoko:toggle': () => this.toggle()
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
    console.log('Eoko was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
