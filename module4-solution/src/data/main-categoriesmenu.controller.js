(function () {
'use strict';

angular.module('data')
.controller('MainCategoriesMenuController', MainCategoriesMenuController);


MainCategoriesMenuController.$inject = ['MenuDataService'];
function MainCategoriesMenuController(MenuDataService) {
  var mainCategories = this;
  mainCategories.categories = [];

  var promise = MenuDataService.getAllCategories();

  promise.then(function (response) {
    mainCategories.categories = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}

})();
