elementModule.directive('elementViewCanvas', function ($compile, $http, elementService) {
    return {
        restrict: 'E',
		scope: { value: '=' },
		link: function(scope, element, attrs) {
			
			var template = '<element ng-repeat="element in value" value="element" />';
			
			element.html(template);
			element.addClass("element-canvas");
			$compile(element.contents())(scope); 
			
		} 
    }

});