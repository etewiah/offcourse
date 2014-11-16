import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
   var url = "/categories.json";
    // "http://meta.discourse.org/categories.json";
   // "http://klavado.com/categories.json"
   var result = $.getJSON(url).then(
      function(response) {
      	// debugger;
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

