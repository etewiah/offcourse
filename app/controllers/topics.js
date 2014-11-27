import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['Application'],
	noOfflineTopics: function(){
		var model = this.get('model');
		if (model.content && model.content.length > 0) {
			return false;
		} else{
			return true;
		}
	}.property('model.content.@each'),
	offlineTopicsCount: function(){
		var model = this.get('model');
		if (model.content && model.content.length > 0) {
			return model.content.length;
		} else{
			return 0;
		}
	}.property('model.content.@each')
});
