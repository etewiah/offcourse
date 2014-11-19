import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['Application'],
	currentSourceDomain: "http://klavado.com"
	// offlineTopicsCount: function() {
	// 	// debugger;
 //    var topics = this.store.find('topic');
 //    topics.then(function(res) {
 //    	// debugger;
 //    	return 4;
 //    });

	// 	return topics;
	// }.property()
});
