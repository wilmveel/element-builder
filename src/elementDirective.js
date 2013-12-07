elementModule.directive('element', function ($compile, $http, elementService) {

	return {
		restrict: 'E',
		scope: {
			value: '=',
			render: '='
		},	
		controller: "elementController",
		link : function(scope, element){
			
			console.log("link element", scope.value);
			
			// set element class
			element.addClass("element");
			
			// Render frame view
			if(scope.render == "frame"){
			
				console.log("render frame");
			
				var inculude = $("<element-include />");
			
				
				var span = $("<div class='text'>" + scope.value.template + ":" + scope.value.id + "</div>");				
				var edit = $('<a class="edit" href="" ng-click="editElement($event, value)"><span class="glyphicon glyphicon-cog"></span></a>');

				var frame = $("<div />");
				frame.addClass("frame");
				frame.attr("ng-click", "select($event)");
				frame.attr("ng-class", "{selected: selected}");
				frame.attr("element-drag", "true");
				frame.attr("element-drop", "true");
				frame.append(span);
				frame.append(edit);
				frame.append(inculude);
				
				element.append(frame);
				
				$compile(element.contents())(scope); 
				
			// render design view
			}else{
				//Watch data change to update scope with values
				scope.$watch("value", function(){
					console.log("value change");

					scope.id = scope.value.id;
					scope.name = scope.value.name;
					scope.data = scope.value.data;
					scope.validation = scope.value.validation;
					scope.angular = scope.value.angular;

				}, true);
				
				scope.$watch("value.angular", function(){
					console.log("value change");
					
				}, true);
								
				// Watch template for changes
				scope.$watch("value.template", function(){
					// get the template and add html tages to enable drag and drop
					$http.get('element/' + scope.value.template + '.html').success(function(html){
						
						console.log("Loaded template: " + scope.value.template);
						
						template = $(html);
						
						//angular
						if(scope.angular){
							template.find("[ng-bind]").attr("ng-bind", scope.angular.bind);
							template.find("[ng-model]").attr("ng-model", scope.angular.model);
							template.find("[ng-click]").attr("ng-click", scope.angular.click);
						}
						
						template.addClass("template");
						template.attr("ng-click", "select($event)");
						scope.template = template;
						
						var attributes = $("<div/>");
						attributes.attr("ng-style", "getDimension()");
						attributes.attr("element-drag", "true");
						attributes.attr("element-drop", "true");
						attributes.attr("ng-show", "selected");
						attributes.addClass("attributes");
						
						// Plop is box with the id and name of the element which is visible when selected
						plop  = "<div class='plop' ng-show='selected'>"
						plop += "<a href='' ng-click='editElement($event, value)'>";
						plop += "<span class='glyphicon glyphicon-cog'></span> ";
						plop += "<span class='text'>" + scope.value.template + "</span>";
						plop += "</a>";
						plop += "</div>";
						attributes.append(plop);
						
						// Border is inside the element to indicate that it is selected
						var border = $("<div/>");
						border.addClass("border");
						attributes.append(border);
						
						element.html(attributes);						
						element.append(template);
						
						
						$compile(element.contents())(scope); 
												
					}).error(function(){
						alert("template not found");
					});
				}, true);
			}
			
			//deselect elements by broadcasting
			scope.$on("deselect", function(){
				console.log("deselect", scope.value);
				scope.selected = false;
			});
		}
	}	
});