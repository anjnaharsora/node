// controllers.js
angular
    .module('app')
    .controller('languageCtrl', languageCtrl)
    .controller('MainController',MainController)
    .controller('UpdateController',UpdateController)
    .directive('fileModel',fileModel);

MainController.$inject=['$scope','$http','$uibModal'];
function MainController($scope,$http,$uibModal) {

    $http.get("http://localhost:8087/getState").then(function (response) {
        $scope.states = response.data;
    });
    $http.get("http://localhost:8087/displayData").then(function (response) {

        $scope.dispdata = response.data;

    });

    $scope.getCity = function () {
        var id = $scope.state;
        $http.get("http://localhost:8087/getCity/" + id).then(function (response) {
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

        $http.get("http://localhost:8087/displayData").then(function (response) {

            $scope.dispdata = response.data;

        });
    };

    $scope.deleteData = function (id) {
        $http.delete("http://localhost:8087/deleteData/" + id).then(function () {
            console.log("data deletes");
        });
        $http.get("http://localhost:8087/displayData").then(function (response) {

            $scope.dispdata = response.data;

        });
    };

    $scope.editData = function (id) {
        $http.get("/getData/" + id).then(function (response) {
            $scope.getdata = response.data;

            var myvar = $uibModal.open({
                method: 'post',
                templateUrl: '../views/update.html',
                controller : 'UpdateController'
            });
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
        $http.post("http://localhost:8087/updateData", data).then(function (response) {
            console.log(response);
        });

        $http.get("http://localhost:8087/displayData").then(function (response) {

            $scope.dispdata = response.data;

        });
    };

}

UpdateController.$inject=['$scope','$http','$uibModalInstance'];
function UpdateController($scope,$http,$uibModalInstance){}

fileModel.$inject = ['$parse'];
function fileModel($parse) {
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
}

languageCtrl.$inject = ['$translate', '$scope'];
function languageCtrl($translate, $scope) {
    function checkLanguage(languages, langKey) {
        languages.map(function (language) {
            if (language.langKey == langKey) {
                $scope.flag = language.flag;
                $scope.lang = language.lang;
                return language
            } else {

                return null
            }
        });
    }

    var languages = [
        {
            lang: 'Polish',
            langKey: 'pl',
            flag: 'Poland.png'
        },
        {
            lang: 'English',
            langKey: 'en',
            flag: 'United-Kingdom.png'
        },
        {
            lang: 'Español',
            langKey: 'es',
            flag: 'Spain.png'
        }
    ];
    $scope.languages = languages;
    checkLanguage(languages, $translate.use());
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        checkLanguage(languages, langKey)
    };
}
