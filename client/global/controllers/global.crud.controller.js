//
// *** Global crud controller
//

angular.module( 'global' )
  .controller( 'global.crud', [ '$scope', '$state', '$attrs',
    function( $scope, $state, $attrs ) {

      // Config

      var formSize = parseInt( $attrs.formSize );
      var listSize = 12 - formSize;
      var showSideBySide = formSize <= 6;

      // Change classes

      $scope.toggleLayout = function( state ) {

        var state = state.split( 'crud.' )[ 1 ];

        if ( ! showSideBySide ) {

          switch ( state ) {
            case 'insert':
            case 'update':
              $scope.crudListClass = 'hidden';
              $scope.crudFormClass = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
              break;
            case 'list':
              $scope.crudListClass = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
              $scope.crudFormClass = 'hidden';
              break;
          }

        } else {

          switch ( state ) {
            case 'insert':
            case 'update':
              $scope.crudFormOnlyClass = 'hidden-lg';
              $scope.crudListClass = 'col-lg-' + listSize + ' hidden-xs hidden-sm hidden-md';
              $scope.crudFormClass = 'col-xs-12 col-sm-12 col-md-12 col-lg-' + formSize;
              break;
            case 'list':
              $scope.crudFormOnlyClass = '';
              $scope.crudListClass = 'col-xs-12 col-sm-12 col-md-12 col-lg-' + listSize;
              $scope.crudFormClass = 'col-lg-' + formSize + ' hidden-xs hidden-sm hidden-md';
              break;
          }

        }

      }

      // Call it the first time

      $scope.toggleLayout( $state.current.name );

      // Watch for state changes

      $scope.$on( '$stateChangeStart', function( event, toState, toParams, fromState, fromParams ) {
        $scope.toggleLayout( toState.name );
      });

    }]);
