var app=angular.module('app',['ngRoute']);

app.controller('LoginController',LoginController);
LoginController.$inject = ['$scope','$http','$window'];

function LoginController($window,$scope,$http) {
    var vm=this;
    vm.login = function () {

       // $window.location.href = '../html/addData.html';
        // $location.path('../html/addData.html');
    }

}

app.controller('RegisterController',RegisterController);
RegisterController.$inject = ['$scope','$http'];

function RegisterController($scope,$http) {
    var vm = this;

    vm.register = function (obj) {
        var fd = new FormData();
        fd.name=obj.name;
        debugger;
        fd.filename = $scope.myFile;
        debugger;
        $http.post('/register'+fd).then(function (response) {
           console.log("data added");
            // $window.location.href = '../html/login.html';
        });
        // $location.path('../html/addData.html');
    }

}
