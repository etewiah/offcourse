import Ember from 'ember';
import Category from '../models/category';

export default Ember.Route.extend({
  actions: {
    changeDomain: function() {
      var targetDiscourseUrl = this.controller.get('domainName');
      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(targetDiscourseUrl);
      if (!valid) {
        // alert('Sorry, invalid url');
        return;
      };
      var apiUrl = Category.getIndexApiUrl(targetDiscourseUrl);
      // var url = "/remote_discourse/categories.json?host=" + targetDiscourseUrl;
      var that = this;
      var result = $.getJSON(apiUrl).then(
        function(response) {
          that.controller.set('model',response);
          // debugger;
        }
      );
    }
  },

  model: function(params) {
    // var categoriesController = this.controllerFor('categories');
    // categoriesController.set('domainName','klavado');
    // debugger;
    var apiUrl = Category.getIndexApiUrl();
    var result = $.getJSON(apiUrl).then(
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
