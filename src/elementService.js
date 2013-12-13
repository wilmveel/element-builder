elementModule.service('elementService', function($http, $rootScope) {
	
	// Array of elements
	this.elements = new Array();
	
	this.getElements = function(){
		return this.elements;
	}
		
	// Element in focus for editing
	this.element;
	
	// the element that is current draged or droped
	this.dragElement;
	this.dropElement;
		
	// true when drag is active
	this.dragActive = false;

	this.switchElement = function(dragElement, dropElement) {
		this.dragElement = dragElement;
		this.dropElement = dropElement;
		
		// Find elements in json
		var dragElementFound = this.findElement(this.elements, dragElement);
		var dropElementFound = this.findElement(this.elements, dropElement);
		console.log("Found", dragElementFound, dropElementFound);
		
		// Switch positions
		dragElementFound.data[dragElementFound.i] = dropElement;
		dropElementFound.data[dropElementFound.i] = dragElement;
		
		$rootScope.$broadcast("element-update");
	};
	
	this.removeElement = function(dragElement) {
		this.dragElement = dragElement;
		
		var dragElementFound = this.findElement(this.elements, dragElement);
		
		dragElementFound.data.splice(dragElementFound.i, 1);
		
		$rootScope.$broadcast("element-update");
	}
	
	this.addElement = function(dragElement, dropElement) {
		this.dragElement = dragElement;
		this.dropElement = dropElement;
		
		// genarete id for new element
		dragElement = generateid(dragElement);
		
		// Find drop element
		var dropElementFound = this.findElement(this.elements, dropElement);
		
		// add to element
		if(dropElementFound){
			if(!(dropElementFound.data[dropElementFound.i].elements instanceof Array)){
				dropElementFound.data[dropElementFound.i].elements = new Array();
			}
			
			dropElementFound.data[dropElementFound.i].elements.push(dragElement);
			console.log("AddElement", dragElement, dropElementFound.data[dropElementFound.i]);
		
		// add to canvas
		}else{
			this.elements.push(dragElement);
		}
		
		$rootScope.$broadcast("element-update");
	}
	
	this.replaceElement = function(dragElement) {
		this.dragElement = dragElement;
		
		// Find drop element
		var dragElementFound = this.findElement(this.elements, dropElement);
		
		dragElementFound.data[dragElementFound.i] = dragElement;
		console.log("replaceElement", dragElement, dragElementFound.data[dragElementFound.i]);
		
		$rootScope.$broadcast("element-update");
	}
	
	this.findElement = function(elements, elment) {
        for (var i in elements) {
            console.log(elements[i]);
            if(elements[i].id && elements[i].id == elment.id){
				console.log("Found");
                return {"data" : elements, "i": i};
			}
			if (typeof(elements[i].elements) == 'object') {
				var retVal = this.findElement(elements[i].elements, elment);
				if (typeof retVal!='undefined') {
					console.log("retVal");
					return retVal;
				}
			}
		}
	};
	
	generateid = function(element){
		
		// generate unique id for new element
		var uniqid = Date.now();
		element.id = uniqid;
		
		console.log("Log id", element.id);
		
		if(element.elements instanceof Array){
			for(var i=0; i < element.elements.length; i++){
				element.elements[i] = generateid(element.elements[i]);
			}
		}
		
		return element;
		
	};
		
});