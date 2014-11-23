import Ember from 'ember';
// import Category from '../../models/category';

export default Ember.Route.extend({
  actions: {

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
  }
});
