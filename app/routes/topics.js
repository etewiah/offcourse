import Ember from 'ember';

export default Ember.Route.extend({});

import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    destroyAllOfflineTopics: function() {
      //   this.store.find('topic').then(function(topics) {
      //     debugger;
      //     topics.destroy(); 
      //   });
      // this.get('store').findAll('topic').invoke('destroyRecord');
      // above does not work
      var that = this;
      this.get('store').findAll('topic').then(function(record) {
        record.content.forEach(function(rec) {
          Ember.run.once(this, function() {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      }).then(function() {
        // this.growl.info("Yep, it's working.");
        // Bootstrap.GNM.push('INFO!', 'Hello, this is just an info message.', 'info');
        Bootstrap.GNM.push('SUCCESS!', 'All offline topics removed!', 'success');
      }.bind(this));
    }
  },

  model: function(params) {
    var topics = this.store.find('topic');
    // topics.then(function(res) {
    // });
    return topics;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    this.controller.set('offlineTopicsCount', model.content.length);
  },
  // deactivate: function() {
  //   var categoryController = this.controllerFor('categories.category');
  //   categoryController.set('isTopicView', false);
  // }


});
