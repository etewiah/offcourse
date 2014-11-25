import Ember from 'ember';

export default Ember.Controller.extend({
	// needs: ['retriever/site'],
	// above does not work
  currentSiteChanged: function() {
    if (this.get('currentSite.slug') && this.get('currentSiteInitialised')) {
      this.transitionToRoute('retriever.site', this.get('currentSite.slug'));
    }else{
// using setting below to ensure I don't redirect when currentSite is set from route param
// should only redirect when changed from dropdown
    	this.set('currentSiteInitialised', true);
    };
  }.observes('currentSite'),
  faviconUrl: function(){
  	return this.get('currentSite.base_url') + '/favicon.ico'
  }.property('currentSite')

});
