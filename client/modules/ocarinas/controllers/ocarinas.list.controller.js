//
// *** Ocarinas list controller
//

angular.module( 'modules.ocarinas' )
  .controller( 'ocarinas.list', [ '$scope', '$stateParams', '$meteor', 'asynq', 'ocarinas.adapter', 'users.adapter', 'SweetAlert', 'toastr',
    function( $scope, $stateParams, $meteor, asynq, ocarinasAdapter, usersAdapter, swal, toastr ) {

      // Set loading indicator as true
      $scope.isLoading = true;
      // Set ocarinas as empty array.
      $scope.ocarinas = [];

      // Add state params to scope
      $scope.$params = $stateParams;

      var bindData = function() {
        // Get list of items
        $scope.ocarinas = ocarinasAdapter.find();

        // Finish loading indicator
        $scope.isLoading = false;
      }

      // Remove a single item
      $scope.remove = function( ocarina ) {
        ocarinasAdapter.remove( ocarina ).then(function( docs ) {
          toastr.success( 'Removed' );
        }, function( err ) {
          swal.error( 'Oops', 'Something bad just happened...' );
        });
      }

      // Subscribe
      $meteor.autorun( $scope, function() {
        // This is here because the getReactively must be directly on autorun function.
        // If we don't have the setTimeout function, it should be directly on subscribe.
        // ocarinasAdapter.subscribe( $scope, 'ocarinas', $scope.getReactively( '$params.type' ) )
        var type = $scope.getReactively( '$params.type' );

        // This timeout just exists so the spinner can be seen for educational purposes
        // REMOVE the lines 37 and 41 before coding
        setTimeout(function() {
          asynq.waterfall([
            usersAdapter.subscribe( $scope, 'users' ),
            ocarinasAdapter.subscribe( $scope, 'ocarinas', type )
          ]).then( bindData.bindApply( bindData ) );
        }, 2000 );

      });

    }]);
