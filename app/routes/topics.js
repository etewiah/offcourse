import Ember from 'ember';

export default Ember.Route.extend({});

import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
  },

  model: function(params) {
    var topics = this.store.find('topic');
    topics.then(function(res) {
    });
    return topics;
  },
  setupController: function(controller, model) {
    debugger;
    controller.set('model', model);
  },
  // deactivate: function() {
  //   var categoryController = this.controllerFor('categories.category');
  //   categoryController.set('isTopicView', false);
  // }


});
