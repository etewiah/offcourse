import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    // var store = this.store;

    // var site = store.createRecord('site', {
    //   title: 'Rails is Omakase',
    // });
    // site.save();

    return this.store.find('site');
  },

  // setupController: function(controller, model) {
  //   controller.set('content', model);
  // }
});
