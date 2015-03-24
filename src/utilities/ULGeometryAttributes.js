import { Property, Properties, Getters, Setters, GetterSetters, E, C, W } from "../utilities/ULPropertyDescriptors";
import { gl, GL } from "../webgl/GLContext";
import InterleavedArray from "../utilities/ULInterleavedArray";
import Buffer from "../webgl/GLVertexBuffer";
import Draw from "../webgl/GLDraw";
import Material from "../utilities/ULMaterial";

export class VertexAttribute {
	constructor ( name, structure ) {
		this.name = name;
		this.buffer = new Buffer.Vertex;
		this.data = structure.type ? structure.type : structure;
	}
	allocate ( lengthOrData, usage = GL.STATIC_DRAW ) {
		let data = this.data;
		
		if ( isNaN( lengthOrData ) ) 
		{
			this.data = lengthOrData;
			this.buffer.data( lengthOrData, usage );
		}
		else 
		{
			this.data = new data.constructor( length );
			this.buffer.data( lengthOrData * this.data.byteLength, usage );
		}
		return this;
	}
	resize ( length, usage = GL.DYNAMIC_DRAW ) {
		let oldData = length < this.data.length ? this.data.subarray( 0, length ) : this.data; 

		this.data = new oldData.constructor( length );
		this.data.set( oldData );

		this.buffer.data( this.data.byteLength, usage );
		return this;
	}
	createView( start = 0, length = this.data.length ){
		return this.data.subarray( start, length ); 
	}
	set( bufferView = this.data ) {
		this.buffer.subData( bufferView, bufferView.byteOffset );
		return this;
	}
}
Properties( VertexAttribute, {
	STATIC 	: GL.STATIC_DRAW,
	DYNAMIC : GL.DYNAMIC_DRAW,
	STREAM 	: GL.STREAM_DRAW
});

const DEFAULT_MATERIAL = new Material;

export class ElementAttribute extends VertexAttribute {
	constructor( name, data, material, drawType = GL.TRIANGLES ) {
		return new DATA_TYPES[ data.constructor.name ][ drawType ]( name, data, material );
	}
}

export class ElementAttribute8 extends ElementAttribute {
	constructor( name, data, material = DEFAULT_MATERIAL ) {
		this.name = name;
		this.buffer = new Buffer.Index;
		this.data = data;
		this.material = material;
	}
}
export class ElementAttribute16 extends ElementAttribute {
	constructor( name, data, material = DEFAULT_MATERIAL ) {
		this.name = name;
		this.buffer = new Buffer.Index;
		this.data = data;
		this.material = material;
	}
}
export class ElementAttribute32 extends ElementAttribute {
	constructor( name, data, material = DEFAULT_MATERIAL ) {
		this.name = name;
		this.buffer = new Buffer.Index;
		this.data = data;
		this.material = material;
	}
}

