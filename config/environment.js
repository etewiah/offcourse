/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'offcourse',
    environment: environment,
    baseURL: '/offcourse/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  // ENV.contentSecurityPolicy = {
  //   'default-src': "'none'",
  //   'script-src': "'self' http://meta.discourse.org http://klavado.com", // Allow scripts from https://cdn.mxpnl.com
  //   'font-src': "'self' http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
  //   'connect-src': "'self' http://meta.discourse.org http://klavado.com http://custom-api.local", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
  //   // 'img-src': "'self'",
  //   'img-src': "*",
  //   'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
  //   'media-src': "'self'"
  // }
  ENV.contentSecurityPolicy = {
    'img-src': "*",
    'connect-src': "'self' https://cors-test.appspot.com", 
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com"
  }
  // ['img-src'] = "*";
  //  {
  //   'default-src': "'none'",
  //   'script-src': "'self'",
  //   'font-src': "'self'",
  //   'connect-src': "'self'",
  //   'img-src': "*",
  //   'style-src': "'self'",
  //   'media-src': "'self'"
  // }

  return ENV;
};
