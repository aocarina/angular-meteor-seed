//
// Asynq for angular
//

angular.module( 'asynq', [] )
  .run([ '$q', function( $q ) {

    window.asynq.qLib = $q;

  }])
  .factory( 'asynq', [function() {

    return window.asynq;

  }]);
