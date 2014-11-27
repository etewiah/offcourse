import DS from 'ember-data';



var PouchSite = DS.Model.extend({
  // : DS.attr('string'),
  topics: DS.hasMany('pouch_topic'),
  display_name: DS.attr('string'),
  description: DS.attr('string'),
  slug: DS.attr('string'),
  base_url: DS.attr('string'),
  url: DS.attr('string'),
  // isActive: DS.attr('boolean'),
  rev: DS.attr('string')
});

// TODO - this is duplicated in pouch_topic - move to one place....
PouchSite.reopenClass({
  findOrCreate: function(store, type, properties) {
    return store.find(type, properties.id).then(null, (function() {
      return function() {
        var record;
        // if (reason.status === 404) {
          record = store.recordForId(type, properties.id);
          record.loadedData();
          record.setProperties(properties);
          debugger;
          return record;
          // return record.save();

        // } else {
        //   throw reason;
        // }
      };
    })(this));
  }
});


export default PouchSite;
