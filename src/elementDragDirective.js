elementModule.directive('elementDrag', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		link : function(scope, iElement){
		// watch drag and drop behavoure change when selected is changed
		scope.$watch('selected', function(newValue, oldValue) {
			
			//console.log("Element is selected in elementDrag", scope.value);
			
			// make dragable when selected
			if(newValue){
				if(scope.selected){
					iElement.draggable({
						revert:true,
						revertDuration: 0,
						disabled: false,
						cancel:false,
						start:function(event,ui) {
							console.log("Start draging", scope.value); 
							angular.element(this).addClass("drag-active");
							elementService.dragActive = true;
							elementService.dragElement = scope.value;
							console.log("dragdrop-start", elementService.dragElement, elementService.dropElement); 
							
							scope.$apply();
						},
						stop:function(event,ui) {
							console.log("Stop draging", scope.value); 
							angular.element(this).removeClass("drag-active");
							
							elementService.dragActive = false;
							elementService.dragElement = null;
							console.log("dragdrop-stop", elementService.dragElement, elementService.dropElement); 
							
							scope.$apply();
						}
					});
				}
			}
			
			// delete drageble when not selected
			if(oldValue){
				iElement.draggable('disable');	
			}
		});
	  }
	}
});
		