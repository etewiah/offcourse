import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    changeDomain: function() {
      var url = "/remote_discourse/categories.json?host=https://meta.discourse.org";
      var that = this;
      var result = $.getJSON(url).then(
        function(response) {
          that.controller.set('model',response);
          debugger;
          // return response;
        }
      );
    }
  },

  model: function(params) {
    var url = "/categories.json";
    var result = $.getJSON(url).then(
      function(response) {
        return response;
      }
    );
    return result;
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    var topics = this.store.find('topic');
    topics.then(function(res) {
      this.controller.set('offlineTopicsCount', res.content.length);
    }.bind(this));
  }
});
