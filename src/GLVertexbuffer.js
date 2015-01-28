void function GLVertexBuffer(){
	const GL 						= WebGLRenderingContext.prototype;
	const Resource 					= Resource;
	const PROTOTYPE 				= WebGLBuffer.prototype;

	function StaticArrayBuffer ( data ) {
		return Buffer( GL.ARRAY_BUFFER, GL.STATIC_DRAW, data );
	}
	function StaticElementBuffer ( data ) {
		return Buffer( GL.ELEMENT_ARRAY_BUFFER, GL.STATIC_DRAW, data );
	}
	function DynamicArrayBuffer ( data ) {
		var b = Buffer( GL.ARRAY_BUFFER, GL.DYNAMIC_DRAW, data );
		b.data = data;
		return b;
	}
	function DynamicElementBuffer ( data ) {
		var b = Buffer( GL.ELEMENT_ARRAY_BUFFER, GL.DYNAMIC_DRAW, data );
		b.data = data;
		return b;
	}
	function StreamArrayBuffer ( data ) {
		return Buffer( GL.ARRAY_BUFFER, GL.STREAM_DRAW, data );
	}
	function StreamElementBuffer ( data ) {
		return Buffer( GL.ELEMENT_ARRAY_BUFFER, GL.STREAM_DRAW, data );
	}
	function Buffer( target, usage, data ){
		var b = gl.createBuffer( );
		Object.defineProperties( b, {
			target : {
				value : target
			}
		});
		b.bind().bufferData( data, usage );
		return b;
	}
	
	const BINDINGS = {
		delete : function(){
			gl.deleteBuffer( this );
			return this;
		},
		bind : function(){
			gl.bindBuffer( this.target, this );
			return this;
		},
		unbind : function ( ) {
			gl.bindBuffer( this.target, null );
			return this;
		},
		vertexAttribPointer : function ( index, size, type, normalized, stride, offset ) {
			gl.vertexAttribPointer( index, size, type, normalized, stride, offset );
			return this;
		},
		enableVertexAttribArray : function ( index ) {
			gl.enableVertexAttribArray( index );
			return this;
		},
		disableVertexAttribArray : function ( index ) {
			gl.disableVertexAttribArray( index );
			return this;
		},
		bufferData : function ( data, usage ) {
			gl.bufferData( this.target, data, usage );
			return this;
		},
		bufferSubData : function ( offset, data ) {
			gl.bufferSubData( this.target, offset, data );
			return this;
		},
	};
	const ACCESSORS = {
		getUsageFlag : {
			get : function ( ) {
				this.bind();
				return gl.flags[gl.getBufferParameter( this.target, GL.BUFFER_USAGE )];
			}
		},
		getUsage : {
			get : function ( ) {
				this.bind();
				return gl.getBufferParameter( this.target, GL.BUFFER_USAGE );
			}
		},
		getSize : {
			get : function ( ) { 
				this.bind();
				return gl.getBufferParameter( this.target, GL.BUFFER_SIZE );
			}
		},
		
	};

	Object.defineProperties(PROTOTYPE,ACCESSORS);
	for( var p in BINDINGS) PROTOTYPE[p] = BINDINGS[p];

	const EXPORT = {
		StaticArrayBuffer:StaticArrayBuffer,
		StreamArrayBuffer:StreamArrayBuffer,
		DynamicArrayBuffer:DynamicArrayBuffer,
		StaticElementBuffer:StaticElementBuffer,
		StreamElementBuffer:StreamElementBuffer,
		DynamicElementBuffer:DynamicElementBuffer,
		Buffer:Buffer
	};
	for ( var e in EXPORT ) window[e] = core[e] = EXPORT[e];
	
}();