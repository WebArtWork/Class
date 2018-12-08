var directives = {};
app.directive(directives);
var services = {};
app.service(services);
var filters = {};
app.filter(filters);
directives.topbar = function() {
    "ngInject";
    return {
        restrict: 'AE',
        controller: function($scope, modal, $state, user, file, $timeout) {
            $scope.u = user;
            $scope.s = $state;
        },
        templateUrl: '/html/public/topbar.html'
    }
};
app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    var root = '/';
    $stateProvider.state({
        name: 'Explore',
        url: root + 'Explore',
        controller: function($scope, user) {
            "ngInject";
            $scope.u = user;
            console.log("console.log();");
        },
        url: root,
        templateUrl: '/html/public/Explore.html'
    })
}).state({
        name: 'Categories',
        url: root + 'Categories',
        controller: function($scope, user, finance, item, group, modal, file) {
            "ngInject";
            $scope.u = user;
            //$scope.c = category;
        },
        templateUrl: '/html/public/Categories.html'
    }).state({
        name: 'Rooms',
        url: root + 'Rooms',
        controller: function($scope, user, finance, item, group, $state,modal) {
            'ngInject';
            $scope.u = user;
            //$scope.c - category;
        },
        templateUrl: '/html/public/Rooms.html'
    });