angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

       // $urlRouterProvider.otherwise('/insert');
        $stateProvider.state('insert',{
           url: '/insert',
            templateUrl: 'html/london.html'

        }).state("editData",{
            url : '/editData',
            templateUrl: '../html/editData.html'
        })
            .state("display",{
                url : '/display',
                templateUrl: '../html/home.html'
            });
    }]);