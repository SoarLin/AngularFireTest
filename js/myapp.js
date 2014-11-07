var app = angular.module("WishListApp", ["firebase"]);

var ref = new Firebase("https://brilliant-fire-3623.firebaseio.com/wishlist");

app.controller("WishDisplayCtrl", function($scope, $firebase) {
  var sync = $firebase(ref.limit(20));

  var list = sync.$asArray();
  list.$loaded().then(function() {
     //console.log("list has " + list.length + " items");
  });
  $scope.wishlist = list;
});


app.controller("WishAddCtrl",  function($scope, $firebase) {
  var sync = $firebase(ref);
  $scope.wishlist = sync.$asArray();

  $scope.addMessage = function(_name, _email, _location, _wish) {
    $scope.wishlist.$add({name: _name, email: _email, 
        county: _location.CountyName, group: _location.Group, wish: _wish});
    // window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)) );
    document.getElementById('demo').click();
  }

  $scope.counties = [
    {
      id: 10001,
      CountyName: '台北市',
      Group: 'North'
    },
    {
      id: 10002,
      CountyName: '新北市',
      Group: 'North'
    },
    {
      id: 10003,
      CountyName: '宜蘭市',
      Group: 'North'
    },
    {
      id: 10004,
      CountyName: '台中市',
      Group: 'Center'
    },
    {
      id: 10005,
      CountyName: '嘉義市',
      Group: 'South'
    },
    {
      id: 10006,
      CountyName: '台南市',
      Group: 'South'
    },
    {
      id: 10007,
      CountyName: '高雄市',
      Group: 'South'
    },
    {
      id: 10008,
      CountyName: '花蓮縣',
      Group: 'East'
    },
    {
      id: 10009,
      CountyName: '台東縣',
      Group: 'East'
    }
  ];
});


$(window).load(function(){
    // $('.wishContiner').isotope({
    //     filter: '*',
    //     animationOptions: {
    //         duration: 750,
    //         easing: 'linear',
    //         queue: false
    //     },
    //     layoutMode: 'fitRows',
    // });

    $(".locationFilter a").click(function(){
    var selector = $(this).attr('data-filter');
    console.log("selector is " + selector);
      $('.wishContiner').isotope({
          filter: selector,
          animationOptions: {
              duration: 750,
              easing: 'linear',
              queue: false
          }
       });
       return false;
    });

    $('#demo').sharrre({
      share: {
        facebook: true
      },
      title: "分享標題",
      url: 'http://eatme.tw',
      text: $('#wish_text').val(),
      click: function(api, options){
        api.simulateClick();
        api.openPopup('facebook');
      }
    });
});