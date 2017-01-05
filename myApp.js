angular.module('ItemApp', [])
  .controller('ItemListController', function($scope) {
    $scope.itemList = [];
    $scope.selectionCounter = 0;
    $scope.singleSelection = false;
    $scope.gross = 0;
    $scope.vat = 0;
    $scope.vat_value = 1;
    $scope.total = 0;
    $scope.totalWords = "";
    $scope.printer = 0;
 
    $scope.additem = function() {
      $scope.itemList.push({name:$scope.itemName, qty:$scope.itemQty, rate:$scope.itemRate, gross:$scope.itemQty * $scope.itemRate, done:false});
      $scope.gross = $scope.gross + $scope.itemQty * $scope.itemRate;
      $scope.vat = Math.round(($scope.gross * $scope.vat_value / 100) *100) / 100;
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

        $scope.receiptUpdate();
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


    $scope.receiptUpdate = function(){
      $scope.gross = 0;
      angular.forEach($scope.itemList, function(item) {
          $scope.gross = $scope.gross + item.gross;
      });
      $scope.vat = Math.round(($scope.gross * $scope.vat_value / 100) *100) / 100;
      $scope.total = $scope.gross + $scope.vat;
      $scope.totalWords = $scope.inwords($scope.total);
      alert($scope.totalWords);
    }


    $scope.inwords = function (num) {
      alert(num);
      num = Number(num);
      var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
      var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

      if ((num = num.toString()).length > 9) return 'overflow';

      n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return; 
      var str = '';
      alert(11);
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
      return str;
    }


    $scope.printPage = function(){
      $scope.printer = !$scope.printer;
    }

});
