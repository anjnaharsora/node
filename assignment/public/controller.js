
var app = angular.module("myApp",[]);

app.controller("MainController",MainController);

function MainController($scope,$http) {
        $http.get("/state").then(function (response) {
            $scope.states = response.data;
        });

$scope.getCity = function () {

      var  st = $scope.state;
        $http.get("/city/"+st).then(function (response) {
        $scope.city  = response.data;
    })
};
$scope.addData = function () {

    var fd = new FormData();

    fd.append('name',$scope.name);
    debugger;
    fd.append('state',$scope.state);
    fd.append('city',$scope.city);
    fd.append('gender',$scope.gender);
    fd.append('email',$scope.email);
debugger;

    $http.post("/insert",fd).then(function (response) {
debugger;
        console.log(response);
    debugger;
    })
};


}

MainController.$inject=['$scope','$http'];