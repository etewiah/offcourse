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

      this.store.createRecord('site', {
        title: domainTitle,
        url: targetDiscourseUrl,
        id: domainId
      });
      this.controller.set('model', []);
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
    var apiUrl = "/remote_discourse/get_sites.json";
    var sites = $.getJSON(apiUrl).then(
      function(response) {
        var sitesArray = [];
        response.forEach(function(site){
          site.text = site.base_url;
          sitesArray.push(site);
        })
        return sitesArray;
      }.bind(this));
    return sites;
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
