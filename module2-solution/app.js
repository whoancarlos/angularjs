(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ShoppingListShowController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showToBuyList = this;

  showToBuyList.items = ShoppingListCheckOffService.getItems();

  showToBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
    showToBuyList.valItems = ShoppingListCheckOffService.valArray(showToBuyList.items);
  };

}

ShoppingListAddController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showBoughtList = this;

  showBoughtList.boughts = ShoppingListCheckOffService.getBoughts();
  showBoughtList.valBoughts = ShoppingListCheckOffService.valArray(showBoughtList.boughts);
}


function ShoppingListCheckOffService() {
  var service = this;

  var valItems = true;
  var valBoughts = true;

  // List of shopping items
  var items = [

    {
      name: "Bags of chips",
      quantity: "3"
    },
    {
      name: "Jars of mayo",
      quantity: "2"
    },
    {
      name: "Pieces of bread",
      quantity: "5"
    },
    {
      name: "Slices of queese",
      quantity: "3"
    },
    {
      name: "Bottles of juice",
      quantity: "6"
    }

  ];

  var boughts = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };

    items.push(item);
  };

  service.removeItem = function (itemIndex) {

    var itemName = items[itemIndex].name;
    var quantity = items[itemIndex].quantity;

    var bought = {
      name: itemName,
      quantity: quantity
    };

    boughts.push(bought);

    items.splice(itemIndex, 1);

  };

  service.getItems = function () {
    return items;
  };

  service.getBoughts = function () {
    return boughts;
  };

  service.valArray = function (array) {
    var valItems;

    if (array.length == 0){
      valItems = false;
    } else {
      valItems = true;
    };

    return valItems;
  };
}

})();
