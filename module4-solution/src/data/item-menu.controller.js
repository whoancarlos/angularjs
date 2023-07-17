(function () {
'use strict';

angular.module('data')
.controller('ItemMenuController', ItemMenuController);

ItemMenuController.$inject = ['MenuDataService','$stateParams','categories'];
function ItemMenuController(MenuDataService,$stateParams,categories) {
  var itemMenu = this;
  var short_name = categories[$stateParams.itemId].short_name;
  var category = categories[$stateParams.itemId].name;

  itemMenu.items = [];
  itemMenu.current_category = category;

  var promise = MenuDataService.getItemsForCategory(short_name);

  promise.then(function (response) {
    itemMenu.items = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

}

})();
