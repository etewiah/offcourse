import DS from 'ember-data';

var Category = DS.Model.extend({

});

Category.reopenClass({
  getApiUrl: function(targetDiscourseUrl) {
    if (targetDiscourseUrl) {
      var url = "/remote_discourse/categories.json?host=" + targetDiscourseUrl;
    } else {
      var url = "/categories.json";
    };
    debugger;
    return url;
  }
});

export default Category;
