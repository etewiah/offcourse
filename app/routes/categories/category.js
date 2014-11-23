import Ember from 'ember';
import Category from '../../models/category';
import Topic from '../../models/topic';

export default Ember.Route.extend({
  actions: {
    saveTopicsOffline: function() {
      var categoriesController = this.controllerFor('categories');
      var domainUrl = categoriesController.get('currentSourceUrl');
      var domainId = categoriesController.get('currentSourceId') || "klavado";
      var selectedTopics = this.controller.get('selectedTopics');
      if (!selectedTopics || selectedTopics.length < 1) {
        Bootstrap.GNM.push('ERROR!', 'Please select topics to save', 'error');
      } else {
        // TODO - actually ensure topis are saved before showing this
        Bootstrap.GNM.push('SUCCESS!', 'Selected topics added', 'success');
      };
      selectedTopics.forEach(function(topic) {

        var apiUrl = Topic.getTopicDetailsApiUrl(topic.id, domainUrl);
        var that = this;
        var result = $.getJSON(apiUrl).then(
          function(detailedTopic) {
            // debugger;
            var namespacedId = domainId + "_" + detailedTopic.id;

            var topicProperties = {
              title: detailedTopic.title,
              post_stream: detailedTopic.post_stream,
              originalId: detailedTopic.id,
              sourceSiteId: domainId,
              id: namespacedId
            };

            Topic.findOrCreate(that.store, 'topic', topicProperties);
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
    var currentSourceUrl = this.controllerFor('categories').get('currentSourceUrl');
    var apiUrl = Category.getTopicListApiUrl(params.slug, currentSourceUrl);

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
