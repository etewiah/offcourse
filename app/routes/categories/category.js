import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveTopicsOffline: function() {
      var selectedTopics = this.controller.get('selectedTopics');
      selectedTopics.forEach(function(topic) {
        var url = "/t/" + topic.id + ".json";
        var that = this;
        var result = $.getJSON(url).then(
          function(response) {
            var pouchTopic = that.store.createRecord('topic', {
              title: topic.title,
              post_stream: topic.post_stream,
              id: topic.id
            });
            pouchTopic.save();
          }
        );

      }.bind(this));
    }
  },
  model: function(params) {
    var url = "/c/" + params.slug + ".json";
    var result = $.getJSON(url).then(
      function(response) {
        response.category_slug = params.slug;
        return response;
        // return response.data.children.map(function (child) {
        //   return App.RedditLink.create(child.data);
        // });
      }
    );
    return result;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('selectedTopics', []);
  }


});
