import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: [':tip', 'good', 'bad'],

  // shouldRerender: Discourse.View.renderIfChanged('validation'),
  // below is reimplementation of above from discourse:
  shouldRerender: function(){
  	Ember.run.once(this, 'rerender');
  }.observes('validation'),
  bad: Em.computed.alias('validation.failed'),
  good: Em.computed.not('bad'),

  render: function(buffer) {
    var reason = this.get('validation.reason');
    if (reason) {
      var icon = this.get('good') ? 'fa-check' : 'fa-times';
      return buffer.push("<i class=\"fa " + icon + "\"></i> " + reason);
    }
  }
});


// Discourse.View.reopenClass({

//   /**
//     Register a view helper for ease of use

//     @method registerHelper
//     @param {String} helperName the name of the helper
//     @param {Ember.View} helperClass the view that will be inserted by the helper
//   **/
//   registerHelper: function(helperName, helperClass) {
//     Ember.Handlebars.registerHelper(helperName, function(options) {
//       var hash = options.hash,
//           types = options.hashTypes;

//       Discourse.Utilities.normalizeHash(hash, types);
//       return Ember.Handlebars.helpers.view.call(this, helperClass, options);
//     });
//   },

//   /**
//     Returns an observer that will re-render if properties change. This is useful for
//     views where rendering is done to a buffer manually and need to know when to trigger
//     a new render call.

//     @method renderIfChanged
//     @params {String} propertyNames*
//     @return {Function} observer
//   **/
//   renderIfChanged: function() {
//     var args = Array.prototype.slice.call(arguments, 0);
//     args.unshift(function () {
//       Ember.run.once(this, 'rerender');
//     });
//     return Ember.observer.apply(this, args);
//   }

// });