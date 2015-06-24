//
// *** Users Publications
//

// * All
Meteor.publish( 'users', function() {
  return Meteor.users.find();
});
