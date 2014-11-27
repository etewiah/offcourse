import Ember from 'ember';
// import Category from '../../models/category';

export default Ember.Route.extend({
  actions: {

  },

  beforeModel: function(params) {
    var topics = this.modelFor('topics').content;
    // redirect to the first topic
    var topic = topics[0];
    if (topic && topic.get('data.id')) {
    	this.transitionTo('topics.topic', topic.get('data.id'));
    }
  }
});


