
var app = angular.module("myApp",[]);

app.controller("MainController",MainController);

function MainController($scope,$http) {
    $http.get("/getState").then(function (response) {
        $scope.states = response.data;
    });
    $http.get("/displayData").then(function (response) {

        $scope.dispdata = response.data;

    });

    $scope.getCity = function () {
        var id = $scope.state;
        $http.get("/getCity/" + id).then(function (response) {
            $scope.city = response.data;
        })
    };
    $scope.addData = function () {
        var data = {
            name: $scope.name,
            state: $scope.state,
            city: $scope.city,
            gender: $scope.gender,
            email: $scope.email,
            ufile : $scope.myFile.name
        };
        var file = $scope.myFile;
        var uploadUrl = "/multer";
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .then(function () {
                console.log("success!!");

            });

        $http.post("/insertData", data).then(function (response) {
            console.log(response);
        });

        $http.get("/displayData").then(function (response) {

            $scope.dispdata = response.data;

        });
    };

    $scope.deleteData = function (id) {
        $http.delete("/deleteData/" + id).then(function () {
            console.log("data deletes");
        });
        $http.get("/displayData").then(function (response) {

            $scope.dispdata = response.data;

        });
    };

    $scope.editData = function (id) {
        $http.get("/getData/" + id).then(function (response) {
            $scope.getdata = response.data;
        });
    };

    $scope.updateData = function (id) {
        debugger;
        var data = {
            id : id,
            name: $scope.name,
            state: $scope.state,
            city: $scope.city,
            gender: $scope.gender,
            email: $scope.email
        };
        $http.post("/updateData", data).then(function (response) {
            console.log(response);
        });

        $http.get("/displayData").then(function (response) {

            $scope.dispdata = response.data;

        });
    };

}
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

MainController.$inject=['$scope','$http'];