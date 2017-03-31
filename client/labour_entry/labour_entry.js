(function() {

    var app = angular.module('JewelApp');

    app.controller('LabourEntryController',LabourEntryController);



    function LabourEntryController($scope){

        $scope.new_entry = {};   
        $scope.items = [];
        $scope.addItemName="";
        $scope.addItemQuantity=0;
        itemNo = 1;

        $scope.submit = function() {
            alert("i am abled"); 
        };   
        $scope.add_item = function(){
            
            $scope.items.push({name:$scope.addItemName, qty:$scope.addItemQuantity, del: 0});
            console.log($scope.items);
            $scope.addItemName = "";
            $scope.addItemQuantity=0;


        };
        $scope.delete_item = function(index){
            $scope.items[index].del = true;
            oldItems = $scope.items;
            $scope.items = [];
            angular.forEach(oldItems, function(item){
                if(!item.del){
                    $scope.items.push(item);
                }
            });


       
    
         }


    }

})();