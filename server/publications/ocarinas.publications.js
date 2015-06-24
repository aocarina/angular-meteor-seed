//
// *** Ocarinas Publications
//

// * All
Meteor.publish( 'ocarinas', function( type ) {
  var query = {};

  switch ( type ) {
    case 'time':
      query.canTimeTravel = true;
      break;
    case 'regular':
      query.canTimeTravel = false;
      break;
  }

  return Ocarinas.find( query );
});
