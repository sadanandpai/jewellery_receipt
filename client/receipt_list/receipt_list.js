(function(){

    var app = angular.module('JewelApp');

    app.controller('ReceiptListController', ReceiptListController) ;

    ReceiptListController.$inject = ['jewelService','$scope','$window'];
    function ReceiptListController(jewelService,$scope,$window) {

        $scope.receiptArray = [];
        
        this.$onInit = function(){
          GetReceiptArray();
        };

        //Get all receipt
        GetReceiptArray = function(){
            var promise = jewelService.get_data();
            promise.then(function(response){
                $scope.receiptArray = response.data;
                console.log($scope.receiptArray);
            });
            promise.catch(function(error){
                console.log(error);
            });
        };

        $scope.delete_receipt = function(id){
            console.log(id);
            var promise = jewelService.delete_record(id)
            promise.then(function(){
                console.log('Item deleted');
                GetReceiptArray();
            });
            promise.catch(function(error){
                console.log(error);
            });
        };
        
        // to be implemented
        $scope.print_view = function(index){
            //$scope.printer = !$scope.printer;
             localStorage.clear();
             localStorage.setItem('previewItem',JSON.stringify($scope.receiptArray[index]));
             console.log(localStorage);
             $window.location.href = 'preview/preview.html';
             //$window.open('http://localhost:3000/preview/preview.html');

        };

    }


})();