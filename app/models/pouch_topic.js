import DS from 'ember-data';
import Ember from 'ember';
// import PouchPost from './pouch_post';


var PouchTopic = DS.Model.extend({
  // primaryKey: 'id',
  siteId: DS.attr('string'),
  site_id: DS.attr('string'),
  site: DS.belongsTo('pouch_site'),
  originalId: DS.attr('string'),
  sourceSiteSlug: DS.attr('string'),
  title: DS.attr('string'),
  post_stream: DS.attr('raw'),
  rev: DS.attr('string'),
  posts: function(){
    return this.get('post_stream.posts').map(function(post){
      return Ember.Object.create(post);
    });
    // debugger;
  }.property('post_stream.posts')
});

PouchTopic.reopenClass({
  findOrCreate: function(store, type, properties) {
    return store.find(type, properties.id).then(null, (function() {
      return function() {
        var record;
        // if (reason.status === 404) {
          record = store.recordForId(type, properties.id);
          record.loadedData();
          record.setProperties(properties);
          return record.save();
        // } else {
        //   throw reason;
        // }
      };
    })(this));
  }
});

export default PouchTopic;
