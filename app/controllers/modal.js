import Ember from 'ember';
var ModalController;

ModalController = Ember.ObjectController.extend({
  actions: {
    cancel: function() {
      if (this.content) {
        this.content.rollback();
      }
      return this.send('closeModal');
    }
  }
});

export default ModalController;