import Ember from 'ember';
import Topic from '../models/topic';

export default Ember.Component.extend({
  classNames: ['multiselect-checkbox-option', 'list-group-item'],

  tagName: 'li',

  value: null,

  selection: [],

  labelProperty: null,

  actions: {
    previewTopic: function() {
      var hostUrl = this.get('parentView.siteDetails.base_url');
      // this.modelFor('retriever.site').siteDetails.base_url;

      var apiUrl = Topic.getTopicDetailsApiUrl(this.get('value.id'), hostUrl);
      var that = this;
      var result = $.getJSON(apiUrl).then(
        function(detailedTopic) {
					that.set('posts', detailedTopic.post_stream.posts)
          debugger;

          // var topicProperties = {
          //   title: detailedTopic.title,
          //   post_stream: detailedTopic.post_stream,
          //   originalId: detailedTopic.id,
          // };

          // Topic.findOrCreate(that.store, 'pouch_topic', topicProperties);
        }
      );

      return Bootstrap.ModalManager.show('myModal');
    }
  },

  // click: function(){
  // 	debugger;
  // },

  isSelected: function() {
    return this.get('selection').contains(this.get('value'));
  }.property('value', 'selection'),

  label: function() {
    var labelProperty = this.get('labelProperty');
    var value = this.get('value');

    if (labelProperty) {
      if (typeof value.get === 'function') {
        return value.get(labelProperty);
      } else {
        return value[labelProperty];
      }
    } else {
      return String(value);
    }
  }.property('value', 'labelProperty'),

  isSelectedChanged: function() {
    if (this.get('isSelected') && !this.get('selection').contains(this.get('value'))) {
      this.get('selection').addObject(this.get('value'));
    } else {
      this.get('selection').removeObject(this.get('value'));
    }
  }.observes('isSelected')
});
