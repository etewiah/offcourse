import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['Application'],
	noOfflineTopics: function(){
		var model = this.get('model');
		if (model.content && model.content.length > 0) {
			return false;
		} else{
			return true;
		};
	}.property('model')
});
