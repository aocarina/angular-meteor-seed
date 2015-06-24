//
// *** Ocarinas model facade
//

Ocarinas = new Meteor.Collection( 'ocarinas' );

Schema.Ocarina = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    max: 50,
    unique: true
  },
  canTimeTravel: {
    type: Boolean,
    autoValue: function() {
      if ( ! this.isSet ) {
        return false;
      }
      return this.value
    },
    optional: true
  },
  ownerId: Schema.fields.ownerId,
  createdAt: Schema.fields.createdAt,
  updatedAt: Schema.fields.updatedAt
});

Ocarinas.attachSchema( Schema.Ocarina );

// * Helpers

Ocarinas.methods({
  owner: function() {
    return Meteor.users.findOne( this.ownerId );
  }
});
