var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'html/home.html',
            controller: 'displayController'
        })

        .when('/update', {
            templateUrl: 'html/update.html',
            controller: 'editController'
        })


        .when('/insert', {
            templateUrl: 'html/insert.html',
            controller: 'addController'
        });
});
var uid ;
app.controller('loginController',loginController);
function loginController($scope,$location,$window) {

    $scope.redirect = function(obj){

            if(obj.username=="admin"&&obj.password=="admin"){
                $window.location = "../index.html";
            }
            else if(obj.username==undefined &&  obj.password==undefined){
                alert("insert proper username password");
            }
            else{
                alert("insert proper username password");
            }
        }
}

app.controller('displayController',displayController);

function displayController ($scope,$location,$http) {
    // $scope.data = [{"name":"kinjal","pname":"kinjalm"}];
    // $scope.redirect = function(){
    //     window.location = "index.html";
    // }

    $http.get("http://localhost:8087/displayData").then(function (response) {

        $scope.dispdata = response.data;
    });
    $scope.orderByMe = function(x) {

        $scope.myOrderBy = x;
    };
    $scope.go = function (path,id) {
        // debugger;
        // $http.get("/getData/" + id).then(function (response) {
        //     $scope.getdata = response.data;
        // });
        // debugger;

        uid=id;
        $location.path(path);

    };
    $scope.delete = function (path,id) {
debugger
        $http.delete("http://localhost:8087/deleteData/" + id).then(function () {
            debugger
            console.log("data deletes");
        });
        $location.path(path);

    };
}
displayController.$inject=['$scope','$location','$http'];


app.controller('editController', function($scope,$location,$http) {
    // $scope.data = [{"name":"kinjal","pname":"kinjalm"}];
console.log(uid);

    $http.get("http://localhost:8087/getData/" + uid).then(function (response) {

        $scope.getdata = response.data;

    });

    $scope.go = function (path,obj) {

        var id=obj._id;

        var data = {
            name: obj.name,
            pname: obj.pname
        };
        $http.post("http://localhost:8087/updateData/"+id,data).then(function (response) {
            console.log(response);
        });
        $location.path(path);
    };

});

app.controller('addController', function($scope,$location,$http) {

    $http.get("http://localhost:8087/displayData").then(function (response) {

        $scope.datas = response.data;

    });
    $scope.go = function (path,obj) {

        var data = {
            name: obj.name,
            pname: $scope.obj.pname
        };
        var file = $scope.myFile;
        var uploadUrl = "http://localhost:8087/multer";
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .then(function () {
                console.log("success!!");
            });
        $http.post("http://localhost:8087/insertData", data).then(function (response) {
            console.log(response);
        });
        $location.path(path);
    };
});
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

