import Ember from 'ember';
// import Category from '../models/category';

export default Ember.Route.extend({
  actions: {
    addSite: function() {
      var targetDiscourseUrl = this.controller.get('newSiteUrl');
      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(targetDiscourseUrl);
      if (!valid) {
        alert('Sorry, invalid url');
        return;
      }
      // var domain = targetDiscourseUrl.split('/')[2] || targetDiscourseUrl.split('/')[0];
      // var domainId = domain.replace(/\./g, '_');
      // only use slug instead of host if I'm sure site is in db
      var apiUrl = "/remote_discourse/get_or_add_site.json?host=" + targetDiscourseUrl;
      $.getJSON(apiUrl).then(
        function(response) {
          var site = this.store.createRecord('site', {
            display_name: response.display_name,
            description: response.description,
            slug: response.slug,
            base_url: response.base_url
          });
          site.save();
          // this.controller.model.pushObject(response);
          this.controller.set('currentSite',response);
        }.bind(this)
      );

    }
  },

  model: function() {
    var apiUrl = "/remote_discourse/get_sites.json";
    var sites = $.getJSON(apiUrl).then(
      function(response) {
        var sitesArray = [];
        response.forEach(function(site){
          site.text = site.base_url;
          sitesArray.push(site);
        });
        return sitesArray;
      }.bind(this));
    return sites;
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
