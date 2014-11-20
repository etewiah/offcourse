import DS from 'ember-data';

var Category = DS.Model.extend({

});

Category.reopenClass({
  getIndexApiUrl: function(targetDiscourseUrl) {
    var url = "/categories.json";
    if (targetDiscourseUrl) {
      url = "/remote_discourse/categories.json?host=" + targetDiscourseUrl;
    } 
    return url;
  },
  getTopicListApiUrl: function(categorySlug, targetDiscourseUrl) {
    var url = "/c/" + categorySlug + ".json";
    if (targetDiscourseUrl) {
      url = "/remote_discourse/topics_per_category.json?category=" + categorySlug + "&host=" + targetDiscourseUrl;
    } 
    return url;
  }
});

export default Category;
