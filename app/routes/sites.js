import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    addSite: function() {

      var targetDiscourseUrl = this.controller.get('domainUrl');
      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(targetDiscourseUrl);
      if (!valid) {
        // alert('Sorry, invalid url');
        return;
      }
      var domain = targetDiscourseUrl.split('/')[2] || targetDiscourseUrl.split('/')[0];
      var domainTitle = domain.replace(/\./g, ' ');
      var domainId = domain.replace(/\./g, '_');
debugger;
      this.controller.set('currentSourceId', domainId);
      // targetDiscourseUrl can be in an invalid state while currentSourceUrl is only set after having been validated
      this.controller.set('currentSourceUrl', targetDiscourseUrl);
      var apiUrl = Category.getIndexApiUrl(targetDiscourseUrl);
      // var url = "/remote_discourse/categories.json?host=" + targetDiscourseUrl;

      this.store.createRecord('site', {
        title: domainTitle,
        url: targetDiscourseUrl,
        id: domainId
      });
      this.controller.set('model', []);
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
