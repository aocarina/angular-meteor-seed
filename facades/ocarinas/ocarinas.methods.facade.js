//
// *** Ocarinas methods facade
//

// *** CRUD methods

// * Save
var ocarinasSave = function ocarinasSave( ocarina ) {

  // Insert or update and retrieve id
  var ocarinaId = Ocarinas.upsert( ocarina._id, { $set: _.omit( ocarina, '_id' ) } );

  // Return id
  return {
    _id: ocarinaId
  }

}

// * Remove
var ocarinasRemove = function ocarinasRemove( ocarina ) {

  // Validate
  check( ocarina._id, String );

  // Remove and get result
  var result = Ocarinas.remove( ocarina._id );

  // Return result
  return result;

}

// *** Expose methods

Meteor.methods({
  'ocarinas.save': ocarinasSave,
  'ocarinas.remove': ocarinasRemove
});
