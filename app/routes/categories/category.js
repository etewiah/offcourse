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
      selectedTopics.forEach(function(topic) {
        // var url = "/t/" + topic.id + ".json";
        var apiUrl = Topic.getTopicDetailsApiUrl(topic.id, domainUrl);
        var that = this;
        var result = $.getJSON(apiUrl).then(
          function(detailedTopic) {
          // debugger;
            var id = domainId + "_" + detailedTopic.id;
            var pouchTopic = that.store.createRecord('topic', {
              title: detailedTopic.title,
              post_stream: detailedTopic.post_stream,
              id: id
            });
            pouchTopic.save();
          }
        );

      }.bind(this));
      // var offlineTopicsCount = categoriesController.get('offlineTopicsCount');
      // offlineTopicsCount = offlineTopicsCount + selectedTopics.length;
      // above will be inaccurate if selections includes items already in store
      // and below needs to run after all updates
      // var topics = this.store.find('topic');
      // topics.then(function(res) {
      //   debugger;
      //   categoriesController.set('offlineTopicsCount', res.content.length);
      // }.bind(this));

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
    var domainUrl = categoriesController.get('domainUrl');
    var apiUrl = Category.getTopicListApiUrl(params.slug, domainUrl);

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
