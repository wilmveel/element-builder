elementModule.controller('elementController', function($scope, elementService) {

	$scope.selected = false;
	
	$scope.getDimension = function(){
		if($scope.template){
			var demention = {
				"width" : $scope.template.outerWidth(),
				"height" : $scope.template.outerHeight(),
				"margin" : $scope.template.css("margin"),
				"top" : $scope.template.position().top,
				"left" : $scope.template.position().left
			};
			if(demention.width == 0 && demention.height == 0){
				demention.width = "100%";
				demention.height = "100%";
			}
			//console.log("dimension", $scope.template.position(), $scope.value.name, demention);
			return demention;
		}
	}
	
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
					parent.$parent.$broadcast("deselect");
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
	$scope.switchElement = function(dragElement,dropElement){
		console.log("switchElement");
		console.log("switchElement", dragElement, dropElement);
		elementService.switchElement(dragElement, dropElement);
	}
	
	$scope.addElement = function(dragElement,dropElement){
		console.log("addElement");
		console.log("addElement", dragElement, dropElement);
		elementService.addElement(dragElement, dropElement);
		$scope.$emit("element-add", dragElement);
	}
	
	$scope.editElement = function($event, dragElement, dropElement){
		console.log("editElement");
		$event.stopPropagation();
		console.log("edit-element", $event, dragElement, dropElement);
		$scope.$emit("element-edit", dragElement);
	}
	
	$scope.appendElement = function(dragElement,dropElement){
		console.log("appendElement");
		console.log("appendElement", "dragElement", dragElement, "dropElement", dropElement);
		elementService.appendElement(dragElement, dropElement);
	}
	
	$scope.removeElement = function(elm){
		console.log("removeElement");
		$scope.element = elementService.dragElementement;
		$("#myModal").modal('show');
	}
	
	
		
});