	elementModule.directive('elementViewCanvas', function ($compile, $http, elementService) {
    return {
        restrict: 'E',
		scope: { value: '=' },
		controller: "elementController",
		link: function(scope, element, attrs) {
			
			var template = '<div class="element-view-canvas" element-drop="true" ng-click="select($event)">';
			template += '<element ng-repeat="element in value" value="element" />';
			template += '<div class="border" ng-show="selected" ></div>';
			
			template += '<div ng-hide="value" class="please">Please Drag Element</div>';
			
			template += "<div class='plop' ng-show='selected'>"
			template += "<span class='text'>Canvas</span>";
			template += "</div>";
			template += '</div>';

			
			element.html(template);
			element.addClass("element-canvas");
			$compile(element.contents())(scope); 
			
		} 
    }

});