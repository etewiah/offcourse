import Ember from 'ember';

var ApplicationRoute;

ApplicationRoute = Ember.Route.extend({
  actions: {
    openModal: function(modal) {
      return this.render(modal, {
        into: 'application',
        outlet: 'modal'
      });
    },
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});

export default ApplicationRoute;