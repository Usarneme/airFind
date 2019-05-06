var myApp = angular.module('myApp', [])

myApp.controller("AppController", function($scope, $http, $location) {
  console.log("AppController initialized")

  $scope.getAirports = function() {
    $http({
      method: 'GET',
      url: '/api/airports'
    }).then(function(response) {
      console.log('Angular Airports Controller. Successful get at api/airports')
      // console.dir(response.data)
      $scope.airports = response.data
    }, function(err) {
      console.log(err)
    })
  }

  $scope.findAirports = function() {
    $http({
      method: 'GET',
      url: '/api/airports/state/'+$scope.stateCode
    }).then(function(response) {
      console.log('Angular Airports Controller. Successful get at api/airports/state/'+$scope.stateCode)
      // console.dir(response.data)
      $scope.airports = response.data
    }, function(err) {
      console.log(err)
    })
  }

  $scope.findAirportsByProx = function() {
    var location = {
      distance: $scope.location.distance
    }
    $http({
      method: 'GET',
      url: '/geocode/location?address='+$scope.location.address
    }).then(function(loc_response) {
      console.log('Angular Airports Controller. Successful get at api/airports/state/'+$scope.location.address)
      // console.dir(response.data)
      location.lat = loc_response.locations[0].latitude
      location.long = loc_response.locations[0].longitude
      // POST to api
      $http.post('/api/airports/prox', location)
        .then(function(response) {
          console.log(response.data)
          $scope.airports = response.data
        }, function(err) {
          console.log(err)
        });

    }, function(err) {
      console.log(err)
    })
  }

  // $scope.getCustomer = function() {
  //   var id = $routeParams.id
  //   console.log('Angular Customers Controller. Attempting to GET api/customers/'+id)
  //   $http({
  //     method: 'GET',
  //     url: '/api/customers/'+id
  //   }).then(function(response) {
  //     console.log('Angular Customers Controller. Successful GET at api/customers/'+id)
  //     // console.dir(response.data)
  //     $scope.customer = response.data
  //   }, function(err) {
  //     console.log(err)
  //   })
  // }

  // $scope.addCustomer = function() {
  //   $http({
  //     method: 'POST',
  //     url: '/api/customers',
  //     data: $scope.customer
  //   }).then(function(response) {
  //     console.log('Angular Customers Controller. Successful POST at api/customers')
  //     window.location.href = '#customers'
  //   }, function(err) {
  //     console.log(err)
  //   })
  // }

  // $scope.deleteCustomer = function() {
  //   var id = $routeParams.id
  //   console.log('Angular Customers Controller. Attempting to DELETE api/customers/'+id)
  // }

})
