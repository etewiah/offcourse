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
    var topic = this.store.find('pouch_topic', params.id);

    // var url = "/t/" + params.id + ".json";
    // var topic = $.getJSON(url).then(
    //   function(response) {
    //     return response;
    //   }
    // );
    return topic;
  },
  setupController: function(controller, model) {
    // controller.set('model', model.get('data'));
    controller.set('model',model);
  }

});
