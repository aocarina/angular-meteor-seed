//
// *** Auth enroll adapter
//

angular.module( 'modules.auth' )
  .factory( 'auth.enroll.adapter', [ '$meteor',
    function( $meteor ) {

      // Saves the user password
      var savePassword = function savePassword( token, password, callback ) {
        return $meteor.resetPassword( token, password );
      }

      return {
        savePassword: savePassword
      };

    }]);
