'use strict';

app
.directive('onlyAlpha', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var alpha = val.replace(/[^a-zA-Z]/g, '');

            if (alpha !== val) {
              ctrl.$setViewValue(alpha);
              ctrl.$render();
            }
            return alpha;
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
})
.directive('capitalize', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      var capitalize = function(inputValue) {
        if (inputValue == undefined) inputValue = '';
        var capitalized = inputValue.toUpperCase();
        if (capitalized !== inputValue) {
          modelCtrl.$setViewValue(capitalized);
          modelCtrl.$render();
        }
        return capitalized;
      }
      modelCtrl.$parsers.push(capitalize);
      capitalize(scope[attrs.ngModel]); // capitalize initial value
    }
  };
});