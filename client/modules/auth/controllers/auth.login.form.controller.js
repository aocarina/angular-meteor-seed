//
// *** Auth login form controller
//

angular.module( 'modules.auth' )
  .controller( 'auth.login.form', [ '$scope', '$state', 'auth.login.adapter', 'SweetAlert', 'toastr',
    function( $scope, $state, authLoginAdapter, swal, toastr ) {

      // Login
      $scope.login = function() {
        authLoginAdapter.login( $scope.user.email, $scope.user.password ).then(function() {
          toastr.success( 'Welcome!' );
          $state.go( 'dashboard' );
        }, function( err ) {
          swal.error( 'Oops', err.reason );
        });
      }

    }]);
