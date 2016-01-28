define( [
	"../utilities/PropertyDescriptors"
], function module (
	def
) {
	"use strict";

	let prototype = Object.create( HTMLElement.prototype );
	const INPUT_ID = "valueInput";

	let template = `
		<style>
			input {
			}
		</style>
		<input type="checkbox" id="${ INPUT_ID }">
		</input>
	`;

	def.Properties( prototype, {
		createdCallback ( ) {
			this.createShadowRoot().innerHTML = template;
		},
		setValue ( bool ) {
			this.value = bool;
		},
		attachedCallback ( ) {
			this.input.addEventListener( "change", this );
		},
		detachedCallback ( ) {
			this.input.removeEventListener( "change", this );
		},
		handleEvent ( event ) {
			if ( event.type === "change" ) this.dispatchEvent( new CustomEvent( "change", {
				detail : {
					value : this.input.checked
				}
			}));
			
		},

	});

	def.Getters( prototype, {
		input ( ) {
			return this.shadowRoot.getElementById( INPUT_ID );
		}
	});

	def.GetterSetters( prototype, {
		value ( ) {
			return this.input.checked;
		}
	},{
		value ( bool ) {
			this.input.checked = bool;
		}
	});

	return document.registerElement( "al-boolean-value", {
		prototype
	});
});