import Ember from 'ember';
// import Category from '../../models/category';

export default Ember.Route.extend({
  actions: {

  },

  beforeModel: function(params) {
    var sitesModel = this.modelFor('retriever');
    var siteModel = sitesModel[0];
    this.transitionTo('retriever.site', siteModel.slug);
  }
});
