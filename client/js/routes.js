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
});