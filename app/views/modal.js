import Ember from 'ember';
var ModalView;

ModalView = Ember.View.extend({
  tagName: 'div',
  classNames: ['modal'],
  attributeBindings: ['tabindex'],
  tabindex: "-1",
  didInsertElement: function() {
    // debugger;
    var $modal = this.$();
    // $modal.attr('id', 'modal');
    $modal.modal({
      keyboard: true,
      backdrop: true
    });
    $modal.modal('show');
    var self = this;
    $modal.one("hide.bs.modal", function () {
      self.get("controller").send("closeModal");
    });
  },


  //   _setupModal: function() {
  //   var self = this,
  //       $discourseModal = $('#discourse-modal');

  //   $discourseModal.modal('show');
  //   $discourseModal.one("hide", function () {
  //     self.get("controller").send("closeModal");
  //   });

  //   $('#modal-alert').hide();

  //   // Focus on first element
  //   if (!Discourse.Mobile.mobileView && self.get('focusInput')) {
  //     Em.run.schedule('afterRender', function() {
  //       self.$('input:first').focus();
  //     });
  //   }

  //   var title = this.get('title');
  //   if (title) {
  //     this.set('controller.controllers.modal.title', title);
  //   }
  // }.on('didInsertElement'),


  // willDestroyElement: function() {
  //   debugger;
  //   return this.$().modal('hide');
  // }
});

export default ModalView;