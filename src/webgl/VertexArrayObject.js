import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/PropertyDescriptors.js";
import { gl, GL, extensions, capabilities } from "../webgl/Context.js";

const ext = extensions.OES_vertex_array_object;
const DEBUG_USE_FALLBACK = false;
const MAX_VERTEX_BINDINGS = capabilities.getMaxVertexAttribs;
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
			this[ index ] = new VertexBinding( buffer, location );
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
Properties( VertexArrayObject.prototype, {
	[ Symbol.iterator ] : [][ Symbol.iterator ],
	splice : [].splice,
	length : 0,
}, C );

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

	Properties( proto, {
		use ( ) {
			if ( currentBinding !== this ) bind( this );
			return this;
		},
		unbind ( ) {
			unbind( this );
			return this;
		},
		addVertexBinding ( location, buffer ) {
			if ( currentBinding !== this ) bind( this );
			
			let index = location.index;
			let target = this[ index ];
			
			if( target ) {
				target.buffer = buffer;
				target.location = location;
			} else {
				this[ index ] = new VertexBinding( buffer, location );
			}
			//console.log(buffer,location);
			Property( this, "length", this.length + 1, C );
			buffer.bind();
			location.enable().applyPointer();

			return this;
		},
		updatePointer ( index, offset = 0, stride = 0, size = 4, type = GL.FLOAT, normalized = false ) {
			if ( currentBinding !== this ) bind( this );

			let target = this[ index ];

			if ( target ) {
				target.buffer.bind();
				target.location.setPointer( offset, stride, size, type, normalized );
			}
			return this;
		},
		disableAttribute ( index ) {
			if ( currentBinding !== this ) bind( this );

			let target = this[ index ];
			if ( target ) {
				target.buffer.bind();
				target.location.disable();
			}
			return this;
		},
		enableAttribute ( index ) {
			if ( currentBinding !== this ) bind( this );

			let target = this[ index ];
			if ( target ) {
				target.buffer.bind();
				target.location.enable();
			}
			return this;
		},
		getNextFreeSlot ( ) {
			let i = 0;
			while ( i < MAX_VERTEX_BINDINGS ) {
				if ( this[ i ] === undefined ) return i;
				else i++;
			}
		},
		setIndexBinding ( buffer ) {
			if ( currentBinding !== this ) bind( this );
			buffer.bind();
			this.index = buffer;
			return this;
		},
		dispose ( ) {
			//if ( currentBinding !== this ) bind( this );
			ext.deleteVertexArrayOES( this );
			return this;
		}	
	});
	Properties( proto, {
		[ Symbol.iterator ] : [][ Symbol.iterator ],
		splice : [].splice,
		length : 0,
	}, C );
}

class VertexBinding {
	constructor ( buffer, location ) {
		Properties ( this, { buffer, location }, C );
	}
}