import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(error, transition) {
      debugger;
      if (error) {
        return this.transitionTo('retriever');
        // Above handles situations where the topic searched for by the model does not exist
        // - if I redirect to topics, it somehow thinks the topic searched for exists and 
        // will say user has 1 topic where none exist.
        // return this.transitionTo('topics.default');
      }
      // Return true to bubble this event to any parent route.
      return false;
    }
  },
  // afterModel: function(){
  //   debugger;
  // },
  model: function(params) {
    var topic = this.store.find('pouch_topic', params.id);
    return topic;
  },
  setupController: function(controller, model) {
    // controller.set('model', model.get('data'));
    controller.set('model',model);
    debugger;
    var siteSlug = model.get('sourceSiteSlug');
    this.store.find('pouch_site', siteSlug).then(function(site){
      debugger;
    })
  }

});
