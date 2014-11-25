import Ember from 'ember';
import Topic from '../../../models/topic';
import TopicModalView from '../../../views/modal/topic';

export default Ember.Route.extend({
  // manualButtons: [
  //   Ember.Object.create({
  //     title: 'Submit',
  //     clicked: "submitManual"
  //   })
  //   Ember.Object.create({
  //     title: 'Cancel',
  //     dismiss: 'modal'
  //   })
  // ],
  actions: {
    previewTopic: function(topic) {
      var hostUrl = this.controller.get('siteDetails.base_url');
      // this.get('parentView.siteDetails.base_url');
      // this.modelFor('retriever.site').siteDetails.base_url;

      var apiUrl = Topic.getTopicDetailsApiUrl(topic.id, hostUrl);
      var that = this;
      var result = $.getJSON(apiUrl).then(
        function(detailedTopic) {
          // that.set('posts', detailedTopic.post_stream.posts);
          that.controllerFor('modal/topic').set('model', detailedTopic );
          that.send('openModal', 'modal/topic');

          // var topicProperties = {
          //   title: detailedTopic.title,
          //   post_stream: detailedTopic.post_stream,
          //   originalId: detailedTopic.id,
          // };

          // Topic.findOrCreate(that.store, 'pouch_topic', topicProperties);
        }
      );

    },
    saveTopicsOffline: function() {

      // var hostUrl = categoriesController.get('currentSourceUrl');
      // var hostSlug = categoriesController.get('currentSourceId') || "klavado";
      var selectedTopics = this.controller.get('selectedTopics');
      if (!selectedTopics || selectedTopics.length < 1) {
        Bootstrap.GNM.push('ERROR!', 'Please select topics to save', 'error');
      } else {
        // TODO - actually ensure topis are saved before showing this
        Bootstrap.GNM.push('SUCCESS!', 'Selected topics added', 'success');
      };

      var hostUrl = this.modelFor('retriever.site').siteDetails.base_url;
      var hostSlug = this.modelFor('retriever.site').siteDetails.slug;
      selectedTopics.forEach(function(topic) {

        var apiUrl = Topic.getTopicDetailsApiUrl(topic.id, hostUrl);
        var that = this;
        var result = $.getJSON(apiUrl).then(
          function(detailedTopic) {
            // debugger;
            var namespacedId = hostSlug + "_" + detailedTopic.id;

            var topicProperties = {
              title: detailedTopic.title,
              post_stream: detailedTopic.post_stream,
              originalId: detailedTopic.id,
              sourceSiteSlug: hostSlug,
              id: namespacedId
            };

            Topic.findOrCreate(that.store, 'pouch_topic', topicProperties);
          }
        );

      }.bind(this));

    },

  },

  model: function(params) {
    // var discourseUrl = this.controllerFor('retriever').get('model');
    // controller model above will not be ready here
    // var siteModel = this.modelFor('retriever.site');
    var siteSlug = this.paramsFor('retriever.site').slug;
    var apiUrl = "/remote_discourse/topics_per_category.json?slug=" + siteSlug + "&category=" + params.category_slug;
    // Category.getIndexApiUrl(discourseUrl);
    var topics = $.getJSON(apiUrl).then(
      function(response) {
        return response;
      }
    );
    return topics;
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('selectedTopics', []);
    controller.set('siteDetails', this.modelFor('retriever.site').siteDetails);
  }
});
