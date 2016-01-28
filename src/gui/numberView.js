define( [
	"../utilities/PropertyDescriptors"
], function module (
	def
) {
	"use strict";

	const INPUT_ID = "valueInput";
	
	let prototype = Object.create( HTMLElement.prototype );

	let template = `
		<style>
			input {
				background : inherit;
				color : inherit;
				outline : inherit;
				border : inherit;
				font : inherit;
			}
		</style>
		<input type="number" id="${ INPUT_ID }">
		</input>
	`;

	def.Properties( prototype, {
		createdCallback ( ) {
			this.createShadowRoot().innerHTML = template;
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
					value : this.value
				}
			}));
			
		},
		setValue ( value ) {
			this.value = value;
		}
	});

	def.GetterSetters( prototype, {
		value ( ) {
			return this.input.valueAsNumber;
		}
	},{
		value ( number ) {
			this.input.value = number;
		}
	});

	def.Getters ( prototype, {
		input ( ) {
			return this.shadowRoot.getElementById( INPUT_ID );
		}
	});
	return document.registerElement( "al-number-value", {
		prototype
	});
});