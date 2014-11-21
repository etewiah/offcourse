import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(error, transition) {
      if (error) {
        return this.transitionTo('sites');
      }
      // Return true to bubble this event to any parent route.
      return false;
    }
  },

  model: function(params) {
    // TODO - search pouchDB if offline
    var apiUrl = "/remote_discourse/get_or_add_site.json?slug=" + params.slug
    // Category.getSiteDetailsApiUrl(targetDiscourseUrl);

    // var url = "/remote_discourse/site_details.json?host=https://meta.discourse.org";
    // var url = "/t/" + params.id + ".json";
    var site = $.getJSON(apiUrl).then(
      function(response) {
        return response;
      }
    );
    return site;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }

});
