import ModalController from '../modal';
var AddSiteModalController;

AddSiteModalController = ModalController.extend({
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
      // // debugger;
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

      // var domain = targetDiscourseUrl.split('/')[2] || targetDiscourseUrl.split('/')[0];
      // var domainId = domain.replace(/\./g, '_');
      // only use slug instead of host if I'm sure site is in db
      var apiUrl = "/remote_discourse/get_or_add_site.json?host=" + targetDiscourseUrl;
      $.getJSON(apiUrl).then(
        function(response) {
          var site = this.store.createRecord('site', {
            display_name: response.display_name,
            description: response.description,
            slug: response.slug,
            base_url: response.base_url
          });
          site.save();
          debugger;
          // response.text = response.base_url;
          // have to do above as select2 dropdown requires text field
          this.controller.model.pushObject(response);
          this.controller.set('currentSite', response);
          return this.send('closeModal');

        }.bind(this),
        function(error) {
          debugger;
        }.bind(this)
      );


    }
  },
  content: {}
});

export default AddSiteModalController;
