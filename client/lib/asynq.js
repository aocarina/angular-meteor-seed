//
// Asynq
//

function waterfall( promisesArray ) {
  var defer = this.q().defer();

  var waterfallTasks = [];

  _.each( promisesArray, function( promise ) {
    waterfallTasks.push( function() {
      var args = Array.prototype.slice.call( arguments );
      var callback = args.pop();

      promise.then( function( result ) {
        args.unshift( null );
        args.push( result );

        callback.apply( callback, args );
      }, function( err ) {
        callback( err );
      });
    })
  });

  async.waterfall( waterfallTasks, function() {
    var args = Array.prototype.slice.call( arguments );

    var err = args.shift();

    if ( err ) {
      return defer.reject( err );
    }

    defer.resolve( args );
  })

  return defer.promise;
}

window.asynq = {
  q: function() {
    return this.qLib || Q;
  },
  waterfall: waterfall
}
