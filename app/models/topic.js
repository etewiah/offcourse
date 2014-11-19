import DS from 'ember-data';

var Topic = DS.Model.extend({
  // primaryKey: 'id',
  // id: DS.attr('string'),
  title: DS.attr('string'),
  post_stream: DS.attr('raw'),
  rev: DS.attr('string')
});

Topic.reopenClass({
  getTopicDetailsApiUrl: function(TopicId, targetDiscourseUrl) {
    if (targetDiscourseUrl) {
      var url = "/remote_discourse/topic_details.json?topic_id=" + TopicId + "&host=" + targetDiscourseUrl;
    } else {
      var url = "/t/" + TopicId + ".json";
    };
    return url;
  }
});

export default Topic;
