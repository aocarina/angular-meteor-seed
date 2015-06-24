//
// *** Global crud controller
//

angular.module( 'global' )
  .controller( 'global', [ '$rootScope', 'toastr',
    function( $rootScope, toastr ) {

      // Listen for global errors

      $rootScope.$on( 'app.errors.show', function( event, message ) {
        toastr.error( message );
      });

    }]);
