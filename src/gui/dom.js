define.dependencies = [
	"../utilities/PropertyDescriptors"
];

if ( !document.registerElement ) define.dependencies.push( "../../../lib/bower_components/webcomponentsjs/webcomponents.min" );

define ( define.dependencies, function module (
	def
) {

	"use strict";

	class DOM {

		static createTemplateShadow( element, template ) {
			element.createShadowRoot().appendChild( document.importNode( template.content, true ) );
		}
		static createStringShadow( element, template ) {
			let shadowRoot = element.createShadowRoot();
			shadowRoot.innerHTML = template;
		}
	}

	class StyleString {
		constructor ( cssText ) {
			let style = document.createElement( "style" );
			style.innerHTML = cssText;

			return style;
		}
	}

	class Template {
		constructor ( children ) {

		}
	}

	def.Properties( DOM, {
		StyleString	
	}, def.CONFIGURABLE );

	return DOM;
});


delete define.dependencies;