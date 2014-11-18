import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    // saveOffline: function() {
    //   var store = this.store;
    //   var model = this.controller.get('model');
    //   var topic = store.createRecord('topic', {
    //     title: model.title,
    //     post_stream: model.post_stream,
    //     id: model.id
    //   });
    //   topic.save();

    // },
    // retrieveFromPouchDb: function() {
    //   var model_id = this.controller.get('model.id');
    //   var topic = this.store.find('topic', model_id);
    //   topic.then(function(res){
    //   });
    //   var topics = this.store.find('topic');
    //   topics.then(function(res){
    //   });

    // }
  },

  model: function(params) {
    var url = "/t/" + params.id + ".json";
    var result = $.getJSON(url).then(
      function(response) {
        return response;
      }
    );
    return result;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    var categoryController = this.controllerFor('categories.category');
    categoryController.set('isTopicView', true);
    controller.set('category_slug', categoryController.get('model.category_slug'));
  },
  deactivate: function() {
    var categoryController = this.controllerFor('categories.category');
    categoryController.set('isTopicView', false);
  }


});
