//
// *** Users list controller
//

angular.module( 'modules.users' )
  .controller( 'users.list', [ '$scope', '$stateParams', 'users.adapter', 'SweetAlert', 'toastr',
    function( $scope, $stateParams, usersAdapter, swal, toastr ) {

      // Add state params to scope
      $scope.$params = $stateParams;

      var bindData = function() {
        // Get list of items
        $scope.users = usersAdapter.find();
      }

      // Remove a single item
      $scope.remove = function( user ) {
        usersAdapter.remove( user ).then(function( docs ) {
          toastr.success( 'Removed' );
        }, function( err ) {
          swal.error( 'Oops', err.reason );
        });
      }

      // Subscribe
      asynq.waterfall([
        usersAdapter.subscribe( $scope, 'users' )
      ]).then( bindData.bindApply( bindData ) );

    }]);
