import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['Application'],

  // will set below in categories route as I won't have this value available in model hook
  // on first load
	// currentSourceUrl: "http://klavado.com"

  currentSiteChanged: function(){
  	debugger;
  }.observes('domainUrl')

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
