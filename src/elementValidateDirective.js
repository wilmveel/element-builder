elementModule.directive('elementValidate', function ($compile, $http, elementService) {

	return {
		restrict: 'A',
		link : function(scope, element){
						
			if(scope.value.validation){
				angular.forEach(scope.value.validation, function(value, key){
					console.log("Add validator", value, key);
					if(value.value){
						element.attr(key, value.value);
					}else{
						element.attr(key, true);
						console.log("Add validator true");
					}
				});
			}
			
		}
	}	
});