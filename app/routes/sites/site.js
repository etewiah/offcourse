import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(error, transition) {
      if (error) {
        return this.transitionTo('topics');
      }
      // Return true to bubble this event to any parent route.
      return false;
    }
  },

  model: function(params) {
    var url = "/remote_discourse/site_details.json?host=https://meta.discourse.org";
    // var url = "/t/" + params.id + ".json";
    var site = $.getJSON(url).then(
      function(response) {
        return response;
      }
    );
    return site;
  },
  setupController: function(controller, model) {
    controller.set('model',model);
  }

});
