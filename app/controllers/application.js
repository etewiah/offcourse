import Ember from 'ember';

export default Ember.Controller.extend({
  // http://stackoverflow.com/questions/22122570/ember-js-network-connectivity-check-at-startup-and-listener

  networkIsOnline: false, // assume we're offline until proven wrong
  init: function() {
    this.updateNetworkStatus();
  },

  updateNetworkStatus: function() {
    var appController = this;
    // if (!navigator.onLine) {
    //   this.set('isOnline', false);
    //   return; // return early, no point in pinging the server if we have no LAN
    // }
    Ember.$.get('https://cors-test.appspot.com/test').done(function(result) {
      if (result.status === "ok") {
        appController.set('networkIsOnline', true);
      } else {
        // debugger;
      }
    }).fail(function(result) {
      appController.set('networkIsOnline', false);
    }).always(function() {
      Ember.run.later(appController, 'updateNetworkStatus', 60000);
    });
  },

  navigatorIsOnline: function() {
    if (navigator.onLine) {
      return true;
    } else {
      return false;
    }
  }.property()

});
