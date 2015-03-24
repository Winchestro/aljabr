import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { gl, GL, extensions } from "../webgl/GLContext";

const BINDING_TARGET 			= {
	[ GL.ARRAY_BUFFER ] : null,
	[ GL.ELEMENT_ARRAY_BUFFER ] : null
};

export default class Buffer {
	constructor ( target ){
		var buffer = gl.createBuffer();
		if( target !== undefined ) Property( buffer, "target", target, C );
		return buffer;
	}
	static Vertex ( ) {
		return Buffer( GL.ARRAY_BUFFER );
	}
	static Index (  ) {
		return Buffer( GL.ELEMENT_ARRAY_BUFFER );
	}
}

Properties( WebGLBuffer.prototype, {
	delete ( ) {
		gl.deleteBuffer( this );
		return this;
	},
	bind ( target ) {
		if ( target !== undefined ) Property( this, "target", target, C );
		else target = this.target;
		if ( BINDING_TARGET[ target ] !== this ) {
			BINDING_TARGET[ target ] = this;
			gl.bindBuffer( target, this );
		}
		return this;
	},
	unbind ( target ) {
		if ( target !== undefined ) Property( this, "target", target, C );
		else target = this.target;
		gl.bindBuffer( target, null );
		return this;
	},
	data ( data, usage = GL.STATIC_DRAW ) {
		this.bind();		
		if( this.target === GL.ELEMENT_ARRAY_BUFFER && data.BYTES_PER_ELEMENT === 4 ) {
			if(!extensions.OES_element_index_uint) console.warn("32bit indices currently not supported.");
		}
		gl.bufferData(
			this.target,
			//BufferDataSource to send or GLsizeiptr to allocate
			data,
			//GLenum STATIC_DRAW | DYNAMIC_DRAW | STREAM_DRAW
			usage
		);
		return this;
	},
	subData ( data, offset = data.byteOffset ) {
		this.bind();
		gl.bufferSubData(
			this.target,
			offset,
			data
		);
		return this;
	}
});
Getters( WebGLBuffer.prototype, {
	getTargetFlag ( ) { return gl.flags[ this.target ];},
	getUsageFlag ( ) { 	return gl.flags[ this.getUsage ];},
	getUsage ( ) { 		this.bind(); return gl.getBufferParameter( this.target, GL.BUFFER_USAGE );},
	getSize ( ) { 		this.bind(); return gl.getBufferParameter( this.target, GL.BUFFER_SIZE );},
});


