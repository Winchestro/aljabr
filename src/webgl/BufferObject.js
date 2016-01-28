define( [
	"../utilities/PropertyDescriptors",
	"../webgl/Context",
	"../webgl/Extensions"
], function module (
	def,
	gl,
	extensions
) {
	"use strict";
	const BINDING_TARGET = {
		[ gl.ARRAY_BUFFER ] : null,
		[ gl.ELEMENT_ARRAY_BUFFER ] : null
	};


	class BufferObject {
		constructor ( target ) {
			var vertexBuffer = gl.createBuffer();
			def.Property( vertexBuffer, "target", target );
			return vertexBuffer;
		}
	}

	class Index {
		constructor ( ) {
			var vbo = gl.createBuffer();
			def.Property( vbo, "target", gl.ELEMENT_ARRAY_BUFFER );
			return vbo;
		}
	}

	class Vertex {
		constructor ( ) {
			var vbo = gl.createBuffer();
			def.Property( vbo, "target", gl.ARRAY_BUFFER );
			return vbo;
		}
	}

	def.Properties( BufferObject, {
		Index,
		Vertex
	}, def.CONFIGURABLE );

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
		allocate ( byteLength, usage ) {
			if ( usage === undefined ) usage = gl.STATIC_DRAW;
			
			this.bind();
			gl.bufferData(
				this.target,
				byteLength,
				usage
			);
			return this;
		},
		update ( view, offset ) {
			if ( offset === undefined ) offset = view.byteOffset;
			this.bind();
			/*
			if( this.target === gl.ELEMENT_ARRAY_BUFFER && arrayBuffer.BYTES_PER_ELEMENT === 4 ) {
				if( !extensions.OES_element_index_uint ) console.warn("32bit indices currently not supported.");
			}
			*/
			gl.bufferSubData(
				this.target,
				offset,
				view
			);
			return this;
		},

		/*
		createStorage ( size, usage ) {
			if ( usage === undefined ) usage = gl.STATIC_DRAW;
			// alternative way to allocate buffers
			// the idea is to make sure that for every vbo there's exactly one arrayBuffer to write to
			// so it can be replaced easily.
			
			let arrayBuffer = new ArrayBuffer( size );
			def.Property( arrayBuffer, "vertexBuffer", this, def.CONFIGURABLE );
			//def.Property( this, "arrayBuffer", arrayBuffer, def.CONFIGURABLE );
			this.bind();
			gl.bufferData(
				this.target,
				size,
				usage
			);
			return arrayBuffer;
		}
		*/
	});
	def.Getters( WebGLBuffer.prototype, {
		getTargetString	(){ return gl.strings[ this.target ];},
		getUsageString 	(){	return gl.strings[ this.getUsage ];},
		getUsage 		(){	this.bind(); return gl.getBufferParameter( this.target, gl.BUFFER_USAGE );},
		getSize 		(){	this.bind(); return gl.getBufferParameter( this.target, gl.BUFFER_SIZE );},
	});

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
		set : set,
		setValues : setValues, 
		__set : prototype.set
	});
	
	

	function set ( n ) {
		this.constructor.prototype.__set.call( this, n );
		return this;
	}
	function setValues ( ) {
		this.constructor.prototype.__set.call( this, arguments );
		return this;
	}
	function update ( ) {
		if ( arguments.length ) this.set( arguments );
		this.buffer.target.update( this );
		return this;
	}
	return BufferObject;
});