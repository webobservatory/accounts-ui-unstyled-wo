Package.describe({
  name: 'webobservatory:accounts-ui-unstyled-wo',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'A version of accounts-ui package without the CSS for web observatory.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/webobservatory/accounts-ui-unstyled-wo',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@0.9.0")
  api.use(['tracker@1.0.13', 'service-configuration', 'accounts-base',
           'underscore', 'templating', 'session', 'jquery'], 'client');
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  // Allow us to call Accounts.oauth.serviceNames, if there are any OAuth
  // services.
  api.use('accounts-oauth', {weak: true});
  api.imply('accounts-password');
  // Allow us to directly test if accounts-password (which doesn't use
  // Accounts.oauth.registerService) exists.
  api.use('accounts-password', {weak: true});
  api.imply('accounts-password');

  api.addFiles([
    'accounts_ui.js',

    'login_buttons.html',
    'login_buttons_single.html',
    'login_buttons_dropdown.html',
    'login_buttons_dialogs.html',

    'login_buttons_session.js',

    'login_buttons.js',
    'login_buttons_single.js',
    'login_buttons_dropdown.js',
    'login_buttons_dialogs.js'], 'client');

  //wooidc_methods file consists of method for multiple times configuration for WOOIDC OAuth service (e.g. configuring active web observatory nodes using same service). This is a meteor server side code.
  api.addFiles(['wooidc_methods.js'], 'server');

  // The less source defining the default style for accounts-ui. Just adding
  // this package doesn't actually apply these styles; they need to be
  // `@import`ed from some non-import less file.  The accounts-ui package does
  // that for you, or you can do it in your app.
  api.use('less@2.6.0');
  api.addFiles('login_buttons.import.less');


});

Package.onTest(function(api) {
  api.use(['tinytest', 'test-helpers'], 'client');
  api.use('webobservatory:accounts-ui-unstyled-wo');
  api.addFiles('accounts_ui_tests.js', 'client');
});
