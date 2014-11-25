import Ember from 'ember';
// import Category from '../../models/category';

export default Ember.Route.extend({
  actions: {

  },

  beforeModel: function(params) {
    var categories = this.modelFor('retriever.site').categories;
    // redirect to the first category
    var category = categories[0];
    if (category) {
      this.transitionTo('retriever.site.category', category.slug, "1");
    };
  }
});
