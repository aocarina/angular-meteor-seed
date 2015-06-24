//
// *** Ocarinas form controller
//

angular.module( 'modules.ocarinas' )
  .controller( 'ocarinas.form', [ '$scope', '$stateParams', '$state', '$meteor', 'ocarinas.adapter', 'SweetAlert', 'toastr',
    function( $scope, $stateParams, $state, $meteor, ocarinasAdapter, swal, toastr ) {

      // Add state params to scope
      $scope.$params = $stateParams;

      // Save a single item
      $scope.save = function() {
        ocarinasAdapter.save( $scope.ocarina ).then(function( docs ) {
          toastr.success( 'Saved' );
          $scope.ocarina = ocarinasAdapter.get();
          $state.go( 'ocarinas.crud.list' );
        }, function( err ) {
          swal.error( 'Oops', 'Something bad just happened...' );
        });
      }

      // Subscribe
      // We do not subscribe in here because the list controller already did it,
      // as both controllers are loaded together

      // Load item reactively
      $meteor.autorun( $scope, function() {
        $scope.ocarina = ocarinasAdapter.get( $scope.getReactively( '$params._id' ) );
      });

    }]);
