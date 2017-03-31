(function(){

    app = angular.module('JewelAppPreview',[]);

    app.controller('previewController', previewController);

    function previewController($scope){

        $onInit = function(){
            $scope.previewItem = angular.fromJson(localStorage.getItem('previewItem'));
            
            var temp_seller = "<font size='3x'><b>Chaitrali Gold</b></font><br><font size='2x'><b>Gold & Silver Melting Shop</b></font><br>" + $scope.previewItem.seller.replace(/\r?\n/g, '<br />');
            $("#seller_details").html(temp_seller.replace('TIN', '<b>TIN'));
            
            var temp_buyer = "<u>Buyer</u><br>" + $scope.previewItem.buyer.replace(/\r?\n/g, '<br />');
            $("#buyer_details").html(temp_buyer.replace('TIN', '<b>TIN'));
            
            $scope.date = new Date($scope.previewItem.date_of_purchase);
            console.log($scope.date);
            console.log($scope.previewItem);
        }
        $onInit();
        


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
    }

})();