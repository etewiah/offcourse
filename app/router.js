import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('sites', function() { });
  // this.resource('categories', function() { });
  this.resource('categories', {
    path: '/online/categories'
  }, function() {
    this.route('default', {
      path: '/'
    });
    // had to add above to prevent view getting rendered twice on homepage..
    this.resource('categories.category', {
      path: '/:slug'
    }, function() {
      this.route('default', {
        path: '/'
      });
      this.resource('categories.category.topic', {
        path: '/:id'
      }, function() {

        this.route('default', {
          path: '/'
        });
      });
    });
  });

  this.route('categories/category');
  this.route('categories/category/topic');
  this.resource('topics', function() { });
});

export default Router;
