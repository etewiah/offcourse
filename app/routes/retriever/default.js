import Ember from 'ember';
// import Category from '../../models/category';

export default Ember.Route.extend({
  actions: {

  },

  beforeModel: function() {
    var sitesModel = this.modelFor('retriever');
    var siteModel = sitesModel[0];
    if (siteModel) {
    	this.transitionTo('retriever.site', siteModel.slug);
    }
  }
});
