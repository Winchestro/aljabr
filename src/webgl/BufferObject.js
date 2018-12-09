import gl from "../webgl/Context.js";
import def from	"../utilities/PropertyDescriptors.js";
import extensions from "../webgl/Extensions.js";

const BUFFER_SIZE			= 0x8764;
const BUFFER_USAGE			= 0x8765;

const USAGE_STREAM_DRAW		= 0x88E0;
const USAGE_STATIC_DRAW 	= 0x88E4;
const USAGE_DYNAMIC_DRAW	= 0x88E8;

const TARGET_ARRAY_BUFFER			= 0x8892;
const TARGET_ELEMENT_ARRAY_BUFFER   = 0x8893;

const BINDING_TARGET = {
	[ TARGET_ARRAY_BUFFER ] : null,
	[ TARGET_ELEMENT_ARRAY_BUFFER ] : null
};


export default class BufferObject {
	constructor ( target ) {
		var vertexBuffer = gl.createBuffer();
		def.Property( vertexBuffer, "target", target );
		return vertexBuffer;
	}
}

export class Index {
	constructor ( view, usage ) {
		var vbo = gl.createBuffer();
		def.Property( vbo, "target", TARGET_ELEMENT_ARRAY_BUFFER );

		if( view !== undefined ) vbo.bind().allocate( view, usage );
		return vbo;
	}
}

export class Vertex {
	constructor ( view, usage ) {
		var vbo = gl.createBuffer();
		def.Property( vbo, "target", TARGET_ARRAY_BUFFER );

		if( view !== undefined ) vbo.bind().allocate( view, usage );
		return vbo;
	}
}

def.Properties( BufferObject, {
	Index,
	Vertex,
	TARGET_ARRAY_BUFFER,
	TARGET_ELEMENT_ARRAY_BUFFER,
	USAGE_STREAM_DRAW,
	USAGE_STATIC_DRAW,
	USAGE_DYNAMIC_DRAW
});

def.Properties( WebGLBuffer.prototype, {
	setTarget ( target ) {
		def.Property( this, "target", target, def.CONFIGURABLE );
		return this;
	},
	delete ( ) {
		gl.deleteBuffer( this );
		return this;
	},
	bind ( target ) {
		if ( target !== undefined ) def.Property( this, "target", target, def.CONFIGURABLE );
		else target = this.target;
		if ( BINDING_TARGET[ target ] !== this ) {
			BINDING_TARGET[ target ] = this;
			gl.bindBuffer( target, this );
		}
		return this;
	},
	unbind ( target ) {
		if ( target !== undefined ) def.Property( this, "target", target, def.CONFIGURABLE );
		else target = this.target;
		gl.bindBuffer( target, null );
		return this;
	},
	allocate ( lengthOrView, usage ) {
		if ( usage === undefined ) usage = USAGE_STATIC_DRAW;
		
		this.bind();
		gl.bufferData(
			this.target,
			lengthOrView,
			usage
		);
		return this;
	},
	update ( view, offset ) {
		if ( offset === undefined ) offset = view.byteOffset;
		this.bind();
		
		gl.bufferSubData(
			this.target,
			offset,
			view
		);
		return this;
	}
});
/*
def.Properties( WebGLBuffer, {
	USAGE_STREAM_DRAW,
	USAGE_STATIC_DRAW,
	USAGE_DYNAMIC_DRAW
});*/

def.Getters( WebGLBuffer.prototype, {
	getTargetString	(){ return gl.strings[ this.target ];},
	getUsageString 	(){	return gl.strings[ this.getUsage ];},
	getUsage 		(){	this.bind(); return gl.getBufferParameter( this.target, gl.BUFFER_USAGE );},
	getSize 		(){	this.bind(); return gl.getBufferParameter( this.target, gl.BUFFER_SIZE );},
});
/*
let prototypes = [
	Float32Array.prototype,
	Float64Array.prototype,
	Uint8Array.prototype,
	Uint16Array.prototype,
	Uint32Array.prototype,
	Int8Array.prototype,
	Int16Array.prototype,
	Int32Array.prototype
];


for ( let prototype of prototypes ) def.Properties( prototype, {
	update : update,
	setValues : setValues,
});

function setValues ( ) {
	this.set.call( this, arguments );
	return this;
}
function update ( ) {
	if ( arguments.length ) this.set( arguments );
	this.buffer.target.update( this );
	return this;
}
*/