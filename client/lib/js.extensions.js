Function.prototype.bindApply = function( scope ) {
  var originalFunction = this;
  return function() {
    originalFunction.apply( scope, arguments[ 0 ] );
  }
}
