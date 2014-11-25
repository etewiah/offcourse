import Ember from 'ember';
// import Topic from '../../../models/topic';
// import TopicModalView from '../../../views/modal/topic';

export default Ember.Route.extend({

  model: function(params) {
    // debugger;

    // var siteSlug = this.paramsFor('retriever.site').slug;
    // var apiUrl = "/remote_discourse/topics_per_category.json?slug=" + siteSlug + "&category=" + params.category_slug;
    // // Category.getIndexApiUrl(discourseUrl);
    // var topics = $.getJSON(apiUrl).then(
    //   function(response) {
    //     return response;
    //   }
    // );
    // return topics;
  },

  // setupController: function(controller, model) {
  //   controller.set('model', model);
  //   controller.set('selectedTopics', []);
  //   controller.set('siteDetails', this.modelFor('retriever.site').siteDetails);
  // }
});
