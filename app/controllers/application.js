import Ember from 'ember';

export default Ember.Controller.extend({
	// http://stackoverflow.com/questions/22122570/ember-js-network-connectivity-check-at-startup-and-listener


  isOnline: true,  // assume we're online until proven wrong
  init: function () {
    // this.updateNetworkStatus();
  },

  updateNetworkStatus: function () {
    var appController = this;
    if (!navigator.onLine) {
      this.set('isOnline', false);
      return; // return early, no point in pinging the server if we have no LAN
    }
    Ember.$.get('http://happensesame.com').done(function () {
      // todo: consider checking the result
      appController.set('isOnline', true);
    }).fail(function () {
      appController.set('isOnline', false);    
    }).always(function () {
      Ember.run.later(appController, 'updateNetworkStatus', 60000);
    });
  } 

});
