//
// *** Global adapter
//

angular.module( 'global' )
  .factory( 'global.adapter', [ '$meteor', '$q', '$rootScope',
    function( $meteor, $q, $rootScope ) {

      // Build a service
      var buildService = function buildService( collection ) {

        // Subscribes to a publication
        var subscribe = function subscribe() {

          // Wait for the subscription to finish
          var deferSub = $q.defer();

          // Force array type for subscription arguments
          var subscriptionArgs = Array.prototype.slice.call( arguments );
          var $subscriber = subscriptionArgs.shift();

          if ( self.subscription ) {
            self.subscription.stop();
          }

          // Determine if a scope was passed
          if ( !! $subscriber === false ) {
            $subscriber = $meteor;
          } else if ( ! '$$ChildScope' in $subscriber ) {
            throw new Meteor.Error( 'Invalid scope', 'You must send a valid angular scope as first parameter' );
          }

          // Subscribe to the publication
          $subscriber.$meteorSubscribe.apply( $subscriber, subscriptionArgs ).then(function( subscriptionHandle ) {
            self.subscription = subscriptionHandle;
            deferSub.resolve();
          }, function( err ) {
            $rootScope.$broadcast( 'app.errors.show', err.reason + ' (' + subscriptionArgs[ 0 ] + ')' );
            deferSub.reject( err );
          });

          return deferSub.promise;

        }

        // Returns filtered fetched data
        var find = function find( query ) {
          return $meteor.collection( function() {
            return collection.find( query || {} );
          });
        }

        // Retrieves an object
        var get = function get( id ) {
          var item = {};

          if ( id ) {
            item = $meteor.object( collection, id, false ).getRawObject();
          }

          return item;
        }

        // Saves an object
        var save = function save( item ) {
          return $meteor.call( collection._name + '.save', item );
        }

        // Removes an object
        var remove = function remove( item ) {
          return $meteor.call( collection._name + '.remove', item );
        }

        // Returns an adapter
        var adapter = {
          subscribe: subscribe,
          find: find,
          get: get,
          save: save,
          remove: remove
        };

        return adapter;

      }

      return {
        buildService: buildService
      };

    }]);
