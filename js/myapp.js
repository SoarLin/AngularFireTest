var app = angular.module("WishListApp", ["firebase"]);

app.controller("WishDisplayCtrl", function($scope, $firebase) {
  var ref = new Firebase("https://brilliant-fire-3623.firebaseio.com/wishlist");
  var sync = $firebase(ref.limit(20));

  $scope.wishlist = sync.$asArray();


  $scope.addMessage = function(_name, _email, _location, _wish) {
    $scope.wishlist.$add({name: _name, email: _email, location: _location, wish: _wish});
  }
});