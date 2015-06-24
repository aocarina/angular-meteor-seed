//
// *** Auth module
//

// * Create module

var app = angular.module( 'modules.auth', [
  'angular-meteor',
  'ui.router'
]);

// * Config

var config = {
  templatePath: 'client/modules/auth/views/'
}

app.config([ '$stateProvider', '$urlRouterProvider',
  function( $stateProvider, $urlRouterProvider ) {

    // Set states
    $stateProvider
      .state( 'auth.login', {
        parent: 'auth',
        url: '/login',
        views: {
          'content': { templateUrl: config.templatePath + 'auth.login.html' }
        }
      })
      .state( 'auth.enroll', {
        parent: 'auth',
        url: '/enroll/:token',
        views: {
          'content': { templateUrl: config.templatePath + 'auth.enroll.html' }
        }
      });

  }]);
