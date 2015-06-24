//
// *** App declaration
//

var appName = 'seed';

// *** Create module

var app = angular.module( appName, [
  // Vendor dependencies
  'angular-meteor',
  'ui.router',
  'oitozero.ngSweetAlert',
  'ngAnimate',
  'ui.gravatar',
  'toastr',
  'tableSort',

  // Our libs
  'asynq',

  // Globals
  'global',

  // Project dependencies
  'modules.navbar',
  'modules.dashboard',
  'modules.auth',
  'modules.users',
  'modules.ocarinas'

]);

// *** Config

var config = {
  layoutsTemplatePath: 'client/layouts/',
  navbarTemplatePath: 'client/modules/navbar/views/'
}

// * Routes and states

app.config([ '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function( $stateProvider, $urlRouterProvider, $locationProvider ) {

    $locationProvider.html5Mode( true );

    $urlRouterProvider.otherwise( '/' );

    $stateProvider
      .state( 'root', {
        abstract: true,
        views: {
          '@': { templateUrl: config.layoutsTemplatePath + 'main.html' },
          'navbar.top@root': { templateUrl: config.navbarTemplatePath + 'navbar.top.html' },
          'navbar.side@root': { templateUrl: config.navbarTemplatePath + 'navbar.side.html' }
        },
        resolve: {
          'currentUser': [ '$meteor', function( $meteor ) {
            return $meteor.requireUser();
          }]
        },
        onEnter: function() {
          Session.set( 'app.layout.bodyClass', 'skin-3' );
        }
      })
      .state( 'auth', {
        abstract: true,
        views: {
          '@': { templateUrl: config.layoutsTemplatePath + 'auth.html' }
        },
        onEnter: function() {
          Session.set( 'app.layout.bodyClass', 'gray-bg' );
        }
      });

  }]);

// * Enrollment

Accounts.onEnrollmentLink( function( token, done ) {

  app.run([ '$rootScope', '$state',
    function( $rootScope, $state ) {

      $state.go( 'auth.enroll', { token: token } );

      $rootScope.$on( 'app.auth.enroll.finish', function( event ) {
        done();
      });

    }]);

});

// * Access Control

app.run([ '$rootScope', '$state',
  function( $rootScope, $state ) {

    // Login white list
    var loginWhiteList = [
      '^',
      '/login',
      '/enroll/:token'
    ]

    $rootScope.$watch( 'currentUser', function( currentUser ) {
      if ( ! currentUser && loginWhiteList.indexOf( $state.current.url ) === -1 ) {
        $state.go( 'auth.login' );
      }
    });

    $rootScope.$on( '$stateChangeError', function( event, toState, toParams, fromState, fromParams, error ) {

      // We can catch the error thrown when the $requireUser promise is rejected
      // and redirect the user to the login page
      if ( error === 'AUTH_REQUIRED' ) {
        $state.go( 'auth.login' );
      }
    });
  }]);

// * toastr

app.config([ 'toastrConfig',
  function( toastrConfig ) {

    angular.extend( toastrConfig, {
      closeButton: true,
      debug: false,
      progressBar: true,
      positionClass: 'toast-top-right',
      onclick: null,
      showDuration: 400,
      hideDuration: 1000,
      timeOut: 7000,
      extendedTimeOut: 1000,
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    });

  }]);

// *** Layout

Session.setDefault( 'app.layout.bodyClass', 'gray-bg' );

Blaze.addBodyClass(function() {
  return Session.get( 'app.layout.bodyClass' );
});

// *** Bind angular

function onReady() {
  angular.bootstrap( document, [ appName ], { strictDi: true } );
}

if ( Meteor.isCordova ) {
  angular.element( document ).on( 'deviceready', onReady );
} else {
  angular.element( document ).ready( onReady );
}
