// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('GoogleMapsCtrl',function($scope,$ionicPlatform,$ionicMap){
            $scope.data = {
            address:"Tap for address"
            }
            
            $scope.gotoMyLocation = $ionicMap.gotoMyLocation;
            
            $scope.setCenterLocation = function(){
            $ionicMap.setCenterLocation(function(address){
                $scope.data.address = address
                $scope.$digest();
            })
        }
    
})
.directive("ionMap",function($ionicPlatform,$ionicMap){
    return{
        restrict: 'AEC',
        link:function(scope, element, attrs){
            $ionicPlatform.ready(function(){
                
                var div = document.createElement('div');
                div.style.width = attrs.width;
                div.style.height = attrs.height;
                
                element.append(div);
                $ionicMap.init(div);
            })
        }
    }
    
})

.factory('$ionicMap', function($ionicPlatform){
    var map = {},
        centerLoc = {};
    
    return {
        init:function(div){
           $ionicPlatform.ready(function(){
               map = plugin.google.maps.Map.getMap(div);
               
               map.addEventListener(plugi.google.maps.event.MAP_READY,function(){
                   console.log('MAP_READY');       });
               
               map.on(plugin.google.maps.event.CAMERA_CHANGE,function(position){
                   centerLoc = postion;
               });
           }) ;
            return
        },
        
        getMap:map,
        gotoMyLocation:function(){
           map.getMyLocation(function(location){
               var msg = ["current your location:\n", "latitude:"+location.latLng.lat, "longitude:"+location.latLng.lng].join("\n");
               
               map.moveCamera({
                   'target':location.latLng,
                   'zoom':15
               });
               
               map.addMarker({
                   'position':location.latLng,
                   'title':msg
               },function(marker){
                   marker.showIfoWindow();
               })
               }) 
        },
        setCenterLocation:function(callback){
            if(centerLoc.hasOwnProperty('target')){
                var msgCenter = ["latitude:"+ centerLoc.target.lat,
                                 "longitude:"+centerLoc.target.lng].join("\n");
                 map.addMarker({
                   'position':centerLoc.target,
                   'title':msgCenter
               },function(marker){
                   marker.showIfoWindow();
               });
                
                var request = {
                    'position':centerLoc.target
                };
                
                plugin.google.maps.Geocoder.geocode(request,function(results){
                    if(results.length){
                        var result = results[0];
                        var position = result.postion;
                        
                        var address = [
                            result.thoroughfare || "",
                            result.locality || "",
                            result.adminArea || "",
                            result.postalCode || "",
                            result.country || ""].join(", ");
                            callback(address)
                        }
                        else{
                            console.log("Not Found");
                        }
                    });
                }else{
                     console.log("No location defined");    
                    }
        }
    }
});
