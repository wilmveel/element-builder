elementModule.directive('elementViewHtml', function ($compile, $http) {
    return {
        restrict: 'E',
        scope: { value: '=' },
		link: function(scope, element, attrs) {
			
			scope.$watch('value', function(){
				
				console.log("Rerender Html");
				var html = renderElement (scope.value);
				
				element.html('<pre class="prettyprint">'  + escapeHtml(html) + '</pre>'	);
			
				$compile(element.contents())(scope); 
			}, true);
			
		} 
    }
	
	function renderElement (elements){
		var html = "";
		
		for (var i=0;i<elements.length;i++){
 			element = elements[i];
			var template;
			
			// get template
			jQuery.ajax({
				url: 'element/' + element.template + '.html',
				success: function(data) {
					template = data;
				},
				async:false
			});
			
			// replace data variables
			template = template.replace('{{id}}', element.id);
			template = template.replace('{{name}}', element.name);
			for (var key in element.data) {
			  if (element.data.hasOwnProperty(key)) {
				template = template.replace('{{data.' + key + '}}', element.data[key]);
			  }
			}
			
			// inject angular variables
			template = $(template);
			if(element.angular){
				template.find("[ng-bind]").attr("ng-bind", element.angular.bind);
				template.find("[ng-model]").attr("ng-model", element.angular.model);
				template.find("[ng-click]").attr("ng-click", element.angular.click);
			}
			
			// inject validation variables
			console.log("Pietertje", element);
			if(element.validation){
				angular.forEach(element.validation, function(value, key){
					console.log("Add validator preview", value, key);
					key = key.replace(/[A-Z]/g, function(ch){return "-" + ch.toLowerCase()});
					if(value.value){
						template.find("[element-validate]").attr(key, value.value);
					}else{
						template.find("[element-validate]").attr(key, true);
					}
				});
				template.find("[element-validate]").removeAttr("element-validate");
			}
			
			if(element.elements){
				var child = renderElement (element.elements);
				template.find('element-include').replaceWith(child);
			}
			
			template = template.prop('outerHTML');
			console.log(template);
			
			html += template;
			
		}	

		return html;
	}
	
	function escapeHtml(text) {
	  return text
		  .replace(/&/g, "&amp;")
		  .replace(/</g, "&lt;")
		  .replace(/>/g, "&gt;")
		  .replace(/"/g, "&quot;")
		  .replace(/'/g, "&#039;");
	}
});