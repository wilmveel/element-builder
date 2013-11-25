element-builder
==================

Element builder is a generic library to build user interfaces in a declarative way by using drag and drop. The data mode is specified in json format and is renderd into html by using tempates. This library contains a set of angular directives which can be used to build your own implementation of a UI designer. An example implementation can be found at https://github.com/wilmveel/angular-ui-designer

Data model
------------------
The data specifies the interface in a declarative way. The data model is a nested structure of elements. below an exemple of the data model

```json
{
	"id" : 1,
	"name":"Row",
	"template":"row",
	"data" : {
		"value" : "test...."
	},
	"elements" : [
		...
	],
	"constraints" : {
		...
	}
}
```

- id: an unique id which is used to identify object in the model when they are modified or moved.
- name: every element has a name which is used to represent the objects.
- template: the template is an reference to the partial that is used to render the html.
- data: the data is injected in the view during the rendering.
- elements: contains the child elements this are renderd in the placholder specified in the template else the are placed under the element.
- constraints: Not implemented yet but describes which elements can be nested into each other.

Templates
------------------
Templates are small html file which represents the presentation of the element. A template can be injected with the parameters availible in the data part of the model. Where the data should be inculded is specified with double curly braces. With the element-inculde tag can be specified where the child elements should be included in the view. Below an example of an templates which represents a bootratrap panel.

```html
<div class="panel panel-{{color}}">
	<div class="panel-heading" >{{title}}</div>
	<div class="panel-body">
		<element-include />
	</div>
</div>
```
