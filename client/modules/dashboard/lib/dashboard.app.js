//
// *** Dashboard module
//

// * Create module

var app = angular.module( 'modules.dashboard', [
  'angular-meteor',
  'ui.router'
]);

// * Config

var config = {
  templatePath: 'client/modules/dashboard/views/'
}

app.config([ '$stateProvider',
  function( $stateProvider ) {

    $stateProvider
      .state( 'dashboard', {
        parent: 'root',
        url: '/',
        views: {
          'content': { templateUrl: config.templatePath + 'dashboard.html' }
        }
      });

  }]);
