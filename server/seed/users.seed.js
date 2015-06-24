//
// *** Users seed
//

Meteor.startup(function() {

  if ( Meteor.users.find().count() === 0 ) {

    Accounts.createUser({
      email: 'hello@aocarina.com',
      password: '4Seed',
      profile: {
        name: 'Demo User',
        title: 'Tester'
      }
    })

  }

});
