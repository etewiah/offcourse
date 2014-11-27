import Ember from 'ember';
import Topic from '../../../models/topic';
import PouchTopic from '../../../models/pouch_topic';
import PouchSite from '../../../models/pouch_site';
// import TopicModalView from '../../../views/modal/topic';

export default Ember.Route.extend({
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
          that.controllerFor('modal/topic').set('model', detailedTopic);
          that.send('openModal', 'modal/topic');
        }
      );

    },
    saveTopicsOffline: function() {

      // var hostUrl = categoriesController.get('currentSourceUrl');
      // var hostSlug = categoriesController.get('currentSourceId') || "klavado";
      var selectedTopics = this.controller.get('selectedTopics');
      if (!selectedTopics || selectedTopics.length < 1) {
        Bootstrap.GNM.push('ERROR!', 'Please select topics to save', 'error');
        return;
      } else {
        Bootstrap.GNM.push('OK!', 'Adding selected topic...', 'success');
      }

      var hostUrl = this.modelFor('retriever.site').siteDetails.base_url;
      var hostSlug = this.modelFor('retriever.site').siteDetails.slug;

      var siteProperties = {
        slug: hostSlug,
        base_url: hostUrl,
        id: hostSlug
      };
      var site = this.store.recordForId('pouch_site', hostSlug);
      if (site.currentState.stateName === "root.empty") {
        site.loadedData();
      }
      site.setProperties(siteProperties);
      site.save();
      var siteTopics = site.get('topics');
      // PouchSite.findOrCreate(this.store, 'pouch_site', siteProperties);
      // .then(
      //   function(site){
      //   });

      var parsedTopicsCount = 0;

      selectedTopics.forEach(function(topic) {

        var apiUrl = Topic.getTopicDetailsApiUrl(topic.id, hostUrl);
        var that = this;
        var result = $.getJSON(apiUrl).then(
          function(detailedTopic) {
            var namespacedId = hostSlug + "_" + detailedTopic.id;

            var topicProperties = {
              title: detailedTopic.title,
              post_stream: detailedTopic.post_stream,
              originalId: detailedTopic.id,
              sourceSiteSlug: hostSlug,
              siteId: hostSlug,
              site_id: hostSlug,
              hostUrl: hostUrl,
              id: namespacedId
            };
            var topic = that.store.createRecord('pouch_topic', topicProperties);

            // var topic = PouchTopic.findOrCreate(that.store, 'pouch_topic', topicProperties);
            // var topic = that.store.recordForId('pouch_topic', namespacedId);

            // if (topic.currentState.stateName === "root.empty") {
            //   topic.loadedData();
            // }
            // topic.setProperties(topicProperties);
            // topic.save();
            siteTopics.pushObject(topic);
            parsedTopicsCount = parsedTopicsCount + 1;
            if (parsedTopicsCount === selectedTopics.length) {
              debugger;
                          site.save();
              Bootstrap.GNM.push('SUCCESS!', 'Selected topics added', 'success');
            }
          }
        );

      }.bind(this));

    },

  },

  model: function(params) {
    var pageNumber = params.page_number || "1";
    this.set('pageNumber', pageNumber);
    // var siteModel = this.modelFor('retriever.site');
    var siteSlug = this.paramsFor('retriever.site').slug;
    var apiUrl = "/remote_discourse/topics_per_category.json?slug=" + siteSlug +
      "&category=" + params.category_slug +
      "&page_number=" + pageNumber;
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
    // controller.set('siteDetails', this.modelFor('retriever.site').get('siteDetails'));
    controller.set('siteDetails', this.modelFor('retriever.site').siteDetails);
    var hasMorePages = model.topic_list.more_topics_url ? true : false;
    var pageNumber = this.get('pageNumber');
    // controller.set('hasMorePages', hasMorePages);
    if (parseInt(pageNumber) > 1) {
      controller.set('previousPageNumber', (parseInt(pageNumber) - 1));
    }
    if (hasMorePages && pageNumber) {
      controller.set('nextPageNumber', (parseInt(pageNumber) + 1));
    }
  }
});
