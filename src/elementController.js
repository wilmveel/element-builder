elementModule.controller('elementController', function($scope, elementService) {

	$scope.selected = false;
	
	// Select the element to drag
	$scope.select = function($event){
		console.log("Selected clicked", $event, elementService.dragActive);
		
		$event.stopPropagation();
		
		// Click only works when drag is not active 
		if(!elementService.dragActive){
			var parent = $scope;
			var selected = null;
			
			while(parent != null){

				console.log("Loop elements: ", parent );
			
				if(parent.selected){
					selected = parent;
				}
				
				if(selected && selected != parent && parent.value){
					selected.selected = false;
					parent.$broadcast("deselect");
					parent.$parent.selected = true;
					selected = parent;
					return;
				}

				parent = parent.$parent;
				
			}
			
			if(selected){
				selected.selected = false;
			}else{
				console.log("Set true");
				$scope.$broadcast("deselect");
				$scope.selected = true;		
			}
		}else{
			elementService.dragActive = false;
		}
	};
	
	// Element transformation actions
	$scope.switchElement = function(dragEl,dropEl){
		console.log("switchElement", "dragEl", dragEl, "dropEl", dropEl);
		elementService.switchElement(dragEl, dropEl);
	}
	
	$scope.addElement = function(dragEl,dropEl){
		console.log("addElement", "dragEl", dragEl, "dropEl", dropEl);
		elementService.addElement(dragEl, dropEl);
	}
	
	$scope.appendElement = function(dragEl,dropEl){
		console.log("appendElement", "dragEl", dragEl, "dropEl", dropEl);
		elementService.appendElement(dragEl, dropEl);
	}
	
	$scope.removeElement = function(elm){
		console.log("RM");
		$scope.element = elementService.dragElement;
		$("#myModal").modal('show');
	}
		
});