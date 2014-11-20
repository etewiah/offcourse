import DS from 'ember-data';

var Topic = DS.Model.extend({
  // primaryKey: 'id',
  // id: DS.attr('string'),
  originalId: DS.attr('string'),
  sourceSiteId: DS.attr('string'),
  title: DS.attr('string'),
  post_stream: DS.attr('raw'),
  rev: DS.attr('string')
});

Topic.reopenClass({
  getTopicDetailsApiUrl: function(TopicId, targetDiscourseUrl) {
    var url = "/t/" + TopicId + ".json";
    if (targetDiscourseUrl) {
      url = "/remote_discourse/topic_details.json?topic_id=" + TopicId + "&host=" + targetDiscourseUrl;
    }
    return url;
  },


        // equivalent of findOrCreate
        // https://github.com/emberjs/data/issues/1523
  // findOrCreate: function(type, properties) {
  //   return this.store.find(type, properties.id).then(null, (function(_this) {
  //     return function(reason) {
  //       var record;
  //       if (reason.status === 404) {
  //         record = _this.store.recordForId(type, properties.id);
  //         record.loadedData();
  //         record.setProperties(properties);
  //         return record.save();
  //       } else {
  //         throw reason;
  //       }
  //     };
  //   })(this));
  // }
});

export default Topic;
