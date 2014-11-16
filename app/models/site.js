import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  isActive: DS.attr('boolean'),
  rev: DS.attr('string')
});
