(function () {
'use strict';

angular.module('data')
.component('categoriesMenu', {
  templateUrl: 'src/MenuApp/templates/categoriesmenu.template.html',
  bindings: {
    categories: '<'
  }
});

})();
