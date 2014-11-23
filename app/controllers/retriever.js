import Ember from 'ember';

export default Ember.Controller.extend({

  currentSiteChanged: function() {
    if (this.get('currentSite.slug')) {
      this.transitionToRoute('retriever.site', this.get('currentSite.slug'));
    };
  }.observes('currentSite')

});
