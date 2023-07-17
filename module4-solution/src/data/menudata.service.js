(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // List of categories
  var items = [];

  service.getAllCategories = function () {
     var response = $http({
       method: "GET",
       url: (ApiBasePath + "/categories.json")
     });

     return response;
   };

   service.getItemsForCategory = function (categoryShortName) {
   var response = $http({
     method: "GET",
     url: (ApiBasePath + '/menu_items/' + categoryShortName + '/menu_items.json')
   });

   return response;
   };
}

})();
