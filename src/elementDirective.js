elementModule.directive('element', function ($compile, $http) {

	return {
		restrict: 'E',
		scope: {
			value: '='
		},	
		controller: "elementController",
		link : function(scope, iElement){
			
			console.log("Init element", scope.value);
			
			// set element class
			iElement.addClass("element");
			if(scope.selected){
				iElement.addClass("selected");
			}
			
			//Set some attributes of the value. should be latere replaced by loop
			scope.reload = function(){
				for (var key in scope.value.data) {
				  if (scope.value.data.hasOwnProperty(key)) {
					scope[key] = scope.value.data[key];
				  }
				}
			}
			scope.reload();
			
			//deselect elements by broadcasting
			scope.$on("deselect", function(){
				console.log("deselect", scope.value);
				scope.selected = false;
			});
						
			// get the template and add html tages to enable drag and drop
			$http.get('element/' + scope.value.template + '.html').success(function(html){
				
				console.log("Load template: " + scope.value.template);
				
				// Genetrate jquery object base on template
				var drag = $(html);
				drag.addClass("drag");
				drag.attr("ng-click", "select($event)");
				drag.attr("element-drag", "true");
				
				// Add extra style class when element is on higes level
				if(!angular.isArray(scope.elements)){
					drag.addClass("drag-top");
				}
				
				// Plop is box with the id and name of the element which is visible when selected
				var plop = $("<div>" + scope.value.id + ":" + scope.value.name + "</div>");
				plop.addClass("plop");
				plop.attr("ng-show", "selected");
				drag.append(plop);
				
				// Border is inside the element to indicate that it is selected
				var border = $("<div/>");
				border.addClass("border");
				border.attr("ng-show", "selected");
				drag.append(border);
				
				// Drop area only active when an item is draged 
				var drop = $("<div />");
				drop.addClass("drop");
				drop.attr("ng-show", "selected");
				drop.attr("element-drop", "true");
				drag.append(drop);
				
				// Add and compile elements
				iElement.html(drag);
				$compile(iElement.contents())(scope); 
				
			});
			
			scope.$watch("value", function(){
				console.log("value change");
				scope.reload();
			}, true);

		}
	}	
});