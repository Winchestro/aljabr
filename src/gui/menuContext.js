import def from "../utilities/PropertyDescriptors.js";

let prototype = Object.create( HTMLElement.prototype );
const STYLE_ID = "rootStyle";
const HOST_RULE = ":host";

let template = `
	<style id="${ STYLE_ID }">
		${ HOST_RULE } {
			position	: fixed;
			visibility	: hidden;
		}

	</style>
	test
	<content></content>		
`;

def.Properties( prototype, {
	createdCallback ( ) {
		let shadow = this.createShadowRoot();
		shadow.innerHTML = template;

		
	},
	attachedCallback ( ) {
		this.parentNode.addEventListener( "contextmenu", this );
	},
	detachedCallback ( ) {
		this.parentNode.removeEventListener( "contextmenu", this );
	},

	handleEvent ( event ) {
		//console.log( "context opened" , event, this.rootStyle );
		let style = this.rootStyle;
			style.visibility = "initial";
			style.left = event.clientX + "px";
			style.top = event.clientY + "px";
		event.preventDefault();
		
	}

}, def.CONFIGURABLE );

def.Getters( prototype, {
	rootStyle ( ) {
		return this.shadowRoot.getElementById( STYLE_ID ).sheet.rules.item( HOST_RULE ).style;
	}
});

export default document.registerElement( "al-menu-context", {
	prototype
});