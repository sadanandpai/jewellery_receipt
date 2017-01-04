angular.module('ItemApp', [])
  .controller('ItemListController', function($scope) {
    $scope.itemList = [];
    $scope.selectionCounter = 0;
    $scope.singleSelection = false;
    $scope.gross = 0;
    $scope.vat = 0;
    $scope.total = 0;
 
    $scope.additem = function() {
      $scope.itemList.push({name:$scope.itemName, qty:$scope.itemQty, rate:$scope.itemRate, gross:$scope.itemQty * $scope.itemRate, done:false});
      $scope.gross = $scope.gross + $scope.itemQty * $scope.itemRate;
      $scope.vat = Math.round(($scope.gross * 0.1) *100) / 100;
      $scope.total = $scope.gross + $scope.vat;
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

      $scope.gross = 0;
      angular.forEach($scope.itemList, function(item) {
          $scope.gross = $scope.gross + item.qty * item.rate;
      });
      $scope.vat = Math.round(($scope.gross * 0.1) *100) / 100;
      $scope.total = $scope.gross + $scope.vat;
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
      if ($scope.selectionCounter == 1){
        angular.forEach($scope.itemList, function(item) {
            if (item.done){
              item.name = $scope.itemName;
              item.qty = $scope.itemQty;
              item.rate = $scope.itemRate;
              item.gross = item.qty * item.rate;
              $scope.itemName ='';
              $scope.itemQty = '';
              $scope.itemRate ='';
              item.done = !item.done;
            }
        });

        $scope.gross = 0;
        angular.forEach($scope.itemList, function(item) {
          $scope.gross = $scope.gross + item.qty * item.rate;
        });
        $scope.vat = Math.round(($scope.gross * 0.1) *100) / 100;
        $scope.total = $scope.gross + $scope.vat;
      }
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
