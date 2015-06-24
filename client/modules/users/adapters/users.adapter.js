//
// *** Users adapter
//

angular.module( 'modules.users' )
  .factory( 'users.adapter', [ 'global.adapter', '$meteor', '$q', function( globalAdapter, $meteor, $q ) {

    var adapter = globalAdapter.buildService( Meteor.users );

    // Retrieves an user
    adapter.get = function get( id ) {
      var user = {};

      if ( id ) {
        user = $meteor.object( Meteor.users, id, false ).getRawObject();
      }

      // if it's a new object, send some default fields
      user.emails = user.emails || [];
      user.emails[ 0 ] = user.emails[ 0 ] || { address: '', verified: false };

      user.profile = user.profile || {};

      return user;
    }

    // Saves an user
    adapter.save = function save( user ) {

      // Check if this is an update or create
      if ( user._id ) {

        // If the user wants to update it's password, do it first
        if ( user.password ) {
          var promise = $meteor.changePassword( user.currentPassword, user.password ).then(function() {
            return $meteor.call( 'users.save', user );
          });

          return promise;
        } else {
          // Otherwise, just call users.save
          return $meteor.call( 'users.save', user );
        }

      } else {

        return $meteor.call( 'users.save', user );

      }

    }

    return adapter;

  }]);
