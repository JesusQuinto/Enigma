'use strict';

app.directive('onlyAlpha', function () {
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
});