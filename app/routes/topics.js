import Ember from 'ember';

export default Ember.Route.extend({});

import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveOffline: function() {
      var store = this.store;
      var model = this.controller.get('model');

      var topic = store.createRecord('topic', {
        title: model.title,
        id: model.id
      });
      topic.save();

    },
    retrieveFromPouchDb: function() {
      var model_id = this.controller.get('model.id');
      var topic = this.store.find('topic', model_id);
      topic.then(function(res) {
        debugger;
      });
      var topics = this.store.find('topic');
      topics.then(function(res) {
        debugger;
      });

    }
  },

  model: function(params) {
    var topics = this.store.find('topic');
    topics.then(function(res) {
    });
    return topics;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  },
  // deactivate: function() {
  //   var categoryController = this.controllerFor('categories.category');
  //   categoryController.set('isTopicView', false);
  // }


});
