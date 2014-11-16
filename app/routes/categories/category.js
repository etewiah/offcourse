import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var url = "/c/" + params.slug + ".json";
    var result = $.getJSON(url).then(
      function(response) {
        response.category_slug = params.slug;
        return response;
        // return response.data.children.map(function (child) {
        //   return App.RedditLink.create(child.data);
        // });
      }
    );
    return result;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }


});
