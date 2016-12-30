angular.module('ItemApp', [])
  .controller('ItemListController', function() {
    var itemList = this;
    itemList.items = [];
 
    itemList.additem = function() {
      itemList.items.push({item:itemList.item, qty:itemList.qty, rate:itemList.rate, done:false});
      itemList.item = ''; 
      itemList.qty = ''; 
      itemList.rate = ''; 
    };
 
    itemList.deleteItem = function() {
      var olditems = itemList.items;
      itemList.items = [];
      angular.forEach(olditems, function(item) {
        if (!item.done) itemList.items.push(item);
      });
    };
  });
