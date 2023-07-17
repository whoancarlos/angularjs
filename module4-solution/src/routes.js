(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/MenuApp/templates/home.template.html'
  })

  // Premade list page
  .state('mainCategories', {
    url: '/main-categories',
    templateUrl: 'src/MenuApp/templates/main-categoriesmenu.template.html',
    controller: 'MainCategoriesMenuController as mainCategories'
  })

  .state('itemMenu', {
    url: '/item-menu/{itemId}',
    templateUrl: 'src/MenuApp/templates/main-itemsmenu.template.html',
    controller: 'ItemMenuController as itemMenu',
    params: {
      itemId: null
    },
    resolve: {
      categories: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getAllCategories()
                .then(function (response) {
                  return response.data;
                });
            }]
    }
  });
}

})();
