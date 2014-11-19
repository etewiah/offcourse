import Ember from 'ember';
import Category from '../../models/category';
import Topic from '../../models/topic';

export default Ember.Route.extend({
  actions: {
    saveTopicsOffline: function() {
      var categoriesController = this.controllerFor('categories');
      var domainName = categoriesController.get('domainName');

      var selectedTopics = this.controller.get('selectedTopics');
      selectedTopics.forEach(function(topic) {
        // var url = "/t/" + topic.id + ".json";
        var apiUrl = Topic.getTopicDetailsApiUrl(topic.id, domainName);
        var that = this;
        var result = $.getJSON(apiUrl).then(
          function(detailedTopic) {
            var pouchTopic = that.store.createRecord('topic', {
              title: detailedTopic.title,
              post_stream: detailedTopic.post_stream,
              id: detailedTopic.id
            });
            pouchTopic.save();
          }
        );

      }.bind(this));
    },
    error: function(error, transition) {
      if (error && error.status === 404) {
        // error substate and parent routes do not handle this error
        return this.transitionTo('categories');
      }
      // Return true to bubble this event to any parent route.
      return false;
    }
  },
  model: function(params) {
    var categoriesController = this.controllerFor('categories');
    var domainName = categoriesController.get('domainName');
    var apiUrl = Category.getTopicListApiUrl(params.slug, domainName);

    var result = $.getJSON(apiUrl).then(
      function(response) {
        response.category_slug = params.slug;
        return response;
      },
      function(error) {
        return error;
      }
    );
    return result;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('selectedTopics', []);
  }


});
