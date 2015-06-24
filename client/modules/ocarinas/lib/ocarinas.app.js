//
// *** Ocarinas module
//

// * Create module

var app = angular.module( 'modules.ocarinas', [
  'angular-meteor',
  'ui.router'
]);

// * Config

var config = {
  templatePath: 'client/modules/ocarinas/views/'
}

app.config([ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {

  // Set states
  $stateProvider
    .state( 'ocarinas', {
      parent: 'root',
      abstract: true,
      views: {
        'content': { templateUrl: config.templatePath + 'ocarinas.html' }
      }
    })
    .state( 'ocarinas.crud', {
      views: {
        'list': { templateUrl: config.templatePath + 'ocarinas.list.html' },
        'form': { templateUrl: config.templatePath + 'ocarinas.form.html' }
      }
    })
    .state( 'ocarinas.crud.list', {
      url: '/ocarinas/:type?'
    })
    .state( 'ocarinas.crud.insert', {
      url: '/ocarinas/insert'
    })
    .state( 'ocarinas.crud.update', {
      url: '/ocarinas/:_id/edit'
    });

}]);
