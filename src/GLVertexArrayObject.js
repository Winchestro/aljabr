import { gl, GL, extensions } from "./GLContext";
import { Properties, Getters, Setters, GetterSetters, E, C, W } from "./utilities/ULPropertyDescriptors";

const ext = extensions.OES_vertex_array_object;
const DEBUG_USE_FALLBACK = false;
const MAX_VERTEX_BINDINGS = 16;
var	currentBinding;

export default class VertexArrayObject {
	constructor ( ) {
		if( ext && !DEBUG_USE_FALLBACK ) return ext.createVertexArrayOES( );
		else {
			if( !( this instanceof VertexArrayObject ) ) return new VertexArrayObject;
		}
	}
	use ( ) {
		for ( let i = 0; i < MAX_VERTEX_BINDINGS; i++ ) {
			let binding = this[ i ];
			if ( binding ) {
				binding.buffer.bind();
				binding.location.enable().applyPointer();
			}
		}
		if( this.index ) this.index.bind();
		return this;
	}
	unbind ( ) {

	}
	addVertexBinding ( location, buffer ) {
		let index = location.index;
		let target = this[ index ];
		if( target ) {
			target.buffer = buffer;
			target.location = location;
		} else {
			this[ index ] = { buffer: buffer, location : location };
		}
		buffer.bind();
		location.enable().applyPointer();
		return this;
	}
	setIndexBinding ( buffer ) {
		this.index = buffer;
		buffer.bind();
		return this;
	}
	dispose ( ) {

	}
}

function bind( target ) {
	currentBinding = target;
	ext.bindVertexArrayOES( target );
}
function unbind( target ) {
	currentBinding = null;
	ext.bindVertexArrayOES( null );
}

if ( ext && !DEBUG_USE_FALLBACK ) {
	let proto = Object.getPrototypeOf( VertexArrayObject( ) );

	let methods = {
		use : function ( ) {
			if ( currentBinding !== this ) bind( this );
			return this;
		},
		unbind : function ( ) {
			unbind( this );
			return this;
		},
		addVertexBinding : function( location, buffer ) {
			if ( currentBinding !== this ) bind( this );
			
			let index = location.index;
			let target = this[ index ];
			
			if( target ) {
				target.buffer = buffer;
				target.location = location;
			} else {
				this[ index ] = { buffer: buffer, location : location };
			}
			//console.log(buffer,location);
			buffer.bind();
			location.enable().applyPointer();

			return this;
		},
		getNextFreeSlot : function ( ) {
			let i = 0;
			while ( i < MAX_VERTEX_BINDINGS ) {
				if ( this[ i ] === undefined ) return i;
				else i++;
			}
		},
		setIndexBinding : function ( buffer ) {
			if ( currentBinding !== this ) bind( this );
			buffer.bind();
			this.index = buffer;
			return this;
		},
		dispose : function ( ) {
			//if ( currentBinding !== this ) bind( this );
			ext.deleteVertexArrayOES( this );
			return this;
		}
	}

	for ( let m in methods ) Object.defineProperty( 
		proto,
		m, 
		{
			value : methods[ m ],
		}
	);
}