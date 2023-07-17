(function () {
'use strict';

angular.module('data')
.component('itemsMenu', {
  templateUrl: 'src/MenuApp/templates/itemsmenu.template.html',
  bindings: {
    items: '<'
  }
});

})();
