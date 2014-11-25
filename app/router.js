import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('sites', {
    path: '/sites'
  }, function() {
    this.resource('sites.site', {
      path: '/:slug'
    }, function() {

      this.route('default', {
        path: '/'
      });
    });
  });


  this.resource('retriever', {
    path: '/fetch'
  }, function() {
    this.route('default', {
      path: '/'
    });
    this.resource('retriever.site', {
      path: '/:slug'
    }, function() {
      this.route('default', {
        path: '/'
      });
      this.resource('retriever.site.category', {
          path: '/:category_slug'
        }
        // , function() {

        //   this.route('default', {
        //     path: '/'
        //   });
        // }
      );
    });
  });

  // this.resource('categories', {
  //   path: '/retrieve/cats'
  // }, function() {
  //   this.route('default', {
  //     path: '/'
  //   });
  //   this.resource('categories.category', {
  //     path: '/:slug'
  //   }, function() {
  //     this.route('default', {
  //       path: '/'
  //     });
  //     this.resource('categories.category.topic', {
  //       path: '/:id'
  //     }, function() {

  //       this.route('default', {
  //         path: '/'
  //       });
  //     });
  //   });
  // });

  // this.route('categories/category');
  // this.route('categories/category/topic');
  this.resource('topics', {
    path: '/offline/topics'
  }, function() {
    this.route('default', {
      path: '/'
    });

    this.resource('topics.topic', {
      path: '/:id'
    }, function() {

      this.route('default', {
        path: '/'
      });
    });
  });
});

export default Router;
