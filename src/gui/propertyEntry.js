import def from "../utilities/PropertyDescriptors.js";

let prototype = Object.create( HTMLElement.prototype );
let PROPERTY_NAME_ID = "propertyName";
let PROPERTY_VALUE_ID = "propertyValue";


let template = `
	<style>
		:host {
			display : block;
         
            color : inherit;
            background-opacity : 0.75;
		}

		#propertyName {
			display : inline-block;
			
		}
		#seperator {

		}
	</style>
	<span id="${ PROPERTY_NAME_ID }"></span>
	<span>:</span>
`;

def.Properties( prototype, {
	createdCallback ( ) {
		let shadowRoot = this.createShadowRoot();
		shadowRoot.innerHTML = template;
	},
	
	handleEvent ( event ) {
		if ( event.type === "change" ) this.dispatchEvent( new CustomEvent( "change", {
			detail : {
				value : event.detail.value,
				name : this.propertyName
			}
		}));
	},

	setValue ( value ) {
		this.propertyView.value = value;
	}

});

def.GetterSetters( prototype, {
	propertyName ( ) {
		return this.shadowRoot.getElementById( PROPERTY_NAME_ID ).textContent;
	},
	propertyView ( ) {
		return this.shadowRoot.getElementById( PROPERTY_VALUE_ID );
	}
},{
	propertyName ( name ) {
		this.shadowRoot.getElementById( PROPERTY_NAME_ID ).textContent = name;
	},
	propertyView ( newElement ) {
		let oldElement = this.propertyView;

		if ( oldElement ) {
			oldElement.removeEventListener( "change", this );
			oldElement.remove();
		}

		newElement.addEventListener( "change", this );
		newElement.id = PROPERTY_VALUE_ID;
		
		this.shadowRoot.appendChild( newElement );
	}
});



export default document.registerElement( "al-property-entry", {
	prototype
});