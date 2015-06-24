//
// spinner
//

angular.module( 'global' )
  .directive( 'spinner', [
    function icheck( $timeout ) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div class="sk-spinner sk-spinner-cube-grid"><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div><div class="sk-cube"></div></div>'
      };
    }]);
