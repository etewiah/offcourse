import DS from 'ember-data';

var RemoteSite = DS.Model.extend({
  // categories: DS.attr('raw'),
  categories: DS.hasMany('category'),
  site_details: DS.attr('raw')
});

export default RemoteSite;
