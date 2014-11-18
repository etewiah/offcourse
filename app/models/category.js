import DS from 'ember-data';

var Category = DS.Model.extend({

});

Category.reopenClass({
  getIndexApiUrl: function(targetDiscourseUrl) {
    if (targetDiscourseUrl) {
      var url = "/remote_discourse/categories.json?host=" + targetDiscourseUrl;
    } else {
      var url = "/categories.json";
    };
    return url;
  },
  getTopicListApiUrl: function(categorySlug, targetDiscourseUrl) {
    if (targetDiscourseUrl) {
    	var url = "/remote_discourse/topics_per_category.json?category=" + categorySlug + "&host=" + targetDiscourseUrl;
      debugger;

      // var url = "/remote_discourse/categories.json?host=" + targetDiscourseUrl;
    } else {
      var url = "/c/" + categorySlug + ".json";

    };
    return url;
  }

});

export default Category;
