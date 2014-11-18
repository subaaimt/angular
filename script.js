// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
    console.log($routeProvider);
    $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'pages/home.html',
                controller: 'mainController'
            })

            // route for the about page
            .when('/add', {
                templateUrl: 'pages/form.html',
                controller: 'addController'
            })
            .when('/edit/:id', {
                templateUrl: 'pages/form.html',
                controller: 'addController'
            })
            // route for the contact page
            .when('/contact', {
                templateUrl: 'pages/contact.html',
                controller: 'contactController'
            });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $http, $location, $route) {

    $scope.delete = function(id) {
        var msg = confirm('Are you sure to delete this record.');
        if (msg) {
            $http.get("http://localhost/webservice/empwebservice.php?del=" + id)
                    .success(function(response) {
                        $location.path('/');
                        $route.reload();
                    });
        }
        ;
    }

    $http.get("http://localhost/webservice/empwebservice.php")
            .success(function(response) {
                $scope.employees = response;
            });
});

scotchApp.controller('addController', function($scope, $http, $routeParams, $location) {

    if ($routeParams.id) {
        $scope.id = $routeParams.id;
        $scope.action = "Update";
    } else {
        $scope.id = "";
        $scope.action = "Add";
    }

    if ($scope.id) {

        $http.get("http://localhost/webservice/empwebservice.php?id=" + $scope.id)
                .success(function(response) {
                    $scope.employees = response;
                });

    }

    $scope.addEmployee = function(emp) {
        emp['id'] = $scope.id;
        $http.post("http://localhost/webservice/empwebservice.php", emp)
                .success(function(response) {
                    $location.path('/');

                });
    };

});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});