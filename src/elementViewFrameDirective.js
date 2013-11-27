elementModule.directive('elementViewFrame', function ($compile, $http, elementService) {
    return {
        restrict: 'E',
		scope: { value: '=' },
		controller: "elementController",
		link: function(scope, element, attrs) {
			
			var template = '<element ng-repeat="element in value" value="element" render="\'frame\'"/>';
			
			element.html(template);
			element.addClass("element-frame");
			$compile(element.contents())(scope); 
			
		} 
    }
	
	
});