/*
Object.defineProperties( PROTOTYPE, {
	getTarget : 		{get:function(){ return TARGET.get( this );}},
	getTargetFlag : 	{get:function(){ return gl.flags[ this.getTarget ];}},
	getUsage : 			{get:function(){ this.bind(); return gl.getBufferParameter( this.getTarget, GL.BUFFER_USAGE );}},
	getUsageFlag : 		{get:function(){ return gl.flags[ this.getUsage ];}},
	getSize : 			{get:function(){ this.bind(); return gl.getBufferParameter( this.getTarget, GL.BUFFER_SIZE );}},
});
*/
/*
const BUFFER 					= new Map;
const LENGTH					= new WeakMap;
const BYTES						= new WeakMap;

class BoundBuffer {
	unbind ( ) {
		var buffer = BUFFER.get( this );
		BUFFER.set( this, null );
		gl.bindBuffer( buffer.getTarget, null );
		return buffer;
	}
	bufferData ( data, usage ) {
		LENGTH.set( this.getBuffer, data.length );
		BYTES.set( this.getBuffer, data.BYTES_PER_ELEMENT );
		if( this.getTarget === GL.ELEMENT_ARRAY_BUFFER && data.BYTES_PER_ELEMENT === 4 ) {
			if(!Extensions.OES_element_index_uint) console.warn("32bit indices not supported");
		}
		gl.bufferData(
			this.getTarget,
			//BufferDataSource to send or GLsizeiptr to allocate
			data,
			//GLenum STATIC_DRAW | DYNAMIC_DRAW | STREAM_DRAW
			usage
		);
		return this;
	}
	allocStatic ( bytes ) { return this.bufferData( bytes, GL.STATIC_DRAW );}
	allocDynamic ( bytes ) { return this.bufferData( bytes, GL.DYNAMIC_DRAW );}
	allocStream ( bytes ) { return this.bufferData( bytes, GL.STREAM_DRAW );}
	bufferStatic ( data ) { return this.bufferData( data, GL.STATIC_DRAW );}
	bufferDynamic ( data ) { return this.bufferData( data, GL.DYNAMIC_DRAW );}
	bufferStream ( data ) { return this.bufferData( data, GL.STREAM_DRAW );}
	bufferSubData ( data, offset = data.byteOffset ) {
		gl.bufferSubData(
			this.getTarget,
			offset,
			data
		);
		return this;
	}
	set data ( BufferView ) {
		this.bufferSubData( this.getTarget, BufferView, BufferView.byteOffset );

	}

	get getBuffer ( ) 		{ return BUFFER.get( this ); }
	get getSize ( ) 		{ return gl.getBufferParameter( this.getTarget, GL.BUFFER_SIZE ); }
	get getUsage ( ) 		{ return gl.getBufferParameter( this.getTarget, GL.BUFFER_USAGE ); }
	get getUsageFlag ( ) 	{ return gl.flags[ this.getUsage ]; }	
	
	get getTarget ( ) 		{ return this.getBuffer.getTarget; }

}

class BoundVertexBuffer extends BoundBuffer {

}


const UintTypes = {
	1 : GL.UNSIGNED_BYTE,
	2 : GL.UNSIGNED_SHORT,
	4 : GL.UNSIGNED_INT
};

class BoundIndexBuffer extends BoundBuffer { 
	draw ( mode, count, type, offset ) {
		gl.drawElements( mode, count, type, offset );
		return this;
	}
	drawTriangles ( start = 0, count ) {
		gl.drawElements(
			GL.TRIANGLES,
			( ( count - start ) * 3) || ( this.getLength - start * 3 ),
			this.getUintType,
			start * 3 * this.getBytes
		);
		return this;
	}
	drawLines ( start = 0, count ) {
		gl.drawElements(
			GL.LINES,
			( ( count - start ) * 2) || ( this.getLength - start * 2 ),
			this.getUintType,
			start * 2 * this.getBytes
		);
		return this;
	}
	drawPoints ( start = 0, count ) {
		gl.drawElements(
			GL.POINTS,
			count - start || this.getLength - start,
			this.getUintType,
			start * this.getBytes
		);
		return this;

	}
	drawTriangleStrip ( start, count ) {
		gl.drawElements(
			GL.TRIANGLE_STRIP,
			count,
			this.getUintType,
			start
		);
		return this;
	}
	drawTriangleFan ( start, count ) {
		gl.drawElements(
			GL.TRIANGLE_FAN,
			count,
			this.getUintType,
			start
		);
		return this;	
	}
	drawLineStrip ( start, count ) {
		gl.drawElements(
			GL.LINE_STRIP,
			( ( count - start ) * 2) || ( this.getLength - start * 2 ),
			this.getUintType,
			start * 2 * this.getBytes
		);
		return this;
	}
	drawLineLoop ( start, count ) {
		gl.drawElements(
			GL.LINE_LOOP,
			( ( count - start ) * 2) || ( this.getLength - start * 2 ),
			this.getUintType,
			start * 2 * this.getBytes 
		);
		return this;
	}
	get getUintType ( ) 	{ return UintTypes[ this.getBytes ]; }
	get getBytes ( ) 		{ return BYTES.get( this.getBuffer ); }
	get getLength ( ) 		{ return LENGTH.get( this.getBuffer ); }
}



*/