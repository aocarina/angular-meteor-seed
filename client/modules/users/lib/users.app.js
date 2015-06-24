//
// *** Users module
//

// * Create module

var app = angular.module( 'modules.users', [
  'angular-meteor',
  'ui.router'
]);

// * Config

var config = {
  templatePath: 'client/modules/users/views/'
}

app.config([ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {

  // Set states
  $stateProvider
    .state( 'users', {
      parent: 'root',
      abstract: true,
      views: {
        'content': { templateUrl: config.templatePath + 'users.html' }
      }
    })
    .state( 'users.crud', {
      views: {
        'list': { templateUrl: config.templatePath + 'users.list.html' },
        'form': { templateUrl: config.templatePath + 'users.form.html' }
      }
    })
    .state( 'users.crud.list', {
      url: '/users'
    })
    .state( 'users.crud.insert', {
      url: '/users/insert'
    })
    .state( 'users.crud.update', {
      url: '/users/:_id'
    });

}]);
