import Ember from 'ember';
import Category from '../models/category';

export default Ember.Route.extend({
  actions: {
    changeDomain: function() {
      var targetDiscourseUrl = this.controller.get('domainUrl');
      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(targetDiscourseUrl);
      if (!valid) {
        // alert('Sorry, invalid url');
        return;
      }
      var domain = targetDiscourseUrl.split('/')[2] || targetDiscourseUrl.split('/')[0];
      var domainTitle = domain.replace(/\./g, ' ');
      var domainId = domain.replace(/\./g, '_');

      this.controller.set('currentSourceId', domainId);
      // targetDiscourseUrl can be in an invalid state while currentSourceUrl is only set after having been validated
      this.controller.set('currentSourceUrl', targetDiscourseUrl);
      var apiUrl = Category.getIndexApiUrl(targetDiscourseUrl);
      // var url = "/remote_discourse/categories.json?host=" + targetDiscourseUrl;
      
      that.store.createRecord('site', {
        title: domainTitle,
        url: targetDiscourseUrl,
        id: domainId
      });
      // pouchSite.save().then(function(res){
      //   debugger;
      // }.bind(this));

      var that = this;
      $.getJSON(apiUrl).then(
        function(response) {
          that.controller.set('model', response);
          that.transitionTo('categories');
        }
      );


    }
  },

  model: function(params) {
    var discourseUrl = this.controllerFor('categories').get('currentSourceUrl');
    // this.get('controller.currentSourceUrl');
    if (!discourseUrl) {
      discourseUrl = "http://klavado.com";
      this.controllerFor('categories').set('currentSourceUrl',discourseUrl)
      // this.set('controller.currentSourceUrl', discourseUrl);
    };
    var apiUrl = Category.getIndexApiUrl(discourseUrl);
    // if (discourseUrl) {
    //   apiUrl = Category.getIndexApiUrl(discourseUrl);
    // } else {
    //   apiUrl = Category.getIndexApiUrl();
    // }
    // var categoriesController = this.controllerFor('categories');
    // categoriesController.set('domainUrl','klavado');
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
