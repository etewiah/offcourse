import ModalController from '../modal';
var ConfirmationNewController;

ConfirmationNewController = ModalController.extend({
  actions: {
    confirm: function() {
      alert('OK, it will be done!');
      return this.send('closeModal');
    }
  }
});

export default ConfirmationNewController;