export class PointsInt8 extends ElementAttribute8 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.POINTS, count, GL.UNSIGNED_BYTE, offset );
		return this;
	}
};
export class PointsInt16 extends ElementAttribute16 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.POINTS, count, GL.UNSIGNED_SHORT, offset );
		return this;
	}
};
export class PointsInt32 extends ElementAttribute32 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.POINTS, count, GL.UNSIGNED_INT, offset );
		return this;
	}
};
export class LinesInt8 extends ElementAttribute8 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINES, count, GL.UNSIGNED_BYTE, offset );
		return this;
	}
};
export class LinesInt16 extends ElementAttribute16 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINES, count, GL.UNSIGNED_SHORT, offset );
		return this;
	}
};
export class LinesInt32 extends ElementAttribute32 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINES, count, GL.UNSIGNED_INT, offset );
		return this;
	}
};
export class LineStripInt8 extends ElementAttribute8 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINE_STRIP, count, GL.UNSIGNED_BYTE, offset );
		return this;
	}
};
export class LineStripInt16 extends ElementAttribute16 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINE_STRIP, count, GL.UNSIGNED_SHORT, offset );
		return this;
	}
};
export class LineStripInt32 extends ElementAttribute32 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINE_STRIP, count, GL.UNSIGNED_INT, offset );
		return this;
	}
};
export class LineLoopInt8 extends ElementAttribute8 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINE_LOOP, count, GL.UNSIGNED_BYTE, offset );
		return this;
	}
};
export class LineLoopInt16 extends ElementAttribute16 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINE_LOOP, count, GL.UNSIGNED_SHORT, offset );
		return this;
	}
};
export class LineLoopInt32 extends ElementAttribute32 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.LINE_LOOP, count, GL.UNSIGNED_INT, offset );
		return this;
	}
};
export class TrianglesInt8 extends ElementAttribute8 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLES, count, GL.UNSIGNED_BYTE, offset );
		return this;
	}
};
export class TrianglesInt16 extends ElementAttribute16 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLES, count, GL.UNSIGNED_SHORT, offset );
		return this;
	}
};
export class TrianglesInt32 extends ElementAttribute32 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLES, count, GL.UNSIGNED_INT, offset );
		return this;
	}
};
export class TriangleStripInt8 extends ElementAttribute8 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLE_STRIP, count, GL.UNSIGNED_BYTE, offset );
		return this;
	}
};
export class TriangleStripInt16 extends ElementAttribute16 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLE_STRIP, count, GL.UNSIGNED_SHORT, offset );
		return this;
	}
};
export class TriangleStripInt32 extends ElementAttribute32 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLE_STRIP, count, GL.UNSIGNED_INT, offset );
		return this;
	}
};
export class TriangleFanInt8 extends ElementAttribute8 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLE_FAN, count, GL.UNSIGNED_BYTE, offset );
		return this;
	}
};
export class TriangleFanInt16 extends ElementAttribute16 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLE_FAN, count, GL.UNSIGNED_SHORT, offset );
		return this;
	}
};
export class TriangleFanInt32 extends ElementAttribute32 {
	draw ( count = this.data.length, offset = 0 ) {
		this.material.use();
		this.buffer.bind();
		gl.drawElements( GL.TRIANGLE_FAN, count, GL.UNSIGNED_INT, offset );
		return this;
	}
};

const DATA_TYPES = {
	Uint8Array : {
		[ GL.POINTS ] 			: PointsInt8,
		[ GL.LINES ] 			: LinesInt8,
		[ GL.LINE_STRIP ]		: LineStripInt8,
		[ GL.LINE_LOOP ]		: LineLoopInt8,
		[ GL.TRIANGLES ] 		: TrianglesInt8,
		[ GL.TRIANGLE_STRIP ]	: TriangleStripInt8,
		[ GL.TRIANGLE_FAN ]		: TriangleFanInt8
	},
	Uint16Array : {
		[ GL.POINTS ] 			: PointsInt16,
		[ GL.LINES ] 			: LinesInt16,
		[ GL.LINE_STRIP ]		: LineStripInt16,
		[ GL.LINE_LOOP ]		: LineLoopInt16,
		[ GL.TRIANGLES ] 		: TrianglesInt16,
		[ GL.TRIANGLE_STRIP ]	: TriangleStripInt16,
		[ GL.TRIANGLE_FAN ]		: TriangleFanInt16
	},
	Uint32Array : {
		[ GL.POINTS ] 			: PointsInt32,
		[ GL.LINES ] 			: LinesInt32,
		[ GL.LINE_STRIP ]		: LineStripInt32,
		[ GL.LINE_LOOP ]		: LineLoopInt32,
		[ GL.TRIANGLES ] 		: TrianglesInt32,
		[ GL.TRIANGLE_STRIP ]	: TriangleStripInt32,
		[ GL.TRIANGLE_FAN ]		: TriangleFanInt32
	}
};
export class VertexAttributeGroup extends VertexAttribute {
	constructor ( name, structure ) {
		this.name = name;
		this.buffer = new Buffer.Vertex;
		this.data = new InterleavedArray( structure );
	}
	allocate ( length, usage = GL.DYNAMIC_DRAW ) {
		this.data.allocate( length );
		this.view = new this.data.type( this.data.buffer );
		this.buffer.data( this.view.byteLength, usage );
		return this;
	}
	resize ( length, usage = GL.DYNAMIC_DRAW ) {
		this.data.resize( length );
		this.view = new this.data.type( this.data.buffer );
		this.buffer.data( this.view.byteLength, usage );
		return this;
	}
	createView( start = 0, length = this.data.maxLength ) {
		let size 	= this.data.type.BYTES_PER_ELEMENT;
		let stride 	= this.data.stride;
		let buffer 	= this.data.buffer;

		return new this.data.type(
			buffer,
			start * stride,
			length * stride / size
		);
	}
	set( bufferView = this.view ) {
		this.buffer.subData( bufferView, bufferView.byteOffset );
		return this;
	}
}
