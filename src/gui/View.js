const ObjectViewStyle = `
	:host {
		background 		: #222222;
		width 			: 260px;
		display 		: flex;
		flex-direction 	: column;
		padding 		: 10px;
		border-radius 	: 5px 15px 5px 5px;
		font-family		: Consolas, Lucida Console, monospace;
	/*	font-family		: 'Segoe UI', Tahoma, sans-serif;*/
		font-size		: 12px;
		color 			: #dddddd;
		text-shadow		: 0 0 1px;
		border: 2px solid #BBB
	}
	.container {
		margin-left		: 15px;
		-webkit-user-select: none;
		user-select 	: none;
	}
	.header {
		display 		: flex;
		-webkit-user-select: initial;
		user-select 	: initial;
	}
	.item {
		display 		: flex;
		flex-direction	: column;
		justify-content : space-between;
		margin-top		: 3px;
		-webkit-user-select: none;
		user-select 	: none;
	}
	.expandable {
		cursor			: pointer;
		-webkit-user-select: none;
		user-select 	: none;
		color			: #8c8c8c;

	}
	.expandable.hidden {
		visibility		: hidden;
	}
	.expandable.hidden::before {
		content : "+";
	}
	.expandable.collapsed::before {
		content : "+";
	}
	.expandable.expanded::before {
		content : "-";
	}
	.center {
		color			: #7c7c7c;
		font-weight		: bold;
		padding			: 0px 4px;
		-webkit-user-select: initial;
		user-select 	: initial;
	}
	.center.configurable {
		color			: white;
	}
	.property {
		color			: #77a8c6;
		opacity			: 0.5;
		text-shadow		: 0 0 1px;
		flex			: 0 1 30%;
		overflow		: hidden;
		-webkit-user-select: initial;
		user-select 	: initial;
	}
	.property.enumerable {
		opacity			: 1;
	}
	.value {
		flex 			: 1 0 50%;
		color			: #7c7c7c;
		overflow		: hidden;
		-webkit-user-select: initial;
		user-select 	: initial;
	}
	.value.number {
		background: none;
		text-shadow		: 0 0 1px;
		border: none;
		font-weight: bold;
		padding : 0;
		font-size : 11px;
		outline: transparent;
	}
	.value.number.writable {
		color : #89f5a2;
	}
	.value.boolean {
		color 			: rgb(255, 205, 138);
	}
	.value.boolean.writable {

	}
	.value.string {
		color : #f0874f;
		opacity : 0.5;
	}
	.value.string.writable {
		opacity : 1;	
	}
	.value.object {
		text-shadow		: 0 0 1px;
		font-family: Consolas;
		color: #dddddd;
		opacity : 0.5;
	}
	.value.object.writable {
		opacity : 1;
	}
	.value.function {
		color : rgb(111, 200, 255);
		opacity : 0.5;
	}
	.value.function.writable {
		opacity : 1;	
	}
`;

