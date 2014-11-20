import Ember from 'ember';
import Category from '../../models/category';
import Topic from '../../models/topic';

export default Ember.Route.extend({
  actions: {
    saveTopicsOffline: function() {
      var categoriesController = this.controllerFor('categories');
      var domainUrl = categoriesController.get('currentSourceUrl');
      var domainId = categoriesController.get('currentSourceId') || "klavado";
debugger;
      var selectedTopics = this.controller.get('selectedTopics');
      selectedTopics.forEach(function(topic) {

        var apiUrl = Topic.getTopicDetailsApiUrl(topic.id, domainUrl);
        var that = this;
        var result = $.getJSON(apiUrl).then(
          function(detailedTopic) {
          // debugger;
            var namespacedId = domainId + "_" + detailedTopic.id;

            var pouchTopic = that.store.createRecord('topic', {
              title: detailedTopic.title,
              post_stream: detailedTopic.post_stream,
              originalId: detailedTopic.id,
              sourceSiteId: domainId,
              namespacedId: namespacedId
            });
            pouchTopic.save();
          }
        );

      }.bind(this));
      Bootstrap.GNM.push('SUCCESS!', 'Selected topics added', 'success');

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
