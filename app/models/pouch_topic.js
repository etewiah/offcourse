import DS from 'ember-data';
// import PouchPost from './pouch_post';

var PouchTopic = DS.Model.extend({
  // primaryKey: 'id',
  // id: DS.attr('string'),
  originalId: DS.attr('string'),
  sourceSiteId: DS.attr('string'),
  title: DS.attr('string'),
  post_stream: DS.attr('raw'),
  rev: DS.attr('string'),
  posts: function(){
    return this.get('post_stream.posts').map(function(post){
      return Em.Object.create(post);
    })
    // debugger;
  }.property('post_stream.posts')
});

PouchTopic.reopenClass({
  getTopicDetailsApiUrl: function(TopicId, targetDiscourseUrl) {
    var url = "/t/" + TopicId + ".json";
    if (targetDiscourseUrl) {
      url = "/remote_discourse/topic_details.json?topic_id=" + TopicId + "&host=" + targetDiscourseUrl;
    }
    return url;
  },
  findOrCreate: function(store, type, properties) {
    return store.find(type, properties.id).then(null, (function(_this) {
      return function(reason) {
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