export default class ObjectView {
	constructor ( model, name ) {
		let element = document.createElement( "div" );
		let shadowRoot = element.createShadowRoot();
		
		let style = document.createElement( "style" );
		let header = document.createElement( "div" );
		header.innerHTML = `
			<span class="expandable expanded"></span>
			<span>${ model.constructor.name }&nbsp;${ name||"" }&nbsp;{</span>
		`;
		

		style.innerHTML = ObjectViewStyle;
		shadowRoot.appendChild( style );
		shadowRoot.appendChild( header );

		shadowRoot.appendChild( createExpandedObjectEntry( model ) );
		

		let footer = document.createElement( "span" );
		footer.innerHTML = `
			<span>}</span>
		`;
		shadowRoot.appendChild( footer );
		return element;
		
	}
}
function createExpandedObjectEntry( model ) {
	let container = document.createElement( "div" );
	container.className = "container";
	
	let keys = Object.getOwnPropertyNames( model );

	// first all enumerable and inherited enumerable properties
	if ( keys.length < 100 ) {
		for ( let key in model ) {
			let descriptor = getDescriptorRecursive( model, key );
			let entry = createEntry( key, descriptor );
			if ( entry ) container.appendChild( entry );
		}
		// then all non-enumerable own proerties
		for ( let key of keys ) {
			let descriptor = Object.getOwnPropertyDescriptor( model, key );
			if( !descriptor.enumerable ) { 
				let entry = createEntry( key, descriptor );
				if ( entry ) container.appendChild( entry );
			}

		}
	}
	let proto = Object.getPrototypeOf( model );
	if ( proto ) {
		let entry = createObjectEntry( "[[proto]]", proto, false, false, false );
		if ( entry ) container.appendChild( entry );
	}
	return container;

	function getDescriptorRecursive( object, property ) {
		let descriptor = Object.getOwnPropertyDescriptor( object, property );
		if ( !descriptor ) {
			let proto = Object.getPrototypeOf( object );
			if ( proto ) return getDescriptorRecursive( proto, property );
			else return;
		}
		else return descriptor;
	}
}
function createEntry ( key, descriptor ) {
	if ( descriptor.value !== undefined && descriptor.value !== null ) {
		let value = descriptor.value;
		let enumerable = descriptor.enumerable;
		let configurable = descriptor.configurable;
		let writable = descriptor.writable;
		let type = typeof value;
		switch ( type ) {
			case "object":
				if ( value.createUI ) return value.createUI( key, value, enumerable, configurable, writable ) 
				else return createObjectEntry( key, value, enumerable, configurable, writable );
				break;
			case "number":
				return createNumberEntry( key, value, enumerable, configurable, writable );
				break;
			case "string":
				return createStringEntry( key, value, enumerable, configurable, writable );
				break;
			case "function":
				return createFunctionEntry( key, value, enumerable, configurable, writable );
				break;
			case "boolean":
				return createBooleanEntry( key, value, enumerable, configurable, writable );
				break;
			default :
				break;
		}
	}
	else {
		// getter / setter
	}
}
function createNumberEntry ( key, value, enumerable, configurable, writable ) {
	let element = document.createElement("div");
	element.className = "item";
	element.innerHTML = `
		<div class="header">
			<span class="expandable hidden">&nbsp;</span>
			<span class="property ${ enumerable ? "enumerable" : "" }">${ key }</span>
			<span class="center ${ configurable ? "configurable" : "" }"> : </span>
			<input ${ writable ? "" : "disabled" } class="value number ${ writable ? "writable" : "" }" type="number", value="${ value }" ></input>
		</div>
	`;

	return element;
}

function createObjectEntry ( key, value, enumerable, configurable, writable ) {
	let element = document.createElement( "div" );
	let hasLength = length in value;

	element.className = "item";
	element.innerHTML = `
		<div class="header">
			<span class="expandable collapsed">&nbsp;</span>
			<span class="property ${ enumerable ? "enumerable" : "" }">${ key }</span>
			<span class="center ${ configurable ? "configurable" : "" }"> : </span>
			<span class="value object ${ writable ? "writable" : "" }">${ value.constructor.name }${ hasLength ? "["+value.length+"]" : "" }</span>
		<div>
	`;
	let expander = element.children[ 0 ].children[ 0 ];
	expander.addEventListener( "click", function createExpansion( ) {
		
		let properties = createExpandedObjectEntry( value );
		expander.removeEventListener( "click", createExpansion );
		expander.addEventListener( "click", function ( ) {
			expander.classList.toggle( "collapsed" );
			expander.classList.toggle( "expanded" );
			let s = properties.style;
			s.display = s.display === "none" ? "" : "none";
		} );
		expander.classList.toggle( "collapsed" );
		expander.classList.toggle( "expanded" );
		element.appendChild( properties );
	});
	return element;
}

function createFunctionEntry ( key, value, enumerable, configurable, writable ) {
	let element = document.createElement( "div" );

	element.className = "item";
	element.innerHTML = `
		<div class="header">
			<span class="expandable collapsed">&nbsp;</span>
			<span class="property ${ enumerable?"enumerable":"" }">${ key }</span>
			<span class="center ${ configurable?"configurable":"" }"> : </span>
			<span class="value function ${ writable?"writable":"" }">${ value.name ? value.name : "function" }(${ value.length })</span>
		</div>
	`;
	let expander = element.children[ 0 ].children[ 0 ];
	expander.addEventListener( "click", function createExpansion( ) {
		
		let properties = createExpandedObjectEntry( value );
		expander.removeEventListener( "click", createExpansion );
		expander.addEventListener( "click", function ( ) {
			expander.classList.toggle( "collapsed" );
			expander.classList.toggle( "expanded" );
			let s = properties.style;
			s.display = s.display === "none" ? "" : "none";
		} );
		expander.classList.toggle( "collapsed" );
		expander.classList.toggle( "expanded" );
		element.appendChild( properties );
	});
	return element;
}

function createStringEntry ( key, value, enumerable, configurable, writable ) {

}

function createBooleanEntry ( key, value, enumerable, configurable, writable ) {

}