import Ember from 'ember';
// import Topic from '../models/topic';

export default Ember.Component.extend({
  classNames: ['multiselect-checkbox-option', 'list-group-item'],

  tagName: 'li',

  value: null,

  selection: [],

  labelProperty: null,


  // click: function(){
  // 	// debugger;
  // },

  isSelected: function() {
    return this.get('selection').contains(this.get('value'));
  }.property('value', 'selection'),

  url: function(){
    var url = this.get('parentView.siteDetails.base_url') + "/t/" + this.get('value.id');
    return url;
  }.property('value'),
  // label: function() {
  //   debugger;
  //   var labelProperty = this.get('labelProperty');
  //   var value = this.get('value');

  //   if (labelProperty) {
  //     if (typeof value.get === 'function') {
  //       return value.get(labelProperty);
  //     } else {
  //       return value[labelProperty];
  //     }
  //   } else {
  //     return String(value);
  //   }
  // }.property('value', 'labelProperty'),

  isSelectedChanged: function() {
    if (this.get('isSelected') && !this.get('selection').contains(this.get('value'))) {
      this.get('selection').addObject(this.get('value'));
    } else {
      this.get('selection').removeObject(this.get('value'));
    }
  }.observes('isSelected')
});
