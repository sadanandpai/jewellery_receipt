(function() {
    var app = angular.module('JewelApp',['ui.router','Jewel.Service']);

    app.config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

    
        $urlRouterProvider.otherwise('/');

    
        $stateProvider

    
        .state('home', {
            url: '/',
            templateUrl: 'home/home.html'
        })
        .state('receipt', {
            url: '/receipt',
            templateUrl: 'receipt/receipt.html'
            })
        .state('receipt_list',{
            url: '/receipt_list',
            templateUrl: 'receipt_list/receipt_list.html'
        })
        .state('preview',{
            url: '/preview',
            templateUrl: 'preview/preview.html',
            params: {}
        });

        // .state('labour_list', {
        //     url: '/labour_list',
        //     templateUrl: 'labour_list/labour_list.html'
        // })
        // .state('labour_entry', {
        //     url: '/labour_entry',
        //     templateUrl: 'labour_entry/labour_entry.html'
        // });
    }



})();