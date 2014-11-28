import Ember from 'ember';
// import Category from '../../models/category';

export default Ember.Route.extend({
  actions: {

  },

  beforeModel: function(params) {
    var sites = this.modelFor('sites');
    // redirect to the first site
    var site = sites[0];
    if (site && site.slug) {
    	this.transitionTo('sites.site', site.slug);
    }
  }
});


