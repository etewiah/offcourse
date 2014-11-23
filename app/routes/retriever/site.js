import Ember from 'ember';
// import Category from '../../models/category';

export default Ember.Route.extend({
  actions: {

  },

  model: function(params) {
    var sitesModel = this.modelFor('retriever');
    var siteDetails = {
      site: sitesModel.findBy('slug', params.slug)
    }
    var apiUrl = "/remote_discourse/categories.json?slug=" + params.slug;
    var result = $.getJSON(apiUrl).then(
      function(response) {
        console.log(this.siteDetails);
        // can't figure out how to get at siteDetails from here
        return response;
      }.bind(this)
    );
    return result;

  },

  setupController: function(controller, model) {
    controller.set('model', model);
    var sitesModel = this.modelFor('retriever');
    var siteDetails = sitesModel.findBy('slug', this.paramsFor('retriever.site').slug);
    controller.set('siteDetails',siteDetails);
    var retrieverController = this.controllerFor('retriever');
    retrieverController.set('currentSite', siteDetails);
    // below ensures site select2 control is populated correctly
  }
});
