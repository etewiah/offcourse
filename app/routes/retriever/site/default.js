import Ember from 'ember';
// import Category from '../../models/category';

export default Ember.Route.extend({
  actions: {

  },

  beforeModel: function(params) {
    var categories = this.modelFor('retriever.site').category_list.categories;
    // redirect to the first category
    var category = categories[0];
    debugger;
    this.transitionTo('retriever.site.category', category.slug);
  }
});
