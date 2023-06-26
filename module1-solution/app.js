(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.name = "";
  $scope.totalvalue = 0;
  $scope.messageLunch = "";

  $scope.functionality = function () {
    var lengthString = 0;
    var comma = ",";
    var numberOfSplits = splitString ($scope.name, comma);

    lengthString = $scope.name.length;

    if (lengthString == 0){
      $scope.messageLunch = "Please enter data first";
    }
      else if (lengthString > 0 && numberOfSplits <= 3) {
        $scope.messageLunch = "Enjoy!";
    } else {
      $scope.messageLunch = "Too much!";
    }

  };

  function splitString (stringToSplit, separator){
    const arrayOfStrings = stringToSplit.split(separator);
    return arrayOfStrings.length;
  }
}

})();
