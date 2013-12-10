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
		
		// convert template into jquery object
		template = $(template);
				
		// inject attribute variables
		if(element.attributes){
			$.each(element.attributes, function(attribute, injectors){
				$.each(injectors, function(key, value){
					key = key.replace(/[A-Z]/g, function(ch){return "-" + ch.toLowerCase()});
					template.find("[element-" + attribute + "]").attr(key, value);
					
				});
				template.find("[element-" + attribute + "]").removeAttr("element-" + attribute);
				
			});
			console.log(template);
		}
		

		return template;
	
}