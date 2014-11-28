import ModalController from '../modal';
var AddSiteModalController;

AddSiteModalController = ModalController.extend({
  actions: {
    addSite: function() {
    	debugger;

      var targetDiscourseUrl = this.get("siteUrl");

      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(targetDiscourseUrl);
      if (!valid) {
        alert('Sorry, invalid url');
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
        }.bind(this)
      );


      return this.send('closeModal');
    }
  },
  content: {}
});

export default AddSiteModalController;