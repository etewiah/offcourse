import DS from 'ember-data';

export default DS.Model.extend({
  // primaryKey: 'id',
  // id: DS.attr('string'),
  title: DS.attr('string'),
  rev: DS.attr('string')
});
