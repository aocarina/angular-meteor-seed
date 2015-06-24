//
// *** Auth login adapter
//

angular.module( 'modules.auth' )
  .factory( 'auth.login.adapter', [ '$meteor',
    function( $meteor ) {

      // logs an user in
      var login = function login( email, password, callback ) {
        return $meteor.loginWithPassword( email, password );
      }

      return {
        login: login
      };

    }]);
