// Generic functions which can be used everywhere in the project

function renderTemplate(template, element){

		// inject data variables
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
		if(element.validation){
			$.each(element.validation, function(key, value){
				//console.log("Add validator preview", value, key);
				key = key.replace(/[A-Z]/g, function(ch){return "-" + ch.toLowerCase()});
				if(value.value){
					template.find("[element-validate]").attr(key, value.value);
				}else{
					template.find("[element-validate]").attr(key, true);
				}
			});
		}
		template.find("[element-validate]").removeAttr("element-validate");
		
		// inject attribute variables
		if(element.attributes){
			$.each(element.attributes, function(attribute, injectors){
				$.each(injectors, function(key, value){
					key = key.replace(/[A-Z]/g, function(ch){return "-" + ch.toLowerCase()});
					template.find("[element-attributes='validation']").attr(key, value);
				})	;
				
			});
			template.find("[element-attributes]").removeAttr("element-attributes");
			console.log(template);
		}
		

		return template;
	
}