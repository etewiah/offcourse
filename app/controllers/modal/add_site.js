import ModalController from '../modal';
var AddSiteModalController;

AddSiteModalController = ModalController.extend({
  needs: ['sites'],
  siteUrlValidation: function() {
    if (!this.get('validate')) {
      return;
    }
    // if (this.get('serverError')) return Discourse.InputValidation.create({
    //   failed: true,
    //   reason: this.get('serverError')

    // });
    // if (this.blank('topicDetails')) return Discourse.InputValidation.create({
    //   failed: true,
    //   reason: "Details have to be at least 10 characters long."

    // });
    var targetDiscourseUrl = this.get("siteUrl");
    var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(targetDiscourseUrl);
    if (!valid) {
      return {
        failed: true,
        reason: "Invalid url"
      };
      // this.set('siteUrlValidation', siteUrlValidation);
      // // alert('Sorry, invalid url');
      // return;
    }
    // // If too short
    // if (this.get('topicDetails').length < 10) {
    //   return Discourse.InputValidation.create({
    //     failed: true,
    //     reason: "Details have to be at least 10 characters long."
    //   });
    // }

    // // Looks good!
    // return Discourse.InputValidation.create({
    //   ok: true,
    //   reason: ""
    // });
  }.property('validate', 'siteUrl'),
  actions: {
    addSite: function() {

      var targetDiscourseUrl = this.get("siteUrl");

      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(targetDiscourseUrl);
      if (!valid) {
        this.set('validate', true);
        return;
      }
      else{
      	this.set('validate', false);
      }

      // var domain = targetDiscourseUrl.split('/')[2] || targetDiscourseUrl.split('/')[0];
      // var domainId = domain.replace(/\./g, '_');
      // only use slug instead of host if I'm sure site is in db
      var apiUrl = "/remote_discourse/get_or_add_site.json?host=" + targetDiscourseUrl;
      $.getJSON(apiUrl).then(
        function(response) {
          // var site = this.store.createRecord('site', {
          //   display_name: response.display_name,
          //   description: response.description,
          //   slug: response.slug,
          //   base_url: response.base_url
          // });
          // site.save();
          // TODO
          this.get('controllers.sites.model').pushObject(response);
          this.transitionToRoute('sites.site', response.slug);

          // this.get('controllers.sites').set('currentSite', response);
          return this.send('closeModal');

        }.bind(this),
        function(error) {
          var serverError = {
            failed: true,
            reason: "Sorry, it seems this is not a valid Discourse server Url"
          };
          this.set('siteUrlValidation', serverError);
        }.bind(this)
      );


    }
  },
  content: {}
});

export default AddSiteModalController;
