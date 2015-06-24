//
// *** Users methods facade
//

// *** CRUD methods

// * Save
var usersSave = function usersSave( user ) {

  if ( user._id ) {

    // Update and retrieve id
    user._id = Meteor.users.update( user._id, { $set: _.omit( user, '_id' ) } );

  } else {

    // Create and retrieve id
    user._id = Accounts.createUser({
      email: user.emails[ 0 ].address,
      profile: user.profile,
      password: Package.sha.SHA256( new Date() )
    });

    if ( Meteor.isServer ) {
      Accounts.sendEnrollmentEmail( user._id );
    }

  }

  // Return id
  return {
    _id: user._id
  }

}

// * Remove
var usersRemove = function usersRemove( user ) {

  // Check if _id is not the same as the logged user id
  if ( user._id === Meteor.userId() ) {
    throw new Meteor.Error( 401, 'You cannot remove yourself.' );
  }

  // Validate
  check( user._id, String );

  // Remove and get result
  var result = Meteor.users.remove( user._id );

  // Return result
  return result;

}

// *** Expose methods

Meteor.methods({
  'users.save': usersSave,
  'users.remove': usersRemove
});
