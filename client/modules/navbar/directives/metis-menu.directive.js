//
// *** Metis Menu directive
//

angular.module( 'modules.navbar' )
  .directive( 'metisMenu', [ '$timeout',
    function metisMenu( $timeout ) {
      return {
        restrict: 'A',
        link: function( scope, element ) {
          // Call the metsiMenu plugin and plug it to sidebar navigation
          $timeout(function() {
            element.metisMenu();
          });
        }
      };
    }]);
