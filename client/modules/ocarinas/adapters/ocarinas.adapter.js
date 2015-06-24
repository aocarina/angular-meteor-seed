//
// *** Ocarinas adapter
//

angular.module( 'modules.ocarinas' )
  .factory( 'ocarinas.adapter', [ 'global.adapter', '$meteor', '$q', function( globalAdapter, $meteor, $q ) {
    return globalAdapter.buildService( Ocarinas );
  }]);
