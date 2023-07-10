(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchTerm = "";
  menu.flag = true;

    menu.logMenuItems = function () {
      menu.flag = MenuSearchService.valContent(menu.searchTerm);
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

      promise.then(function (response) {
        console.log(response.data);
        MenuSearchService.addItem(response.data,menu.searchTerm);
      })
      .catch(function (error) {
        console.log(error);
      })

      menu.found = MenuSearchService.getItems();
    };

    menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
    menu.found = MenuSearchService.getItems();
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var found = [];
  var flag;

  service.getMatchedMenuItems = function (searchTerm) {
  found = [];
  var response = $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json"),
    params: {
      description: searchTerm
    }
  });

  return response;
  };

  service.addItem = function (response,searchTerm) {
    var foundAux = {};
    foundAux = response;

    if (searchTerm.length > 0){
      for (var i = 0; i < Object.keys(foundAux).length; i++) {

        for (var j = 0; j < Object.values(foundAux)[i]['menu_items'].length; j++) {
          var description = Object.values(foundAux)[i]['menu_items'][j]['description'];

            if (description.indexOf(searchTerm) !== -1){

              var item = {
                name: Object.values(foundAux)[i]['menu_items'][j]['name'],
                short_name: Object.values(foundAux)[i]['menu_items'][j]['short_name'],
                description: Object.values(foundAux)[i]['menu_items'][j]['description']
              };

              found.push(item);
            }
        }
      }
    } else {
      flag = false;
    }

  };

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return found;
  };

  service.valContent = function (searchTerm) {
    if (searchTerm.length == 0){
      return false;
    }
    return true;
  };
}

})();
