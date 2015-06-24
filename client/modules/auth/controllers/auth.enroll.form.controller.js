//
// *** Auth enroll form controller
//

angular.module( 'modules.auth' )
  .controller( 'auth.enroll.form', [ '$scope', '$rootScope', '$state', 'auth.enroll.adapter', 'SweetAlert', 'toastr',
    function( $scope, $rootScope, $state, authEnrollAdapter, swal, toastr ) {

      // Save
      $scope.save = function() {
        authEnrollAdapter.savePassword( $state.params.token, $scope.password ).then(function() {
          $rootScope.$broadcast( 'app.auth.enroll.finish' );
          toastr.success( 'Welcome!' );
          $state.go( 'dashboard' );
        }, function( err ) {
          swal.error( 'Oops', err.reason );
        });
      }

    }]);
