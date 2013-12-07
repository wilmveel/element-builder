elementModule.directive('elementDrop', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		link : function(scope, iElement){
		// watch drag and drop behavoure change when selected is changed
		scope.$watch('selected', function(newValue, oldValue) {
			
			//console.log("I element is selected in elementDrag", scope.value);
		
			//make dropable when selected
			if(newValue){
				if(scope.selected){
					iElement.droppable({
						disabled: false,
						drop:function(event,ui) {
							
							console.log("EVENT",  event, ui); 
							
							// Set drop element
							elementService.dropElement = scope.value;

							var dragElement = elementService.dragElement;
							var dropElement = elementService.dropElement;
							
							console.log("dragdrop-drop",  elementService.dragElement, elementService.dropElement); 

							if(dragElement.id){
								scope.switchElement(dragElement, dropElement);
								scope.$emit("element-move", dragElement, dropElement);
							}else{
								var dragElement = angular.copy(dragElement);
								scope.addElement(dragElement, dropElement);
								scope.$emit("element-add", elementService.dragElement, dropElement);
							}
														
							angular.element(this).removeClass("drop-active");
														
							scope.$apply();
						},
						
						over:function(event,ui) {
							angular.element(this).addClass("drop-active");

							console.log("dragdrop-over", elementService.dragElement, elementService.dropElement); 
							
							scope.$apply();
						},
						
						out:function(event,ui) {
							angular.element(this).removeClass("drop-active");
							
							console.log("dragdrop-out", elementService.dragElement, elementService.dropElement); 
							
							scope.$apply();
						}
					  });
				}
			}
			
			// Remove dropable when not selected
			if(oldValue){
				console.log("Disable drop", scope.drop);
				iElement.droppable('disable');
			}
		});
	}}
});
		