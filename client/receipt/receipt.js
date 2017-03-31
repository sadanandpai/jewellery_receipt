(function(){

var app = angular.module('JewelApp');
  app.controller('ReceiptEntryController',ReceiptEntryController)

  function ReceiptEntryController(jewelService,$scope, $http,$window) {
    $scope.itemList = [];
    $scope.selectionCounter = 0;
    $scope.singleSelection = false;
    $scope.gross = 0;
    $scope.vat = 0;
    $scope.vat_value = 1;
    $scope.total = 0;
    $scope.totalWords = "";
    $scope.printer = 0;
    $scope.invoice = 0;
    $scope.date_of_purchase ='';
    $scope.seller= '1st Floor, Sri Ramakrishna Tower\nBadagupet, Corporation Road, Udupi - 576 101\nMobile: 9844295619, 8880651106\nTIN : ';
    $scope.buyer= '';

    $http.get("http://localhost:3000/count/jewel").then(function (response) {
        $scope.invoice = "000"+ (response.data.invoiceCount + 1);
        $scope.seller_buyer_change();
    });

    $scope.additem = function() {
      $scope.itemList.push({name:$scope.itemName, qty:$scope.itemQty, rate:$scope.itemRate, gross:Math.round(($scope.itemQty * $scope.itemRate) * 100) / 100, done:false});
      $scope.receiptUpdate();
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
      $scope.receiptUpdate();
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

        $scope.selectionCount();
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
      if(isNaN($scope.vat_value)){
        $scope.vat_value = 0;
      }
      angular.forEach($scope.itemList, function(item) {
          $scope.gross = $scope.gross + item.gross;
      });
      $scope.gross =  Math.round($scope.gross * 100) / 100;
      $scope.vat = Math.round(($scope.gross * $scope.vat_value / 100) *100) / 100;
      $scope.total = Math.round($scope.gross + $scope.vat);
      $scope.totalWords = $scope.inwords($scope.total);
    }


    $scope.inwords = function (num) {
      num = Number(num);
      var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
      var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

      if ((num = num.toString()).length > 9) return 'overflow';

      n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return; 
      var str = 'Rupees ';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
      return str + ' only';
    }


    $scope.printPage = function(){
     //$scope.printer = !$scope.printer;
     
     if($scope.itemList.length < 1){
       alert("Please add Atleast one item" + $scope.date_of_purchase + "d");
     }else if($scope.date_of_purchase == ""){
       alert("Please set the date");
     }else{
       insert_record();
       $window.location.href = 'preview/preview.html';
     }
     
     //$window.open('http://localhost:3000/preview/preview.html');


  };

    $scope.seller_buyer_change = function(){
       $("#seller_details").html("<font size='3x'><b>Chaitrali Gold</b></font><br><font size='2x'><b>Gold & Silver Melting Shop</b></font><br>" + $scope.seller.replace(/\r?\n/g, '<br />'));
       $("#buyer_details").html("<u>Buyer</u><br>" + $scope.buyer.replace(/\r?\n/g, '<br />'));
    };


    $scope.comma_seperator = function (amount) {
        str = String(amount.toFixed(2)).split(".");
        len = str[0].length;
        if(len == 4)
          str[0] = str[0][0] + "," + str[0][1]+str[0][2]+str[0][3];
        else if(len == 5)
          str[0] = str[0][0]+str[0][1] + "," + str[0][2]+str[0][3]+str[0][4];
        else if(len == 6)
          str[0] = str[0][0] + "," + str[0][1]+str[0][2] + "," + str[0][3]+str[0][4]+str[0][5];
        else if(len == 7)
          str[0] = str[0][0]+str[0][1] + "," + str[0][2]+str[0][3] + "," + str[0][4]+str[0][5]+str[0][6];
        else if(len == 8)
          str[0] = str[0][0] + "," + str[0][1]+str[0][2] + "," + str[0][3]+str[0][4] + "," + str[0][5]+str[0][6]+str[0][7];
        else if (len == 9)
          str[0] = str[0][0]+str[0][1] + "," + str[0][2]+str[0][3] + "," + str[0][4]+str[0][5] + "," + str[0][6]+str[0][7]+str[0][8];

        return str[0] + "." + ((str[1] != undefined) ? str[1] : '00');
    }



function insert_record(){

    var receiptData = { 
                invoice_num: $scope.invoice,
                buyer: $scope.buyer,
                seller: $scope.seller,
                items : $scope.itemList,
                total_items: $scope.itemList.length,
                vat:$scope.vat,
                vat_value:$scope.vat_value,
                date_of_purchase: $scope.date_of_purchase.toString(),
                gross:$scope.gross,
                total_amt: $scope.total,
                total_words: $scope.totalWords
              };
      
      console.log(receiptData);
      localStorage.clear();
      localStorage.setItem('previewItem',JSON.stringify(receiptData));
      console.log(localStorage);

      var promise = jewelService.insert_record(receiptData);
      promise.then(function(res){
        alert("Receipt saved");
        return receiptData;
      })
      .catch(function(err){
        console.log(err);
      });

}

};

})();