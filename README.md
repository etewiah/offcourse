# Offcourse

This README outlines the details of collaborating on this Ember application.

Please note that this application is complementary to (https://github.com/etewiah/offcourse-discourse-plugin).  To experiment with this application, you need to have an instance of discourse with the 'offcourse-discourse-plugin' installed.  Assuming your instance of discourse is running on http://localhost:3000, you would need to run this application with this command:

ember server --proxy http://localhost:3000

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at http://localhost:4200.

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

This code is a proof of concept and NOT by any means production ready.  I would advice against deploying it to a production environment. 

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

