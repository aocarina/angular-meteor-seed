//
// *** Top navbar controller
//

angular.module( 'modules.navbar' )
  .controller( 'navbar.top', [ '$scope', '$rootScope', '$meteor',
    function( $scope, $rootScope, $meteor ) {

      $scope.currentUser = $rootScope.currentUser;

      $scope.logout = function() {
        $meteor.logout();
      }

    }]);
