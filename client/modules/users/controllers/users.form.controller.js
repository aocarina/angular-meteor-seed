//
// *** Users form controller
//

angular.module( 'modules.users' )
  .controller( 'users.form', [ '$scope', '$stateParams', '$state', '$meteor', 'users.adapter', 'SweetAlert', 'toastr',
    function( $scope, $stateParams, $state, $meteor, usersAdapter, swal, toastr ) {

      // Add state params to scope
      $scope.$params = $stateParams;

      // Save a single User
      $scope.save = function() {
        usersAdapter.save( $scope.user ).then(function() {
          toastr.success( 'Saved' );
          $scope.user = usersAdapter.get();
          $state.go( 'users.crud.list' );
        }, function( err ) {
          swal.error( 'Oops', err.reason );
        });
      }

      // Subscribe
      // We do not subscribe in here because the list controller already did it,
      // as both controllers are loaded together

      // Load item reactively
      $meteor.autorun( $scope, function() {
        $scope.user = usersAdapter.get( $scope.getReactively( '$params._id' ) );
      });

    }]);
