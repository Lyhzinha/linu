var routerApp = angular.module('LinuUI', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/public/homepage/partial-home.html'
    })

    .state('about', {
        url: '/about',
        templateUrl: '/public/about/partial-about.html'

    });

}); 