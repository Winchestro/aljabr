define( [
	"../utilities/PropertyDescriptors"
], function module (
	def
) {
	"use strict";

	let prototype = Object.create( HTMLElement.prototype );
	const INPUT_ID = "stringInput";

	let template = `
		<style>
			input {
				background : inherit;
				color : inherit;
				outline : inherit;
				border : inherit;
				font : inherit;
				border : 1px white;
			}
			
		</style>
		"<input type="text" id="${ INPUT_ID }">"
		</input>
	`;

	def.Properties( prototype, {
		createdCallback ( ) {
			this.createShadowRoot().innerHTML = template;
		},
		setValue ( string ) {
			this.value = string;
		}

	});

	def.GetterSetters( prototype, {
		value ( ) {
			return this.shadowRoot.getElementById( INPUT_ID ).value;
		}
	},{
		value ( string ) {
			this.shadowRoot.getElementById( INPUT_ID ).value = string;
		}
	});

	return document.registerElement( "al-string-value", {
		prototype
	});
});