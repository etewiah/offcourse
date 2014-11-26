import Ember from 'ember';
// import RemoteSite from '../../models/remote_site';

export default Ember.Route.extend({
  actions: {

  },

  model: function(params) {
    // var sitesModel = this.modelFor('retriever');
    // var siteDetails = {
    //   site: sitesModel.findBy('slug', params.slug)
    // }
    var apiUrl = "/remote_discourse/categories.json?slug=" + params.slug;
    var result = $.getJSON(apiUrl).then(
      function(response) {
        // debugger;
        // can't figure out how to get at siteDetails from here
        // return RemoteSite.create(response);
        return Ember.Object.create(response);
        // return response;
        // return this.store.createRecord('remote_site',response);
      }.bind(this)
    );
    return result;

  },

  setupController: function(controller, model) {
    // debugger;
    controller.set('model', model);
    var sitesModel = this.modelFor('retriever');
    var siteDetails =  sitesModel.findBy('slug', this.paramsFor('retriever.site').slug);
    // model.site_details;
    // above also contains sitedetails but does not work with select2
    // sitesModel.findBy('slug', this.paramsFor('retriever.site').slug);
    controller.set('siteDetails',siteDetails);
    var retrieverController = this.controllerFor('retriever');
    // below ensures site select2 control is populated correctly
    retrieverController.set('currentSite', siteDetails);
  }
});
