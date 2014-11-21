import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    addSite: function() {

      var targetDiscourseUrl = this.controller.get('domainUrl');
      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(targetDiscourseUrl);
      if (!valid) {
        alert('Sorry, invalid url');
        return;
      }
      var domain = targetDiscourseUrl.split('/')[2] || targetDiscourseUrl.split('/')[0];
      // var domainTitle = domain.replace(/\./g, ' ');
      var domainId = domain.replace(/\./g, '_');
      // this.controller.set('currentSourceId', domainId);
      // // targetDiscourseUrl can be in an invalid state while currentSourceUrl is only set after having been validated
      // this.controller.set('currentSourceUrl', targetDiscourseUrl);

      // var apiUrl = "/remote_discourse/get_or_add_site.json?slug=" + domainId;
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
        }.bind(this)
      );

    }
  },

  model: function(params) {
    // var store = this.store;

    // var site = store.createRecord('site', {
    //   title: 'Rails is Omakase',
    // });
    // site.save();

    return this.store.find('site');
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
