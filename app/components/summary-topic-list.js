import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['multiselect-checkboxes', 'list-group'],

  tagName: 'ul',
  
  options: null,

  selection: null,

  labelProperty: null
});
