import def from "../utilities/PropertyDescriptors.js";

export default class DOM {

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
