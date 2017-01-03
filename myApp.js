angular.module('ItemApp', [])
  .controller('ItemListController', function($scope) {
    $scope.itemList = [
      {name:'aaa', qty:'11', rate:'1212'},
      {name:'bbb', qty:'22', rate:'3434'},
      {name:'ccc', qty:'33', rate:'6767'}
    ];
    $scope.selectionCounter = 0;
    $scope.singleSelection = false;
 
    $scope.additem = function() {
      $scope.itemList.push({name:$scope.itemName, qty:$scope.itemQty, rate:$scope.itemRate, done:false});
      $scope.itemName = '';
      $scope.itemQty = '';
      $scope.itemRate = '';
    };
 
    $scope.deleteItem = function() {
      var olditems = $scope.itemList;
      $scope.itemList = [];
      angular.forEach(olditems, function(item) {
        if (!item.done) $scope.itemList.push(item);
      });
      $scope.selectionCount();
    };

    $scope.editItem = function() {
      if($scope.selectionCounter > 1){
          $scope.itemName ='';
          $scope.itemQty = '';
          $scope.itemRate ='';
      }
      else{
          angular.forEach($scope.itemList, function(item) {
          if (item.done){
            $scope.itemName = item.name;
            $scope.itemQty = item.qty;
            $scope.itemRate = item.rate;
          }
        });
      }
    };


    $scope.updateItem = function() {
      angular.forEach($scope.itemList, function(item) {
        if ($scope.selectionCounter == 1 && item.done){
          item.name = $scope.itemName;
          item.qty = $scope.itemQty ;
          item.rate = $scope.itemRate;
          $scope.itemName ='';
          $scope.itemQty = '';
          $scope.itemRate ='';
        }
      });
    };


    $scope.selectionCount = function() {
      $scope.selectionCounter = 0;
      angular.forEach($scope.itemList, function(item) {
        if (item.done)
          $scope.selectionCounter++;
      });
      if($scope.selectionCounter == 1)
        $scope.singleSelection = true;
      else
        $scope.singleSelection = false;
    };

  });
